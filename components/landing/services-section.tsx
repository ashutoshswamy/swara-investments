"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Portfolio Management",
    description:
      "Discretionary and non-discretionary equity portfolios, built around each client's risk profile and return objective.",
    visual: "allocation",
  },
  {
    number: "02",
    title: "Wealth Advisory",
    description:
      "Goal-based financial planning — retirement, education, succession — reviewed as life and markets change.",
    visual: "advisory",
  },
  {
    number: "03",
    title: "Mutual Funds & Insurance",
    description:
      "Access to mutual fund and insurance products selected for fit to the client's plan, not for commission.",
    visual: "diversify",
  },
  {
    number: "04",
    title: "Equity Research & Investing",
    description:
      "An in-house research desk covering listed businesses, underpinning every portfolio and recommendation we make.",
    visual: "research",
  },
];

function AllocationVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <defs>
        <clipPath id="allocationClip">
          <rect x="30" y="20" width="140" height="120" rx="2" />
        </clipPath>
      </defs>
      <rect x="30" y="20" width="140" height="120" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <g clipPath="url(#allocationClip)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x="40" y={35 + i * 16} width="120" height="10" rx="1" fill="currentColor" opacity="0.15">
            <animate attributeName="opacity" values="0.15;0.75;0.15" dur="2.4s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            <animate attributeName="width" values="30;120;30" dur="2.4s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
    </svg>
  );
}

function AdvisoryVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <g>
        <rect x="30" y="50" width="50" height="60" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="55" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <g>
        <rect x="120" y="50" width="50" height="60" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="145" cy="35" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </g>
      <line x1="80" y1="80" x2="120" y2="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4">
        <animate attributeName="stroke-dashoffset" values="0;-8" dur="0.6s" repeatCount="indefinite" />
      </line>
      <circle r="4" fill="currentColor">
        <animateMotion dur="1.6s" repeatCount="indefinite">
          <mpath href="#advisoryPath" />
        </animateMotion>
      </circle>
      <path id="advisoryPath" d="M 80 80 L 120 80" fill="none" />
    </svg>
  );
}

function DiversifyVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <circle cx="100" cy="80" r="12" fill="currentColor">
        <animate attributeName="r" values="12;14;12" dur="2s" repeatCount="indefinite" />
      </circle>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 50;
        return (
          <g key={i}>
            <line
              x1="100"
              y1="80"
              x2={100 + Math.cos(angle) * radius}
              y2={80 + Math.sin(angle) * radius}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.3"
            >
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </line>
            <circle
              cx={100 + Math.cos(angle) * radius}
              cy={80 + Math.sin(angle) * radius}
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <animate attributeName="r" values="6;8;6" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

function ResearchVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      <path
        id="researchPath"
        d="M 30 110 L 60 90 L 85 100 L 110 55 L 135 70 L 165 35"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="220"
        strokeDashoffset="220"
      >
        <animate attributeName="stroke-dashoffset" values="220;0" dur="2.6s" repeatCount="indefinite" />
      </path>
      <g>
        <circle r="10" fill="none" stroke="currentColor" strokeWidth="2">
          <animateMotion dur="2.6s" repeatCount="indefinite">
            <mpath href="#researchPath" />
          </animateMotion>
        </circle>
        <line x1="7" y1="7" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <animateMotion dur="2.6s" repeatCount="indefinite">
            <mpath href="#researchPath" />
          </animateMotion>
        </line>
      </g>
    </svg>
  );
}

function ServiceVisual({ type }: { type: string }) {
  switch (type) {
    case "allocation":
      return <AllocationVisual />;
    case "advisory":
      return <AdvisoryVisual />;
    case "diversify":
      return <DiversifyVisual />;
    case "research":
      return <ResearchVisual />;
    default:
      return <AllocationVisual />;
  }
}

function ServiceRow({ service, index }: { service: (typeof services)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`group transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-10 lg:py-12 border-b border-foreground/10">
        <div className="shrink-0 lg:w-32">
          <span className="font-display text-4xl lg:text-5xl text-foreground/20 group-hover:text-primary transition-colors duration-500">
            {service.number}
          </span>
        </div>
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl lg:text-3xl font-display mb-3 group-hover:translate-x-2 transition-transform duration-500">
              {service.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-foreground">
              <ServiceVisual type={service.visual} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 border-t border-foreground/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Services
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            What we do.
          </h2>
        </div>

        <div>
          {services.map((service, index) => (
            <ServiceRow key={service.number} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
