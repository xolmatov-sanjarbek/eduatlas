"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";

function ResendButtonContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");
    const [cooldown, setCooldown] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleResend = async () => {
        if (!email) {
            setError("Email address missing. Please try logging in again.");
            return;
        }

        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const { error: resendError } = await authClient.sendVerificationEmail({
                email: email,
                callbackURL: "/"
            });

            if (resendError) throw resendError;

            setSuccess(true);
            setCooldown(60);
        } catch (err: any) {
            console.error("Failed to resend verification email:", err);
            setError(err.message || "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <Button
                onClick={handleResend}
                disabled={loading || cooldown > 0}
                variant="outline"
                className="w-full h-12 rounded-xl bg-white border-gray-200 hover:bg-emerald-50 hover:text-emerald-600 transition-all font-bold group"
            >
                {loading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : cooldown > 0 ? (
                    `Resend in ${cooldown}s`
                ) : (
                    <>
                        <RefreshCw className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        Resend Verification Email
                    </>
                )}
            </Button>

            {success && (
                <p className="text-emerald-600 text-sm font-medium flex items-center justify-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-500">
                    <CheckCircle2 className="w-4 h-4" />
                    Email sent successfully!
                </p>
            )}

            {error && (
                <p className="text-red-500 text-sm font-medium flex items-center justify-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-500">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </p>
            )}
        </div>
    );
}

export default function ResendButton() {
    return (
        <Suspense fallback={<div className="h-12 w-full bg-gray-100 rounded-xl animate-pulse" />}>
            <ResendButtonContent />
        </Suspense>
    );
}
