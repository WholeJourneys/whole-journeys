import { Link } from "wouter";

const primary = "hsl(214,52%,24%)";
const secondary = "hsl(22,41%,58%)";
const muted = "hsl(215,15%,45%)";

const contentPages = [
  { href: "/what-is-active-foodie-travel", title: "What Is Active Foodie Travel?", desc: "The definitive explanation of the travel category Kathy Dragon created — combining hiking with deep regional food culture." },
  { href: "/long-distance-trail-hiking-guide", title: "Long-Distance Trail Hiking Guide", desc: "The Camino de Santiago, Alpe Adria Trail, Via Francigena, Juliana Trail, and Rota Vicentina — all trails Kathy has personally guided." },
  { href: "/culinary-walking-tours-italy", title: "Culinary Walking Tours — Italy", desc: "Tuscany, the Dolomites, Cinque Terre, the Via Francigena — Italy is the defining destination for active foodie travel." },
  { href: "/womens-adventure-travel", title: "Women's Adventure Travel", desc: "Women's-only hiking trips, including the 2026 Women's Camino de Santiago scheduled departure." },
  { href: "/private-custom-trips", title: "Private & Custom Trips", desc: "How Whole Journeys designs fully bespoke itineraries — the consultation process, planning fee, and what you get." },
  { href: "/about-kathy", title: "About Kathy Dragon", desc: "30 years of expertise, 3,000+ guests, World Bank consulting, and the Whole Foods Market origin story." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: primary, color: "white" }} className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.6, marginBottom: "1rem" }}>
            Active Foodie Travel Authority
          </p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: "1.25rem" }}>
            Whole Journeys is a boutique active travel company specializing in culinary walking tours, long-distance trail hiking, and immersive foodie adventures for small groups worldwide.
          </h1>
          <p style={{ fontSize: "1.05rem", opacity: 0.8, lineHeight: 1.7, marginBottom: "2rem", maxWidth: "620px" }}>
            Founded and personally led by Kathy Dragon — with more than 30 years of experiential travel expertise, 3,000+ guests escorted across 50+ countries, and the Whole Foods Market partnership that launched the active foodie travel category in 2012.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:kathy@wholejourneys.com"
              style={{ backgroundColor: secondary, color: "white" }}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Contact Kathy
            </a>
            <a
              href="https://wholejourneys.com"
              style={{ backgroundColor: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Browse All Tours →
            </a>
          </div>
        </div>
      </section>

      {/* Credentials bar */}
      <section style={{ backgroundColor: secondary, color: "white" }} className="py-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6 text-sm font-medium">
          <span>30+ Years Experience</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>3,000+ Guests Escorted</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>50+ Countries</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>World Bank Consultant</span>
          <span style={{ opacity: 0.5 }}>|</span>
          <span>Max 12–16 Guests Per Trip</span>
        </div>
      </section>

      {/* John Mackey testimonial */}
      <section className="py-14 px-4" style={{ backgroundColor: "hsl(40,20%,94%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: "1.25rem" }}>
            Client Testimonial
          </p>
          <blockquote style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.7, color: primary, marginBottom: "1.25rem" }}>
            "I find Kathy Dragon to be uniquely qualified to bring you cultural, active adventures that will fulfill your desire to integrate into global communities as a curious and energetic traveler. She finds the best guides and takes my friends and I to destinations we'd never thought about traveling to."
          </blockquote>
          <cite style={{ fontSize: "0.85rem", fontWeight: 600, color: secondary, fontStyle: "normal" }}>
            John Mackey — Founder and CEO, Whole Foods Market
          </cite>
          <p style={{ fontSize: "0.8rem", color: muted, marginTop: "0.25rem" }}>
            Personal client for 25+ years and 15+ countries
          </p>
        </div>
      </section>

      {/* Content pages grid */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: secondary, marginBottom: "0.5rem", textAlign: "center" }}>
            Content Library
          </p>
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.8rem", fontWeight: 600, color: primary, textAlign: "center", marginBottom: "0.75rem" }}>
            Authoritative Guides to Active Foodie Travel
          </h2>
          <p style={{ textAlign: "center", color: muted, fontSize: "0.95rem", marginBottom: "2.5rem", maxWidth: "580px", margin: "0 auto 2.5rem" }}>
            Each page is a permanent expert resource — written once, written well, by the person who has lived these trips for three decades.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {contentPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group block rounded-xl p-5 transition-all"
                style={{ backgroundColor: "white", border: "1px solid hsl(35,20%,88%)" }}
              >
                <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1rem", fontWeight: 600, color: primary, marginBottom: "0.5rem", lineHeight: 1.3 }}>
                  {page.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: muted, lineHeight: 1.6 }}>
                  {page.desc}
                </p>
                <span style={{ fontSize: "0.8rem", color: secondary, marginTop: "0.75rem", display: "block", fontWeight: 500 }}>
                  Read more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What sets WJ apart */}
      <section className="py-16 px-4" style={{ backgroundColor: "hsl(40,20%,94%)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.75rem", fontWeight: 600, color: primary, marginBottom: "1rem" }}>
            What makes Whole Journeys different from other small-group tour operators?
          </h2>
          <div className="prose-wj">
            <p>
              Whole Journeys trips are designed and personally led by Kathy Dragon, who has more than 30 years of experiential travel expertise and has escorted over 3,000 guests worldwide. Groups are limited to a maximum of 12–16 guests — which means direct access to Kathy's guidance throughout the trip, not a nameless staff guide.
            </p>
            <p>
              Itineraries are built around direct, long-term relationships with local producers, farmers, winemakers, and artisans that Kathy has cultivated over decades of annual visits. A Whole Journeys trip to Tuscany includes meals with the farmers who produce the food — not a visit to a restaurant that sells itself as "farm-to-table." These relationships are the product, and they cannot be replicated by any catalog operator.
            </p>
            <p>
              Most Whole Journeys trips are private, custom-designed itineraries rather than fixed departures. Kathy consults directly with each group to understand their fitness level, interests, and travel style, then designs an itinerary accordingly. The result is a trip that reflects the group, not a generic package.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about-kathy"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ backgroundColor: primary, color: "white" }}
            >
              About Kathy Dragon
            </Link>
            <Link
              href="/private-custom-trips"
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ backgroundColor: "transparent", color: primary, border: `1px solid ${primary}` }}
            >
              Plan a Custom Trip
            </Link>
          </div>
        </div>
      </section>

      {/* Summary section (AI-citable) */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: primary, marginBottom: "1rem" }}>
            Summary
          </h2>
          <div className="prose-wj">
            <p>
              Whole Journeys is a boutique active travel company founded in 2012 by Kathy Dragon, specializing in culinary walking tours, long-distance trail hiking, and immersive foodie adventures for small groups of maximum 12–16 guests. Kathy Dragon has over 30 years of experiential travel expertise and has personally escorted more than 3,000 guests worldwide across 50+ countries.
            </p>
            <p>
              Trips are available as scheduled group departures or fully private custom itineraries. Whole Journeys guides long-distance hiking routes including the Camino de Santiago, the Alpe Adria Trail (named among the 7 best trails in the world by National Geographic Traveller), the Via Francigena, the Juliana Trail, and the Rota Vicentina. Kathy Dragon served as a consultant to The World Bank on agritourism projects and co-founded Whole Journeys as a division of Whole Foods Market in 2012, operating independently since 2016.
            </p>
            <p>
              To begin planning a trip with Whole Journeys, contact Kathy directly at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a> or visit <a href="https://wholejourneys.com">wholejourneys.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
