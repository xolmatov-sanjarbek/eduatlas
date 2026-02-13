"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Building2, Globe2, BookOpen, Clock, DollarSign, CheckCircle2, ArrowRight, Edit2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ScholarshipFormProps {
    initialData?: {
        title: string;
        description: string;
        amount: number;
        currency: string;
        deadline: string | null;
        targetCountry: string;
        degreeLevel: string;
        fieldOfStudy: string[];
        eligibleRegions: string[];
        officialWebsite: string | null;
    };
    id?: string;
}

export function ScholarshipForm({ initialData, id }: ScholarshipFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEditMode = !!id;

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData(e.currentTarget);
            const fieldOfStudyArray = (formData.get("fieldOfStudy") as string).split(",").map((s) => s.trim()).filter(Boolean);
            const eligibleRegionsArray = (formData.get("eligibleRegions") as string)?.split(",").map((s) => s.trim()).filter(Boolean) || [];

            const payload = {
                title: formData.get("title"),
                description: formData.get("description"),
                amount: Number(formData.get("amount")),
                currency: formData.get("currency"),
                deadline: formData.get("deadline") || undefined,
                targetCountry: formData.get("targetCountry"),
                degreeLevel: formData.get("degreeLevel"),
                fieldOfStudy: fieldOfStudyArray,
                eligibleRegions: eligibleRegionsArray,
                officialWebsite: formData.get("officialWebsite") || undefined,
            };

            const url = isEditMode ? `/api/university/scholarships/${id}` : "/api/university/scholarships";
            const method = isEditMode ? "PATCH" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.error || (isEditMode ? "Failed to update scholarship" : "Failed to create scholarship"));
            }

            router.push("/university-dashboard");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
        >
            <div className="mb-8">
                <Link
                    href="/university-dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors mb-6 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-100 rounded-xl">
                        {isEditMode ? <Edit2 className="w-6 h-6 text-emerald-600" /> : <Building2 className="w-6 h-6 text-emerald-600" />}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">{isEditMode ? "Edit Scholarship" : "Add New Scholarship"}</h1>
                </div>
                <p className="text-gray-600 max-w-2xl ml-[52px]">
                    {isEditMode ? "Update your scholarship details. Remember, you can only edit this once." : "Create a comprehensive listing to attract the best candidates. All fields marked with * are required."}
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-8">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 flex items-start gap-3"
                    >
                        <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold">!</span>
                        </div>
                        {error}
                    </motion.div>
                )}

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                        <BookOpen className="w-5 h-5 text-emerald-500" />
                        Basic Information
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Scholarship Title <span className="text-red-500">*</span></label>
                            <Input
                                name="title"
                                defaultValue={initialData?.title}
                                placeholder="e.g. Global Excellence Scholarship 2025"
                                className="h-12 text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                required
                                minLength={5}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description <span className="text-red-500">*</span></label>
                            <textarea
                                name="description"
                                defaultValue={initialData?.description}
                                placeholder="Describe the scholarship details, eligibility criteria, benefits, and application process..."
                                className="w-full min-h-[160px] rounded-xl border border-input bg-transparent px-4 py-3 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-y transition-all"
                                required
                                minLength={20}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                        <DollarSign className="w-5 h-5 text-purple-500" />
                        Financial Details
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Input
                                    name="amount"
                                    type="number"
                                    defaultValue={initialData?.amount}
                                    placeholder="5000"
                                    className="pl-8 h-12 text-base font-medium transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                    required
                                    min={1}
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select
                                    name="currency"
                                    defaultValue={initialData?.currency || "USD"}
                                    className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer hover:bg-gray-50/50 transition-colors"
                                >
                                    <option value="USD">USD ($) - US Dollar</option>
                                    <option value="EUR">EUR (€) - Euro</option>
                                    <option value="GBP">GBP (£) - British Pound</option>
                                    <option value="AUD">AUD ($) - Australian Dollar</option>
                                    <option value="CAD">CAD ($) - Canadian Dollar</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <ArrowRight className="w-4 h-4 rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                        <Globe2 className="w-5 h-5 text-blue-500" />
                        Criteria & Location
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Target Country <span className="text-red-500">*</span></label>
                            <Input
                                name="targetCountry"
                                defaultValue={initialData?.targetCountry}
                                placeholder="e.g. United Kingdom"
                                className="h-12 text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Degree Level <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <select
                                    name="degreeLevel"
                                    defaultValue={initialData?.degreeLevel || "Bachelor"}
                                    className="flex h-12 w-full items-center justify-between rounded-xl border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer hover:bg-gray-50/50 transition-colors"
                                >
                                    <option value="Bachelor">Bachelor's Degree</option>
                                    <option value="Master">Master's Degree</option>
                                    <option value="PhD">PhD / Doctorate</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Certificate">Certificate</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <ArrowRight className="w-4 h-4 rotate-90" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Fields of Study <span className="text-red-500">*</span></label>
                            <Input
                                name="fieldOfStudy"
                                defaultValue={initialData?.fieldOfStudy.join(", ")}
                                placeholder="e.g. Computer Science, Engineering, Business (comma separated)"
                                className="h-12 text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1.5">Separate multiple fields with commas</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Eligible Regions (Optional)</label>
                            <Input
                                name="eligibleRegions"
                                defaultValue={initialData?.eligibleRegions.join(", ")}
                                placeholder="e.g. Asia, Africa, Developing Countries"
                                className="h-12 text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                        <Clock className="w-5 h-5 text-orange-500" />
                        Deadlines & Links
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Application Deadline</label>
                            <Input
                                name="deadline"
                                type="date"
                                defaultValue={initialData?.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : ""}
                                className="h-12 text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Official Website URL</label>
                            <Input
                                name="officialWebsite"
                                defaultValue={initialData?.officialWebsite || ""}
                                placeholder="https://university.edu/scholarship"
                                className="h-12 text-base transition-all focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                                type="url"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end pt-4 gap-4">
                    <Link href="/university-dashboard">
                        <Button
                            type="button"
                            variant="ghost"
                            className="h-12 px-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-xl"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white h-12 px-10 text-base font-semibold rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                {isEditMode ? "Updating..." : "Publishing..."}
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-2 h-5 w-5" />
                                {isEditMode ? "Update Scholarship" : "Publish Scholarship"}
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}
