"use client";

import Image from "next/image";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { useReveal } from "@/hooks/use-reveal";

const team = [
  {
    name: "Mandar Kadam",
    bio: "Mandar Kadam is a commerce graduate from Mumbai University and also a license holder of AMFI and IRDA. He has over 22 years of sales experience in financial market and other issues pertaining to Merger and Acquisitions. His past experience includes working for ICICI Bank, HDFC Bank & Anand Rathi Group and Networth stock broking Ltd. He is also responsible for Acquisitions, Sales, Services and compliance issues. His main focus is to identify opportunities for our clients that can help them achieve their financial goals.",
    photo: "/mandar.png",
  },
  {
    name: "Manasvi Kadam",
    bio: "Manasvi Kadam is an Arts graduate from Mumbai University and also a license holder of IRDA. She has over 8+ years of operations experience in financial market and other issues pertaining to Merger and Acquisitions, with past experience at Birla Sunlife Insurance Co Ltd. She is also responsible for Acquisitions, Sales, Services and compliance issues, her main focus is identifying opportunities that help clients achieve their financial goals, alongside overseeing the company's administration.",
    photo: "/manasvi.png",
  },
];

// TODO: replace with real client testimonials (with consent) once collected
const testimonials = [
  { quote: "They explained the reasoning behind every recommendation instead of just pushing a product. That's rare.", name: "Person 1", designation: "Designation", company: "Company" },
  { quote: "Responsive, transparent about fees, and never made me feel rushed into a decision.", name: "Person 2", designation: "Designation", company: "Company" },
  { quote: "Finally an advisor who tracks the whole plan, not just the product they sold me.", name: "Person 3", designation: "Designation", company: "Company" },
  { quote: "Doorstep service, one point of contact for every policy and fund we hold. Makes life easy.", name: "Person 4", designation: "Designation", company: "Company" },
];

export function ApproachSection() {
  const [headingRef, headingVisible] = useReveal<HTMLSpanElement>();

  return (
    <section id="approach" className="relative border-t border-foreground/10">
      {/* Team */}
      <div className="bg-accent text-accent-foreground py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <span
            ref={headingRef}
            className={`inline-flex items-center gap-3 text-sm font-mono tracking-[0.2em] uppercase text-accent-foreground/70 mb-6 transition-all duration-300 ${
              headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="w-8 h-px bg-accent-foreground/40" />
            The people behind the wheel
          </span>

          <div className="grid lg:grid-cols-12 gap-x-8 gap-y-16">
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-10">
                <Image
                  src={team[0].photo}
                  alt={team[0].name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                />
              </div>
              <h2 className="text-subheading tracking-tight mb-3">
                {team[0].name}
              </h2>
              <p className="leading-relaxed text-accent-foreground/85 mb-6">{team[0].bio}</p>
              <LiquidButton asChild variant="solid" size="sm" className="px-6">
                <a href="#contact">Get in Touch</a>
              </LiquidButton>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 relative w-full min-h-[420px] lg:min-h-[640px] overflow-hidden rounded-2xl">
              <Image
                src={team[1].photo}
                alt={team[1].name}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 90vw"
              />
            </div>

            <div className="lg:col-span-9 lg:col-start-4">
              <h2 className="text-subheading tracking-tight mb-3">
                {team[1].name}
              </h2>
              <p className="leading-relaxed text-accent-foreground/85 mb-6">{team[1].bio}</p>
              <LiquidButton asChild variant="solid" size="sm" className="px-6">
                <a href="#contact">Get in Touch</a>
              </LiquidButton>
            </div>
          </div>
        </div>
      </div>

      {/* Vision */}
      <div className="py-20 lg:py-28 border-b border-foreground/10">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-heading tracking-tight mb-6">
            The vision we see for you
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We believe good financial advice shouldn&apos;t feel like homework. Our goal is
            simple: understand where you are, understand where you want to go, and build
            a plan that closes that gap — without jargon, without pressure, and without
            losing sight of the life you actually want to live.
          </p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 lg:py-28 bg-background text-foreground">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="text-heading tracking-tight text-center mb-14">
            Hear what our clients have got to say about us
          </h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </div>
    </section>
  );
}
