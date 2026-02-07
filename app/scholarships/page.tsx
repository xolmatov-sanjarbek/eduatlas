import { prisma } from "@/lib/prisma";
import ScholarshipsClient from "./scholarships-client";

export default async function ScholarshipsPage() {
  // Fetch real scholarships from database
  const scholarships = await prisma.scholarship.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return <ScholarshipsClient scholarships={scholarships} />;
}
