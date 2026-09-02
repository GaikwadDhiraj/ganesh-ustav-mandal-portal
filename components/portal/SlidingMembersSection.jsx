"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, UserCheck, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SlidingMembersSection({ members = [] }) {
  const scrollRef = useRef(null);

  if (!members || members.length === 0) return null;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="members" className="py-20 bg-white relative overflow-hidden font-marathi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-amber-600 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
              मंडळ नेतृत्व
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
              मंडळ कार्यकारिणी व सदस्य
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-1 font-medium">
              सार्वजनिक गणेशोत्सवाचे सर्व प्रमुख पदाधिकारी व कार्यकर्ते
            </p>
          </div>

          {/* Slider Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-all hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Previous Members"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-600/20"
              aria-label="Next Members"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-8 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {members.map((member, index) => (
            <motion.div
              key={member.id || index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[260px] sm:min-w-[300px] max-w-[320px] snap-start shrink-0"
            >
              <Card className="h-full border border-amber-100 bg-white/90 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 group rounded-3xl overflow-hidden">
                
                {/* Member Photo Container */}
                <div className="relative w-full aspect-square bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl text-amber-500">
                      👤
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-3 left-3">
                    <Badge variant="golden" className="shadow-md font-bold text-xs">
                      {member.designation || "कार्यकर्ते"}
                    </Badge>
                  </div>
                </div>

                {/* Member Details */}
                <CardContent className="p-5 text-center space-y-1">
                  <h3 className="font-bold text-lg font-marathi-heading text-gray-900 group-hover:text-orange-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-bold">
                    {mandalNameBadge(member.designation)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function mandalNameBadge(role) {
  if (!role) return "मंडळ कार्यकर्ते";
  if (role.includes("अध्यक्ष")) return "प्रमुख सूत्रधार";
  if (role.includes("सचिव") || role.includes("कार्यवाह")) return "प्रशासन प्रमुख";
  if (role.includes("खजिनदार")) return "वित्त व हिशोब";
  return "सक्रिय कार्यकर्ते";
}
