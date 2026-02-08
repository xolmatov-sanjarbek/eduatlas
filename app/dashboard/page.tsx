"use client";

import { useSession } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  BookOpen,
  Calendar,
  TrendingUp,
  ExternalLink,
  Sparkles,
  Clock,
  DollarSign,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";

interface SavedScholarship {
  id: string;
  scholarship: {
    id: string;
    slug: string;
    title: string;
    amount: number;
    currency: string;
    providerName: string;
    targetCountry: string;
    deadline: string | null;
    degreeLevel: string;
  };
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [savedScholarships, setSavedScholarships] = useState<
    SavedScholarship[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isPending) return;
    if (!session?.user) {
      router.push("/auth/signin");
    } else if ((session.user as SessionUser).userType === "UNIVERSITY") {
      router.push("/university-dashboard");
    }
  }, [session, isPending, router, mounted]);

  useEffect(() => {
    if (!mounted || !session?.user) return;
    fetchSavedScholarships();
  }, [session?.user, mounted]);

  const fetchSavedScholarships = async () => {
    try {
      const res = await fetch("/api/dashboard/saved-scholarships");
      const data = await res.json();
      setSavedScholarships(data.scholarships || []);
    } catch (error) {
      console.error("Failed to fetch saved scholarships:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveBookmark = async (
    savedId: string,
    scholarshipId: string,
  ) => {
    try {
      await fetch(`/api/scholarships/${scholarshipId}/bookmark`, {
        method: "DELETE",
      });
      setSavedScholarships((prev) => prev.filter((s) => s.id !== savedId));
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
    }
  };

  // Calculate stats
  const totalBookmarks = savedScholarships.length;
  const upcomingDeadlines = savedScholarships.filter((item) => {
    if (!item.scholarship.deadline) return false;
    const deadline = new Date(item.scholarship.deadline);
    const daysUntil = Math.ceil(
      (deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );
    return daysUntil > 0 && daysUntil <= 30;
  }).length;

  const totalValue = savedScholarships.reduce(
    (sum, item) => sum + item.scholarship.amount,
    0,
  );

  if (!mounted || isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!session?.user || (session.user as SessionUser).userType === "UNIVERSITY") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-17">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
              Student Dashboard
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome back, {session.user.name?.split(" ")[0] || "Student"}!
          </h1>
          <p className="text-xl text-gray-600">
            Track your scholarship journey and discover new opportunities
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {totalBookmarks}
            </h3>
            <p className="text-gray-600 text-sm">Bookmarked Scholarships</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-orange-50 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              {upcomingDeadlines > 0 && (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              {upcomingDeadlines}
            </h3>
            <p className="text-gray-600 text-sm">Upcoming Deadlines</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-emerald-50 rounded-xl">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">
              ${totalValue.toLocaleString()}
            </h3>
            <p className="text-gray-600 text-sm">Total Scholarship Value</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          <Link href="/scholarships">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Discover Scholarships</h3>
              <p className="text-emerald-100">
                Browse thousands of scholarship opportunities worldwide
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Saved Scholarships Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Bookmarked Scholarships
              </h2>
              <p className="text-gray-600">
                {totalBookmarks} scholarship{totalBookmarks !== 1 ? "s" : ""} saved
              </p>
            </div>
          </div>

          {savedScholarships.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-16 text-center"
            >
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No saved scholarships yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start bookmarking scholarships to keep track of opportunities
                that interest you and build your personalized collection.
              </p>
              <Link href="/scholarships">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore Scholarships
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {savedScholarships.map((item, index) => {
                const deadline = item.scholarship.deadline
                  ? new Date(item.scholarship.deadline)
                  : null;
                const daysUntil = deadline
                  ? Math.ceil(
                    (deadline.getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                  )
                  : null;
                const isDeadlineSoon =
                  daysUntil !== null && daysUntil > 0 && daysUntil <= 30;
                const isExpired = daysUntil !== null && daysUntil <= 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl border border-gray-200 hover:border-emerald-300 p-6 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            {item.scholarship.degreeLevel}
                          </span>
                          {isDeadlineSoon && (
                            <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {daysUntil} days left
                            </span>
                          )}
                          {isExpired && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">
                              Expired
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/scholarships/${item.scholarship.slug}`}
                          className="text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors block mb-2 group-hover:text-emerald-600"
                        >
                          {item.scholarship.title}
                        </Link>
                        <p className="text-gray-600 mb-4">
                          {item.scholarship.providerName} •{" "}
                          {item.scholarship.targetCountry}
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-emerald-50 rounded-lg">
                              <DollarSign className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Amount</p>
                              <p className="text-lg font-bold text-emerald-600">
                                {item.scholarship.currency}{" "}
                                {item.scholarship.amount.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {deadline && (
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-orange-50 rounded-lg">
                                <Calendar className="w-4 h-4 text-orange-600" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Deadline</p>
                                <p className="text-sm font-semibold text-gray-900">
                                  {deadline.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex lg:flex-col gap-3">
                        <Link
                          href={`/scholarships/${item.scholarship.slug}`}
                          className="flex-1 lg:flex-none"
                        >
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-6 rounded-xl shadow-md hover:shadow-lg transition-all">
                            View Details
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() =>
                            handleRemoveBookmark(item.id, item.scholarship.id)
                          }
                          variant="ghost"
                          className="flex-1 lg:flex-none hover:bg-red-50 text-red-600 hover:text-red-700 px-6 py-6 rounded-xl transition-all"
                        >
                          <Trash2 className="w-4 h-4 mr-2 fill-current" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
