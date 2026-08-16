import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { ReturnsCalculator } from "@/components/calculators/returns-calculator";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Returns Calculator (CAGR)",
  description: "Calculate the compound annual growth rate (CAGR) of an investment with Swara Investments.",
  alternates: { canonical: "/calculators/returns-cagr" },
};

export default function ReturnsCalculatorPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pt-20">
      <Navigation />
      <ReturnsCalculator />
      <FooterSection />
    </main>
  );
}
