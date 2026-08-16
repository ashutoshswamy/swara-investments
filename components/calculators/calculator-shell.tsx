"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

export function CalculatorShell({
  eyebrow,
  title,
  description,
  inputs,
  result,
}: {
  eyebrow: string;
  title: string;
  description: string;
  inputs: React.ReactNode;
  result: React.ReactNode;
}) {
  const [sectionRef, isVisible] = useReveal<HTMLDivElement>();

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Link
          href="/calculators"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          All calculators
        </Link>

        <div className="mb-14">
          <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            {eyebrow}
          </span>
          <h1
            className={`text-heading tracking-tight mb-4 transition-all duration-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {title}
          </h1>
          <p className="text-muted-foreground leading-relaxed max-w-lg">{description}</p>
        </div>

        <div
          className={`grid lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-16 items-start transition-all duration-500 delay-75 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-background border border-foreground/10 p-8 sm:p-12">{inputs}</div>
          <div className="bg-ink text-background p-8 sm:p-12 lg:sticky lg:top-32">{result}</div>
        </div>
      </div>
    </section>
  );
}

export function FieldLabel({
  row,
  htmlFor,
  children,
}: {
  row: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2 mb-2">
      <span className="text-[11px] font-mono text-accent/70">{row}</span>
      <span className="text-sm font-mono tracking-[0.1em] uppercase text-muted-foreground">{children}</span>
    </label>
  );
}

export function NumberField({
  row,
  id,
  label,
  suffix,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
}: {
  row: string;
  id: string;
  label: string;
  suffix?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
}) {
  const clamped = Math.min(Math.max(value, min), max);
  const percent = max > min ? ((clamped - min) / (max - min)) * 100 : 0;

  return (
    <div>
      <FieldLabel row={row} htmlFor={id}>
        {label}
      </FieldLabel>
      <div className="flex items-baseline gap-2 border-b border-foreground/20 focus-within:border-accent transition-colors duration-300 mb-4">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
          className="w-full bg-transparent pb-2 pt-1 focus:outline-none font-light"
          style={{ fontFamily: "var(--font-sansation)", fontSize: 20 }}
        />
        {suffix && <span className="pb-2 text-sm text-muted-foreground shrink-0">{suffix}</span>}
      </div>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={clamped}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-track"
        style={{
          background: `linear-gradient(to right, var(--accent) ${percent}%, color-mix(in srgb, var(--foreground) 15%, transparent) ${percent}%)`,
        }}
      />
    </div>
  );
}

export function ResultStat({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className={emphasis ? "" : "py-4 border-b border-background/10 last:border-b-0"}>
      <p className="text-sm font-mono tracking-[0.1em] uppercase text-background/50 mb-1">{label}</p>
      <p className={emphasis ? "text-3xl sm:text-4xl font-display italic" : "text-xl font-light"} style={!emphasis ? { fontFamily: "var(--font-sansation)" } : undefined}>
        {value}
      </p>
    </div>
  );
}
