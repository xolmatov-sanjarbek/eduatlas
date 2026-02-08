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
    CalendarDays,
    ShieldCheck,
    ShieldAlert,
    Search,
    Check,
    AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScholarshipForm } from "@/components/scholarship-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

interface AdminStats {
    students: number;
    universities: number;
    scholarships: number;
    newSignups: number;
    totalViews: number;
}

interface UserData {
    id: string;
    name: string;
    email: string;
    userType: "STUDENT" | "UNIVERSITY" | "ADMIN";
    createdAt: string;
}

export default function AdminDashboardClient() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingRole, setUpdatingRole] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const initDashboard = async () => {
        setLoading(true);
        await Promise.all([fetchStats(), fetchUsers()]);
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

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <TabsTrigger value="users" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-emerald-600 font-semibold transition-all">User Management</TabsTrigger>
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
                                                            {new Date(user.createdAt).toLocaleDateString('en-US', {
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

                    <TabsContent value="scholarships" className="outline-none">
                        <Card className="border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[2.5rem] overflow-hidden p-8">
                            <div className="mb-10 text-center max-w-2xl mx-auto">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="w-8 h-8 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Direct Entry Scholarship</h2>
                                <p className="text-gray-500 mt-2">Publish scholarships directly as a platform administrator. These will appear with premium placement.</p>
                            </div>
                            <ScholarshipForm />
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
