"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X, Sparkles, ZoomIn } from "lucide-react";

export default function SlidingGallerySection({ gallery = [] }) {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!gallery || gallery.length === 0) return null;

  // Duplicate list to create seamless infinite horizontal marquee effect
  const displayItems = [...gallery, ...gallery];

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-amber-600 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
          उत्सव आठवणी
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
          फोटो गॅलरी (गॅलरी)
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          गणेशोत्सवातील विविध देखावे व आरती प्रसंगांची प्रकाशचित्रे
        </p>
        <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
      </div>

      {/* Infinite Horizontal Sliding Marquee Track */}
      <div className="relative w-full overflow-hidden py-4">
        <div className="animate-marquee flex gap-6">
          {displayItems.map((item, index) => (
            <div
              key={item.id ? `${item.id}-${index}` : index}
              onClick={() => setSelectedImg(item)}
              className="relative w-72 sm:w-80 h-52 sm:h-60 rounded-3xl overflow-hidden shrink-0 cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group border-2 border-amber-200"
            >
              <img
                src={item.imageUrl}
                alt={item.caption || "गॅलरी इमेज"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/public/ganpati bappa.jfif";
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="self-end p-2 bg-white/20 backdrop-blur-md rounded-full">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-sm font-marathi-heading text-amber-300">
                    {item.caption || "श्री गणेशोत्सव देखावा"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Image Preview Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full bg-orange-950/40 rounded-3xl overflow-hidden p-2 border border-amber-400/40">
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 backdrop-blur-md transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={selectedImg.imageUrl}
                alt={selectedImg.caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />

              {selectedImg.caption && (
                <div className="p-4 text-center text-white font-marathi-heading text-lg text-amber-200">
                  {selectedImg.caption}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
