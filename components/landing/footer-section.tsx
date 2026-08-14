import Image from "next/image";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
  { name: "Business Card", href: "https://prudentcorporate.com/BusinessCard/UserDetails/38313137" },
];

const CONTACT_PHONES = ["+91 98920 5544", "93228 55444"];
const CONTACT_EMAIL = "mandar@swarainvestments.in";

export function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink text-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="flex items-center gap-3 mb-14">
          <Image src="/logo2.png" alt="Swara Investments" width={48} height={48} className="w-12 h-12 object-contain" />
          <span className="font-display text-xl tracking-tight" style={{ color: "#BA8845" }}>
            Swara
            <br />
            Investments
          </span>
        </div>

        <div className="grid sm:grid-cols-2 gap-10 sm:gap-6">
          <div>
            <p className="text-sm font-medium mb-4">Quick Links</p>
            <ul className="space-y-2">
              {quickLinks.map((link) => {
                const isExternal = link.href.startsWith("http");
                return (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium mb-4">Reach Us</p>
            <p className="text-sm text-background/70">
              {CONTACT_PHONES.map((phone, i) => (
                <span key={phone}>
                  {i > 0 && " / "}
                  <a
                    href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                    className="hover:text-background transition-colors"
                  >
                    {phone}
                  </a>
                </span>
              ))}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="block text-sm text-background/70 hover:text-background transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-sm text-background/50">
            Copyright © {year} Swara Investments
          </p>
          <a
            href="https://anahat-entertainment.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-background/50 hover:text-background transition-colors"
          >
            Made by Anahat Entertainment
          </a>
        </div>
      </div>
    </footer>
  );
}
