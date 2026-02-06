"use client";

import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  Star,
  Clock,
  ExternalLink,
  Eye,
  Globe2,
  BookOpen,
  Share2,
  Bookmark,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScholarshipDetailPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample scholarship data
  const scholarship = {
    id: 1,
    title: "Global Excellence Scholarship",
    university: "University of Oxford",
    country: "United Kingdom",
    description: `The Global Excellence Scholarship is designed to support exceptional international students who demonstrate outstanding academic achievement, leadership potential, and a commitment to making a positive impact in their communities. This prestigious scholarship covers full tuition fees and provides a generous stipend for living expenses.

    Recipients will join a vibrant community of scholars from around the world and will have access to world-class facilities, mentorship programs, and networking opportunities with leading academics and industry professionals.
    
    The scholarship aims to nurture future leaders who will contribute to solving global challenges through innovative research and creative thinking. Successful candidates will be expected to maintain excellent academic standing and actively participate in university life.`,
    amount: 50000,
    currency: "GBP",
    fieldOfStudy: "All Fields",
    degreeLevel: "Master's",
    eligibleRegions: [
      "Africa",
      "Asia",
      "Latin America",
      "Middle East",
      "Eastern Europe",
    ],
    deadline: "2026-05-15",
    officialWebsite: "https://www.ox.ac.uk/scholarships",
    views: 12547,
    updatedAt: "2026-01-30",
    featured: true,
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) => {
    return `${currency} ${amount.toLocaleString()}`;
  };

  const getDaysUntilDeadline = () => {
    const deadline = new Date(scholarship.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline();

  const handleShare = () => {
    // Handle share functionality
    console.log("Share scholarship");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors mb-4 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to all scholarships</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Badge */}
        {scholarship.featured && (
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              <Star className="w-5 h-5 fill-white" />
              Featured Scholarship
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {scholarship.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    Updated {formatDate(scholarship.updatedAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">
                    {scholarship.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                {scholarship.university}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                {scholarship.country}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Scholarship
              </h2>
              <div className="prose prose-gray max-w-none">
                {scholarship.description
                  .split("\n\n")
                  .map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-4"
                    >
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>
            </div>

            {/* Eligible Regions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe2 className="w-6 h-6 text-emerald-600" />
                Eligible Regions
              </h2>
              <div className="flex flex-wrap gap-3">
                {scholarship.eligibleRegions.map((region) => (
                  <div
                    key={region}
                    className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 font-medium"
                  >
                    {region}
                  </div>
                ))}
              </div>
            </div>

            {/* Application Requirements */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                How to Apply
              </h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Visit the official website and create an account
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Complete the online application form with your personal
                    details
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Upload required documents (transcripts, CV, recommendation
                    letters)
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-gray-700">
                    Submit your application before the deadline
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Info & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Information
                </h3>

                <div className="space-y-4">
                  {/* Amount */}
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      Scholarship Amount
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {formatAmount(scholarship.amount, scholarship.currency)}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 text-red-600" />
                      Application Deadline
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatDate(scholarship.deadline)}
                    </div>
                    {daysLeft > 0 && (
                      <div
                        className={`text-sm font-medium mt-1 ${
                          daysLeft <= 30 ? "text-red-600" : "text-emerald-600"
                        }`}
                      >
                        {daysLeft} days remaining
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      Degree Level
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {scholarship.degreeLevel}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      Field of Study
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {scholarship.fieldOfStudy}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deadline Alert */}
              {daysLeft > 0 && daysLeft <= 30 && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-900 mb-1">
                        Deadline Approaching!
                      </h4>
                      <p className="text-sm text-red-700">
                        Only {daysLeft} days left to submit your application.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() =>
                    window.open(scholarship.officialWebsite, "_blank")
                  }
                >
                  Apply Now
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className={`w-full border-2 px-6 py-6 text-lg font-semibold rounded-xl transition-all ${
                    isBookmarked
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-gray-300 hover:border-emerald-500 text-gray-700"
                  }`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark
                    className={`w-5 h-5 mr-2 ${
                      isBookmarked ? "fill-emerald-600" : ""
                    }`}
                  />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-gray-300 hover:border-emerald-500 text-gray-700 px-6 py-6 text-lg font-semibold rounded-xl transition-all"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>

              {/* Official Website Link */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-2">
                  Official Website
                </div>
                <a
                  href={scholarship.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-2 break-all transition-colors"
                >
                  {scholarship.officialWebsite}
                  <ExternalLink className="w-4 h-4 shrink-0" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
