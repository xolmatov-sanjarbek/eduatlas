"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Search,
  BookOpen,
  Compass,
  ArrowLeft,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingElements = [
    { icon: BookOpen, delay: "0s", duration: "3s" },
    { icon: GraduationCap, delay: "0.5s", duration: "4s" },
    { icon: Compass, delay: "1s", duration: "3.5s" },
    { icon: Sparkles, delay: "1.5s", duration: "4.5s" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated gradient orb following mouse */}
      <div
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-emerald-300/30 to-teal-300/30 blur-3xl pointer-events-none transition-all duration-700 ease-out -z-10"
        style={{
          left: `${mousePosition.x - 192}px`,
          top: `${mousePosition.y - 192}px`,
        }}
      />

      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <Icon
              key={index}
              className="absolute text-emerald-200 opacity-20 animate-float"
              style={{
                width: "48px",
                height: "48px",
                top: `${20 + index * 20}%`,
                left: `${10 + index * 20}%`,
                animationDelay: element.delay,
                animationDuration: element.duration,
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="max-w-4xl w-full text-center relative z-10">
        {/* 404 Number - Large and Animated */}
        <div className="mb-8 relative">
          <div className="text-[180px] sm:text-[240px] font-black leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 animate-gradient">
              404
            </span>
          </div>

          {/* Floating decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
            <div className="w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>

        {/* Message */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Looks like this scholarship opportunity doesn't exist, or the page
            has been moved. Let's help you find what you're looking for!
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <a
            href="/"
            className="group bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-emerald-200 transition-all">
              <Home className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Home</h3>
            <p className="text-sm text-gray-600">Back to homepage</p>
          </a>

          <a
            href="/scholarships"
            className="group bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-emerald-200 transition-all">
              <Search className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Search</h3>
            <p className="text-sm text-gray-600">Find scholarships</p>
          </a>

          <a
            href="/about"
            className="group bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-emerald-200 transition-all">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">About</h3>
            <p className="text-sm text-gray-600">Learn more</p>
          </a>

          <a
            href="/help"
            className="group bg-white hover:bg-emerald-50 border-2 border-gray-200 hover:border-emerald-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-emerald-200 transition-all">
              <Compass className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Help</h3>
            <p className="text-sm text-gray-600">Get support</p>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => window.history.back()}
            size="lg"
            variant="outline"
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>

          <Button
            onClick={() => (window.location.href = "/")}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Button>
        </div>

        {/* Fun Message */}
        <div className="mt-12 text-gray-500 text-sm animate-fade-in animation-delay-1000">
          <p>💡 Did you know? Over 50,000 students have found scholarships on EduAtlas!</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
