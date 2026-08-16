import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { LumpsumCalculator } from "@/components/calculators/lumpsum-calculator";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Lumpsum Calculator",
  description: "Calculate the future value of a one-time lumpsum investment with Swara Investments.",
  alternates: { canonical: "/calculators/lumpsum" },
};

export default function LumpsumCalculatorPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pt-20">
      <Navigation />
      <LumpsumCalculator />
      <FooterSection />
    </main>
  );
}
