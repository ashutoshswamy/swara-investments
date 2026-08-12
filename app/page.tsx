import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { AboutSection } from "@/components/landing/about-section";
import { InquiryStrip } from "@/components/landing/inquiry-strip";
import { ApproachSection } from "@/components/landing/approach-section";
import { ServicesSection } from "@/components/landing/services-section";
import { ContactSection } from "@/components/landing/contact-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pt-20">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <InquiryStrip />
      <ApproachSection />
      <ServicesSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
