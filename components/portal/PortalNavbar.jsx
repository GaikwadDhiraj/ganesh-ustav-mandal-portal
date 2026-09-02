"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, QrCode, Calendar, Users, Image as ImageIcon, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalNavbar({ mandalName, slug }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "मुख्य पृष्ठ", href: "#hero", icon: "🌸" },
    { label: "उत्सव माहिती", href: "#about", icon: "✨" },
    { label: "वेळापत्रक", href: "#schedule", icon: "📅" },
    { label: "कार्यकारिणी", href: "#members", icon: "👥" },
    { label: "गॅलरी", href: "#gallery", icon: "🖼️" },
    { label: "गूगल मॅप", href: "#map", icon: "📍" },
    { label: "संपर्क", href: "#footer", icon: "📞" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-amber-950/95 backdrop-blur-md text-white shadow-2xl border-b border-amber-500/40 py-2.5"
          : "bg-gradient-to-r from-orange-700 via-amber-600 to-orange-700 text-white shadow-xl py-3 border-b-2 border-amber-400"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Mandal Brand Title */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 p-0.5 shadow-md flex items-center justify-center text-amber-950 font-bold text-xl group-hover:scale-110 transition-transform">
              🪔
            </div>
            <div>
              <span className="font-extrabold font-marathi-heading text-lg sm:text-xl text-amber-50 group-hover:text-amber-300 transition-colors block leading-tight line-clamp-1">
                {mandalName || "सार्वजनिक गणेशोत्सव मंडळ"}
              </span>
              <span className="text-[11px] font-bold text-amber-200 uppercase tracking-widest block">
                अधिकृत वेब पोर्टल
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1.5 font-bold text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-xl hover:bg-white/15 text-amber-100 hover:text-white transition-all flex items-center gap-1.5"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </a>
            ))}
          </div>

          {/* CTA Vargani Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="#donation">
              <Button size="sm" variant="golden" className="gap-1.5 font-bold shadow-lg text-amber-950">
                <QrCode className="w-4 h-4" />
                वर्गणी / दान अर्पण करा
              </Button>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-amber-100 hover:bg-white/20 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-orange-950/95 backdrop-blur-xl border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-2 text-white animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/10 text-amber-100 font-bold text-sm transition-colors"
            >
              <span className="text-lg">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
          <div className="pt-2">
            <a href="#donation" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="golden" className="w-full justify-center gap-2 font-bold text-amber-950">
                <QrCode className="w-4 h-4" />
                ऑनलाइन वर्गणी जमा करा
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
