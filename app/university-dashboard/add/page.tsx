import { ScholarshipForm } from "@/components/scholarship-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Scholarship | University Dashboard",
    description: "Create and publish a new scholarship opportunity.",
};

export default function AddScholarshipPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white py-20 px-4 sm:px-6 lg:px-8">
            <ScholarshipForm />
        </div>
    );
}
