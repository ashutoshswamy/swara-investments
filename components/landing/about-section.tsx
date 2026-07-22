"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
          {/* Eyebrow / label column */}
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground">
              <span className="w-8 h-px bg-foreground/30" />
              About
            </span>
          </div>

          {/* Copy column */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-display tracking-tight mb-8 leading-tight">
              A research-led investment firm,
              <br />
              based in Mumbai.
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                We work from India&apos;s financial capital because it puts us close to the
                markets, the regulators, and the businesses we research. That proximity
                shapes how we invest: with information gathered first-hand, not secondhand.
              </p>
              <p>
                Swara Investments exists to manage capital the way we&apos;d want our own
                managed — with a clear process, a long horizon, and no incentive to trade
                more than the portfolio needs. We&apos;d rather compound steadily for a client
                for years than win a single quarter.
              </p>
            </div>
            {/* TODO: add founding year, SEBI/AMFI registration details, and team once confirmed */}

            {/* TODO: replace with a real office / Mumbai skyline photo */}
            <div className="relative mt-12 border border-foreground/10 max-w-2xl aspect-[16/9] overflow-hidden">
              <Image
                src="/placeholder.svg"
                alt="Swara Investments office — placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
