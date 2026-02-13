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

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isAdmin = user.userType === "ADMIN";
        const isUniversity = user.userType === "UNIVERSITY";

        if (!isAdmin && (!isUniversity || !user.universityId)) {
            return NextResponse.json({ error: "Forbidden: Only universities or admins can post scholarships" }, { status: 403 });
        }

        if (isUniversity) {
            const university = await prisma.university.findUnique({
                where: { id: user.universityId! },
                select: { isVerified: true }
            });

            if (!university?.isVerified) {
                return NextResponse.json({
                    error: "Your university account is not yet verified by an administrator. You cannot post scholarships until your account is verified."
                }, { status: 403 });
            }
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

        const fieldOfStudy =
            Array.isArray(body.fieldOfStudy)
                ? body.fieldOfStudy.join(", ")
                : body.fieldOfStudy;
        const eligibleRegions =
            Array.isArray(body.eligibleRegions)
                ? body.eligibleRegions.join(", ")
                : body.eligibleRegions || "";

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
                fieldOfStudy,
                eligibleRegions,
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
