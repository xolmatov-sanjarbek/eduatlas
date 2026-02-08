"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, Sparkles, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

export default function OptionalSignInCard() {
  const { data: session, isPending } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted on client to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (isPending || session?.user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white rounded-2xl overflow-hidden border border-emerald-100 shadow-xl shadow-emerald-500/5 mb-10"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />

      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        <div className="shrink-0 relative">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Unlock Full Access for Free
          </h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-0">
            Create an account to track your applications, save favorite scholarships, and receive personalized recommendations matching your profile.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            asChild
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
          >
            <Link href="/auth/signin">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-2 border-emerald-100 hover:border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-semibold transition-all duration-300"
          >
            <Link href="/auth/signup">
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
