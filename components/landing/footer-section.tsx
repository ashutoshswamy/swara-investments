import { PulseLine } from "./pulse-line";

const footerLinks = {
  Company: [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Approach", href: "#approach" },
    { name: "Contact", href: "#contact" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-foreground/10">
      {/* Market pulse divider */}
      <div className="h-16 md:h-20 border-b border-foreground/10">
        <PulseLine />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
            <div className="col-span-2">
              <a href="#" className="inline-flex items-baseline gap-2 mb-6">
                <span className="text-2xl font-display">Swara Investments</span>
              </a>
              <p className="text-muted-foreground leading-relaxed max-w-xs">
                A Mumbai-based investment firm managing portfolios, advising wealth,
                and researching markets.
              </p>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {year} Swara Investments. All rights reserved.
          </p>
          <p className="text-xs font-mono text-muted-foreground text-center md:text-right">
            Investments are subject to market risks. Please read all scheme-related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}
