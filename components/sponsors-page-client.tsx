"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, ArrowRight, Download, Mail, Star, Zap, Globe, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SponsorsPageClient() {
    const sponsors = {
        platinum: [
            {
                name: "Global Education Foundation",
                website: "https://globaledu.org",
                description: "Empowering next-gen leaders through scholarship funding.",
                logo: "/sponsors/global-edu.png",
                color: "from-indigo-500 to-purple-600",
            },
            {
                name: "Future Leaders Institute",
                website: "https://futureleaders.org",
                description: "Supporting innovative educational initiatives worldwide.",
                logo: "/sponsors/future-leaders.png",
                color: "from-blue-500 to-cyan-500",
            },
        ],
        gold: [
            {
                name: "Innovation Academy",
                website: "https://innovationacademy.edu",
                logo: "/sponsors/innovation-academy.png",
            },
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
        ],
        silver: [
            { name: "Knowledge Bridge", website: "https://knowledgebridge.org" },
            { name: "Academic Excellence", website: "https://academicexcellence.org" },
            { name: "Study Abroad Partners", website: "https://studyabroad.com" },
            { name: "Education First", website: "https://educationfirst.org" },
            { name: "Campus Connect", website: "https://campusconnect.edu" },
            { name: "Learning Hub", website: "https://learninghub.org" },
        ],
    };

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-purple-50/50 to-indigo-50/50 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-emerald-50/50 to-teal-50/50 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-100 rounded-full px-4 py-1.5 shadow-sm mb-6">
                            <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                            <span className="text-sm font-semibold text-emerald-800">
                                Join the Movement
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
                            Our{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                                Partners in Impact
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                            We collaborate with visionary organizations to break down financial barriers
                            and make quality education accessible to every deserving student.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all hover:scale-[1.02]"
                            >
                                <Link href="#contact">
                                    Become a Sponsor
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Platinum Sponsors */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <Zap className="w-6 h-6 text-purple-600 fill-purple-600" />
                        <span className="text-purple-600 font-bold tracking-widest uppercase text-sm">Platinum Partners</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Transforming Education Together</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    {sponsors.platinum.map((sponsor, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100 transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${sponsor.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`} />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className={`w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br ${sponsor.color} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                    <Award className="w-12 h-12 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{sponsor.name}</h3>
                                <p className="text-gray-500 mb-6">{sponsor.description}</p>

                                <a
                                    href={sponsor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                                >
                                    Visit Website
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Gold Sponsors */}
                <div className="mb-24">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Gold Sponsors</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {sponsors.gold.map((sponsor, index) => (
                            <motion.a
                                key={index}
                                href={sponsor.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03 }}
                                className="bg-amber-50/50 hover:bg-amber-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-amber-100 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-white rounded-xl shadow-sm mb-4 flex items-center justify-center group-hover:shadow-md transition-shadow">
                                    <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                                </div>
                                <h3 className="font-bold text-gray-900">{sponsor.name}</h3>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Silver/Community Sponsors */}
                <div className="mb-24">
                    <div className="text-center mb-10">
                        <span className="text-gray-400 font-bold tracking-widest uppercase text-sm">Community Partners</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-center">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
                            {sponsors.silver.map((sponsor, index) => (
                                <motion.a
                                    key={index}
                                    href={sponsor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors border border-transparent hover:border-gray-200"
                                >
                                    {sponsor.name}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/20 rounded-full blur-3xl opacity-40 translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-3xl opacity-40 -translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Partner with EduAtlas and connect your brand with the next generation of global leaders and innovators.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            className="h-14 px-8 text-lg rounded-full bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                        >
                            <Mail className="w-5 h-5 mr-2" />
                            Contact Sponsorship Team
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="h-14 px-8 text-lg rounded-full border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                            <Download className="w-5 h-5 mr-2" />
                            Download Media Kit
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
