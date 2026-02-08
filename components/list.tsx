import { prisma } from "@/lib/prisma";
import ScholarshipGrid from "./scholarship-grid";

const List = async () => {
  let scholarships: Awaited<
    ReturnType<typeof prisma.scholarship.findMany>
  > = [];
  try {
    scholarships = await prisma.scholarship.findMany({
      where: { isFeatured: true },
      orderBy: { updatedAt: "desc" },
      take: 4,
    });
  } catch (err) {
    console.warn("List: could not load featured scholarships", err);
  }

  return <ScholarshipGrid scholarships={scholarships} />;
};

export default List;
