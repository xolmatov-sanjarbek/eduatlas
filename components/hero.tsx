"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Building2,
  GraduationCap,
  Globe,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EduAtlasHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-30" : "-translate-x-20 opacity-0"}`}
        ></div>
        <div
          className={`absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-20" : "translate-x-20 opacity-0"}`}
        ></div>
        <div
          className={`absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-30" : "translate-y-20 opacity-0"}`}
        ></div>
      </div>

      {/* Floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GraduationCap
          className={`absolute top-1/4 left-1/4 w-12 h-12 text-emerald-300 opacity-20 transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-20" : "translate-y-10 opacity-0"}`}
        />
        <Globe
          className={`absolute top-1/3 right-1/4 w-10 h-10 text-emerald-400 opacity-20 transition-all duration-1000 delay-900 ${isVisible ? "translate-y-0 opacity-20" : "translate-y-10 opacity-0"}`}
        />
        <TrendingUp
          className={`absolute bottom-1/3 left-1/3 w-8 h-8 text-emerald-300 opacity-20 transition-all duration-1000 delay-1100 ${isVisible ? "translate-y-0 opacity-20" : "translate-y-10 opacity-0"}`}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center">
          {/* Cool Badge */}
          <div
            className={`inline-flex items-center gap-3 mb-8 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            <div className="relative inline-flex items-center gap-2 bg-linear-to-r from-emerald-500 to-emerald-600 px-5 py-1 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-400 to-emerald-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <Sparkles className="w-4 h-4 text-yellow-300 relative z-10 animate-pulse" />
              <span className="text-lg font-bold text-white relative z-10">
                100% Free for Students
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
          </div>

          {/* Main heading */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 transition-all duration-700 delay-200 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            Discover Your Perfect
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-emerald-400 mt-2">
              Scholarship Match
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-400 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            EduAtlas connects students with thousands of scholarships from
            universities worldwide. Find funding for your education in minutes,
            not months.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-600 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
          >
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <Search className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Start Searching
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <Building2 className="w-5 h-5 mr-2 group-hover:rotate-6 transition-transform duration-300" />
              For Universities
            </Button>
          </div>

          {/* Stats/Trust indicators */}
          <div
            className={`mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-700 delay-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                10,000+
              </div>
              <div className="text-gray-600 font-medium">Scholarships</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Universities</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                50K+
              </div>
              <div className="text-gray-600 font-medium">Students Helped</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#059669"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </div>
  );
}
