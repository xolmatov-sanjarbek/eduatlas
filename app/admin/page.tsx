import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/admin/admin-dashboard-client";
import AccessDenied from "@/components/admin/access-denied";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard | EduAtlas",
    description: "Monitor platform performance and statistics.",
};

export default async function AdminPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || !session.user) {
        return <AccessDenied />;
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { userType: true },
    });

    if (user?.userType !== "ADMIN") {
        return <AccessDenied />;
    }

    return <AdminDashboardClient />;
}
