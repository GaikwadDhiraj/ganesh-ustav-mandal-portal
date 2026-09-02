"use client";

import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Heart, Award, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutSection({ mandal }) {
  const highlights = [
    {
      title: mandal.aboutHighlight1Title || "भव्य व सुरेख देखावे",
      description: mandal.aboutHighlight1Desc || "दरवर्षी आकर्षक व पर्यावरणपूरक देखावे सादर केले जातात.",
      icon: "🌺",
      color: "bg-amber-100 text-amber-900 border-amber-300"
    },
    {
      title: mandal.aboutHighlight2Title || "सामाजिक उपक्रम",
      description: mandal.aboutHighlight2Desc || "रक्तदान शिबिर, वृक्षारोपण व मोफत रुग्ण सेवा.",
      icon: "🩺",
      color: "bg-orange-100 text-orange-900 border-orange-300"
    },
    {
      title: mandal.aboutHighlight3Title || "सांस्कृतिक स्पर्धा",
      description: mandal.aboutHighlight3Desc || "महिला व लहान मुलांसाठी मनोरंजक स्पर्धा.",
      icon: "🏆",
      color: "bg-yellow-100 text-yellow-900 border-yellow-300"
    },
    {
      title: mandal.aboutHighlight4Title || "एकजूट व कार्यकर्ते",
      description: mandal.aboutHighlight4Desc || "तरुणांची भक्कम साथ व सर्वधर्मीय बंधुभाव.",
      icon: "🤝",
      color: "bg-emerald-100 text-emerald-900 border-emerald-300"
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#FFFDF9] relative overflow-hidden font-marathi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
            मंडळाचा इतिहास व कार्य
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-marathi-heading text-gray-900">
            आमच्या मंडळाविषयी (About Mandal)
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Bal Ganesha Image Card with Modak */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl p-3 bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 shadow-2xl shadow-amber-950/20 glow-gold">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-amber-950 border-4 border-amber-300">
                <img
                  src="/bal-ganesha-modak.jpg"
                  alt="श्री गणेशाय नमः देखावा"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/bal-ganesha-modak.jpg";
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white text-center w-full">
                    <Badge variant="golden" className="mb-2 font-bold">
                      ॥ श्री गणेशाय नमः ॥
                    </Badge>
                    <p className="font-marathi-heading text-xl font-bold text-amber-300">
                      पर्यावरणपूरक व सांस्कृतिक उत्सव
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Description Text (Limit 1000 Chars) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-xl space-y-4">
              <h3 className="text-2xl font-bold font-marathi-heading text-amber-900 flex items-center gap-2">
                <span>🌺</span>
                मंडळाची ध्येयधोरणे व सामाजिक बांधीलकी
              </h3>

              {/* Detailed Description with max 1000 chars limit display */}
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg font-medium whitespace-pre-line">
                {mandal.aboutText || "आमच्या गणेशोत्सवात आपले सहर्ष स्वागत आहे. श्रींच्या चरणी आपली सेवा व प्रार्थना अर्पित करा आणि बाप्पाचे आशीर्वाद प्राप्त करा."}
              </p>

              <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-amber-900 font-bold">
                <span>📍 स्थान: {mandal.address}, {mandal.city}</span>
                <span>स्थापना: {mandal.establishedYear || "सार्वजनिक"}</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className={`h-full border-2 ${item.color} rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-3`}>
                <div className="text-3xl">{item.icon}</div>
                <h4 className="font-bold text-xl font-marathi-heading text-gray-900">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
