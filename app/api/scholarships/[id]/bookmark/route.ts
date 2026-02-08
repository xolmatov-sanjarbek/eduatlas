import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: scholarshipId } = await params;

    // Check if scholarship exists
    const scholarship = await prisma.scholarship.findUnique({
      where: { id: scholarshipId },
    });

    if (!scholarship) {
      return Response.json(
        { error: "Scholarship not found" },
        { status: 404 }
      );
    }

    // Check if already saved
    const existing = await prisma.savedScholarship.findUnique({
      where: {
        userId_scholarshipId: {
          userId: session.user.id,
          scholarshipId,
        },
      },
    });

    if (existing) {
      return Response.json(
        { error: "Already bookmarked" },
        { status: 400 }
      );
    }

    // Create bookmark
    const saved = await prisma.savedScholarship.create({
      data: {
        userId: session.user.id,
        scholarshipId,
      },
    });

    return Response.json({ success: true, data: saved });
  } catch (error) {
    console.error("Bookmark error:", error);
    return Response.json(
      { error: "Failed to bookmark scholarship" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: scholarshipId } = await params;

    // Delete bookmark
    await prisma.savedScholarship.delete({
      where: {
        userId_scholarshipId: {
          userId: session.user.id,
          scholarshipId,
        },
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Unbookmark error:", error);
    return Response.json(
      { error: "Failed to remove bookmark" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return Response.json({ bookmarked: false });
    }

    const { id: scholarshipId } = await params;

    const saved = await prisma.savedScholarship.findUnique({
      where: {
        userId_scholarshipId: {
          userId: session.user.id,
          scholarshipId,
        },
      },
    });

    return Response.json({ bookmarked: !!saved });
  } catch (error) {
    console.error("Check bookmark error:", error);
    return Response.json({ bookmarked: false });
  }
}
