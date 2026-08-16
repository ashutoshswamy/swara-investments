"use client";

import Link from "next/link";
import { Calculator, Armchair, LineChart, Target } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const calculators = [
  { name: "SIP Calculator", href: "/calculators/sip", icon: Calculator },
  { name: "Lumpsum Calculator", href: "/calculators/lumpsum", icon: Calculator },
  { name: "Retirement Corpus Calculator", href: "/calculators/retirement-corpus", icon: Armchair },
  { name: "Returns Calculator (CAGR)", href: "/calculators/returns-cagr", icon: LineChart },
  { name: "Investment Goal Strategy Calculator", href: "/calculators/investment-goal", icon: Target },
];

function CalculatorTile({
  calculator,
  index,
}: {
  calculator: (typeof calculators)[number];
  index: number;
}) {
  const [ref, isVisible] = useReveal<HTMLAnchorElement>();
  const Icon = calculator.icon;

  return (
    <Link
      ref={ref}
      href={calculator.href}
      className={`liquid-glass-hover flex flex-col items-center gap-4 rounded-2xl p-6 text-center transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent">
        <Icon className="h-8 w-8 text-accent-foreground" strokeWidth={1.5} />
      </div>
      <p className="font-medium leading-tight">{calculator.name}</p>
    </Link>
  );
}

export function CalculatorsGrid() {
  const [sectionRef, isVisible] = useReveal<HTMLDivElement>(0.1);

  return (
    <section ref={sectionRef} className="relative">
      <div className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Calculators
            </span>
            <h2
              className={`text-heading tracking-tight transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Plan your investments.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {calculators.map((calculator, index) => (
              <CalculatorTile key={calculator.name} calculator={calculator} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
