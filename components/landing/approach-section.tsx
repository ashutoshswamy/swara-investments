"use client";

import { useEffect, useRef, useState } from "react";

const principles = [
  {
    number: "I",
    title: "Research first",
    description:
      "Every position starts as a thesis, written down and tested against the numbers — not a tip, a trend, or a headline.",
  },
  {
    number: "II",
    title: "Goal-aligned",
    description:
      "A portfolio is built around what the client needs it to do, on their timeline — not around what's easiest to sell.",
  },
  {
    number: "III",
    title: "Long horizon",
    description:
      "We size positions to be held, not traded. Fewer decisions, made carefully, tend to outlast frequent ones made quickly.",
  },
];

export function ApproachSection() {
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
    <section
      id="approach"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-16 lg:mb-24 max-w-2xl">
          <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-background/50 mb-6">
            <span className="w-8 h-px bg-background/30" />
            Approach
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            How we approach investing.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-x-12 gap-y-16">
          {principles.map((principle, index) => (
            <div
              key={principle.number}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <span className="font-display text-3xl text-background/30 block mb-6">
                {principle.number}
              </span>
              <h3 className="text-2xl font-display mb-4">{principle.title}</h3>
              <p className="text-background/60 leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
