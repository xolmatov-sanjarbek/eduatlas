import { prisma } from "@/lib/prisma";
import AboutClient from "./about-client";

export default async function About() {
  // Fetch real data from Prisma
  const totalScholarships = await prisma.scholarship.count();
  const totalAmount = await prisma.scholarship.aggregate({
    _sum: {
      amount: true,
    },
  });
  const totalViews = await prisma.scholarship.aggregate({
    _sum: {
      views: true,
    },
  });

  const stats = [
    {
      iconName: "Award",
      value: `$${(totalAmount._sum.amount || 0).toLocaleString()}`,
      label: "In Scholarships Listed",
    },
    {
      iconName: "Users",
      value: `${(totalViews._sum.views || 0).toLocaleString()}+`,
      label: "Students Reached",
    },
    {
      iconName: "GraduationCap",
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
