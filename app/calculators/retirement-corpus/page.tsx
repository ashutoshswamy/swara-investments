import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { RetirementCorpusCalculator } from "@/components/calculators/retirement-corpus-calculator";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Retirement Corpus Calculator",
  description: "Estimate the retirement corpus you'll need with Swara Investments.",
  alternates: { canonical: "/calculators/retirement-corpus" },
};

export default function RetirementCorpusCalculatorPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pt-20">
      <Navigation />
      <RetirementCorpusCalculator />
      <FooterSection />
    </main>
  );
}
