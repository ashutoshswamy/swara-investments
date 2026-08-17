"use client";

import Image from "next/image";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const credentials = [
  { mark: "20+", label: "Years of combined advisory experience" },
  { mark: "SEBI", label: "AMFI / IRDA registered" },
  { mark: "1", label: "Point of contact for every product" },
];

const platforms = [
  { name: "HDFC Mutual Fund", logo: "/hdfc-mf.jpg" },
  { name: "ICICI Prudential", logo: "/icici-prudential.png" },
  { name: "SBI Mutual Fund", logo: "/sbi-mf.png" },
  { name: "LIC", logo: "/lic.jpg" },
  { name: "Axis Mutual Fund", logo: "/axis-mf.png" },
  { name: "Anand Rathi Group", logo: "/anandrathi.jpg" },
];

const features = [
  {
    title: "Who's got your back",
    copy:
      "Markets move. Life moves faster. You need someone tracking both — not just your portfolio, but your goals, your timeline, and the curveballs in between. That's the job we signed up for.",
    imageSide: "right" as const,
    image: "/whos%20got%20your%20back.png",
    ctaHref: "#approach",
  },
  {
    title: "While you live your life, your money's building one too",
    copy:
      "You don't have to choose between enjoying today and planning for tomorrow. We build strategies that let both happen at once — so your money's working while you're out living.",
    imageSide: "left" as const,
    image: "/While%20you%20live%20your%20life,%20your%20money's%20building%20one%20too.jpg",
    ctaHref: "#register",
  },
  {
    title: "This is where you hear what exactly needs to be heard",
    copy:
      "No templated advice. No jargon dump. Just a real conversation about where your money's going, where it should go, and what's actually realistic for you — served straight, no sugar.",
    imageSide: "right" as const,
    image: "/This%20is%20where%20you%20hear%20what%20exactly%20needs%20to%20be%20heard.jpg",
    ctaHref: "#services",
  },
];

function FeatureRow({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) {
  const [rowRef, isVisible] = useReveal<HTMLDivElement>();

  const copyBlock = (
    <div>
      <h2 className="text-heading tracking-tight mb-7 leading-[1.05]">
        {feature.title}
      </h2>
      <p className="text-muted-foreground leading-relaxed max-w-md mb-10">
        {feature.copy}
      </p>
      <LiquidButton
        asChild
        variant="solid"
        className="h-11 px-6 group"
      >
        <a href={feature.ctaHref}>
          Learn more
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </a>
      </LiquidButton>
    </div>
  );

  const imageBlock = (
    <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full w-full">
      <Image
        src={feature.image}
        alt={feature.title}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 50vw, 100vw"
      />
    </div>
  );

  return (
    <div
      ref={rowRef}
      className={`grid lg:grid-cols-2 lg:min-h-[480px] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {feature.imageSide === "left" ? (
        <>
          <div className="order-1 lg:order-1 flex items-center justify-center">{imageBlock}</div>
          <div className="order-2 lg:order-2 px-6 py-12 lg:px-16 lg:py-20 flex items-center">
            {copyBlock}
          </div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1 px-6 py-12 lg:px-16 lg:py-20 flex items-center">
            {copyBlock}
          </div>
          <div className="order-1 lg:order-2 flex items-center justify-center">{imageBlock}</div>
        </>
      )}
    </div>
  );
}

function CredentialsSection() {
  const [ref, isVisible] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="border-b border-foreground/10 bg-ink text-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-background/50 mb-10">
          <span className="w-8 h-px bg-background/30" />
          Standing
        </span>
        <div className="grid sm:grid-cols-3">
          {credentials.map((item, i) => (
            <div
              key={item.label}
              className={`px-0 lg:px-8 py-6 lg:py-0 border-t lg:border-t-0 lg:border-l border-background/15 first:border-t-0 lg:first:border-l-0 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p
                className="text-4xl lg:text-5xl font-display italic mb-3"
                style={{ color: "#BA8845" }}
              >
                {item.mark}
              </p>
              <p className="text-sm text-background/60 leading-snug max-w-[16ch]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformsSection() {
  const [ref, isVisible] = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="border-b border-foreground/10 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground mb-5">
              <span className="w-8 h-px bg-foreground/30" />
              Institutional access
            </span>
            <h2 className="text-heading tracking-tight">
              Where your money actually sits
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            No single-house pitch. We route across the institutions below, whichever fits your plan.
          </p>
        </div>
        <div
          className={`overflow-hidden transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max items-center gap-16 animate-marquee">
            {[...platforms, ...platforms].map((item, i) => (
              <div key={`${item.name}-${i}`} className="shrink-0 relative h-9 w-[160px]">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  className="object-contain object-center"
                  sizes="160px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RegisterCta() {
  const [ref, isVisible] = useReveal<HTMLDivElement>();

  return (
    <div id="register" ref={ref} className="border-b border-foreground/10 bg-accent text-accent-foreground">
      <div
        className={`max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20 flex flex-col items-center text-center gap-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-heading italic tracking-tight">
          Start your free registration <span className="line-through opacity-50">today</span> now
        </h2>
        <LiquidButton asChild variant="solid" size="lg" className="px-8 h-14">
          <a
            href="https://www.fundzbazar.com/customisedlinkregistration/7C7723/23642521713D3F632621713D246C3C7C77232F612A236425"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register now
          </a>
        </LiquidButton>
      </div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-foreground/10">
      <div className="border-b border-foreground/10">
        <FeatureRow feature={features[0]} index={0} />
      </div>

      <CredentialsSection />

      {features.slice(1).map((feature, index) => (
        <div key={feature.title} className="border-b border-foreground/10">
          <FeatureRow feature={feature} index={index + 1} />
        </div>
      ))}

      <RegisterCta />
      <PlatformsSection />
    </section>
  );
}
