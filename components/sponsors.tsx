"use client";

import { motion } from "framer-motion";
import { ExternalLink, Award, Medal, Star } from "lucide-react";

export default function SponsorsSection() {
  const sponsors = {
    gold: [
      {
        name: "Global Education Foundation",
        website: "https://globaledu.org",
        logo: "/sponsors/global-edu.png",
      },
      {
        name: "Future Leaders Institute",
        website: "https://futureleaders.org",
        logo: "/sponsors/future-leaders.png",
      },
      {
        name: "Innovation Academy",
        website: "https://innovationacademy.edu",
        logo: "/sponsors/innovation-academy.png",
      },
    ],
    silver: [
      {
        name: "Tech Scholars Fund",
        website: "https://techscholars.org",
        logo: "/sponsors/tech-scholars.png",
      },
      {
        name: "Green Earth Initiative",
        website: "https://greenearth.org",
        logo: "/sponsors/green-earth.png",
      },
      {
        name: "Knowledge Bridge",
        website: "https://knowledgebridge.org",
        logo: "/sponsors/knowledge-bridge.png",
      },
      {
        name: "Academic Excellence Network",
        website: "https://academicexcellence.org",
        logo: "/sponsors/academic-excellence.png",
      },
    ],
    basic: [
      {
        name: "Study Abroad Partners",
        website: "https://studyabroad.com",
        logo: "/sponsors/study-abroad.png",
      },
      {
        name: "Education First",
        website: "https://educationfirst.org",
        logo: "/sponsors/education-first.png",
      },
      {
        name: "Campus Connect",
        website: "https://campusconnect.edu",
        logo: "/sponsors/campus-connect.png",
      },
      {
        name: "Learning Hub",
        website: "https://learninghub.org",
        logo: "/sponsors/learning-hub.png",
      },
      {
        name: "Student Success Network",
        website: "https://studentsuccess.org",
        logo: "/sponsors/student-success.png",
      },
      {
        name: "Bright Futures Foundation",
        website: "https://brightfutures.org",
        logo: "/sponsors/bright-futures.png",
      },
    ],
  };

  interface Sponsor {
    name: string;
    website: string;
    logo: string;
  }

  type SponsorTier = "gold" | "silver" | "basic";

  const SponsorCard = ({
    sponsor,
    tier,
  }: {
    sponsor: Sponsor;
    tier: SponsorTier;
  }) => {
    const sizes = {
      gold: "h-32",
      silver: "h-24",
      basic: "h-20",
    };

    return (
      <a
        href={sponsor.website}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center justify-center h-full"
      >
        <div
          className={`${sizes[tier]} w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
        >
          <div className="text-gray-400 font-bold text-center px-4">
            {sponsor.name}
          </div>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 text-center mb-2 group-hover:text-emerald-600 transition-colors">
          {sponsor.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-emerald-600 transition-colors mt-auto">
          <span>Visit website</span>
          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </a>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              Our Partners
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Trusted by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                Leading Organizations
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're proud to partner with organizations that share our mission of
              making education accessible to everyone.
            </p>
          </motion.div>

          {/* Gold Sponsors */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="relative inline-block mb-8">
              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-2xl px-6 py-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Gold Sponsors
                </h3>
              </div>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"></div>
            </div>

            <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
              {sponsors.gold.map((sponsor, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SponsorCard sponsor={sponsor} tier="gold" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Silver Sponsors */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="relative inline-block mb-8">
              <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300 rounded-2xl px-6 py-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-slate-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Medal className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Silver Sponsors
                </h3>
              </div>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-slate-500 rounded-full"></div>
            </div>

            <motion.div variants={containerVariants} className="grid md:grid-cols-4 gap-6">
              {sponsors.silver.map((sponsor, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SponsorCard sponsor={sponsor} tier="silver" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Basic Sponsors */}
          <motion.div variants={itemVariants}>
            <div className="relative inline-block mb-8">
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl px-6 py-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Supporting Partners
                </h3>
              </div>
              <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"></div>
            </div>

            <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {sponsors.basic.map((sponsor, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SponsorCard sponsor={sponsor} tier="basic" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Interested in Sponsoring?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl">
                Join our mission to make education accessible. Partner with us to
                help students worldwide achieve their dreams.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Award className="w-5 h-5" />
                Become a Sponsor
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
