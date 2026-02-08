"use client";

import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AccessDenied() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center"
            >
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <ShieldAlert className="w-10 h-10 text-red-600" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    You don't have the necessary permissions to access this area. If you believe this is an error, please contact the administrator.
                </p>

                <div className="flex flex-col gap-3">
                    <Button asChild className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-12 shadow-lg shadow-gray-200">
                        <Link href="/" className="flex items-center justify-center gap-2">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </Button>

                    <Button asChild variant="ghost" className="w-full rounded-xl h-12 text-gray-500 hover:text-gray-900">
                        <Link href="/auth/signin" className="flex items-center justify-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Sign in as Admin
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
