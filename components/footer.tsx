"use client";

import { GraduationCap, Twitter, Heart, Github } from "lucide-react";

export default function Footer() {
  const footerLinks = {
    students: [
      { name: "Search Scholarships", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Success Stories", href: "#" },
    ],
    universities: [
      { name: "List Scholarships", href: "#" },
      { name: "Partnership", href: "#" },
      { name: "Pricing", href: "#" },
    ],
    sponsors: [
      { name: "Become a Sponsor", href: "#" },
      { name: "Sponsorship Benefits", href: "#" },
      { name: "Our Sponsors", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/xolmatov_sanjar", label: "Twitter" },
    {
      icon: Github,
      href: "https://github.com/xolmatov-sanjarbek",
      label: "GitHub",
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduAtlas</span>
            </div>
            <p className="text-gray-400 mb-6 text-sm max-w-xs">
              Connecting students with scholarship opportunities worldwide.
            </p>

            {/* Social links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-all duration-300 group"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Students links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">
              For Students
            </h4>
            <ul className="space-y-2">
              {footerLinks.students.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-emerald-400 transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Universities links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">
              For Universities
            </h4>
            <ul className="space-y-2">
              {footerLinks.universities.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-emerald-400 transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sponsors links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Sponsors</h4>
            <ul className="space-y-2">
              {footerLinks.sponsors.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-emerald-400 transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
            <p className="text-gray-500">
              © 2026 EduAtlas. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-gray-500">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" />{" "}
              for students
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
