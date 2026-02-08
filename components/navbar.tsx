"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  LogOut,
  User,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSession, signOut } from "@/lib/auth-client";

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; href: string; description?: string }[];
}

const navItems: NavItem[] = [
  { name: "Sponsors", href: "/sponsors" },
  { name: "About", href: "/about" },
  { name: "Scholarships", href: "/scholarships" },
];

export default function Header1() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session } = useSession();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    scrolled: {
      y: 0,
      opacity: 1,
      height: "4rem",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    },
    top: {
      y: 0,
      opacity: 1,
      height: "5rem",
      backgroundColor: "transparent",
      backdropFilter: "blur(0px)",
      borderBottom: "1px solid transparent",
      boxShadow: "none",
    },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" as const } },
    open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" as const } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95, pointerEvents: "none" as const },
    visible: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" as const },
  };

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 transition-all duration-300"
      variants={headerVariants}
      initial="initial"
      animate={isScrolled ? "scrolled" : "top"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex h-full items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              prefetch={false}
              href="/"
              className="flex items-center gap-2 group"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow duration-300">
                <GraduationCap className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xl font-bold text-transparent">
                  EduAtlas
                </span>
                <span className="text-[10px] font-medium text-gray-500 tracking-wider uppercase">
                  Global Scholarships
                </span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden items-center justify-center space-x-1 lg:flex bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50 backdrop-blur-sm">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  prefetch={false}
                  href={item.href}
                  className="relative px-5 py-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-white hover:shadow-sm flex items-center gap-1 group"
                >
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {item.hasDropdown && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-2 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                      >
                        {item.dropdownItems?.map((dropdownItem) => (
                          <Link
                            prefetch={false}
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-3 rounded-xl hover:bg-emerald-50 transition-colors group"
                          >
                            <div className="text-gray-900 font-medium group-hover:text-emerald-700 transition-colors">
                              {dropdownItem.name}
                            </div>
                            {dropdownItem.description && (
                              <div className="text-gray-500 text-xs mt-0.5 group-hover:text-emerald-600/70 transition-colors">
                                {dropdownItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center justify-center space-x-4 lg:flex">
            {session?.user ? (
              <div className="relative" onMouseLeave={() => setShowUserMenu(false)}>
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  onMouseEnter={() => setShowUserMenu(true)}
                  className="flex items-center justify-center gap-2 pl-2 pr-4 py-1.5 bg-white border border-gray-200 hover:border-emerald-200 hover:shadow-md text-gray-700 rounded-full transition-all duration-300 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">
                    {session.user.name?.[0] || session.user.email?.[0] || "U"}
                  </div>
                  <span className="font-medium text-sm max-w-[100px] truncate">
                    {session.user.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`} />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 mb-1">
                        <p className="text-sm font-semibold text-gray-900">Signed in as</p>
                        <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                      </div>

                      <Link
                        href={(session.user as any).userType === "UNIVERSITY" ? "/university-dashboard" : "/dashboard"}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-emerald-600 rounded-xl transition-colors font-medium"
                      >
                        <User className="w-4 h-4" />
                        Dashboard
                      </Link>

                      <div className="h-px bg-gray-100 my-1" />

                      <button
                        onClick={async () => {
                          await signOut();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors px-2"
                >
                  Log in
                </Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/auth/signup"
                    className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          <motion.button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="mt-4 bg-white/90 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-xl overflow-hidden p-2">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      prefetch={false}
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      {item.hasDropdown && <ChevronDown className="h-4 w-4 text-gray-400" />}
                    </Link>
                  ))}
                </div>

                <div className="h-px bg-gray-100 my-2" />

                {session?.user ? (
                  <div className="space-y-1">
                    <Link
                      href={(session.user as any).userType === "UNIVERSITY" ? "/university-dashboard" : "/dashboard"}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-emerald-50 text-emerald-700 font-medium transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={async () => {
                        await signOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-medium transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    <Link
                      prefetch={false}
                      href="/auth/signin"
                      className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      prefetch={false}
                      href="/auth/signup"
                      className="flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/20"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up Free
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
