import { prisma } from "@/lib/prisma";
import ScholarshipGrid from "./scholarship-grid";
import { normalizeScholarship } from "@/lib/normalize-scholarship";

const List = async () => {
  let scholarships: Awaited<
    ReturnType<typeof prisma.scholarship.findMany>
  > = [];
  try {
    scholarships = await prisma.scholarship.findMany({
      where: { isFeatured: true, removedAt: null },
      orderBy: { updatedAt: "desc" },
      take: 4,
    });
  } catch (err) {
    console.warn("List: could not load featured scholarships", err);
  }

  const normalized = scholarships.map(normalizeScholarship);
  return <ScholarshipGrid scholarships={normalized} />;
};

export default List;
