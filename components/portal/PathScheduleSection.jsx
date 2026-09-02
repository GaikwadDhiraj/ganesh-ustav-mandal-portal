"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PathScheduleSection({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <section id="schedule" className="py-24 bg-gradient-to-b from-amber-50/50 via-white to-amber-50/40 relative overflow-hidden font-marathi">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
            उत्सव सोहळा
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-marathi-heading text-gray-900">
            उत्सव वेळापत्रक व कार्यक्रम
          </h2>
          <p className="text-gray-600 mt-3 text-base sm:text-lg font-medium">
            आरती, महाप्रसाद व सांस्कृतिक कार्यक्रमांची सविस्तर माहिती
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Downward Timeline Path Container */}
        <div className="relative">
          
          {/* Animated Center Vertical Sinuous Path Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-amber-500 to-yellow-500 transform -translate-x-1/2 rounded-full shadow-lg opacity-80"></div>

          {/* Timeline Event Cards */}
          <div className="space-y-16">
            {events.map((evt, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={evt.id || index}
                  initial={{ opacity: 0, y: 50, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: index * 0.15 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* Card Content with Peeking Transparent Ganesha at Card END (Bottom) */}
                  <div className={`w-full md:w-[calc(50%-2.5rem)] pl-14 md:pl-0 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="relative bg-white p-6 sm:p-8 rounded-3xl border-2 border-amber-100 shadow-xl shadow-amber-900/5 hover:border-amber-400 hover:shadow-amber-500/15 transition-all group">
                      
                      <div className={`flex items-center gap-2 mb-3 flex-wrap ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <Badge variant="golden" className="px-3 py-1 text-xs font-bold">
                          {evt.dayTitle || `दिवस ${index + 1}`}
                        </Badge>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                          <Clock className="w-3.5 h-3.5 text-orange-600" />
                          {evt.eventTime}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-marathi-heading text-gray-900 group-hover:text-orange-600 transition-colors">
                        {evt.title}
                      </h3>

                      {evt.description && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed font-medium">
                          {evt.description}
                        </p>
                      )}

                      {/* Transparent Peeking Ganesha Graphic - Placed at Card END (Bottom Corner) */}
                      <div className={`absolute -bottom-4 ${isEven ? "-left-5 scale-x-[-1]" : "-right-5"} w-24 h-28 z-20 pointer-events-none drop-shadow-2xl`}>
                        <img
                          src="/peeking-ganesha-nobg.png"
                          alt="बाल गणेश देखावा"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/peeking-ganesha-nobg.png";
                          }}
                        />
                      </div>

                    </div>
                  </div>

                  {/* Center Animated Node Badge */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 p-1 shadow-xl shadow-orange-500/30 flex items-center justify-center text-white z-20 hover:scale-125 transition-transform duration-300">
                    <div className="w-full h-full bg-orange-600 rounded-full flex items-center justify-center text-base font-bold">
                      {index + 1}
                    </div>
                  </div>

                  {/* Spacer for 2-column layout */}
                  <div className="hidden md:block w-[calc(50%-2.5rem)]"></div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
