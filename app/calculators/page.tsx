import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { CalculatorsGrid } from "@/components/calculators/calculators-grid";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Calculators",
  description:
    "Free investment calculators from Swara Investments — SIP, lumpsum, retirement corpus, returns (CAGR), and investment goal strategy.",
  alternates: {
    canonical: "/calculators",
  },
};

export default function CalculatorsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pt-20">
      <Navigation />
      <CalculatorsGrid />
      <FooterSection />
    </main>
  );
}
