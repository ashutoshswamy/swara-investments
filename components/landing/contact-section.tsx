"use client";

import { useState } from "react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { Linkedin, MessageCircle, Instagram } from "lucide-react";
import { PulseLine } from "./pulse-line";
import { useReveal } from "@/hooks/use-reveal";

const CONTACT_EMAIL = "mandarkadam@swarainvestments.com";
const CONTACT_PHONE = "+91-93228-55444";

const dock = [
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/mandar-kadam-a6605a29/" },
  { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/${CONTACT_PHONE.replace(/[^\d]/g, "")}` },
  { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/swara_investments" },
];

const fields = [
  { row: "01", id: "name", name: "name", label: "Name", type: "text", placeholder: "Mandar", half: true },
  { row: "02", id: "surname", name: "surname", label: "Surname", type: "text", placeholder: "Kadam", half: true },
  { row: "03", id: "email", name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
] as const;

export function ContactSection() {
  const [sectionRef, isVisible] = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Query from swarainvestments.com");
    const body = encodeURIComponent(
      `Name: ${data.get("name")} ${data.get("surname")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 border-t border-foreground/10 bg-ink overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-24 opacity-40">
        <PulseLine />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[0.85fr_1fr] gap-14 lg:gap-20 items-start">
          {/* Left: pitch + direct lines */}
          <div
            className={`text-background lg:sticky lg:top-32 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-background/50 mb-6">
              <span className="w-8 h-px bg-background/30" />
              Get in touch
            </span>
            <h2 className="text-heading italic tracking-tight mb-4 leading-[1.1]">
              Let&apos;s talk about your plan.
            </h2>
            <p className="text-xl font-subheading text-accent mb-6">
              No obligation, no hard sell.
            </p>
            <p className="text-background/60 leading-relaxed max-w-sm mb-10">
              One real conversation about where your money&apos;s going, where it should
              go, and what&apos;s actually realistic for you.
            </p>

            <div className="space-y-1 pt-8 border-t border-background/15">
              {dock.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-3 border-b border-background/10 text-background/70 hover:text-background transition-colors"
                >
                  <item.icon className="w-4 h-4 shrink-0 text-accent" />
                  <span className="text-sm font-mono tracking-[0.1em] uppercase">{item.label}</span>
                  <span className="ml-auto text-background/30 group-hover:text-accent group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: ledger form */}
          <div
            className={`bg-background border border-background/10 p-8 sm:p-12 lg:p-14 transition-all duration-500 delay-75 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-xs font-mono tracking-[0.25em] uppercase text-accent mb-8">
              Ledger — new entry
            </p>

            {status === "sent" ? (
              <p className="text-lg font-display italic">
                Thanks — your message is on its way. We&apos;ll be in touch shortly.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                  {fields.map((field) => (
                    <LedgerField key={field.id} {...field} />
                  ))}
                </div>
                <div>
                  <FieldLabel row="04" htmlFor="message">Message</FieldLabel>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Tell us what you need"
                    className="w-full bg-transparent border-b border-foreground/20 pb-2 pt-1 focus:outline-none focus:border-accent transition-colors duration-300 resize-none placeholder:text-foreground/30"
                  />
                </div>

                <LiquidButton
                  type="submit"
                  variant="solid"
                  size="lg"
                  className="w-full px-10 h-14 text-base"
                >
                  Submit
                </LiquidButton>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ row, htmlFor, children }: { row: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex items-baseline gap-2 mb-2">
      <span className="text-[11px] font-mono text-accent/70">{row}</span>
      <span className="text-sm font-mono tracking-[0.1em] uppercase text-muted-foreground">{children}</span>
    </label>
  );
}

function LedgerField({
  row,
  id,
  name,
  label,
  type,
  placeholder,
}: {
  row: string;
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <FieldLabel row={row} htmlFor={id}>{label}</FieldLabel>
      <input
        id={id}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-foreground/20 pb-2 pt-1 focus:outline-none focus:border-accent transition-colors duration-300 placeholder:text-foreground/30"
      />
    </div>
  );
}
