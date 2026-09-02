"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calendar, MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function HeroSection({ mandal }) {
  const [coconutBroken, setCoconutBroken] = useState(false);
  const [breaking, setBreaking] = useState(false);

  const handleBreakCoconut = () => {
    if (breaking) return;
    setBreaking(true);
    setTimeout(() => {
      setCoconutBroken(true);
      setBreaking(false);
      toast.success("॥ श्रीफळ (नारळ) यशस्वीरीत्या समर्पित झाले! श्री गणेशाचे आशीर्वाद आपणावर सदैव राहोत! ॥", {
        duration: 5000,
      });
    }, 400);
  };

  // Zendu (Marigold) and Rose Petals flower list
  const flowersList = ["🏵️", "🌹", "🌼", "🥀", "🌸", "🍊", "🪷", "🌹", "🏵️"];

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-orange-600 via-amber-500 to-amber-50 text-white pt-12 pb-20 lg:pt-20 lg:pb-32 font-marathi">
      
      {/* Background Animated Flower Shower (झेंडूची फुले व गुलाबाच्या पाकळ्यांचा वर्षाव) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="falling-flower text-2xl sm:text-3xl select-none"
            style={{
              left: `${(i * 5.2) % 100}%`,
              animationDuration: `${3.5 + (i % 4)}s`,
              animationDelay: `${(i * 0.3) % 4}s`,
            }}
          >
            {flowersList[i % flowersList.length]}
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {mandal.establishedYear && (
              <div className="inline-flex items-center gap-2">
                <Badge variant="golden" className="px-4 py-1.5 text-sm uppercase tracking-wider shadow-lg font-bold">
                  ✨ स्थापना वर्ष: {mandal.establishedYear}
                </Badge>
              </div>
            )}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-marathi-heading tracking-tight leading-tight drop-shadow-md text-amber-50">
              {mandal.name}
            </h1>

            <p className="text-xl sm:text-2xl font-bold text-amber-200 font-marathi-heading flex items-center justify-center lg:justify-start gap-2">
              <span>🌸</span>
              {mandal.tagline || "गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!"}
              <span>🌸</span>
            </p>

            <p className="text-base sm:text-lg text-amber-50/90 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              {mandal.aboutText || "आमच्या गणेशोत्सवात आपले सहर्ष स्वागत आहे. श्रींच्या चरणी आपली सेवा व प्रार्थना अर्पित करा आणि बाप्पाचे आशीर्वाद प्राप्त करा."}
            </p>

            {/* Address & City */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm font-bold text-amber-100">
              <span className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
                <MapPin className="w-4 h-4 text-amber-300" />
                {mandal.address}, {mandal.city}
              </span>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a href="#schedule">
                <Button size="lg" variant="golden" className="gap-2 shadow-2xl font-bold">
                  <Calendar className="w-5 h-5 text-amber-950" />
                  उत्सव वेळापत्रक पहा
                </Button>
              </a>
              <a href="#donation">
                <Button size="lg" className="bg-white text-orange-700 hover:bg-amber-50 gap-2 border-2 border-white font-bold">
                  <QrCode className="w-5 h-5" />
                  ऑनलाइन वर्गणी / दान
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Hero Main Ganesha Idol + Previous Coconut Animation Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center space-y-6"
          >
            {/* Main Hero Ganesha Idol Card (hero-main-ganesha.jpg) */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl p-3 bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 shadow-2xl shadow-orange-950/40 glow-gold">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-orange-950 border-4 border-amber-300">
                <img
                  src={mandal.heroImageUrl || "/hero-main-ganesha.jpg"}
                  alt={mandal.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/hero-main-ganesha.jpg";
                  }}
                />
                
                {/* Floating Flower Rain Overlay on Image */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="falling-flower left-4 text-2xl animate-bounce">🏵️</div>
                  <div className="falling-flower left-24 text-2xl animate-pulse">🌹</div>
                  <div className="falling-flower right-6 text-2xl">🌼</div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-center w-full">
                    <p className="font-marathi-heading text-2xl font-bold text-amber-300">॥ श्री गणेशाय नमः ॥</p>
                    <p className="text-xs text-amber-200 mt-1 font-bold">सर्व भाविकांचे हार्दिक स्वागत</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Coconut Breaking Ritual Widget (Previous Animation Version) */}
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl p-4 border-2 border-amber-300 text-center shadow-xl text-gray-900 space-y-2">
              <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block">
                ✨ बाप्पाच्या चरणी श्रीफळ (नारळ) अर्पण करा
              </span>

              <div className="py-2 flex items-center justify-center">
                <button
                  onClick={handleBreakCoconut}
                  className={`cursor-pointer transition-transform duration-300 ${breaking ? "coconut-shake" : "hover:scale-110"}`}
                  title="नारळ फोडण्यासाठी क्लिक करा"
                >
                  {!coconutBroken ? (
                    <div className="flex flex-col items-center space-y-1">
                      <div className="text-5xl filter drop-shadow-md">🥥</div>
                      <span className="text-xs font-bold text-amber-950 bg-amber-200/80 px-3 py-1 rounded-xl">
                        क्लिक करा व श्रीफळ (नारळ) फोडा 🔔
                      </span>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center space-y-1"
                    >
                      <div className="text-4xl flex items-center gap-2">
                        <span>🥥</span>
                        <span className="text-amber-500 animate-bounce">🏵️</span>
                        <span>🥥</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl border border-emerald-300">
                        ✓ श्रीफळ समर्पित झाले! सर्व कार्ये सिद्धीस जावोत! 🙏
                      </span>
                    </motion.div>
                  )}
                </button>
              </div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* Curved Bottom Divider */}
      <div className="absolute bottom-0 inset-x-0 h-10 bg-[#FFFDF9] rounded-t-[50%]"></div>
    </section>
  );
}
