"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { GrowthStairs } from "./growth-stairs";

// TODO: swap in the real email / phone once confirmed
const CONTACT_EMAIL = "contact@swarainvestments.com";
const CONTACT_PHONE = "+91-00000-00000";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8 leading-[0.95]">
                  Let&apos;s talk about
                  <br />
                  your portfolio.
                </h2>

                <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                  Reach out for a conversation about portfolio management, wealth advisory,
                  or research coverage — no obligation, no hard sell.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-none group"
                  >
                    <a href={`mailto:${CONTACT_EMAIL}`}>
                      Email us
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base rounded-none border-foreground/20 hover:bg-foreground/5"
                  >
                    <a href={`tel:${CONTACT_PHONE}`}>Call us</a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground mt-8 font-mono">{CONTACT_EMAIL}</p>
              </div>

              {/* Compounding growth visual */}
              <div className="hidden lg:block w-[380px] h-[280px] -mr-8 opacity-90">
                <GrowthStairs />
              </div>
            </div>
          </div>

          {/* Ledger corner marks */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}
