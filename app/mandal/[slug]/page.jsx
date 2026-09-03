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
