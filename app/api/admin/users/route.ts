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
        const adminUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { userType: true },
        });

        if (adminUser?.userType !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                userType: true,
                createdAt: true,
                image: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
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

        // Check if requester is admin
        const adminUser = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { userType: true },
        });

        if (adminUser?.userType !== "ADMIN") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const { userId, userType } = await req.json();

        if (!userId || !userType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Prevent admin from de-ranking themselves (optional security measure)
        if (userId === session.user.id && userType !== "ADMIN") {
            return NextResponse.json({ error: "You cannot remove your own admin status." }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { userType },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Failed to update user role:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
