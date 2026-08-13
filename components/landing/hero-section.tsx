"use client";

import Image from "next/image";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight } from "lucide-react";
import { PulseLine } from "./pulse-line";

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Vignette: darkens the center for legibility regardless of what the photo shows there */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(23,19,15,0.35)_0%,rgba(23,19,15,0.75)_75%)]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full px-6 lg:px-12 py-28 text-center">
        <div className="animate-fade-up">
          <p
            className="tracking-[0.2em] uppercase text-background/60 mb-6 font-light"
            style={{ fontFamily: "var(--font-sansation)", fontSize: 20 }}
          >
            Because dreams need a plan
          </p>
          <h1
            className="italic leading-[1.08] tracking-tight text-background font-normal"
            style={{ fontFamily: "var(--font-libre-baskerville)", fontSize: 45 }}
          >
            Good vacations don&apos;t happen by luck. Neither does good money.
          </h1>
          <div className="mt-10 flex justify-center">
            <LiquidButton
              asChild
              variant="solid"
              size="lg"
              className="px-8 h-14 group"
            >
              <a href="#contact">
                Entrust us with your plan
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </LiquidButton>
          </div>
          <div className="mt-14 h-8 w-40 mx-auto opacity-50">
            <PulseLine />
          </div>
        </div>
      </div>
    </section>
  );
}
