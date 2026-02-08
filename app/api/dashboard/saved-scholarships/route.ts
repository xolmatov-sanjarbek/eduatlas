import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(req: Request) {
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

    const savedScholarships = await prisma.savedScholarship.findMany({
      where: { userId: session.user.id },
      include: {
        scholarship: {
          select: {
            id: true,
            slug: true,
            title: true,
            amount: true,
            currency: true,
            providerName: true,
            targetCountry: true,
            deadline: true,
          },
        },
      },
      orderBy: { savedAt: "desc" },
    });

    return Response.json({
      scholarships: savedScholarships,
    });
  } catch (error) {
    console.error("Failed to fetch saved scholarships:", error);
    return Response.json(
      { error: "Failed to fetch saved scholarships" },
      { status: 500 }
    );
  }
}
