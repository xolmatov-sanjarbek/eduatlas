import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const scholarship = await prisma.scholarship.findUnique({
            where: { id },
            include: {
                university: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        if (!scholarship) {
            return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
        }

        // Check ownership
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { universityId: true }
        });

        if (scholarship.universityId !== user?.universityId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(scholarship);
    } catch (error) {
        console.error("Error fetching scholarship:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // fetch existing scholarship to check ownership and isEdited status
        const existingScholarship = await prisma.scholarship.findUnique({
            where: { id },
            include: {
                university: {
                    select: {
                        id: true,
                    }
                }
            }
        });

        if (!existingScholarship) {
            return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
        }

        // Check ownership
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { universityId: true }
        });

        if (existingScholarship.universityId !== user?.universityId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Check if already edited
        if (existingScholarship.isEdited) {
            return NextResponse.json({ error: "This scholarship has already been edited once." }, { status: 403 });
        }

        // Update fields
        const updatedScholarship = await prisma.scholarship.update({
            where: { id },
            data: {
                title: body.title,
                description: body.description,
                amount: body.amount,
                currency: body.currency,
                deadline: body.deadline ? new Date(body.deadline) : null,
                targetCountry: body.targetCountry,
                degreeLevel: body.degreeLevel,
                fieldOfStudy: body.fieldOfStudy,
                eligibleRegions: body.eligibleRegions,
                officialWebsite: body.officialWebsite,
                isEdited: true, // Mark as edited
            },
        });

        return NextResponse.json(updatedScholarship);

    } catch (error) {
        console.error("Error updating scholarship:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
