"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "/#approach" },
  {
    name: "Services",
    href: "/#services",
    children: [{ name: "Calculators", href: "/calculators" }],
  },
  { name: "Contact Us", href: "/#contact" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-background shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20 px-6 lg:px-12">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo2.png"
            alt="Swara Investments"
            width={44}
            height={44}
            className="w-11 h-11 object-contain"
            priority
          />
          <span className="font-display text-xl tracking-tight hidden sm:inline">
            Swara Investments
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name} className="group relative">
                <a
                  href={link.href}
                  className="liquid-glass-hover flex items-center gap-1 rounded-full px-5 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.name}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </a>
                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                  <div className="liquid-glass rounded-2xl bg-background p-1.5 shadow-lg shadow-black/5 min-w-40">
                    {link.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        className="block rounded-xl px-4 py-2.5 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap"
                      >
                        {child.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="liquid-glass-hover rounded-full px-5 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            )
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="liquid-glass-hover lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-x-0 top-20 bottom-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <div key={link.name} className="flex flex-col items-center gap-4">
              <a
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-3xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
              {link.children?.map((child) => (
                <a
                  key={child.name}
                  href={child.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-mono tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-all duration-500 ${
                    isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${i * 75 + 40}ms` : "0ms" }}
                >
                  {child.name}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
