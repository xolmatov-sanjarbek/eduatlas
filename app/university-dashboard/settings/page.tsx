"use client";

import { useSession } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowLeft,
    Building2,
    Mail,
    Globe,
    Image as ImageIcon,
    Loader2,
    CheckCircle,
} from "lucide-react";

interface UniversityProfile {
    id: string;
    name: string;
    email: string;
    website?: string | null;
    image?: string | null;
}

export default function UniversitySettingsPage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const [profile, setProfile] = useState<UniversityProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || isPending) return;
        if (!session?.user) {
            router.push("/auth/signin");
        } else if ((session.user as SessionUser).userType !== "UNIVERSITY") {
            router.push("/dashboard");
        }
    }, [session, isPending, router, mounted]);

    useEffect(() => {
        const userType = (session?.user as SessionUser | undefined)?.userType;
        if (!mounted || !session?.user || userType !== "UNIVERSITY") return;
        fetchProfile();
    }, [session?.user, mounted]);

    const fetchProfile = async () => {
        try {
            const res = await fetch("/api/university/profile");
            if (!res.ok) throw new Error("Failed to fetch profile");
            const data = await res.json();
            setProfile(data.university);
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            setError("Failed to load profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            const formData = new FormData(e.currentTarget);
            const payload = {
                name: formData.get("name"),
                email: formData.get("email"),
                website: formData.get("website") || null,
                image: formData.get("image") || null,
            };

            const res = await fetch("/api/university/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error || "Failed to update profile");
            }

            const data = await res.json();
            setProfile(data.university);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted || isPending || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (!session?.user || (session.user as SessionUser).userType !== "UNIVERSITY") {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50/50 mt-15">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Link
                    href="/university-dashboard"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="font-medium text-sm">Back to Dashboard</span>
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">University Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your university profile information</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-lg flex items-center gap-2 border border-emerald-200">
                        <CheckCircle className="w-5 h-5" />
                        <span>Profile updated successfully!</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                        {error}
                    </div>
                )}

                {/* Settings Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-emerald-600" />
                            University Name
                        </label>
                        <Input
                            name="name"
                            defaultValue={profile?.name}
                            placeholder="e.g. Harvard University"
                            className="h-12"
                            required
                            minLength={3}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-emerald-600" />
                            Email Address
                        </label>
                        <Input
                            name="email"
                            type="email"
                            defaultValue={profile?.email}
                            placeholder="e.g. contact@university.edu"
                            className="h-12"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-emerald-600" />
                            Website (Optional)
                        </label>
                        <Input
                            name="website"
                            type="url"
                            defaultValue={profile?.website || ""}
                            placeholder="e.g. https://www.university.edu"
                            className="h-12"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-emerald-600" />
                            Logo/Image URL (Optional)
                        </label>
                        <Input
                            name="image"
                            type="url"
                            defaultValue={profile?.image || ""}
                            placeholder="e.g. https://example.com/logo.png"
                            className="h-12"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.push("/university-dashboard")}
                            className="h-12 px-6"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-8"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
