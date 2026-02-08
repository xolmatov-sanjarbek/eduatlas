"use client";

import { useSession } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Building2,
  BookOpen,
  Eye,
  Users,
  TrendingUp,
  Plus,
  Edit2,
  Globe,
  Mail,
  Calendar,
  MoreVertical,
  Search,
} from "lucide-react";
import { motion } from "motion/react";

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
    degreeLevel: string;
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
    } else if ((session.user as SessionUser).userType !== "UNIVERSITY") {
      router.push("/dashboard");
    }
  }, [session, isPending, router, mounted]);

  useEffect(() => {
    const userType = (session?.user as SessionUser | undefined)?.userType;
    if (!mounted || !session?.user || userType !== "UNIVERSITY") return;
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

  if (!mounted || isPending || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!session?.user || (session.user as SessionUser).userType !== "UNIVERSITY") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">University Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {dashboardData?.university.name}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/university-dashboard/settings">
              <Button variant="outline" className="bg-white hover:bg-gray-50">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
            <Link href="/university-dashboard/add">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Create Scholarship
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Scholarships</p>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardData?.stats.totalScholarships}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Views</p>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardData?.stats.totalViews.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Students Interested</p>
                <h3 className="text-2xl font-bold text-gray-900">{dashboardData?.stats.totalSaved}</h3>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Value</p>
                <h3 className="text-2xl font-bold text-gray-900">${dashboardData?.stats.totalAmount.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-emerald-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Scholarships List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Your Scholarships</h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-64"
                  />
                </div>
              </div>
            </div>

            {!dashboardData?.scholarships || dashboardData.scholarships.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No scholarships yet</h3>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">Create your first scholarship opportunity to start attracting talented students from around the world.</p>
                <Link href="/university-dashboard/add">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Scholarship
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {dashboardData.scholarships.map((scholarship, index) => (
                  <motion.div
                    key={scholarship.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">{scholarship.degreeLevel}</span>
                          {scholarship.deadline && new Date(scholarship.deadline) > new Date() ? (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">Active</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">Expired</span>
                          )}
                        </div>
                        <Link href={`/scholarships/${scholarship.slug}`} className="block">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{scholarship.title}</h3>
                        </Link>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/university-dashboard/edit/${scholarship.id}`}>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-emerald-600">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-gray-900">{scholarship.currency} {scholarship.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>{scholarship.views} views</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {scholarship.deadline ? new Date(scholarship.deadline).toLocaleDateString() : "No Deadline"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Details */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">University Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{dashboardData?.university.name}</p>
                    <p className="text-xs text-gray-500">Institution Name</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-900 truncate" title={dashboardData?.university.email}>{dashboardData?.university.email}</p>
                    <p className="text-xs text-gray-500">Email Address</p>
                  </div>
                </div>
                {dashboardData?.university.website && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="overflow-hidden">
                      <a href={dashboardData.university.website} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-emerald-600 hover:underline truncate block">
                        {dashboardData.university.website.replace(/^https?:\/\//, '')}
                      </a>
                      <p className="text-xs text-gray-500">Website</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-emerald-900 rounded-2xl p-6 shadow-sm text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg mb-2">Need Help?</h3>
                <p className="text-emerald-100 text-sm mb-4">Check our guide on how to create effective scholarship listings to attract more students.</p>
                <Button variant="secondary" className="bg-white text-emerald-900 hover:bg-emerald-50 w-full border-none">
                  View Guide
                </Button>
              </div>
              {/* Abstract shapes for decoration */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-emerald-800 opacity-50 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 rounded-full bg-emerald-500 opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
