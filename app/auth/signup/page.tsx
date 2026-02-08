"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Lock,
  User,
  Chrome,
  ArrowLeft,
  Loader2,
  Check,
  GraduationCap,
  Building2,
  Globe,
} from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"STUDENT" | "UNIVERSITY" | null>(
    null,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [universityWebsite, setUniversityWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!userType) {
      setError("Please select your account type");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (userType === "UNIVERSITY" && !universityWebsite) {
      setError("Please provide your university website");
      return;
    }

    setLoading(true);

    try {
      // Use better-auth's signUp for both students and universities
      await signUp.email({
        email,
        password,
        name,
        callbackURL:
          userType === "UNIVERSITY" ? "/university-dashboard" : "/dashboard",
      });

      // If university, create the university record and link the user
      if (userType === "UNIVERSITY") {
        const updateRes = await fetch("/api/auth/setup-university", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            universityWebsite,
          }),
        });

        if (!updateRes.ok) {
          const data = await updateRes.json();
          throw new Error(data.error || "Failed to setup university");
        }
      }

      setSuccess(true);
      setTimeout(
        () =>
          router.push(
            userType === "UNIVERSITY" ? "/university-dashboard" : "/dashboard",
          ),
        1500,
      );
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    if (!userType) {
      setError("Please select your account type first");
      return;
    }
    if (userType === "UNIVERSITY") {
      setError("Universities can only sign up with email");
      return;
    }
    setGoogleLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (err: any) {
      setError(err.message || "Failed to sign up with Google.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 pt-20">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to EduAtlas
        </Link>

        {!userType ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Create Account
              </h1>
              <p className="text-gray-600">
                What type of account would you like to create?
              </p>
            </div>

            {/* User Type Selection */}
            <div className="space-y-4 mb-8">
              <button
                onClick={() => setUserType("STUDENT")}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-emerald-600" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">Student</h3>
                    <p className="text-sm text-gray-600">
                      Find scholarships and track applications
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setUserType("UNIVERSITY")}
                className="w-full p-6 border-2 border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-emerald-600" />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">University</h3>
                    <p className="text-sm text-gray-600">
                      Post and manage scholarships
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8">
              <button
                onClick={() => {
                  setUserType(null);
                  setError("");
                }}
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Change account type
              </button>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {userType === "STUDENT"
                  ? "Create Student Account"
                  : "Create University Account"}
              </h1>
              <p className="text-gray-600">
                {userType === "STUDENT"
                  ? "Join thousands of students finding their perfect scholarship."
                  : "Post scholarships and manage applications from students."}
              </p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleEmailSignUp} className="space-y-4 mb-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {userType === "STUDENT" ? "Full Name" : "University Name"}
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={
                      userType === "STUDENT" ? "John Doe" : "University Name"
                    }
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Website Input (for universities only) */}
              {userType === "UNIVERSITY" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      value={universityWebsite}
                      onChange={(e) => setUniversityWebsite(e.target.value)}
                      placeholder="https://www.university.edu"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-emerald-700 text-sm">
                  <Check className="w-4 h-4" />
                  Account created! Redirecting...
                </div>
              )}

              {/* Sign Up Button */}
              <Button
                type="submit"
                disabled={loading || success}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Divider - Only show for students */}
            {userType === "STUDENT" && (
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-gray-600">
                    Or sign up with
                  </span>
                </div>
              </div>
            )}

            {/* Google Sign Up - Only show for students */}
            {userType === "STUDENT" && (
              <Button
                onClick={handleGoogleSignUp}
                disabled={googleLoading}
                variant="outline"
                className="w-full border-2 border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  <>
                    <Chrome className="w-5 h-5" />
                    Sign Up with Google
                  </>
                )}
              </Button>
            )}

            {/* Sign In Link */}
            <p className="text-center text-gray-600 mt-8">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>

            {/* Optional Sign In Notice */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-700 text-center">
                💡 You don't need an account to browse scholarships. Sign up to
                save favorites and track applications.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
