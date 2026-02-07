"use client";

import { useState, useEffect, useRef } from "react";
import {
  Target,
  Heart,
  Users,
  Globe2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated linear orb that follows mouse */}
      <div
        className="fixed w-150 h-150 rounded-full bg-linear-to-r from-emerald-400/20 to-teal-400/20 blur-3xl pointer-events-none transition-all duration-1000 ease-out -z-10"
        style={{
          left: `${mousePosition.x - 300}px`,
          top: `${mousePosition.y - 300}px`,
        }}
      />

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {/* Decorative line */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-1 w-20 bg-linear-to-r from-emerald-500 to-transparent rounded-full"></div>
              <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">
                Our Story
              </span>
            </div>

            <h1 className="text-6xl sm:text-7xl font-black text-gray-900 mb-8 leading-tight">
              About{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600">
                  EduAtlas
                </span>
                <span className="absolute bottom-2 left-0 w-full h-4 bg-emerald-200/50 -z-10"></span>
              </span>
            </h1>

            <p className="text-2xl text-gray-700 leading-relaxed max-w-3xl">
              I built EduAtlas to solve a problem I've witnessed too many times:
              talented students missing out on scholarships simply because they
              couldn't find them.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={sectionRef} className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          {/* Story */}
          <div
            className={`mb-32 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="relative">
              {/* Large decorative quote mark */}
              <div className="absolute -left-8 -top-8 text-9xl text-emerald-100 font-serif leading-none select-none">
                "
              </div>

              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-emerald-100 shadow-xl shadow-emerald-500/10">
                <h2 className="text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-2 h-8 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  Why I Started This
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed pl-5">
                  <p className="relative before:content-[''] before:absolute before:-left-5 before:top-3 before:w-2 before:h-2 before:bg-emerald-400 before:rounded-full">
                    Every year, billions of dollars in scholarships go
                    unclaimed. Not because students don't qualify, but because
                    they don't know these opportunities exist.
                  </p>
                  <p className="relative before:content-[''] before:absolute before:-left-5 before:top-3 before:w-2 before:h-2 before:bg-emerald-400 before:rounded-full">
                    I've seen brilliant students give up on their dream
                    universities due to financial constraints, when funding was
                    available—they just couldn't find it in time.
                  </p>
                  <p className="relative before:content-[''] before:absolute before:-left-5 before:top-3 before:w-2 before:h-2 before:bg-emerald-400 before:rounded-full">
                    EduAtlas changes that by bringing all scholarship
                    opportunities into one simple platform, making it easy for
                    students to discover funding that matches their profile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Goals */}
          <div
            className={`mb-32 transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  My Goals
                </h2>
                <div className="h-1.5 w-full bg-linear-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: "Help Students Find Scholarships",
                  description:
                    "Make scholarship discovery fast, simple, and accessible to everyone, everywhere.",
                  linear: "from-emerald-500 to-teal-500",
                },
                {
                  icon: Globe2,
                  title: "Enable Global Access",
                  description:
                    "Connect students with universities worldwide, breaking down geographical and financial barriers.",
                  linear: "from-teal-500 to-cyan-500",
                },
                {
                  icon: Users,
                  title: "Reach More Students",
                  description:
                    "Grow from helping thousands to helping millions of students achieve their education dreams.",
                  linear: "from-cyan-500 to-blue-500",
                },
                {
                  icon: Heart,
                  title: "Keep It Free Forever",
                  description:
                    "Education funding should never cost money. EduAtlas will always be 100% free for students.",
                  linear: "from-blue-500 to-emerald-500",
                },
              ].map((goal, index) => {
                const Icon = goal.icon;
                return (
                  <div
                    key={index}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                    <div className="relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-emerald-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-full">
                      <div className="flex items-start gap-5">
                        <div
                          className={`shrink-0 w-14 h-14 rounded-xl bg-linear-to-br ${goal.linear} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                            {goal.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {goal.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vision */}
          <div
            className={`mb-24 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-teal-600 rounded-3xl blur-lg opacity-50"></div>

              <div className="relative bg-linear-to-br from-emerald-600 via-emerald-500 to-teal-600 rounded-3xl p-12 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <Sparkles className="w-10 h-10 text-white" />
                    <h2 className="text-4xl font-bold text-white">
                      The Vision
                    </h2>
                  </div>

                  <p className="text-2xl text-white leading-relaxed mb-6 font-medium">
                    My vision is simple: a world where every talented student
                    can access quality education, regardless of their financial
                    situation.
                  </p>

                  <p className="text-lg text-emerald-50 leading-relaxed mb-8">
                    I'm building EduAtlas to be more than a search engine—it's a
                    movement to democratize education and unlock human potential
                    worldwide.
                  </p>

                  <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold hover:bg-white/30 transition-all cursor-pointer group">
                    <span>Join us on this journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`transition-all duration-1000 delay-800 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "50K+", label: "Students Helped" },
                { value: "10K+", label: "Scholarships" },
                { value: "500+", label: "Universities" },
                { value: "150+", label: "Countries" },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-default">
                  <div className="relative inline-block mb-3">
                    <div className="text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-600 group-hover:scale-110 transition-transform">
                      {stat.value}
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
}
