"use client";

import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function parseGoogleMapSrc(input, mandalName, address, city) {
  if (!input || typeof input !== "string") {
    const fallbackQuery = encodeURIComponent(`${mandalName || ""} ${address || ""} ${city || "Pune"}`.trim());
    return `https://maps.google.com/maps?q=${fallbackQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  let str = input.trim();

  // Handle pasted <iframe src="..."> HTML tags
  if (str.includes("<iframe") && str.includes("src=")) {
    const match = str.match(/src=["']([^"']+)["']/);
    if (match && match[1]) {
      str = match[1];
    }
  }

  // Handle direct Google Maps Embed URLs
  if (str.includes("/maps/embed") || str.includes("output=embed")) {
    return str;
  }

  // Handle regular Google Maps share links or plain addresses
  const query = encodeURIComponent(str.startsWith("http") ? `${mandalName || ""} ${address || ""}` : str);
  return `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export default function MapSection({ mandal }) {
  const embedUrl = parseGoogleMapSrc(mandal.googleMapUrl, mandal.name, mandal.address, mandal.city);

  const directMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${mandal.name || ""} ${mandal.address || ""} ${mandal.city || ""}`
  )}`;

  return (
    <section id="map" className="py-20 bg-white relative font-marathi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
            मंडळाचे ठिकाण
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
            गूगल मॅप व पत्ता (Location)
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            बाप्पाच्या दर्शनासाठी मंडळाच्या मांडवात कसे पोहोचावे?
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Map & Address Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Address Details Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-amber-50 to-orange-50/60 p-8 rounded-3xl border border-amber-200 flex flex-col justify-between space-y-6">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-orange-600/20">
                <MapPin className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold font-marathi-heading text-gray-900">
                {mandal.name}
              </h3>

              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div>
                  <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider">पूर्ण पत्ता:</span>
                  <p className="mt-1 font-medium leading-relaxed">{mandal.address}</p>
                </div>

                <div>
                  <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider">शहर / परिसर:</span>
                  <p className="mt-1 font-medium">{mandal.city || "महाराष्ट्र"}</p>
                </div>

                <div>
                  <span className="font-bold text-amber-900 block text-xs uppercase tracking-wider">संपर्क व्यक्ती:</span>
                  <p className="mt-1 font-medium">{mandal.contactPerson} ({mandal.contactPhone})</p>
                </div>
              </div>
            </div>

            <a
              href={directMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full justify-center gap-2 font-bold" variant="default">
                <Navigation className="w-4 h-4" />
                गूगल मॅपमध्ये मार्ग पहा (Open Map)
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </Button>
            </a>
          </div>

          {/* Embedded Google Map Iframe */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border-2 border-amber-200 shadow-xl min-h-[350px] lg:min-h-[420px] relative bg-gray-100">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${mandal.name} Google Map Location`}
              className="w-full h-full rounded-3xl"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
}
