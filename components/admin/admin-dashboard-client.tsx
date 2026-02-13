"use client";

import { useEffect, useState, Fragment } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
    CalendarDays,
    ShieldCheck,
    ShieldAlert,
    Search,
    Check,
    AlertCircle,
    ChevronDown,
    ChevronUp,
    Globe,
    ExternalLink,
    Mail,
    User,
    Clock,
    ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScholarshipForm } from "@/components/scholarship-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface AdminStats {
    students: number;
    universities: number;
    unverifiedUniversities: number;
    scholarships: number;
    newSignups: number;
    totalViews: number;
}

interface UniversityData {
    id: string;
    name: string;
    email: string;
    website?: string;
    isVerified: boolean;
    createdAt: string;
    users: {
        id: string;
        name: string;
        email: string;
        createdAt: string;
    }[];
    _count: {
        scholarships: number;
    };
}

interface UserData {
    id: string;
    name: string;
    email: string;
    userType: "STUDENT" | "UNIVERSITY" | "ADMIN";
    createdAt: string;
}

interface ReportData {
    id: string;
    createdAt: string;
    reason: string | null;
    user: {
        id: string;
        email: string;
        name: string;
    } | null;
    scholarship: {
        id: string;
        slug: string;
        providerName: string;
        title: string;
    };
}

