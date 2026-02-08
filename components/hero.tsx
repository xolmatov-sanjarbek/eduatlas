import { prisma } from "@/lib/prisma";
import EduAtlasHeroClient from "./hero-client";

export default async function EduAtlasHero() {
  const [scholarshipCount, totalValueResult, studentCount] = await Promise.all([
    prisma.scholarship.count(),
    prisma.scholarship.aggregate({
      _sum: {
        amount: true,
      },
    }),
    prisma.user.count({
      where: {
        userType: "STUDENT",
      },
    }),
  ]);

  const totalValue = totalValueResult._sum.amount || 0;

  return (
    <EduAtlasHeroClient
      scholarshipCount={scholarshipCount}
      totalValue={totalValue}
      studentCount={studentCount}
    />
  );
}
