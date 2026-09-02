"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Maximize2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function SlidingGallerySection({ gallery = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  // Duplicate items for continuous smooth reverse motion marquee
  const loopGallery = [...gallery, ...gallery, ...gallery];

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-amber-950 via-gray-950 to-orange-950 text-white relative overflow-hidden font-marathi">
      
      {/* Background Golden Sparkle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="golden" className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-3">
            ✨ उत्सव दृश्य (Interactive 3D Wave Gallery)
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-marathi-heading text-amber-50">
            गणेशोत्सव देखावा व फोटो गॅलरी
          </h2>
          <p className="text-amber-200/80 mt-3 text-base sm:text-lg font-medium">
            दरवर्षीचे आकर्षक देखावे, महाआरती व उत्सवाचे अप्रतिम क्षणचित्र (फोटोवर क्लिक करा)
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Dynamic Motion Track: Horizontal Reverse Wave Animation */}
        <div className="relative w-full overflow-hidden py-6">
          <motion.div
            className="flex space-x-6 w-max"
            animate={{ x: ["-33.33%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {loopGallery.map((item, idx) => (
              <motion.div
                key={`${item.id || idx}-${idx}`}
                whileHover={{ scale: 1.08, rotateZ: idx % 2 === 0 ? 2 : -2, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                onClick={() => setSelectedImage(item)}
                className="w-72 sm:w-80 aspect-[4/3] rounded-3xl overflow-hidden relative cursor-pointer group border-2 border-amber-400/40 bg-orange-950 shadow-2xl shadow-black/60 shrink-0"
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption || "गॅलरी देखावा"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/hero-main-ganesha.jpg";
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold font-marathi-heading text-amber-200 line-clamp-1">
                      {item.caption || "श्री गणेश उत्सव देखावा"}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 backdrop-blur-md flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-orange-950/90 rounded-3xl p-4 border-2 border-amber-400 overflow-hidden flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.caption || "गॅलरी"}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {selectedImage.caption && (
              <p className="text-amber-200 font-bold font-marathi-heading text-lg mt-4 text-center">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
