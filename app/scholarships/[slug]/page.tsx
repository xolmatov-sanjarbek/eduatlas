import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ScholarshipDetailClient from "./scholarship-detail-client";

export default async function ScholarshipDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  let scholarship: Awaited<
    ReturnType<typeof prisma.scholarship.findUnique>
  > = null;
  try {
    scholarship = await prisma.scholarship.findUnique({
      where: { slug: resolvedParams.slug },
    });
  } catch (err) {
    console.warn("Scholarship detail: could not load from database", err);
  }

  if (!scholarship) {
    redirect("/scholarships");
  }

  return <ScholarshipDetailClient scholarship={scholarship} />;
}
