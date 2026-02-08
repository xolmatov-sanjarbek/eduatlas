"use client";

import { motion } from "framer-motion";
import {
  Heart,
  Target,
  Clock,
  Globe2,
  Lightbulb,
  Sparkles,
  Award,
  Users,
  GraduationCap,
} from "lucide-react";

interface StatItem {
  iconName: string;
  value: string;
  label: string;
}

interface ValueItem {
  iconName: string;
  title: string;
  description: string;
}

interface AboutClientProps {
  stats: StatItem[];
  values: ValueItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="w-8 h-8 text-white" />,
  Users: <Users className="w-8 h-8 text-white" />,
  GraduationCap: <GraduationCap className="w-8 h-8 text-white" />,
  Target: <Target className="w-7 h-7 text-white" />,
  Clock: <Clock className="w-7 h-7 text-white" />,
  Globe2: <Globe2 className="w-7 h-7 text-white" />,
};

const valueIconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-7 h-7 text-white" />,
  Clock: <Clock className="w-7 h-7 text-white" />,
  Globe2: <Globe2 className="w-7 h-7 text-white" />,
};

export default function AboutClient({ stats, values }: AboutClientProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50 relative overflow-hidden" id="about">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              About EduAtlas
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Empowering Students to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 mt-2">
                Achieve Their Dreams
              </span>
            </h2>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We built EduAtlas with a simple yet powerful mission: to help
              students find the right scholarships anywhere they want to study,
              ensuring they never miss out on the best opportunities that could
              change their lives.
            </p>
          </motion.div>

          {/* Mission statement card */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-16 border border-emerald-100">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl transform rotate-6 transition-transform duration-300 hover:rotate-12">
                    <Lightbulb className="w-24 h-24 text-white" />
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="w-8 h-8 text-yellow-900" />
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Why We Exist
                </h3>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Every year, millions of dollars in scholarships go unclaimed
                  simply because students don't know they exist. We've witnessed
                  talented individuals give up on their dream universities due to
                  financial constraints, when funding was actually available—they
                  just couldn't find it.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  EduAtlas changes that. We've created a comprehensive platform
                  that brings together scholarships from universities worldwide,
                  making it effortless for students to discover, compare, and
                  apply for funding opportunities that match their unique profiles
                  and aspirations.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Value propositions */}
          <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-50 hover:border-emerald-200 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {valueIconMap[value.iconName]}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Impact stats */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-3xl p-10 sm:p-16 shadow-2xl"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
              Our Impact in Numbers
            </h3>

            <div className="grid sm:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {iconMap[stat.iconName]}
                  </div>
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-emerald-100 text-lg font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Closing statement */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-2xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed">
              Your education dreams shouldn't be limited by finances.
              <span className="text-emerald-600 font-bold">
                {" "}
                Let's find your scholarship together.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
