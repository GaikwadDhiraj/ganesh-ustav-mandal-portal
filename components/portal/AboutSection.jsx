"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Heart, Award, Users2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection({ mandal }) {
  // Highlights fallback values with clean Devanagari spelling
  const h1Title = mandal.aboutHighlight1Title || "भव्य व सुरेख देखावे";
  const h1Desc  = mandal.aboutHighlight1Desc  || "दरवर्षी आकर्षक व पर्यावरणपूरक देखावे सादर केले जातात.";

  const h2Title = mandal.aboutHighlight2Title || "सामाजिक उपक्रम";
  const h2Desc  = mandal.aboutHighlight2Desc  || "रक्तदान शिबिर, वृक्षारोपण व मोफत रुग्ण सेवा.";

  const h3Title = mandal.aboutHighlight3Title || "सांस्कृतिक स्पर्धा";
  const h3Desc  = mandal.aboutHighlight3Desc  || "महिला व लहान मुलांसाठी मनोरंजक स्पर्धा.";

  const h4Title = mandal.aboutHighlight4Title || "एकजूट व कार्यकर्ते";
  const h4Desc  = mandal.aboutHighlight4Desc  || "तरुणांची भक्कम साथ व सर्वधर्मीय बंधुभाव.";

  return (
    <section id="about" className="py-20 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-600 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
            आमची परंपरा व ओळख
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
            मंडळाबद्दल माहिती
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold font-marathi-heading text-amber-950">
              {mandal.name} - सामाजिक कार्यात नेहमी अग्रगण्य!
            </h3>
            
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {mandal.aboutText || "आमच्या मंडळातर्फे दरवर्षी गणेशोत्सवाचे मोठ्या उत्साहात व पारंपरिक पद्धतीने आयोजन केले जाते. धार्मिक विधींसोबतच आम्ही विविध सामाजिक, क्रीडा व सांस्कृतिक उपक्रम राबवतो."}
            </p>

            {/* Highlights Grid with 4 Editable Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              {/* Highlight 1: देखावे */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3.5 hover:border-amber-400 transition-all">
                <div className="p-3 rounded-xl bg-orange-600 text-white shrink-0 shadow-md">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm font-marathi-heading">{h1Title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{h1Desc}</p>
                </div>
              </div>

              {/* Highlight 2: सामाजिक उपक्रम */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3.5 hover:border-amber-400 transition-all">
                <div className="p-3 rounded-xl bg-amber-500 text-white shrink-0 shadow-md">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm font-marathi-heading">{h2Title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{h2Desc}</p>
                </div>
              </div>

              {/* Highlight 3: सांस्कृतिक स्पर्धा */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3.5 hover:border-amber-400 transition-all">
                <div className="p-3 rounded-xl bg-yellow-500 text-gray-950 shrink-0 shadow-md font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm font-marathi-heading">{h3Title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{h3Desc}</p>
                </div>
              </div>

              {/* Highlight 4: एकजूट व कार्यकर्ते */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3.5 hover:border-amber-400 transition-all">
                <div className="p-3 rounded-xl bg-orange-700 text-white shrink-0 shadow-md">
                  <Users2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm font-marathi-heading">{h4Title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{h4Desc}</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Right Column: "श्री गणेशाय नमः" Card featuring Bal Ganesha image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Card className="bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white p-6 rounded-3xl shadow-2xl relative overflow-hidden border-4 border-amber-300">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
              
              <CardContent className="p-0 space-y-5 relative z-10 text-center">
                
                {/* Bal Ganesha Modak Image */}
                <div className="relative w-44 h-44 mx-auto rounded-3xl overflow-hidden border-4 border-amber-300 shadow-2xl bg-white p-1">
                  <img
                    src="/bal-ganesha-modak.jpg"
                    alt="बाल गणेश व मोदक"
                    className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/public/Caught! Bal Ganesha Trying to Hide a Giant Modak.jfif";
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-marathi-heading text-amber-100">
                    ॥ श्री गणेशाय नमः ॥
                  </h3>
                  <p className="text-amber-100 text-xs sm:text-sm leading-relaxed mt-1 font-medium">
                    "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
                  </p>
                </div>

                <div className="border-t border-amber-400/40 pt-3 flex items-center justify-between text-xs text-amber-200 font-bold">
                  <span>संपर्क: {mandal.contactPerson || "अध्यक्ष"}</span>
                  <span>📱 {mandal.contactPhone}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
