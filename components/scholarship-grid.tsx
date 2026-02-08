"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    GraduationCap,
    DollarSign,
    Calendar,
    Clock,
    ArrowRight,
    Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Scholarship {
    id: string;
    title: string;
    providerName: string;
    description: string;
    targetCountry: string;
    degreeLevel: string;
    amount: number;
    currency: string;
    deadline: Date | null;
    slug: string;
    isFeatured: boolean;
    updatedAt: Date;
}

interface ScholarshipGridProps {
    scholarships: Scholarship[];
}

export default function ScholarshipGrid({ scholarships }: ScholarshipGridProps) {
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
                type: "spring" as const,
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const formatAmount = (amount: number, currency: string) => {
        return `${currency} ${amount.toLocaleString()}`;
    };

    const formatDate = (date: Date | null) => {
        if (!date) return "No deadline";
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <motion.div
            className="grid md:grid-cols-2 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
        >
            {scholarships.map((scholarship) => (
                <motion.div
                    key={scholarship.id}
                    variants={itemVariants}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                    {/* Featured Badge */}
                    {scholarship.isFeatured && (
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                            <Star className="w-3 h-3 fill-white" />
                            Featured
                        </div>
                    )}

                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                    {scholarship.title}
                                </h3>
                                <p className="text-sm font-medium text-gray-500">
                                    {scholarship.providerName}
                                </p>
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                            {scholarship.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                                        Location
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                        {scholarship.targetCountry}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                    <GraduationCap className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                                        Level
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                        {scholarship.degreeLevel}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                                    <DollarSign className="w-4 h-4 text-purple-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                                        Amount
                                    </span>
                                    <span className="text-sm font-bold text-emerald-600 truncate">
                                        {formatAmount(scholarship.amount, scholarship.currency)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                                    <Calendar className="w-4 h-4 text-red-600" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">
                                        Deadline
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                        {formatDate(scholarship.deadline)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between mt-auto group-hover:bg-emerald-50/10 transition-colors">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Updated {new Date(scholarship.updatedAt).toLocaleDateString()}</span>
                        </div>

                        <Link href={`/scholarships/${scholarship.slug}`}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-0 h-auto font-semibold hover:no-underline group/btn"
                            >
                                View Details
                                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
