"use client";

import { GraduationCap } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center z-50">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Loader content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated logo */}
        <div className="relative">
          {/* Outer spinning ring */}
          <div className="w-24 h-24 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>

          {/* Logo in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-emerald-900 mb-2 animate-pulse">
            EduAtlas
          </h2>
          <p className="text-gray-600 text-sm">Loading scholarships...</p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce animation-delay-200"></div>
          <div className="w-3 h-3 bg-emerald-600 rounded-full animate-bounce animation-delay-400"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
