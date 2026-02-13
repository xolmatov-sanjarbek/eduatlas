import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const getTitle = (title: unknown) => {
  if (typeof title === "string") return title;
  if (title && typeof title === "object") {
    const record = title as Record<string, unknown>;
    if (typeof record.en === "string") return record.en;
    if (typeof record.uz === "string") return record.uz;
  }
  return "Untitled";
};

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { userType: true },
    });

    if (user?.userType !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const reports = await prisma.scholarshipReport.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        scholarship: {
          select: {
            id: true,
            slug: true,
            title: true,
            providerName: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    const normalized = reports.map((report) => ({
      id: report.id,
      createdAt: report.createdAt,
      reason: report.reason,
      user: report.user,
      scholarship: {
        id: report.scholarship.id,
        slug: report.scholarship.slug,
        providerName: report.scholarship.providerName,
        title: getTitle(report.scholarship.title),
      },
    }));

    return NextResponse.json({ reports: normalized });
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
