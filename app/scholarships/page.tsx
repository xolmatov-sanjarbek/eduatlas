import { prisma } from "@/lib/prisma";
import ScholarshipsClient from "./scholarships-client";

export default async function ScholarshipsPage() {
  let scholarships: Awaited<
    ReturnType<typeof prisma.scholarship.findMany>
  > = [];
  try {
    scholarships = await prisma.scholarship.findMany({
      orderBy: { updatedAt: "desc" },
    });
  } catch (err) {
    console.warn("Scholarships page: could not load from database", err);
  }
  return <ScholarshipsClient scholarships={scholarships} />;
}
