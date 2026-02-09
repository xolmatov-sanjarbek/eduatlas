import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ResendButton from "./resend-button";

export default function VerifyRequestPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <Link
                    href="/api/auth/login"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to login
                </Link>

                <Card className="border-none shadow-2xl shadow-gray-200/50 bg-white rounded-[2.5rem] overflow-hidden">
                    <CardHeader className="pt-12 pb-6 px-10 text-center">
                        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-8 h-8 text-emerald-600" />
                        </div>
                        <CardTitle className="text-3xl font-extrabold text-gray-900 tracking-tight">Check your email</CardTitle>
                        <CardDescription className="text-gray-500 text-lg mt-2">
                            A verification link has been sent to your email address.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-10 pb-12 text-center">
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Please click the link in the message to verify your account. If you don't see it, check your spam folder.
                        </p>

                        <div className="space-y-4">
                            <ResendButton />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
