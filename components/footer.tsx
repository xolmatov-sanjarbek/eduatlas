"use client";

import { GraduationCap, Twitter, Heart, Github, Mail, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const footerLinks = {
    students: [
      { name: "Search Scholarships", href: "/scholarships" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "My Dashboard", href: "/dashboard" },
      { name: "Success Stories", href: "/success-stories" },
    ],
    universities: [
      { name: "List Scholarships", href: "/university-dashboard" },
      { name: "Partner With Us", href: "/partners" },
      { name: "Success Metrics", href: "/metrics" },
      { name: "Resources", href: "/resources" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/xolmatov_sanjar", label: "Twitter" },
    { icon: Github, href: "https://github.com/xolmatov-sanjarbek", label: "GitHub" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow duration-300">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-xl font-bold text-transparent">
                EduAtlas
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              EduAtlas connects students with life-changing scholarship opportunities worldwide.
              We believe quality education should be accessible to everyone, everywhere.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>xolmatovsanjarbek@proton.me</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Tashkent, Uzbekistan</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-50 hover:bg-emerald-50 rounded-xl flex items-center justify-center transition-all duration-300 group border border-gray-100 hover:border-emerald-100"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-6">For Students</h4>
              <ul className="space-y-3">
                {footerLinks.students.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-6">For Universities</h4>
              <ul className="space-y-3">
                {footerLinks.universities.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-emerald-600 transition-colors inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © {new Date().getFullYear()} EduAtlas. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for students worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
