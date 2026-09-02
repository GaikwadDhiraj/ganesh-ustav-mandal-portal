"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, QrCode, MapPin, Users, HeartHandshake, Eye, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllMandals } from "@/actions/mandalActions";

export default function HomePage() {
  const [approvedMandals, setApprovedMandals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMandals() {
      try {
        const mandals = await getAllMandals();
        const filtered = mandals.filter(m => m.status === "APPROVED" || m.status === "PENDING");
        setApprovedMandals(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMandals();
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900 font-marathi selection:bg-amber-200">
      
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-orange-600 to-amber-400 p-0.5 flex items-center justify-center text-white text-xl shadow-md">
              🌸
            </div>
            <div>
              <span className="font-extrabold font-marathi-heading text-lg sm:text-xl text-gray-900 block leading-tight">
                गणेश मंडळ वेब पोर्टल
              </span>
              <span className="text-xs font-semibold text-amber-700">महोत्सव डिजीटल मंच</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-xs">
                ॲडमिन लॉगिन / पॅनेल
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="golden" size="sm" className="gap-1.5 text-xs">
                + मंडळ नोंदणी करा
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-b from-orange-600 via-amber-500 to-amber-50 text-white pt-16 pb-24 lg:pt-24 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2">
            <Badge variant="golden" className="px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider shadow-lg">
              ✨ गणेशोत्सव डिजीटल क्रांती
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-marathi-heading text-amber-50 leading-tight drop-shadow-md">
            आपल्या गणेश मंडळाचे अधिकृत वेब पोर्टल मिनिटांत तयार करा!
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-amber-200 font-marathi-heading">
            ॥ गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! ॥
          </p>

          <p className="text-base sm:text-lg text-amber-50/90 max-w-3xl mx-auto leading-relaxed">
            उत्सव वेळापत्रक, आरतीच्या वेळा, मंडळ कार्यकारिणी, फोटो गॅलरी, ऑनलाईन वर्गणी (QR / UPI ID) आणि गूगल मॅप पत्त्यासह सर्व उपकरणांवर चालणारे आकर्षक वेब पोर्टल.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" variant="golden" className="gap-2 text-base px-8 py-4 shadow-2xl">
                तुमच्या मंडळाची मोफत नोंदणी करा
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#registered-mandals">
              <Button size="lg" className="bg-white text-orange-700 hover:bg-amber-50 gap-2 border-2 border-white text-base font-bold">
                नोंदणीकृत मंडळे पहा
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 -mt-16 relative z-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-2 border-amber-200 bg-white shadow-xl rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-xl font-bold shadow-md">
              📅
            </div>
            <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
              वळणदार उत्सव वेळापत्रक (Path Schedule)
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              आरती, महाप्रसाद व सांस्कृतिक कार्यक्रमांची आकर्षक ॲनिमेटेड टाइमलाइन.
            </p>
          </Card>

          <Card className="p-6 border-2 border-amber-200 bg-white shadow-xl rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl font-bold shadow-md">
              👥
            </div>
            <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
              कार्यकारिणी सदस्य स्लाइडर (Members Carousel)
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              अध्यक्ष, सचिव, खजिनदार व कार्यकर्त्यांचे फोटोंसह horizontal कार्ड्स.
            </p>
          </Card>

          <Card className="p-6 border-2 border-amber-200 bg-white shadow-xl rounded-3xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500 text-gray-950 flex items-center justify-center text-xl font-bold shadow-md">
              💳
            </div>
            <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
              ऑनलाइन वर्गणी (QR & UPI Integration)
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              भाविकांसाठी डायरेक्ट UPI ID व QR Code द्वारे ऑनलाइन वर्गणी स्वीकारण्याची सोय.
            </p>
          </Card>
        </div>
      </section>

      {/* Registered Mandals Showcase */}
      <section id="registered-mandals" className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
            पोर्टल सूची
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
            सक्रिय गणेशोत्सव मंडळ वेब पोर्टल्स
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            खालील पोर्टल्सवर क्लिक करून प्रत्यक्ष देखावा व वेळापत्रक पहा
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {approvedMandals.map((mandal) => (
            <Card key={mandal.id} className="overflow-hidden border border-amber-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 rounded-3xl flex flex-col justify-between">
              
              <div className="relative h-48 bg-orange-900 overflow-hidden">
                <img
                  src={mandal.heroImageUrl || "/public/ganpati bappa.jfif"}
                  alt={mandal.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <Badge variant="golden" className="text-xs">
                    स्थापना वर्ष: {mandal.establishedYear || "सार्वजनिक"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xl font-marathi-heading text-gray-900 line-clamp-2">
                    {mandal.name}
                  </h3>
                  <p className="text-xs text-amber-700 font-semibold mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {mandal.address}, {mandal.city}
                  </p>
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">
                    {mandal.aboutText || "श्रींच्या चरणी आमचे सहर्ष नमन."}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    📱 {mandal.contactPhone}
                  </span>
                  <Link href={`/mandal/${mandal.slug}`}>
                    <Button variant="golden" size="sm" className="gap-1.5 text-xs">
                      वेब पोर्टल पहा
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>

            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-10 text-center border-t-4 border-amber-500">
        <p className="font-marathi-heading text-lg font-bold text-amber-400">
          ॥ गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! ॥
        </p>
        <p className="text-xs text-gray-500 mt-2">
          © {new Date().getFullYear()} गणेश मंडळ वेब पोर्टल प्लॅटफॉर्म. सर्व हक्क सुरक्षित.
        </p>
      </footer>

    </main>
  );
}
