"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About Us", href: "#approach" },
  { name: "Services", href: "#services" },
  { name: "Contact Us", href: "#contact" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-background shadow-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-20 px-6 lg:px-12">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0">
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
        <nav className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="liquid-glass-hover rounded-full px-5 py-2 text-sm text-foreground/80 hover:text-foreground transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="liquid-glass-hover md:hidden w-10 h-10 flex items-center justify-center rounded-full text-foreground"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bottom-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-3xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
