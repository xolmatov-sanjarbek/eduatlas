import { prisma } from "@/lib/prisma";
import ScholarshipsClient from "./scholarships-client";
import { normalizeScholarship } from "@/lib/normalize-scholarship";

export default async function ScholarshipsPage() {
  let scholarships: Awaited<
    ReturnType<typeof prisma.scholarship.findMany>
  > = [];
  try {
    scholarships = await prisma.scholarship.findMany({
      where: { removedAt: null },
      orderBy: { updatedAt: "desc" },
    });
  } catch (err) {
    console.warn("Scholarships page: could not load from database", err);
  }
  const normalized = scholarships.map(normalizeScholarship);
  return <ScholarshipsClient scholarships={normalized} />;
}
