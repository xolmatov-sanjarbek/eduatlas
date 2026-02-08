import { prisma } from "@/lib/prisma";
import AboutClient from "./about-client";

export default async function About() {
  let totalScholarships = 0;
  let sumAmount: number | null = 0;
  let sumViews: number | null = 0;

  try {
    totalScholarships = await prisma.scholarship.count();
    const totalAmount = await prisma.scholarship.aggregate({
      _sum: { amount: true },
    });
    const totalViews = await prisma.scholarship.aggregate({
      _sum: { views: true },
    });
    sumAmount = totalAmount._sum.amount;
    sumViews = totalViews._sum.views;
  } catch (err) {
    // Database unavailable (e.g. DATABASE_URL not set or invalid credentials)
    console.warn("About: could not load stats from database", err);
  }

  const stats = [
    {
      iconName: "Award" as const,
      value: `$${(sumAmount ?? 0).toLocaleString()}`,
      label: "In Scholarships Listed",
    },
    {
      iconName: "Users" as const,
      value: `${(sumViews ?? 0).toLocaleString()}+`,
      label: "Students Reached",
    },
    {
      iconName: "GraduationCap" as const,
      value: totalScholarships.toString(),
      label: "Number of Scholarships",
    },
  ];

  const values = [
    {
      iconName: "Target",
      title: "Perfect Match, Every Time",
      description:
        "Our smart algorithms help you discover scholarships that align with your goals, and dreams.",
    },
    {
      iconName: "Clock",
      title: "Never Miss a Deadline",
      description:
        "Stay on top of application deadlines with timely reminders and a centralized dashboard.",
    },
    {
      iconName: "Globe2",
      title: "Global Opportunities",
      description:
        "Access scholarships from universities across the world, all in one convenient platform.",
    },
  ];

  return <AboutClient stats={stats} values={values} />;
}
