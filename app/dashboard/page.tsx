"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  BookOpen,
  ArrowLeft,
  X,
  ExternalLink,
} from "lucide-react";

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
    } else if ((session.user as { userType?: string }).userType === "UNIVERSITY") {
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

  if (!mounted || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-emerald-50 to-white pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!session?.user || (session.user as any).userType === "UNIVERSITY") {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            Welcome, {session.user.name || session.user.email}!
          </h1>
          <p className="text-gray-600">
            Manage your scholarship applications and saved scholarships.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-12">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg mb-4">
            <User className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Profile</h2>
          <p className="text-gray-600 text-sm">
            {session.user.name || session.user.email}
          </p>
          <p className="text-gray-500 text-sm">{session.user.email}</p>
        </div>

        {/* Saved Scholarships Section */}
        <div id="saved-section">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Your Bookmarked Scholarships
          </h2>

          {savedScholarships.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
              <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No saved scholarships yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start bookmarking scholarships to keep track of opportunities
                that interest you.
              </p>
              <Link href="/scholarships">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Browse Scholarships
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {savedScholarships.map((item) => {
                const deadline = item.scholarship.deadline
                  ? new Date(item.scholarship.deadline)
                  : null;
                const isDeadlineSoon =
                  deadline &&
                  deadline.getTime() - new Date().getTime() <
                    30 * 24 * 60 * 60 * 1000 &&
                  deadline > new Date();

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl border border-gray-200 hover:border-emerald-300 p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <Link
                          href={`/scholarships/${item.scholarship.slug}`}
                          className="text-lg font-bold text-gray-900 hover:text-emerald-600 transition-colors block mb-2"
                        >
                          {item.scholarship.title}
                        </Link>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.scholarship.providerName} •{" "}
                          {item.scholarship.targetCountry}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <div className="text-sm font-semibold text-emerald-600">
                            {item.scholarship.currency}{" "}
                            {item.scholarship.amount.toLocaleString()}
                          </div>
                          {deadline && (
                            <div
                              className={`text-sm font-medium ${
                                isDeadlineSoon
                                  ? "text-red-600 bg-red-50 px-2 py-1 rounded"
                                  : "text-gray-600"
                              }`}
                            >
                              Deadline:{" "}
                              {deadline.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/scholarships/${item.scholarship.slug}`}>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            View Details
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <button
                          onClick={() =>
                            handleRemoveBookmark(item.id, item.scholarship.id)
                          }
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Remove bookmark"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Explore More */}
        <div className="bg-linear-to-r from-emerald-500 to-emerald-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-3">
            Ready to find more scholarships?
          </h2>
          <p className="text-emerald-100 mb-6">
            Browse through our comprehensive database of scholarships from
            around the world.
          </p>
          <Link href="/scholarships">
            <Button className="bg-white text-emerald-600 hover:bg-emerald-50 font-semibold">
              Explore Scholarships
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
