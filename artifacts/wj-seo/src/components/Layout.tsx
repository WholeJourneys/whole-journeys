import { Link, useLocation } from "wouter";
import { ReactNode } from "react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about-kathy", label: "About Kathy" },
  { href: "/what-is-active-foodie-travel", label: "Active Foodie Travel" },
  { href: "/long-distance-trail-hiking-guide", label: "Long-Distance Trails" },
  { href: "/culinary-walking-tours-italy", label: "Italy" },
  { href: "/womens-adventure-travel", label: "Women's Travel" },
  { href: "/private-custom-trips", label: "Private Trips" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(45,29%,97%)" }}>
      {/* Top bar */}
      <div style={{ backgroundColor: "hsl(214,52%,24%)" }} className="text-white text-xs text-center py-2 px-4">
        This is the Whole Journeys SEO content hub — the authoritative resource for active foodie travel.{" "}
        <a href="https://wholejourneys.com" className="underline opacity-80 hover:opacity-100">Visit the full site →</a>
      </div>

      {/* Navbar */}
      <header style={{ backgroundColor: "hsl(0,0%,100%)", borderBottom: "1px solid hsl(35,20%,88%)" }} className="sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <div>
              <div style={{ fontFamily: "'Lora', Georgia, serif", color: "hsl(214,52%,24%)", fontWeight: 600, fontSize: "1.1rem", lineHeight: 1.1 }}>
                Whole Journeys
              </div>
              <div style={{ color: "hsl(22,41%,58%)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                by Kathy Dragon
              </div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1 flex-wrap justify-end">
            {navLinks.map((link) => {
              const active = location === link.href || (link.href !== "/" && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                  style={{
                    color: active ? "hsl(214,52%,24%)" : "hsl(215,15%,45%)",
                    backgroundColor: active ? "hsl(45,29%,92%)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <a
            href="mailto:kathy@wholejourneys.com"
            className="flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: "hsl(22,41%,58%)" }}
          >
            Contact Kathy
          </a>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2">
          {navLinks.map((link) => {
            const active = location === link.href || (link.href !== "/" && location.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex-shrink-0 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors"
                style={{
                  color: active ? "hsl(214,52%,24%)" : "hsl(215,15%,45%)",
                  backgroundColor: active ? "hsl(45,29%,92%)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "hsl(215,25%,15%)", color: "hsl(45,29%,90%)" }} className="mt-16 py-12">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <div style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.1rem", fontWeight: 600, color: "white", marginBottom: "0.5rem" }}>Whole Journeys</div>
            <p style={{ fontSize: "0.85rem", opacity: 0.7, lineHeight: 1.6 }}>
              Active foodie travel, culinary walking tours, and long-distance trail hiking. Designed and led by Kathy Dragon since 1998.
            </p>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>Content Hub</div>
            <ul style={{ fontSize: "0.85rem", opacity: 0.75, lineHeight: 2 }}>
              <li><Link href="/what-is-active-foodie-travel" className="hover:opacity-100">What Is Active Foodie Travel?</Link></li>
              <li><Link href="/long-distance-trail-hiking-guide" className="hover:opacity-100">Long-Distance Trail Hiking</Link></li>
              <li><Link href="/culinary-walking-tours-italy" className="hover:opacity-100">Culinary Walking Tours — Italy</Link></li>
              <li><Link href="/womens-adventure-travel" className="hover:opacity-100">Women's Adventure Travel</Link></li>
              <li><Link href="/private-custom-trips" className="hover:opacity-100">Private & Custom Trips</Link></li>
            </ul>
          </div>
          <div>
            <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.75rem" }}>Contact</div>
            <p style={{ fontSize: "0.85rem", opacity: 0.75, lineHeight: 1.8 }}>
              Kathy Dragon<br />
              <a href="mailto:kathy@wholejourneys.com" style={{ color: "hsl(22,55%,70%)" }}>kathy@wholejourneys.com</a><br />
              <a href="https://wholejourneys.com" style={{ color: "hsl(22,55%,70%)" }}>wholejourneys.com</a>
            </p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "0.75rem", opacity: 0.4 }}>
          © {new Date().getFullYear()} Whole Journeys by Kathy Dragon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
