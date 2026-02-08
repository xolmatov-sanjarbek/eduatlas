"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ArrowLeft,
  BookOpen,
  Eye,
  Users,
  TrendingUp,
  Plus,
  Edit2,
  Globe,
  Mail,
} from "lucide-react";

interface UniversityDashboardData {
  university: {
    id: string;
    name: string;
    email: string;
    website?: string;
    createdAt: string;
  };
  scholarships: {
    id: string;
    slug: string;
    title: string;
    amount: number;
    currency: string;
    views: number;
    savedCount: number;
    deadline?: string;
    createdAt: string;
  }[];
  stats: {
    totalScholarships: number;
    totalViews: number;
    totalSaved: number;
    totalAmount: number;
  };
}

export default function UniversityDashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [dashboardData, setDashboardData] =
    useState<UniversityDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isPending) return;
    if (!session?.user) {
      router.push("/auth/signin");
    } else if (session.user.userType !== "UNIVERSITY") {
      router.push("/dashboard");
    }
  }, [session, isPending, router, mounted]);

  useEffect(() => {
    if (
      !mounted ||
      !session?.user ||
      session.user.userType !== "UNIVERSITY"
    )
      return;
    fetchDashboardData();
  }, [session?.user, mounted]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/university/dashboard");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setDashboardData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-white pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!session?.user || (session.user as any).userType !== "UNIVERSITY") {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {dashboardData?.university.name || "University Dashboard"}
          </h1>
          <p className="text-gray-600">
            Manage your scholarships and view performance metrics.
          </p>
        </div>

        {/* University Info Card */}
        {dashboardData?.university && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-lg">
                  <Building2 className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {dashboardData.university.name}
                  </h2>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{dashboardData.university.email}</span>
                    </div>
                    {dashboardData.university.website && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4" />
                        <a
                          href={dashboardData.university.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-600 hover:text-emerald-700"
                        >
                          {dashboardData.university.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        {dashboardData?.stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Scholarships
                </h3>
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.stats.totalScholarships}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Views
                </h3>
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.stats.totalViews.toLocaleString()}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Saved
                </h3>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.stats.totalSaved}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600">
                  Total Amount
                </h3>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900">
                ${dashboardData.stats.totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Scholarships Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Your Scholarships
            </h2>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add New Scholarship
            </Button>
          </div>

          {!dashboardData?.scholarships ||
          dashboardData.scholarships.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No scholarships posted yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by creating your first scholarship to attract students.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white mx-auto">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Scholarship
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboardData.scholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="bg-white rounded-xl border border-gray-200 hover:border-emerald-300 p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <Link
                        href={`/scholarships/${scholarship.slug}`}
                        className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors block mb-2"
                      >
                        {scholarship.title}
                      </Link>

                      <div className="flex flex-wrap gap-4 mt-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <span className="font-semibold text-emerald-600">
                            {scholarship.currency}{" "}
                            {scholarship.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">
                            {scholarship.views} views
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">
                            {scholarship.savedCount} saved
                          </span>
                        </div>
                        {scholarship.deadline && (
                          <div className="text-sm text-gray-600">
                            Deadline:{" "}
                            {new Date(scholarship.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/scholarships/${scholarship.slug}`}>
                        <Button
                          variant="outline"
                          className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                        >
                          View
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
