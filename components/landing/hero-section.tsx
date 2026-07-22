"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { MarketChart } from "./market-chart";

const marqueeItems = [
  "Portfolio Management",
  "Wealth Advisory",
  "Mutual Funds & Insurance",
  "Equity Research",
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Ambient market chart */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-full lg:w-[55%] opacity-[0.35] pointer-events-none">
        <MarketChart />
      </div>

      {/* Ledger rule lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{ top: `${12.5 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div
          className={`mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground">
            <span className="w-8 h-px bg-foreground/30" />
            Mumbai, India
          </span>
        </div>

        {/* Main headline */}
        <div className="mb-12">
          <h1
            className={`text-[clamp(2.75rem,9vw,7.5rem)] font-display leading-[0.98] tracking-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="block">Disciplined capital.</span>
            <span className="block italic text-primary">Deliberate growth.</span>
          </h1>
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p
            className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Swara Investments is a Mumbai-based investment firm managing portfolios,
            advising wealth, and researching markets for clients who&apos;d rather
            compound quietly than chase headlines.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-none group"
            >
              <a href="#contact">
                Get in touch
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base rounded-none border-foreground/20 hover:bg-foreground/5"
            >
              <a href="#services">Our services</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Ledger marquee */}
      <div
        className={`absolute bottom-0 left-0 right-0 border-t border-foreground/10 bg-foreground text-background transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex marquee whitespace-nowrap py-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex">
              {marqueeItems.map((item) => (
                <span
                  key={`${item}-${i}`}
                  className="flex items-center gap-6 text-sm font-mono tracking-[0.15em] uppercase px-6"
                >
                  {item}
                  <span className="w-1 h-1 rounded-full bg-background/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
