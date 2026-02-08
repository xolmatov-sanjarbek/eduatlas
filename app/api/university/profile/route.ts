import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user data to ensure we have the universityId
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                userType: true,
                universityId: true,
            }
        });

        if (!user || user.userType !== "UNIVERSITY" || !user.universityId) {
            return NextResponse.json({ error: "Forbidden: Only universities can access this" }, { status: 403 });
        }

        const university = await prisma.university.findUnique({
            where: { id: user.universityId },
            select: {
                id: true,
                name: true,
                email: true,
                website: true,
                image: true,
            }
        });

        if (!university) {
            return NextResponse.json({ error: "University not found" }, { status: 404 });
        }

        return NextResponse.json({ university }, { status: 200 });
    } catch (error) {
        console.error("Error fetching university profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get user data to ensure we have the universityId
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                userType: true,
                universityId: true,
            }
        });

        if (!user || user.userType !== "UNIVERSITY" || !user.universityId) {
            return NextResponse.json({ error: "Forbidden: Only universities can update this" }, { status: 403 });
        }

        const body = await req.json();

        // Basic validation
        if (!body.name || !body.email) {
            return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
        }

        const updatedUniversity = await prisma.university.update({
            where: { id: user.universityId },
            data: {
                name: body.name,
                email: body.email,
                website: body.website || null,
                image: body.image || null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                website: true,
                image: true,
            }
        });

        return NextResponse.json({ university: updatedUniversity }, { status: 200 });
    } catch (error) {
        console.error("Error updating university profile:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
