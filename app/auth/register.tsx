"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

/**
 * Legacy register page. Registration now uses better-auth on /auth/signup.
 * Redirects to signup so old links and bookmarks still work.
 */
export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/signup");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 p-4">
      <p className="text-gray-600 mb-4">Redirecting to sign up...</p>
      <Link
        href="/auth/signup"
        className="text-emerald-600 hover:text-emerald-700 font-semibold"
      >
        Create account
      </Link>
    </div>
  );
}
