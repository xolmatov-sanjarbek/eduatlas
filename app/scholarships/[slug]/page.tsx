import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ScholarshipDetailClient from "./scholarship-detail-client";

export default async function ScholarshipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const scholarship = await prisma.scholarship.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!scholarship) {
    redirect("/scholarships");
  }

  return <ScholarshipDetailClient scholarship={scholarship} />;
}
