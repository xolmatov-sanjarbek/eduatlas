import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id: scholarshipId } = await params;
    const body = await req.json().catch(() => ({}));
    const reason =
      typeof body?.reason === "string" && body.reason.trim()
        ? body.reason.trim().slice(0, 500)
        : null;

    const scholarship = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
      select: { id: true, removedAt: true },
    });

    if (!scholarship) {
      return NextResponse.json(
        { error: "Scholarship not found" },
        { status: 404 },
      );
    }

    if (scholarship.removedAt) {
      return NextResponse.json({ success: true });
    }

    await prisma.scholarship.update({
      where: { id: scholarshipId },
      data: {
        removedAt: new Date(),
        removedReason: reason,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin remove scholarship error:", error);
    return NextResponse.json(
      { error: "Failed to remove scholarship" },
      { status: 500 },
    );
  }
}
