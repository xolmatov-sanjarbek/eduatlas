import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if admin
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { userType: true },
        });

        if (user?.userType !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const [
            totalStudents,
            totalUniversities,
            unverifiedUniversities,
            totalScholarships,
            newUsersLastWeek,
            scholarshipStats,
        ] = await Promise.all([
            prisma.user.count({ where: { userType: "STUDENT" } }),
            prisma.university.count(),
            prisma.university.count({ where: { isVerified: false } }),
            prisma.scholarship.count(),
            prisma.user.count({
                where: {
                    createdAt: { gte: lastWeek },
                },
            }),
            prisma.scholarship.aggregate({
                _sum: {
                    views: true,
                },
            }),
        ]);

        return NextResponse.json({
            students: totalStudents,
            universities: totalUniversities,
            unverifiedUniversities,
            scholarships: totalScholarships,
            newSignups: newUsersLastWeek,
            totalViews: scholarshipStats._sum.views || 0,
        });
    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
