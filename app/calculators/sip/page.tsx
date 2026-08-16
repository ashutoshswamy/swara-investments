import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { SipCalculator } from "@/components/calculators/sip-calculator";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "SIP Calculator",
  description: "Calculate the future value of your monthly SIP investments with Swara Investments.",
  alternates: { canonical: "/calculators/sip" },
};

export default function SipCalculatorPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pt-20">
      <Navigation />
      <SipCalculator />
      <FooterSection />
    </main>
  );
}
