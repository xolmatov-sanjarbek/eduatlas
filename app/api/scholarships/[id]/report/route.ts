import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: scholarshipId } = await params;

    const scholarship = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
      select: { id: true },
    });

    if (!scholarship) {
      return NextResponse.json(
        { error: "Scholarship not found" },
        { status: 404 },
      );
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const body = await req.json().catch(() => ({}));
    const reason =
      typeof body?.reason === "string" && body.reason.trim()
        ? body.reason.trim().slice(0, 500)
        : null;

    const report = await prisma.scholarshipReport.create({
      data: {
        scholarshipId,
        userId: session?.user?.id ?? null,
        reason,
      },
    });

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("Report scholarship error:", error);
    return NextResponse.json(
      { error: "Failed to report scholarship" },
      { status: 500 },
    );
  }
}
