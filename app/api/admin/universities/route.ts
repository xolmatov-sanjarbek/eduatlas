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

        const adminUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { userType: true },
        });

        if (adminUser?.userType !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const universities = await prisma.university.findMany({
            include: {
                _count: {
                    select: { scholarships: true }
                },
                users: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(universities);
    } catch (error) {
        console.error("Failed to fetch universities:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const adminUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { userType: true },
        });

        if (adminUser?.userType !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { universityId, isVerified } = await req.json();

        if (!universityId) {
            return NextResponse.json({ error: "Missing universityId" }, { status: 400 });
        }

        const updatedUniversity = await prisma.university.update({
            where: { id: universityId },
            data: { isVerified },
        });

        return NextResponse.json(updatedUniversity);
    } catch (error) {
        console.error("Failed to update university verification:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
