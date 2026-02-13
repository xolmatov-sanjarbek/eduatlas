"use client";

import { motion, type Variants } from "motion/react";
import { Search, FileCheck, Send, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-emerald-600" />,
      title: "Discover Opportunities",
      description:
        "Browse through thousands of scholarships from top universities worldwide. Filter by degree, country, and field of study.",
      color: "bg-blue-50",
    },
    {
      icon: <FileCheck className="w-8 h-8 text-emerald-600" />,
      title: "Verify Eligibility",
      description:
        "Review detailed requirements, deadlines, and benefits. Ensure you meet all criteria before proceeding to apply.",
      color: "bg-purple-50",
    },
    {
      icon: <Send className="w-8 h-8 text-emerald-600" />,
      title: "Direct Application",
      description:
        "Follow direct links to official university websites and start your application process with confidence.",
      color: "bg-emerald-50",
    },
  ];
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-50">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Simple Process
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6"
          >
            How it <span className="text-emerald-600">works</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Your journey to a global education starts here. We've simplified the
            scholarship search so you can focus on your studies.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-12 relative"
        >
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-emerald-100 to-transparent -translate-y-1/2 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div
                className={`w-20 h-20 ${step.color} rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/5 group-hover:scale-110 transition-transform duration-500 border border-white relative`}
              >
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-lg">
                  {index + 1}
                </div>
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {step.description}
              </p>

              {/* Arrow for mobile (not implemented, using staggered list instead) */}
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-1 rounded-2xl bg-gray-50 border border-gray-100 italic text-gray-500 font-medium px-6 py-2">
            No registration required to browse thousands of listings.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
