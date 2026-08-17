"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const services = [
  {
    title: "Mutual Fund",
    image: "/services%20Section/mutual%20funds.jpg",
    bullets: [
      "A Mutual Fund is a trust that pools the savings of a number of investors who share the common financial goal.",
      "We provide lump sum as well as SIP investment options to our clients, investing across Debt, Equity, Balance, Liquid, Index, and Arbitrage funds as per their requirements.",
      "We serve our clients with the latest mutual fund portfolio and doorstep service for switches, redemption, cancellation, and any other transactions.",
    ],
  },
  {
    title: "Life Insurance",
    image: "/services%20Section/life%20insurance.jpg",
    bullets: [
      "Life insurance is a contract that pledges payment of an amount to the person assured (or his/her nominee) on the happening of the event insured against.",
      "In life insurance we provide Term Plans, Traditional Plans, ULIPs, and Pension Plans and so on.",
    ],
  },
  {
    title: "Health Insurance",
    image: "/services%20Section/health%20insurance.jpg",
    bullets: [
      "Health insurance is insurance that pays for medical expenses. It is sometimes used more broadly to include insurance covering disability or long-term nursing or custodial care needs.",
      "It may be provided through a government-sponsored social insurance program, or from private insurance companies.",
      "We provide service to our clients for claim settlement and other issues.",
    ],
  },
  {
    title: "Motor Insurance",
    image: "/services%20Section/Motor%20insurance.png",
    bullets: [
      "Insurance purchased by the owner of a vehicle to cover losses due to traffic accidents or theft.",
      "In Motor Insurance we have tie-ups with General Insurance Co Ltd and so on.",
      "We serve our clients for quotes in terms of premium, claim settlement, and other issues.",
    ],
  },
  {
    title: "Consultancy & Compliance Services",
    image: "/services%20Section/Compliance%20and%20Consultancy.jpg",
    bullets: [
      "Portfolio and financial planning.",
      "Merger and acquisitions.",
      "Other allied laws.",
      "Amongst the staff / department / management's & other feedback, briefing, co-ordination & follow up with the company like insurance, mutual fund, general insurance and loans etc.",
    ],
  },
];

const advantages = [
  "Rich experience and exposure to a wide variety of business situations",
  "Ability to provide a comprehensive range of integrated services",
  "Proficiency in rendering consistent, high quality, value-added services",
  "Competency to provide focused advice, timely responses, and unique, creative, practical solutions",
  "Maintenance of the highest professional standards",
  "Doorstep service to our clients any time they require it",
  "All financial services under one roof — one point of contact for all",
  "Convenience and consolidation: one statement for every product",
];

function ServiceTile({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isVisible] = useReveal<HTMLButtonElement>();

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setIsOpen((v) => !v)}
      aria-expanded={isOpen}
      className={`relative aspect-[3/4] overflow-hidden group text-left w-full transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <Image
        src={service.image}
        alt={service.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 20vw, 50vw"
      />
      <div
        className={`absolute inset-x-0 bottom-0 bg-ink/80 px-5 py-4 transition-opacity duration-300 group-hover:opacity-0 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="font-display text-lg lg:text-xl text-background leading-tight">
          {service.title}
        </p>
      </div>

      {/* Detail reveal — hover on desktop, tap on touch devices */}
      <div
        className={`absolute inset-0 bg-ink/90 px-6 py-8 flex flex-col opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 ${
          isOpen ? "opacity-100 translate-y-0" : ""
        }`}
      >
        <p className="font-display text-xl lg:text-2xl text-background mb-5 leading-tight">
          {service.title}
        </p>
        <ul className="space-y-3 overflow-y-auto">
          {service.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2.5 text-sm text-background/80 leading-relaxed">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-background/50 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export function ServicesSection() {
  const [sectionRef, isVisible] = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="services" ref={sectionRef} className="relative border-t border-foreground/10">
      <div className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-14">
            <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground mb-6">
              <span className="w-8 h-px bg-foreground/30" />
              Services
            </span>
            <h2
              className={`text-heading tracking-tight transition-all duration-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              What we do.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {services.map((service, index) => (
              <ServiceTile key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Calculators CTA */}
      <div className="border-t border-foreground/10 bg-muted py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <h3 className="text-subheading tracking-tight">Plan your Investments</h3>
          <LiquidButton asChild variant="solid" size="lg" className="px-8 h-14 group shrink-0">
            <Link href="/calculators">
              Explore Calculators
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </LiquidButton>
        </div>
      </div>

      {/* Why choose us */}
      <div className="bg-accent text-accent-foreground py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <h3
              className="tracking-tight mb-6 font-normal"
              style={{ fontFamily: "var(--font-libre-baskerville)", fontSize: 45 }}
            >
              Why choose us?
            </h3>
            <p className="text-accent-foreground/70 leading-relaxed max-w-sm mb-8">
              Reasons clients stay with us instead of shopping around.
            </p>
            <LiquidButton
              asChild
              variant="solid"
              size="lg"
              className="px-8 h-14 group"
            >
              <a href="#contact">
                Get In Touch
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </LiquidButton>
          </div>

          <ul className="grid sm:grid-cols-2 border-t border-accent-foreground/15">
            {advantages.map((item) => (
              <li
                key={item}
                className="px-0 sm:px-6 py-6 border-b border-accent-foreground/15 sm:border-l sm:odd:border-l-0"
              >
                <p className="leading-relaxed text-accent-foreground/90">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
