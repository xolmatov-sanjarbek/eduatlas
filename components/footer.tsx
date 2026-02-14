"use client";

import {
  GraduationCap,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { name: "Search Scholarships", href: "/scholarships" },
      { name: "How It Works", href: "/#how-it-works" },
      { name: "Featured", href: "/scholarships" },
    ],
    company: [
      { name: "About", href: "/about" },
      // { name: "Contact", href: "/contact" },
      // { name: "Sponsors", href: "/sponsors" },
    ],
    // legal: [
    //   { name: "Privacy", href: "/privacy" },
    //   { name: "Terms", href: "/terms" },
    // ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://x.com/xolmatov_sanjar", label: "Twitter" },
    { icon: Github, href: "https://github.com/xolmatov-sanjarbek", label: "GitHub" },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EduAtlas</span>
            </a>
            <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
              Making scholarship discovery simple and accessible for students
              worldwide.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              Product
            </h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              Company
            </h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          {/* <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-emerald-600 text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            © {currentYear} EduAtlas. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-emerald-100 flex items-center justify-center transition-all group"
                >
                  <Icon className="w-4 h-4 text-gray-600 group-hover:text-emerald-600 transition-colors" />
                </a>
              );
            })}
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>for students</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
