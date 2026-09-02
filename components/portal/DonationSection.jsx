"use client";

import { useState } from "react";
import { QrCode, Copy, Check, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function DonationSection({ mandal }) {
  const [copied, setCopied] = useState(false);

  const upiId = mandal.upiId || "mandal@upi";
  const qrUrl = mandal.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=${upiId}&pn=${encodeURIComponent(mandal.name)}`;

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast.success("UPI ID यशस्वीरीत्या कॉपी झाला!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="donation" className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-white/20 backdrop-blur-md text-amber-100 border border-white/30 text-xs uppercase tracking-widest font-bold px-4 py-1.5 rounded-full inline-block mb-3">
            ऑनलाइन सहभाग
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-marathi-heading text-amber-50">
            ऑनलाइन वर्गणी व स्वच्छिक दान
          </h2>
          <p className="text-amber-100 text-base sm:text-lg mt-3">
            आपले सहकार्य हाच आमचा खरा आधार! बाप्पाच्या चरणी ऑनलाइन वर्गणी अर्पण करा.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Instructions */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold font-marathi-heading text-amber-200">
              {mandal.name} वर्गणी जमा पद्धत
            </h3>
            
            <p className="text-amber-50 leading-relaxed text-base">
              तुम्ही तुमच्या कोणत्याही UPI अॅपद्वारे (Google Pay, PhonePe, Paytm, BHIM) खालील QR कोड स्कॅन करून किंवा UPI ID द्वारे वर्गणी जमा करू शकता.
            </p>

            {/* Steps */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center font-bold text-sm shrink-0">
                  १
                </div>
                <div>
                  <h4 className="font-bold text-amber-100 text-sm">UPI अॅप उघडा</h4>
                  <p className="text-xs text-amber-200 mt-0.5">Google Pay, PhonePe, किंवा Paytm ओपन करा.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center font-bold text-sm shrink-0">
                  २
                </div>
                <div>
                  <h4 className="font-bold text-amber-100 text-sm">QR Code स्कॅन करा</h4>
                  <p className="text-xs text-amber-200 mt-0.5">कॅमेरा उघडून बाजूचा QR कोड स्कॅन करा किंवा UPI ID कॉपी करा.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <div className="w-8 h-8 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center font-bold text-sm shrink-0">
                  ३
                </div>
                <div>
                  <h4 className="font-bold text-amber-100 text-sm">रक्कम टाका व पावती मिळवा</h4>
                  <p className="text-xs text-amber-200 mt-0.5">रक्कम टाकून पेमेंट पूर्ण करा. मंडळाकडून पावती दिली जाईल.</p>
                </div>
              </div>
            </div>

            {/* UPI Copy Box */}
            <div className="p-4 rounded-2xl bg-black/20 backdrop-blur-md border border-white/30 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-300 font-medium block">अधिकृत UPI ID:</span>
                <span className="text-lg font-mono font-bold text-white tracking-wide">{upiId}</span>
              </div>
              <Button
                onClick={copyUpi}
                variant="golden"
                size="sm"
                className="gap-2 shrink-0 text-xs"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
                {copied ? "कॉपी झाला!" : "UPI ID कॉपी करा"}
              </Button>
            </div>
          </div>

          {/* Right QR Card */}
          <div className="lg:col-span-5 flex justify-center">
            <Card className="w-full max-w-sm bg-white text-gray-900 rounded-3xl p-6 shadow-2xl shadow-black/40 border-4 border-amber-300 text-center space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                <Sparkles className="w-3.5 h-3.5" />
                स्कॅन करा व वर्गणी द्या
              </div>

              <h4 className="font-bold font-marathi-heading text-lg text-gray-900">
                {mandal.name}
              </h4>

              {/* QR Image Frame */}
              <div className="relative w-64 h-64 mx-auto p-3 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-inner flex items-center justify-center">
                <img
                  src={qrUrl}
                  alt="Mandal Vargani QR Code"
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiId)}`;
                  }}
                />
              </div>

              <div className="text-xs text-gray-500 font-medium space-y-1">
                <p>सर्व प्रमुख UPI अ‍ॅप्सद्वारे स्वीकार्य</p>
                <p className="text-amber-700 font-bold">GPay • PhonePe • Paytm • BHIM</p>
              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}
