"use client";

import { useState } from "react";
import { Sparkles, Menu, X, Heart, MapPin, Calendar, Users, Image as ImageIcon, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalNavbar({ mandal }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "मुख्य", href: "#hero" },
    { label: "मंडळाबद्दल", href: "#about" },
    { label: "उत्सव वेळापत्रक", href: "#schedule" },
    { label: "कार्यकारिणी", href: "#members" },
    { label: "फोटो गॅलरी", href: "#gallery" },
    { label: "ऑनलाइन वर्गणी", href: "#donation" },
    { label: "ठिकाण", href: "#map" },
    { label: "संपर्क", href: "#footer" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-md shadow-amber-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Mandal Title */}
          <a href="#hero" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 p-0.5 shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                🌸
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold font-marathi-heading text-orange-950 block line-clamp-1 group-hover:text-orange-600 transition-colors">
                {mandal.name}
              </span>
              <span className="text-xs text-amber-700 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500 animate-pulse" />
                {mandal.city || "सार्वजनिक गणेशोत्सव"}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-semibold text-gray-700 hover:text-orange-600 hover:bg-amber-50 rounded-xl transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Quick Vargani Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a href="#donation">
              <Button variant="golden" size="sm" className="gap-2 text-xs uppercase tracking-wide">
                <QrCode className="w-4 h-4" />
                वर्गणी द्या
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="xl:hidden bg-white border-b border-amber-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-gray-800 hover:bg-amber-50 hover:text-orange-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a href="#donation" onClick={() => setIsOpen(false)}>
              <Button variant="golden" className="w-full justify-center gap-2">
                <QrCode className="w-5 h-5" />
                ऑनलाइन वर्गणी जमा करा
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
