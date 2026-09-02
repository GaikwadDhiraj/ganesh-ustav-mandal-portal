"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, QrCode, MapPin, Users, HeartHandshake, Eye, CheckCircle2, ChevronLeft, ChevronRight, Phone, Laptop, Smartphone, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllMandals } from "@/actions/mandalActions";

export default function HomePage() {
  const [approvedMandals, setApprovedMandals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination for Mandals List (6 per page)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const totalPages = Math.ceil(approvedMandals.length / itemsPerPage) || 1;
  const paginatedMandals = approvedMandals.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900 font-marathi selection:bg-amber-200">
      
      {/* Header Bar (Removed Admin button as requested) */}
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
              <span className="text-xs font-bold text-amber-700">महोत्सव डिजीटल मंच</span>
            </div>
          </div>

          {/* Clean Header Action: Only Mandal Registration Button */}
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button variant="golden" size="sm" className="gap-1.5 text-xs font-bold shadow-md">
                + मंडळ नोंदणी करा
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Banner (Removed 'मोफत' text) */}
      <section className="relative bg-gradient-to-b from-orange-600 via-amber-500 to-amber-50 text-white pt-16 pb-24 lg:pt-24 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2">
            <Badge variant="golden" className="px-4 py-1.5 text-xs sm:text-sm uppercase tracking-wider shadow-lg font-bold">
              ✨ गणेशोत्सव डिजीटल क्रांती
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-marathi-heading text-amber-50 leading-tight drop-shadow-md">
            आपल्या गणेश मंडळाचे अधिकृत वेब पोर्टल मिनिटांत तयार करा!
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-amber-200 font-marathi-heading">
            ॥ गणपती बाप्पा मोरया! मंगलमूर्ती मोरया! ॥
          </p>

          <p className="text-base sm:text-lg text-amber-50/90 max-w-3xl mx-auto leading-relaxed font-medium">
            उत्सव वेळापत्रक, आरतीच्या वेळा, मंडळ कार्यकारिणी, फोटो गॅलरी, ऑनलाईन वर्गणी (QR / UPI ID) आणि गूगल मॅप पत्त्यासह सर्व उपकरणांवर चालणारे आकर्षक वेब पोर्टल.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" variant="golden" className="gap-2 text-base px-8 py-4 shadow-2xl font-bold">
                तुमच्या मंडळाची नोंदणी करा
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
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
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
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
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
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              भाविकांसाठी डायरेक्ट UPI ID व QR Code द्वारे ऑनलाइन वर्गणी स्वीकारण्याची सोय.
            </p>
          </Card>
        </div>
      </section>

      {/* Registration Steps Section (पोर्टल सूची आधी नोंदणी प्रक्रियेच्या पायऱ्या) */}
      <section className="py-16 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 border-y border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
              सोपी प्रक्रिया
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
              वेब पोर्टल नोंदणी कशी करावी? (Registration Steps)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
              केवळ ३ सोप्या टप्प्यांत तुमच्या मंडळाचे लाइव्ह वेब पोर्टल मिळवा
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-lg relative text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white font-extrabold font-marathi-heading text-2xl flex items-center justify-center mx-auto shadow-md">
                १
              </div>
              <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                मंडळाची माहिती भरा
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                मंडळाचे नाव, इतिहास, वेळापत्रक, कार्यकारिणी सदस्य, फोटो गॅलरी व वर्गणी QR Code माहिती प्रविष्ट करा.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-lg relative text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white font-extrabold font-marathi-heading text-2xl flex items-center justify-center mx-auto shadow-md">
                २
              </div>
              <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                ऑनलाइन फी पेमेंट करा
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                शेवटी दिलेल्या QR कोडवर पोर्टल नोंदणी फी भरून 12 अंकी Transaction ID (UTR) फॉर्ममध्ये टाका.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-3xl bg-white border-2 border-amber-200 shadow-lg relative text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white font-extrabold font-marathi-heading text-2xl flex items-center justify-center mx-auto shadow-md">
                ३
              </div>
              <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                लाइव्ह पोर्टल व QR Code मिळवा
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                ॲडमिन पडताळणीनंतर तुमचा वेब पोर्टल लिंक आणि डाऊनलोडेबल QR Code लगेच सक्रिय होईल.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Registered Mandals Showcase with Pagination */}
      <section id="registered-mandals" className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-200">
            पोर्टल सूची
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
            सक्रिय गणेशोत्सव मंडळ वेब पोर्टल्स
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
            खालील पोर्टल्सवर क्लिक करून प्रत्यक्ष देखावा व वेळापत्रक पहा
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedMandals.map((mandal) => (
            <Card key={mandal.id} className="overflow-hidden border border-amber-200 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 rounded-3xl flex flex-col justify-between">
              
              <div className="relative h-48 bg-orange-900 overflow-hidden">
                <img
                  src={mandal.heroImageUrl || "/hero-main-ganesha.jpg"}
                  alt={mandal.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <Badge variant="golden" className="text-xs font-bold">
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
                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 font-medium">
                    {mandal.aboutText || "श्रींच्या चरणी आमचे सहर्ष नमन."}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-bold">
                    📱 {mandal.contactPhone}
                  </span>
                  <Link href={`/mandal/${mandal.slug}`}>
                    <Button variant="golden" size="sm" className="gap-1.5 text-xs font-bold">
                      वेब पोर्टल पहा
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>

            </Card>
          ))}
        </div>

        {/* Pagination Controls for Mandals List */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-12">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              variant="outline"
              size="sm"
              className="gap-1 font-bold"
            >
              <ChevronLeft className="w-4 h-4" />
              मागील (Previous)
            </Button>

            <span className="text-xs font-bold text-gray-700 px-3">
              पान {currentPage} पैकी {totalPages}
            </span>

            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              variant="outline"
              size="sm"
              className="gap-1 font-bold"
            >
              पुढील (Next)
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </section>

      {/* Website Team Contact Details Section */}
      <section className="py-16 bg-[#FFF9EF] border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
              तांत्रिक मदत व संपर्क
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
              वेबसाईट संपर्क व तांत्रिक टीम (Contact Details)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
              वेब पोर्टलबाबत काही समस्या असल्यास खालील प्रतिनिधींशी संपर्क साधा
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base font-marathi-heading text-gray-900">Dhiraj Gaikwad</h4>
                <a href="tel:8600570542" className="text-sm font-mono font-bold text-orange-600 hover:underline">
                  8600570542
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base font-marathi-heading text-gray-900">Kaustubh Ronge</h4>
                <a href="tel:7498444684" className="text-sm font-mono font-bold text-orange-600 hover:underline">
                  7498444684
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-700 text-white flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base font-marathi-heading text-gray-900">Vijay Patil</h4>
                <a href="tel:7620198805" className="text-sm font-mono font-bold text-orange-600 hover:underline">
                  7620198805
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-600 text-white flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base font-marathi-heading text-gray-900">Vivek Pawar</h4>
                <a href="tel:9890528006" className="text-sm font-mono font-bold text-orange-600 hover:underline">
                  9890528006
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base font-marathi-heading text-gray-900">Dipak Pawar</h4>
                <a href="tel:8669233747" className="text-sm font-mono font-bold text-orange-600 hover:underline">
                  8669233747
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base font-marathi-heading text-gray-900">Atharv Malavde</h4>
                <a href="tel:9322027844" className="text-sm font-mono font-bold text-orange-600 hover:underline">
                  9322027844
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
              आमची वैशिष्ट्ये
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
              आमच्या सेवा (Our Services)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
              आम्ही तुमच्या व्यवसायासाठी आणि संस्थांसाठी उत्तम डिजीटल सोल्यूशन्स पुरवतो
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200 text-center space-y-4 hover:border-amber-400 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-orange-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <Laptop className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                वेब डिझाईन (Web Design & Development)
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                सर्व उपकरणांवर चालणाऱ्या आकर्षक, फास्ट व रेस्पॉन्सिव्ह वेबसाईटची निर्मिती.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200 text-center space-y-4 hover:border-amber-400 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                ॲप डेव्हलपमेंट (App Development)
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Android व iOS साठी हाय-परफॉर्मन्स मोबाईल ॲप्लिकेशन्स.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200 text-center space-y-4 hover:border-amber-400 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500 text-gray-950 flex items-center justify-center mx-auto shadow-lg">
                <Megaphone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
                डिजीटल मार्केटिंग व ब्रँडिंग (Digital Marketing)
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                सोशल मीडिया प्रमोशन, SEO, जाहिराती आणि डिजीटल ब्रँडिंग.
              </p>
            </div>

          </div>
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
