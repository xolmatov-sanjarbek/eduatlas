"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Building2,
    GraduationCap,
    TrendingUp,
    Eye,
    UserPlus,
    Loader2,
    RefreshCw,
    BarChart3,
    CalendarDays
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AdminStats {
    students: number;
    universities: number;
    scholarships: number;
    newSignups: number;
    totalViews: number;
}

export default function AdminDashboardClient() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/stats");
            if (!res.ok) throw new Error("Failed to fetch statistics");
            const data = await res.json();
            setStats(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    if (loading && !stats) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Crunching the data...</p>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Students",
            value: stats?.students || 0,
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50",
            description: "Registered student users"
        },
        {
            title: "Universities",
            value: stats?.universities || 0,
            icon: Building2,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            description: "Partner institutions"
        },
        {
            title: "Active Scholarships",
            value: stats?.scholarships || 0,
            icon: GraduationCap,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            description: "Available opportunities"
        },
        {
            title: "New Signups",
            value: stats?.newSignups || 0,
            icon: UserPlus,
            color: "text-purple-600",
            bg: "bg-purple-50",
            description: "Registered in last 7 days"
        },
        {
            title: "Total Impressions",
            value: stats?.totalViews.toLocaleString() || 0,
            icon: Eye,
            color: "text-orange-600",
            bg: "bg-orange-50",
            description: "Scholarship listing views"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50/30 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                            <BarChart3 className="w-10 h-10 text-emerald-600" />
                            Platform Overview
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">Real-time performance and user engagement metrics.</p>
                    </div>
                    <Button
                        onClick={fetchStats}
                        disabled={loading}
                        variant="outline"
                        className="rounded-xl h-12 bg-white hover:bg-emerald-50 hover:text-emerald-600 border-gray-200 transition-all shadow-sm"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                        Sync Dashboard
                    </Button>
                </header>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                >
                    {statCards.map((card, index) => (
                        <motion.div key={index} variants={item}>
                            <Card className="border-none shadow-xl shadow-gray-200/50 bg-white/70 backdrop-blur-sm rounded-3xl overflow-hidden group hover:shadow-emerald-500/10 transition-all duration-300">
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <div className={`p-3 rounded-2xl ${card.bg} group-hover:scale-110 transition-transform duration-300`}>
                                        <card.icon className={`w-6 h-6 ${card.color}`} />
                                    </div>
                                    <TrendingUp className="w-4 h-4 text-gray-300" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-black text-gray-900 mb-1">
                                        {typeof card.value === 'number' && card.value >= 1000 ? card.value.toLocaleString() : card.value}
                                    </div>
                                    <CardTitle className="text-sm font-bold text-gray-800 tracking-wide uppercase">{card.title}</CardTitle>
                                    <p className="text-xs text-gray-400 mt-2 font-medium">{card.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Placeholder for future charts */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <div className="bg-white/50 border border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <CalendarDays className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
                        <p className="text-gray-500 max-w-md mx-auto">We're building advanced visualization tools to help you track user growth and scholarship trends over time.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
