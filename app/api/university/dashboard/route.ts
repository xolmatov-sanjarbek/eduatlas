import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user || user.userType !== "UNIVERSITY") {
      return Response.json({ error: "Not a university account" }, { status: 403 });
    }

    // If university record doesn't exist yet, create it from saved website
    const userData = user as any;
    if (!user.universityId && userData.universityWebsite) {
      const university = await prisma.university.create({
        data: {
          name: user.name,
          email: user.email,
          website: userData.universityWebsite,
        },
      });

      // Link it back to the user
      await prisma.user.update({
        where: { id: user.id },
        data: { universityId: university.id },
      });

      // Update local object for subsequent logic
      (user as any).universityId = university.id;
    }

    if (!user.universityId) {
      return Response.json({ error: "University setup incomplete" }, { status: 400 });
    }

    const university = await prisma.university.findUnique({
      where: { id: user.universityId },
    });

    if (!university) {
      return Response.json({ error: "University not found" }, { status: 404 });
    }

    const scholarships = await prisma.scholarship.findMany({
      where: { universityId: university.id, removedAt: null },
      orderBy: { createdAt: "desc" },
    });

    const removedScholarships = await prisma.scholarship.findMany({
      where: { universityId: university.id, removedAt: { not: null } },
      orderBy: { removedAt: "desc" },
      select: {
        id: true,
        title: true,
        removedAt: true,
        removedReason: true,
      },
    });

    // Calculate stats
    const stats = {
      totalScholarships: scholarships.length,
      totalViews: scholarships.reduce((sum, s) => sum + s.views, 0),
      totalSaved: 0,
      totalAmount: scholarships.reduce((sum, s) => sum + s.amount, 0),
    };

    // Get count of saved scholarships
    const savedCount = await prisma.savedScholarship.count({
      where: {
        scholarshipId: {
          in: scholarships.map((s) => s.id),
        },
      },
    });
    stats.totalSaved = savedCount;

    // Enrich scholarship data with save counts
    const enrichedScholarships = await Promise.all(
      scholarships.map(async (scholarship) => {
        const savedByCount = await prisma.savedScholarship.count({
          where: { scholarshipId: scholarship.id },
        });
        return {
          ...scholarship,
          savedCount: savedByCount,
        };
      })
    );

    return Response.json({
      university: {
        id: university.id,
        name: university.name,
        email: university.email,
        website: university.website,
        isVerified: university.isVerified,
        createdAt: university.createdAt.toISOString(),
      },
      scholarships: enrichedScholarships.map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        amount: s.amount,
        currency: s.currency,
        views: s.views,
        savedCount: s.savedCount,
        deadline: s.deadline?.toISOString(),
        createdAt: s.createdAt.toISOString(),
      })),
      removedScholarships: removedScholarships.map((s) => ({
        id: s.id,
        title: s.title,
        removedAt: s.removedAt?.toISOString() || null,
        removedReason: s.removedReason,
      })),
      stats,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return Response.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
