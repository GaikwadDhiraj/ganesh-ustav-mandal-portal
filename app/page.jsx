"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, QrCode, MapPin, Users, HeartHandshake, Eye, CheckCircle2, ChevronLeft, ChevronRight, Phone, Laptop, Smartphone, Megaphone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllMandals } from "@/actions/mandalActions";
import { ADMIN_TEAM_MEMBERS } from "@/lib/defaultData";

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
      
      {/* Header Bar with Official Site Logo */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <img src="/logo.svg" alt="महोत्सव डिजिटल मंच Logo" className="w-12 h-12 object-contain group-hover:scale-105 transition-transform" />
            <div>
              <span className="font-extrabold font-marathi-heading text-lg sm:text-xl text-gray-900 block leading-tight">
                गणेश मंडळ वेब पोर्टल
              </span>
              <span className="text-xs font-bold text-amber-700">महोत्सव डिजीटल मंच</span>
            </div>
          </Link>

          {/* Clean Header Action: Only Mandal Registration Button */}
          <div className="flex items-center gap-3">
            <Link href="/register">
              <Button variant="golden" size="sm" className="gap-2 font-bold shadow-md">
                + स्वतःचे मंडळ पोर्टल तयार करा
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-600 via-amber-500 to-[#FFFDF9] text-white pt-16 pb-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-6 relative z-10">
          <Badge variant="golden" className="px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg">
            ✨ आपल्या गणेशोत्सवासाठी डिजीटल मंच
          </Badge>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-marathi-heading tracking-tight text-amber-50 leading-tight">
            गणेशोत्सव वेब पोर्टल जनरेटर
          </h1>

          <p className="text-lg sm:text-2xl text-amber-100 max-w-3xl mx-auto font-medium leading-relaxed">
            तुमच्या गणेशोत्सवासाठी अधिकृत वेब पोर्टल तयार करा. 
            वेळापत्रक, कार्यकारिणी, गॅलरी आणि ऑनलाइन वर्गणी एकाच ठिकाणी!
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="golden" className="w-full sm:w-auto px-8 py-6 text-lg font-bold gap-2 shadow-2xl">
                तुमच्या मंडळाचे पोर्टल तयार करा
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#portal-list">
              <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg font-bold bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/40">
                नोंदणीकृत मंडळे पहा
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* 3 Easy Steps Information */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
            पोर्टल निर्मिती प्रक्रिया
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
            केवळ ३ सोप्या टप्प्यांत तुमचे वेब पोर्टल तयार करा
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-3xl bg-amber-50/60 border-2 border-amber-200 text-center space-y-4 hover:border-amber-400 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-orange-600 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
              १
            </div>
            <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
              १. मंडळाची माहिती भरा
            </h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              नाव, स्थापना वर्ष, पत्ता, घोषवाक्य व २ स्वतंत्र वर्णने (संक्षिप्त व सविस्तर) प्रविष्ट करा.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-amber-50/60 border-2 border-amber-200 text-center space-y-4 hover:border-amber-400 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
              २
            </div>
            <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
              २. वेळापत्रक, सदस्य व फोटो जोडा
            </h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              उत्सव वेळापत्रक, कार्यकारिणी सदस्य, फोटो गॅलरी आणि वर्गणी UPI ID अपलोड करा.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-amber-50/60 border-2 border-amber-200 text-center space-y-4 hover:border-amber-400 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
              ३
            </div>
            <h3 className="text-xl font-bold font-marathi-heading text-gray-900">
              ३. वेब पोर्टल सक्रिय करा
            </h3>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              फॉर्म सादर करा. ॲडमिन मंजुरीनंतर तुमचा स्वतःचा वेब लिंक (Slug) व QR कोड सक्रिय होईल!
            </p>
          </div>

        </div>
      </section>

      {/* Portal List with Pagination */}
      <section id="portal-list" className="py-16 bg-gradient-to-b from-amber-50/50 to-white px-4 sm:px-8 border-t border-amber-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
              पोर्टल सूची
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
              नोंदणीकृत गणेश मंडळे (Registered Portals)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
              खालील मंडळांच्या अधिकृत वेब पोर्टलवर जाऊन दर्शन व माहिती मिळवा.
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500 font-bold">
              मंडळे लोड होत आहेत...
            </div>
          ) : approvedMandals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-amber-200">
              <p className="text-gray-500 font-bold font-marathi-heading text-lg">सध्या कोणतेही मंडळ नोंदणीकृत नाही.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedMandals.map((mandal) => (
                <Card key={mandal.id} className="rounded-3xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl flex flex-col justify-between">
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="golden" className="text-[11px] font-bold">
                        स्थापना: {mandal.establishedYear || "सार्वजनिक"}
                      </Badge>
                      <Badge variant={mandal.status === "APPROVED" ? "approved" : "pending"}>
                        {mandal.status === "APPROVED" ? "सक्रिय पोर्टल" : "प्रलंबित"}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold font-marathi-heading text-gray-900 line-clamp-2">
                      {mandal.name}
                    </h3>

                    <p className="text-xs text-amber-800 font-bold flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      {mandal.address}, {mandal.city}
                    </p>

                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium">
                      {mandal.shortDescription || mandal.aboutText}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50/80 border-t border-amber-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-orange-700 truncate max-w-[150px]">
                      /mandal/{mandal.slug}
                    </span>

                    <Link href={`/mandal/${mandal.slug}`}>
                      <Button size="sm" variant="golden" className="gap-1.5 font-bold text-xs">
                        <Eye className="w-3.5 h-3.5 text-amber-950" />
                        वेब पोर्टल पहा
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                variant="outline"
                size="sm"
                className="gap-1 font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                मागील
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
                पुढील
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

        </div>
      </section>

      {/* Website Team Contact Details Section - ALL 6 ADMINS IN SAME UNIFORM FORMAT */}
      <section className="py-16 bg-[#FFF9EF] border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-amber-700 font-bold text-sm tracking-widest uppercase bg-amber-100 px-4 py-1.5 rounded-full inline-block mb-3 border border-amber-300">
              तांत्रिक मदत व संपर्क
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-marathi-heading text-gray-900">
              अधिकृत ॲडमिन टीम संपर्क माहिती (Admin Team)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2 font-medium">
              वेब पोर्टलबाबत काही समस्या असल्यास खालील कोणत्याही अधिकृत ॲडमिनशी थेट संपर्क साधा
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADMIN_TEAM_MEMBERS.map((admin, idx) => (
              <div key={idx} className="p-5 rounded-3xl bg-white border-2 border-amber-200 shadow-md hover:shadow-lg hover:border-amber-400 transition-all space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="golden" className="text-[11px] font-bold">
                    👑 ॲडमिन #{idx + 1}
                  </Badge>
                  <span className="text-xs text-amber-800 font-bold">{admin.designation}</span>
                </div>

                <h4 className="font-extrabold text-lg font-marathi-heading text-gray-900">
                  {admin.name}
                </h4>

                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <a
                    href={`tel:${admin.phone}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4" />
                    कॉल ({admin.phone})
                  </a>

                  <a
                    href={`https://wa.me/91${admin.phone}?text=${encodeURIComponent(`नमस्कार ${admin.name}, मी गणेश मंडळ पोर्टल नोंदणी संदर्भात संपर्क करत आहे.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center p-2 bg-green-600 text-white rounded-xl text-xs font-bold hover:bg-green-700 transition-colors shadow-sm"
                    title="WhatsApp वर मेसेज करा"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
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
