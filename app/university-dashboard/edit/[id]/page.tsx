"use client";

import { useSession } from "@/lib/auth-client";
import { ScholarshipForm } from "@/components/scholarship-form";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ScholarshipEditPage() {
    const { data: session, isPending: sessionPending } = useSession();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [scholarship, setScholarship] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sessionPending) return;
        if (!session?.user) {
            router.push("/auth/signin");
            return;
        }

        const fetchScholarship = async () => {
            try {
                const res = await fetch(`/api/university/scholarships/${id}`);
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Failed to fetch scholarship");
                }
                const data = await res.json();
                setScholarship(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchScholarship();
    }, [id, session, sessionPending, router]);

    if (sessionPending || isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                    <p className="text-gray-500 font-medium animate-pulse">Loading scholarship data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
                >
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
                    <p className="text-gray-600 mb-8">{error}</p>
                    <Link href="/university-dashboard">
                        <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-12">
                            Back to Dashboard
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (scholarship?.isEdited) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
                >
                    <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-amber-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Notice</h1>
                    <p className="text-gray-600 mb-4">
                        This scholarship has already been edited once. To maintain data integrity, scholarships can only be modified once after creation.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        If you need further assistance, please contact our support team.
                    </p>
                    <Link href="/university-dashboard">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 shadow-lg shadow-emerald-200">
                            Back to Dashboard
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-12 px-4">
            <ScholarshipForm
                id={id}
                initialData={{
                    title: scholarship.title,
                    description: scholarship.description,
                    amount: scholarship.amount,
                    currency: scholarship.currency,
                    deadline: scholarship.deadline,
                    targetCountry: scholarship.targetCountry,
                    degreeLevel: scholarship.degreeLevel,
                    fieldOfStudy: scholarship.fieldOfStudy,
                    eligibleRegions: scholarship.eligibleRegions,
                    officialWebsite: scholarship.officialWebsite,
                }}
            />
        </div>
    );
}
