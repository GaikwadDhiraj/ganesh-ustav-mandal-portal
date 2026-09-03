import { getMandalBySlug } from "@/actions/mandalActions";
import PortalNavbar from "@/components/portal/PortalNavbar";
import HeroSection from "@/components/portal/HeroSection";
import AboutSection from "@/components/portal/AboutSection";
import PathScheduleSection from "@/components/portal/PathScheduleSection";
import SlidingMembersSection from "@/components/portal/SlidingMembersSection";
import SlidingGallerySection from "@/components/portal/SlidingGallerySection";
import DonationSection from "@/components/portal/DonationSection";
import MapSection from "@/components/portal/MapSection";
import FooterSection from "@/components/portal/FooterSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ADMIN_TEAM_MEMBERS } from "@/lib/defaultData";
import { Clock, ShieldAlert, Phone, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const mandal = await getMandalBySlug(resolvedParams.slug);
  if (!mandal) {
    return {
      title: "मंडळ सापडले नाही | Ganesh Mandal Portal",
    };
  }
  return {
    title: `${mandal.name} - अधिकृत वेब पोर्टल`,
    description: `${mandal.name} चे अधिकृत गणेशोत्सव वेब पोर्टल. उत्सव वेळापत्रक, फोटो गॅलरी, व वर्गणी.`,
  };
}

export default async function MandalPortalPage({ params }) {
  const resolvedParams = await params;
  const mandal = await getMandalBySlug(resolvedParams.slug);

  if (!mandal) {
    notFound();
  }

  // URL Blocking: If mandal is NOT APPROVED (e.g. PENDING or REJECTED), block public access!
  if (mandal.status !== "APPROVED") {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-amber-950 text-white flex items-center justify-center p-4 font-marathi">
        <Card className="max-w-xl w-full bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border-4 border-amber-400 space-y-6 text-center">
          
          <div className="w-20 h-20 rounded-full bg-amber-500 text-white mx-auto flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
            <Clock className="w-10 h-10 animate-pulse" />
          </div>

          <Badge variant="pending" className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider mx-auto">
            {mandal.status === "REJECTED" ? "ॲडमिनद्वारे रद्द केले (Rejected)" : "ॲडमिन मंजुरीसाठी प्रलंबित (Pending Approval)"}
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-marathi-heading text-gray-900">
            {mandal.name}
          </h2>

          <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-left space-y-2">
            <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider block">पोर्टल स्थिती सूचना:</span>
            <p className="text-sm font-bold text-gray-800 leading-relaxed">
              सध्या हे वेब पोर्टल ॲडमिन पडताळणी व मंजुरीसाठी प्रलंबित आहे. ॲडमिनद्वारे अर्ज व पेमेंट पडताळणी पूर्ण झाल्यानंतर हा वेब पोर्टल सक्रिय केला जाईल.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-left space-y-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">मदतीसाठी ॲडमिन संपर्क:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-gray-700">
              {ADMIN_TEAM_MEMBERS.slice(0, 4).map((admin, idx) => (
                <a key={idx} href={`tel:${admin.phone}`} className="p-2 bg-white rounded-lg border border-amber-200 flex items-center justify-between hover:bg-amber-50">
                  <span>{admin.name}</span>
                  <span className="font-mono text-orange-700">{admin.phone}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Link href="/">
              <Button variant="golden" className="w-full justify-center gap-2 font-bold">
                <ArrowLeft className="w-4 h-4" />
                मुख्य पृष्ठावर (Home) परत जा
              </Button>
            </Link>
          </div>

        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFDF9] text-gray-900 font-marathi">
      {/* 1. Header Navigation */}
      <PortalNavbar mandalName={mandal.name} slug={mandal.slug} />

      {/* 2. Hero Section */}
      <HeroSection mandal={mandal} />

      {/* 3. About Section */}
      <AboutSection mandal={mandal} />

      {/* 4. Animated Downward Path Schedule */}
      <PathScheduleSection events={mandal.events || []} />

      {/* 5. Horizontal Sliding Members */}
      <SlidingMembersSection members={mandal.members || []} />

      {/* 6. Horizontal Sliding Gallery */}
      <SlidingGallerySection gallery={mandal.gallery || []} />

      {/* 7. Online Donation / Vargani */}
      <DonationSection mandal={mandal} />

      {/* 8. Google Map Location */}
      <MapSection mandal={mandal} />

      {/* 9. Mandal Footer */}
      <FooterSection mandal={mandal} />
    </main>
  );
}
