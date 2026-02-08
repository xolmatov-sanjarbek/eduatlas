import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Increment the view count atomically
        const scholarship = await prisma.scholarship.update({
            where: { id },
            data: {
                views: {
                    increment: 1,
                },
            },
            select: {
                views: true,
            },
        });

        return NextResponse.json({ views: scholarship.views }, { status: 200 });
    } catch (error) {
        console.error("Error incrementing scholarship views:", error);
        return NextResponse.json(
            { error: "Failed to increment views" },
            { status: 500 }
        );
    }
}
