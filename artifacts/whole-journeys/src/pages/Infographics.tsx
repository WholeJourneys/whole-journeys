import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Map } from "lucide-react";

const itineraries = [
  {
    region: "Italy",
    title: "Via Francigena",
    subtitle: "San Miniato to Siena",
    location: "Tuscany · 2026",
    days: "6 Days",
    distance: "84.5 km",
    href: "https://favorite-watery-triggers.replit.app/via-francigena",
    accent: "bg-secondary",
  },
  {
    region: "England",
    title: "Coast to Coast",
    subtitle: "St Bees to Robin Hood's Bay",
    location: "Northern England · 2028",
    days: "14 Days",
    distance: "190.7 mi",
    href: "https://favorite-watery-triggers.replit.app/coast-to-coast",
    accent: "bg-primary",
  },
  {
    region: "Spain",
    title: "Catalonian Way",
    subtitle: "A Catalan Multi-Activity Adventure",
    location: "Catalonia · 2028",
    days: "5 Days",
    distance: "TBC",
    href: "https://favorite-watery-triggers.replit.app/catalonian",
    accent: "bg-[#3D3B8E]",
  },
];

export default function Infographics() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEO
        title="Infographic Itineraries"
        description="Visual itinerary guides for Whole Journeys signature walking tours — designed by Kathy Dragon."
        path="/infographics"
      />
      <Navbar />

      <main className="flex-1">
        <section className="bg-primary py-20 px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 text-white/60 uppercase tracking-widest text-xs font-medium">
            <Map className="w-4 h-4" />
            <span>Whole Journeys</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-3">
            Infographic Itineraries
          </h1>
          <p className="text-white/60 italic text-lg" style={{ fontFamily: "'Great Vibes', cursive" }}>
            designed by Kathy
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraries.map((item) => (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${item.accent} p-5 flex items-center justify-between`}>
                  <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">
                    {item.region}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Map className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="bg-white border border-gray-100 p-6 flex flex-col gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-500 italic text-sm mt-0.5">{item.subtitle}</p>
                    <p className="text-gray-400 text-xs uppercase tracking-wider mt-2">{item.location}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-3 mt-1">
                    <span className="font-medium">{item.days}</span>
                    <span className="text-gray-300">·</span>
                    <span className="font-medium">{item.distance}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-secondary group-hover:gap-3 transition-all mt-1">
                    View Itinerary <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
