"use client";

import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight } from "lucide-react";

export function InquiryStrip() {
  return (
    <div className="relative border-t border-foreground/10 bg-muted py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-heading leading-snug tracking-tight">
          Our aim is to help you secure your long term financial well being
          and guide you through your financial life cycle
        </p>
        <div className="mt-10 flex justify-center">
          <LiquidButton
            asChild
            variant="solid"
            size="lg"
            className="px-8 h-14 group"
          >
            <a href="#contact">
              Let&apos;s Connect
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </LiquidButton>
        </div>
      </div>
    </div>
  );
}
