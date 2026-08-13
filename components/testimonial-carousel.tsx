"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type Testimonial = {
  name: string;
  designation?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Person 1",
    designation: "Designation",
    company: "Company",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
  },
  {
    name: "Person 2",
    designation: "Designation",
    company: "Company",
    quote:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  },
  {
    name: "Person 3",
    designation: "Designation",
    company: "Company",
    quote:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis.",
  },
  {
    name: "Person 4",
    designation: "Designation",
    company: "Company",
    quote:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.",
  },
  {
    name: "Person 5",
    designation: "Designation",
    company: "Company",
    quote:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore.",
  },
];

const EASE = "power3.out";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function Card({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="w-full bg-card rounded-3xl shadow-lg shadow-black/5 px-8 py-9 sm:px-10 sm:py-10">
      <div className="mb-6">
        <p className="font-display text-2xl text-foreground leading-tight">
          {testimonial.name}
        </p>
        {(testimonial.designation || testimonial.company) && (
          <p className="text-sm italic text-muted-foreground">
            {[testimonial.designation, testimonial.company].filter(Boolean).join(", ")}
          </p>
        )}
      </div>
      <p className="text-foreground/70 leading-relaxed">{testimonial.quote}</p>
    </div>
  );
}

export function TestimonialCarousel({
  testimonials = DEFAULT_TESTIMONIALS,
  className = "",
}: {
  testimonials?: Testimonial[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = testimonials.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const activeCardRef = useRef<HTMLDivElement>(null);
  const prevCardRef = useRef<HTMLDivElement>(null);
  const nextCardRef = useRef<HTMLDivElement>(null);
  const dragX = useRef(0);
  const dragging = useRef(false);

  const goTo = useCallback((i: number) => setActive(mod(i, count)), [count]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setActive((a) => mod(a + 1, count)), 5000);
    return () => clearInterval(id);
  }, [active, isPaused, count]);

  useGSAP(
    () => {
      gsap.fromTo(
        activeCardRef.current,
        { opacity: 0, scale: 0.92, x: 0 },
        { opacity: 1, scale: 1, duration: 0.4, ease: EASE }
      );
      gsap.fromTo(
        prevCardRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.35, scale: 0.88, filter: "blur(1.5px)", duration: 0.4, ease: EASE }
      );
      gsap.fromTo(
        nextCardRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.35, scale: 0.88, filter: "blur(1.5px)", duration: 0.4, ease: EASE }
      );
    },
    { dependencies: [active], scope: rootRef }
  );

  function onPointerDown(e: React.PointerEvent) {
    dragging.current = true;
    dragX.current = e.clientX;
    (e.target as Element).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging.current || !activeCardRef.current) return;
    const offset = e.clientX - dragX.current;
    gsap.set(activeCardRef.current, { x: offset });
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging.current || !activeCardRef.current) return;
    dragging.current = false;
    const offset = e.clientX - dragX.current;
    const threshold = 80;
    if (offset > threshold) prev();
    else if (offset < -threshold) next();
    else gsap.to(activeCardRef.current, { x: 0, duration: 0.3, ease: EASE });
  }

  const prevTestimonial = testimonials[mod(active - 1, count)];
  const nextTestimonial = testimonials[mod(active + 1, count)];

  return (
    <div
      ref={rootRef}
      className={`w-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex items-center justify-center py-6 overflow-hidden">
        {/* Peeking previous card */}
        <div className="hidden md:block absolute left-0 w-[60%] lg:w-1/2 -translate-x-1/3 pointer-events-none">
          <div ref={prevCardRef}>
            <Card testimonial={prevTestimonial} />
          </div>
        </div>

        {/* Peeking next card */}
        <div className="hidden md:block absolute right-0 w-[60%] lg:w-1/2 translate-x-1/3 pointer-events-none">
          <div ref={nextCardRef}>
            <Card testimonial={nextTestimonial} />
          </div>
        </div>

        {/* Active card */}
        <div className="relative z-10 w-full max-w-xl px-4">
          <div
            ref={activeCardRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="touch-pan-y cursor-grab active:cursor-grabbing"
          >
            <Card testimonial={testimonials[active]} />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={prev}
          className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={next}
          className="w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default TestimonialCarousel;