export default function AdminDashboardClient() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);
    const [universities, setUniversities] = useState<UniversityData[]>([]);
    const [reports, setReports] = useState<ReportData[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedUniversity, setExpandedUniversity] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [updatingRole, setUpdatingRole] = useState<string | null>(null);
    const [updatingVerification, setUpdatingVerification] = useState<string | null>(null);
    const [removingScholarshipIds, setRemovingScholarshipIds] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [uniSearchTerm, setUniSearchTerm] = useState("");

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            if (!res.ok) throw new Error("Failed to fetch statistics");
            const data = await res.json();
            setStats(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/admin/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchUniversities = async () => {
        try {
            const res = await fetch("/api/admin/universities");
            if (!res.ok) throw new Error("Failed to fetch universities");
            const data = await res.json();
            setUniversities(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const fetchReports = async () => {
        try {
            const res = await fetch("/api/admin/reports");
            if (!res.ok) throw new Error("Failed to fetch reports");
            const data = await res.json();
            setReports(data.reports || []);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const initDashboard = async () => {
        setLoading(true);
        await Promise.all([fetchStats(), fetchUsers(), fetchUniversities(), fetchReports()]);
        setLoading(false);
    };

    useEffect(() => {
        initDashboard();
    }, []);

    const handleToggleRole = async (userId: string, currentRole: string) => {
        setUpdatingRole(userId);
        const newRole = currentRole === "ADMIN" ? "STUDENT" : "ADMIN";

        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, userType: newRole }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update role");
            }

            setUsers(users.map(u => u.id === userId ? { ...u, userType: newRole as any } : u));
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUpdatingRole(null);
        }
    };

    const handleToggleVerification = async (universityId: string, currentStatus: boolean) => {
        setUpdatingVerification(universityId);
        const newStatus = !currentStatus;

        try {
            const res = await fetch("/api/admin/universities", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ universityId, isVerified: newStatus }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to update status");
            }

            setUniversities(universities.map(u => u.id === universityId ? { ...u, isVerified: newStatus } : u));
            // Update stats
            if (stats) {
                setStats({
                    ...stats,
                    unverifiedUniversities: newStatus ? stats.unverifiedUniversities - 1 : stats.unverifiedUniversities + 1
                });
            }
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUpdatingVerification(null);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUniversities = universities.filter(u =>
        u.name.toLowerCase().includes(uniSearchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(uniSearchTerm.toLowerCase())
    );

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
            <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-50/50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Preparing administration environment...</p>
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
            description: stats?.unverifiedUniversities && stats.unverifiedUniversities > 0
                ? `${stats.unverifiedUniversities} pending verification`
                : "Partner institutions"
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
                        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3 text-balance">
                            <ShieldCheck className="w-10 h-10 text-emerald-600" />
                            Admin Command Center
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg">Manage platform metrics, users, and scholarship inventory.</p>
                    </div>
                    <Button
                        onClick={initDashboard}
                        disabled={loading}
                        variant="outline"
                        className="rounded-xl h-12 bg-white hover:bg-emerald-50 hover:text-emerald-600 border-gray-200 transition-all shadow-sm group"
                    >
                        <RefreshCw className={`w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
                        Refresh Data
                    </Button>
                </header>

                <Tabs defaultValue="overview" className="space-y-10">
                    <TabsList className="bg-white/50 border border-gray-200 p-1.5 rounded-2xl backdrop-blur-sm self-start">
                        <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-semibold transition-all">Overview</TabsTrigger>
                        <TabsTrigger value="universities" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-semibold transition-all flex items-center gap-2">
                            Universities
                            {stats?.unverifiedUniversities && stats.unverifiedUniversities > 0 ? (
                                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full animate-pulse">
                                    {stats.unverifiedUniversities}
                                </span>
                            ) : null}
                        </TabsTrigger>
                        <TabsTrigger value="users" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-semibold transition-all">User Management</TabsTrigger>
                        <TabsTrigger value="reports" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-semibold transition-all">Reports</TabsTrigger>
                        <TabsTrigger value="scholarships" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-semibold transition-all">Add Scholarship</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-12 outline-none">
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

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="bg-white/50 border border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <CalendarDays className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Detailed Analytics Coming Soon</h3>
                                <p className="text-gray-500 max-w-md mx-auto">We're building advanced visualization tools to help you track user growth and scholarship trends over time.</p>
                            </div>
                        </motion.div>
                    </TabsContent>

                    <TabsContent value="universities" className="outline-none">
                        <Card className="border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="px-8 py-8 border-b border-gray-50 space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-gray-900">University Hub</CardTitle>
                                        <CardDescription className="text-gray-500 mt-1">Audit institutions, verify credentials, and manage platform partnerships.</CardDescription>
                                    </div>
                                    <div className="relative w-full md:w-72">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search by name or email..."
                                            className="pl-10 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all h-11"
                                            value={uniSearchTerm}
                                            onChange={(e) => setUniSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100">Institution</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-center">Scholarships</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-center">Users</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-center">Status</th>
                                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredUniversities.length > 0 ? filteredUniversities.map((uni) => (
                                                <Fragment key={uni.id}>
                                                    <tr className={`transition-colors cursor-pointer group ${expandedUniversity === uni.id ? 'bg-emerald-50/20' : 'hover:bg-gray-50/50'}`} onClick={() => setExpandedUniversity(expandedUniversity === uni.id ? null : uni.id)}>
                                                        <td className="px-8 py-5">
                                                            <div className="flex items-center gap-4">
                                                                <div className="relative">
                                                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200 uppercase text-lg transition-transform group-hover:scale-105">
                                                                        {uni.name[0]}
                                                                    </div>
                                                                    {uni.isVerified && (
                                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                                                                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div>
                                                                    <div className="font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors">{uni.name}</div>
                                                                    <div className="text-sm text-gray-400 font-medium lowercase italic">{uni.email}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-center">
                                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                                                <GraduationCap className="w-3.5 h-3.5" />
                                                                {uni._count.scholarships}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-center">
                                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold">
                                                                <Users className="w-3.5 h-3.5" />
                                                                {uni.users.length}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-center">
                                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-tight uppercase ${uni.isVerified
                                                                ? 'bg-emerald-100 text-emerald-700 shadow-sm shadow-emerald-100'
                                                                : 'bg-orange-100 text-orange-700 shadow-sm shadow-orange-100'
                                                                }`}>
                                                                {uni.isVerified ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                                                                {uni.isVerified ? "Verified" : "Pending"}
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-5 text-right">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className={`rounded-xl transition-all ${expandedUniversity === uni.id ? 'bg-emerald-100 text-emerald-700 rotate-180' : 'text-gray-400'}`}
                                                                >
                                                                    <ChevronDown className="w-5 h-5" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {expandedUniversity === uni.id && (
                                                        <tr className="bg-gray-50/30">
                                                            <td colSpan={5} className="px-8 py-0">
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: "auto", opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden pb-8 pt-4"
                                                                >
                                                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                                                        <div className="lg:col-span-4 space-y-6">
                                                                            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                                                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Institution Profile</h4>
                                                                                <div className="space-y-4">
                                                                                    {uni.website && (
                                                                                        <a
                                                                                            href={uni.website}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer"
                                                                                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-600 hover:text-emerald-700 transition-all group/link"
                                                                                        >
                                                                                            <Globe className="w-5 h-5" />
                                                                                            <span className="font-bold flex-1 truncate">{uni.website.replace(/^https?:\/\//, '')}</span>
                                                                                            <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                                                                        </a>
                                                                                    )}
                                                                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-gray-600 font-bold">
                                                                                        <Clock className="w-5 h-5" />
                                                                                        <span>Partner since {new Date(uni.createdAt).toLocaleDateString()}</span>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="mt-8 pt-6 border-t border-gray-100">
                                                                                    <Button
                                                                                        className={`w-full h-11 rounded-xl font-bold transition-all shadow-lg ${uni.isVerified
                                                                                            ? 'bg-red-50 text-red-600 hover:bg-red-100 shadow-red-100'
                                                                                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100'}`}
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            handleToggleVerification(uni.id, uni.isVerified);
                                                                                        }}
                                                                                        disabled={updatingVerification === uni.id}
                                                                                    >
                                                                                        {updatingVerification === uni.id ? (
                                                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                                                        ) : uni.isVerified ? (
                                                                                            <ShieldAlert className="w-4 h-4 mr-2" />
                                                                                        ) : (
                                                                                            <ShieldCheck className="w-4 h-4 mr-2" />
                                                                                        )}
                                                                                        {uni.isVerified ? "Revoke Partnership" : "Approve Institution"}
                                                                                    </Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="lg:col-span-8">
                                                                            <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
                                                                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Authorized Staff ({uni.users.length})</h4>
                                                                                <div className="space-y-3">
                                                                                    {uni.users.map(user => (
                                                                                        <div key={user.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all hover:border-emerald-100 group/user">
                                                                                            <div className="flex items-center gap-3">
                                                                                                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-emerald-600 font-bold group-hover/user:bg-emerald-600 group-hover/user:text-white transition-colors">
                                                                                                    <User className="w-5 h-5" />
                                                                                                </div>
                                                                                                <div>
                                                                                                    <div className="font-bold text-gray-900">{user.name}</div>
                                                                                                    <div className="text-xs text-gray-400 font-medium">{user.email}</div>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="text-[10px] font-black text-gray-300 uppercase tracking-tighter group-hover/user:text-emerald-300 transition-colors">
                                                                                                Joined {new Date(user.createdAt).toLocaleDateString()}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </Fragment>
                                            )) : (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-20 text-center">
                                                        <div className="flex flex-col items-center gap-3">
                                                            <Building2 className="w-10 h-10 text-gray-200" />
                                                            <p className="text-gray-400 font-medium">No universities found matching your search.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users" className="outline-none">
                        <Card className="border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="px-8 py-8 border-b border-gray-50 space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <CardTitle className="text-2xl font-bold text-gray-900">User Registry</CardTitle>
                                        <CardDescription className="text-gray-500 mt-1">Audit and manage user roles across the platform.</CardDescription>
                                    </div>
                                    <div className="relative w-full md:w-72">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search users..."
                                            className="pl-10 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all h-11"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">User Details</th>
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Joined Date</th>
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Role Management</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                                                <tr key={user.id} className="hover:bg-emerald-50/30 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700 font-bold shadow-sm">
                                                                {user.name[0]}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900">{user.name}</div>
                                                                <div className="text-sm text-gray-500 font-medium">{user.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="text-sm text-gray-500 font-semibold italic">
                                                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric'
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-tighter uppercase ${user.userType === "ADMIN" ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                                                                }`}>
                                                                {user.userType}
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant={user.userType === "ADMIN" ? "outline" : "default"}
                                                                className={`rounded-xl px-4 font-bold transition-all ${user.userType === "ADMIN"
                                                                    ? 'hover:bg-red-50 hover:text-red-600 border-gray-200'
                                                                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'
                                                                    }`}
                                                                onClick={() => handleToggleRole(user.id, user.userType)}
                                                                disabled={updatingRole === user.id}
                                                            >
                                                                {updatingRole === user.id ? (
                                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                                ) : user.userType === "ADMIN" ? (
                                                                    <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
                                                                ) : (
                                                                    <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                                                                )}
                                                                {user.userType === "ADMIN" ? "De-rank" : "Promote"}
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={3} className="px-8 py-20 text-center">
                                                        <div className="flex flex-col items-center gap-3">
                                                            <AlertCircle className="w-10 h-10 text-gray-200" />
                                                            <p className="text-gray-400 font-medium">No users found matching your search.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="reports" className="outline-none">
                        <Card className="border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[2.5rem] overflow-hidden">
                            <CardHeader className="px-8 py-8 border-b border-gray-50 space-y-2">
                                <CardTitle className="text-2xl font-bold text-gray-900">Reported Scholarships</CardTitle>
                                <CardDescription className="text-gray-500">Review user-reported scholarships for accuracy and compliance.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-gray-50/50">
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Scholarship</th>
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Reporter</th>
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Reason</th>
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Date</th>
                                                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {reports.length > 0 ? reports.map((report) => (
                                                <tr key={report.id} className="hover:bg-emerald-50/30 transition-colors">
                                                    <td className="px-8 py-5">
                                                        <div className="font-bold text-gray-900">{report.scholarship.title}</div>
                                                        <div className="text-xs text-gray-400 font-medium">{report.scholarship.providerName}</div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="text-sm text-gray-700 font-medium">
                                                            {report.user?.email || "Anonymous"}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="text-sm text-gray-600">
                                                            {report.reason || "—"}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="text-sm text-gray-500 font-medium">
                                                            {new Date(report.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="inline-flex items-center gap-3 justify-end">
                                                            <Link
                                                                href={`/scholarships/${report.scholarship.slug}`}
                                                                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
                                                            >
                                                                View
                                                                <ArrowRight className="w-4 h-4" />
                                                            </Link>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                                                                disabled={removingScholarshipIds.has(report.scholarship.id)}
                                                                onClick={async () => {
                                                                    const confirmRemove = window.confirm("Remove this scholarship? This will hide it from all users.");
                                                                    if (!confirmRemove) return;
                                                                    const reason = window.prompt("Reason for removal (optional):") ?? "";
                                                                    setRemovingScholarshipIds((prev) => new Set([...prev, report.scholarship.id]));
                                                                    try {
                                                                        const res = await fetch(`/api/admin/scholarships/${report.scholarship.id}`, {
                                                                            method: "DELETE",
                                                                            headers: { "Content-Type": "application/json" },
                                                                            body: JSON.stringify({ reason }),
                                                                        });
                                                                        if (res.ok) {
                                                                            setReports((prev) => prev.filter((r) => r.scholarship.id !== report.scholarship.id));
                                                                        } else {
                                                                            console.error("Failed to remove scholarship");
                                                                        }
                                                                    } catch (err) {
                                                                        console.error("Failed to remove scholarship:", err);
                                                                    } finally {
                                                                        setRemovingScholarshipIds((prev) => {
                                                                            const next = new Set(prev);
                                                                            next.delete(report.scholarship.id);
                                                                            return next;
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan={5} className="px-8 py-20 text-center">
                                                        <div className="flex flex-col items-center gap-3">
                                                            <AlertCircle className="w-10 h-10 text-gray-200" />
                                                            <p className="text-gray-400 font-medium">No reports found.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="scholarships" className="outline-none">
                        <Card className="border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[2.5rem] overflow-hidden p-8">
                            <div className="mb-10 text-center max-w-2xl mx-auto">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Direct Entry Scholarship</h2>
                                <p className="text-gray-500 mt-2">Publish scholarships directly as a platform administrator. These will appear with standard placement and will not be featured by default.</p>
                            </div>
                            <ScholarshipForm />
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
