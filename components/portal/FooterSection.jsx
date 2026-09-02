"use client";

import { Heart, Phone, Mail, MapPin, Sparkles } from "lucide-react";

export default function FooterSection({ mandal }) {
  return (
    <footer id="footer" className="bg-gray-950 text-white pt-16 pb-12 border-t-4 border-amber-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-xl">
                🌸
              </div>
              <h3 className="text-xl font-bold font-marathi-heading text-amber-400">
                {mandal.name}
              </h3>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {mandal.tagline || "गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!"}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 bg-amber-950/80 px-3.5 py-1.5 rounded-full border border-amber-800/80">
              <Sparkles className="w-3.5 h-3.5" />
              स्थापना वर्ष: {mandal.establishedYear || "सार्वजनिक मंडळ"}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-sm font-marathi-heading text-amber-300 uppercase tracking-wider">
              जलद दुवे (Quick Links)
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#hero" className="hover:text-amber-400 transition-colors">मुख्य पृष्ठ</a></li>
              <li><a href="#about" className="hover:text-amber-400 transition-colors">मंडळाबद्दल</a></li>
              <li><a href="#schedule" className="hover:text-amber-400 transition-colors">उत्सव वेळापत्रक</a></li>
              <li><a href="#members" className="hover:text-amber-400 transition-colors">कार्यकारिणी</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">फोटो गॅलरी</a></li>
              <li><a href="#donation" className="hover:text-amber-400 transition-colors">ऑनलाइन वर्गणी</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-sm font-marathi-heading text-amber-300 uppercase tracking-wider">
              संपर्क माहिती (Contact)
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>{mandal.address}, {mandal.city}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span>{mandal.contactPerson}: <a href={`tel:${mandal.contactPhone}`} className="hover:text-amber-400">{mandal.contactPhone}</a></span>
              </li>
              {mandal.contactEmail && (
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>{mandal.contactEmail}</span>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {mandal.name}. सर्व हक्क सुरक्षित.</p>
          <p className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
            <span>गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
