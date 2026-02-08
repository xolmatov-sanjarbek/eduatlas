import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, universityWebsite } = await req.json();

    if (!email || !universityWebsite) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Only allow updating the current user's record
    if (session.user.email !== email) {
      return Response.json(
        { error: "You can only set up university for your own account" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Check if university already exists with this email
    const existingUniversity = await prisma.university.findUnique({
      where: { email },
    });

    let universityId: string;

    if (existingUniversity) {
      universityId = existingUniversity.id;
    } else {
      // Create new university
      const university = await prisma.university.create({
        data: {
          name: user.name,
          email: user.email,
          website: universityWebsite,
          image: null,
        },
      });
      universityId = university.id;
    }

    // Update user with userType and universityId
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        userType: "UNIVERSITY",
        universityId,
      },
    });

    return Response.json({ success: true, universityId });
  } catch (error) {
    console.error("Setup university error:", error);
    return Response.json(
      { error: "Failed to setup university: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
