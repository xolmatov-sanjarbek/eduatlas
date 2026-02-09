"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Building2,
  GraduationCap,
  Globe,
  TrendingUp,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface EduAtlasHeroClientProps {
  scholarshipCount: number;
  totalValue: number;
  studentCount: number;
}

export default function EduAtlasHeroClient({
  scholarshipCount,
  totalValue,
  studentCount,
}: EduAtlasHeroClientProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const floatingIcons = [
    { Icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-100", delay: 0, position: "top-20 left-[10%]" },
    { Icon: Globe, color: "text-emerald-500", bg: "bg-emerald-100", delay: 2, position: "bottom-32 right-[10%]" },
    { Icon: TrendingUp, color: "text-purple-500", bg: "bg-purple-100", delay: 1, position: "top-32 right-[15%]" },
    { Icon: BookOpen, color: "text-orange-500", bg: "bg-orange-100", delay: 3, position: "bottom-24 left-[15%]" },
  ];

  return (
    <div className="relative min-h-[90vh] bg-white overflow-hidden flex items-center justify-center pt-20">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-emerald-50/50 to-teal-50/50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-blue-50/50 to-indigo-50/50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -10, 0],
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.5 + index * 0.2 },
              y: {
                repeat: Infinity,
                duration: 3 + index,
                ease: "easeInOut",
                delay: item.delay
              }
            }}
            className={`absolute ${item.position} p-4 rounded-2xl ${item.bg} backdrop-blur-sm shadow-sm hidden lg:block`}
          >
            <item.Icon className={`w-8 h-8 ${item.color}`} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 bg-white/80 backdrop-blur-md border border-emerald-100 rounded-full px-4 py-1.5 shadow-sm"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full p-1">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Empowering Students Worldwide
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.1]"
          >
            Find Financial Aid for Your{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600">
              Education
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            EduAtlas connects you with thousands of scholarships from top universities.
            Filter by country, degree, and amount to match your goals.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all duration-300 hover:scale-[1.02]"
            >
              <Link href="/scholarships">
                <Search className="w-5 h-5 mr-2" />
                Find Scholarships
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg rounded-full border-2 border-gray-200 hover:border-emerald-200 hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 transition-all duration-300"
            >
              <Link href="/university-dashboard">
                <Building2 className="w-5 h-5 mr-2" />
                For Universities
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {[
              { label: "Active Scholarships", value: `${scholarshipCount.toLocaleString()}+`, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Total Value", value: `$${(totalValue / 1000000).toFixed(1)}M+`, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Students Helped", value: `${studentCount.toLocaleString()}+`, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-emerald-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-500 group-hover:text-emerald-600 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
