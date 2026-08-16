import type { Metadata } from "next";
import { Navigation } from "@/components/landing/navigation";
import { InvestmentGoalCalculator } from "@/components/calculators/investment-goal-calculator";
import { FooterSection } from "@/components/landing/footer-section";

export const metadata: Metadata = {
  title: "Investment Goal Strategy Calculator",
  description: "Calculate the monthly SIP needed to reach your investment goal with Swara Investments.",
  alternates: { canonical: "/calculators/investment-goal" },
};

export default function InvestmentGoalCalculatorPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay pt-20">
      <Navigation />
      <InvestmentGoalCalculator />
      <FooterSection />
    </main>
  );
}
