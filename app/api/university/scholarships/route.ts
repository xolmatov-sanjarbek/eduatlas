import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get fresh user data to ensure we have the universityId
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                userType: true,
                universityId: true,
                university: {
                    select: { name: true }
                }
            }
        });

        if (!user || user.userType !== "UNIVERSITY" || !user.universityId) {
            return NextResponse.json({ error: "Forbidden: Only universities can post scholarships" }, { status: 403 });
        }

        const body = await req.json();

        // Basic validation
        if (!body.title || !body.description || !body.amount || !body.targetCountry || !body.degreeLevel || !body.fieldOfStudy) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Generate unique slug
        let slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
        const randomSuffix = Math.random().toString(36).substring(2, 7);
        slug = `${slug}-${randomSuffix}`;

        const scholarship = await prisma.scholarship.create({
            data: {
                slug,
                title: body.title,
                description: body.description,
                providerName: user.university?.name || session.user.name || "University",
                amount: body.amount,
                currency: body.currency || "USD",
                deadline: body.deadline ? new Date(body.deadline) : null,
                targetCountry: body.targetCountry,
                degreeLevel: body.degreeLevel,
                fieldOfStudy: body.fieldOfStudy,
                eligibleRegions: body.eligibleRegions || [],
                officialWebsite: body.officialWebsite || null,
                universityId: user.universityId,
                views: 0,
                isFeatured: false,
            },
        });

        return NextResponse.json({ scholarship }, { status: 201 });
    } catch (error) {
        console.error("Error creating scholarship:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
