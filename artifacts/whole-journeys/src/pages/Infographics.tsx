import { Link } from "wouter";
import SEO from "../components/SEO";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowRight, Map, Share2, Bookmark, MapPin } from "lucide-react";

const itineraries = [
  {
    region: "Italy",
    title: "Via Francigena",
    subtitle: "San Miniato to Siena",
    location: "Tuscany · 2026",
    days: "6 Days",
    distance: "84.5 km",
    href: "/infographics/via-francigena",
    accent: "bg-secondary",
    internal: true,
  },
  {
    region: "England",
    title: "Coast to Coast",
    subtitle: "St Bees to Robin Hood's Bay",
    location: "Northern England · 2026",
    days: "15 Days",
    distance: "190.7 mi",
    href: "/infographics/coast-to-coast",
    accent: "bg-primary",
    internal: true,
  },
  {
    region: "Spain",
    title: "Catalonian Way",
    subtitle: "A Catalan Multi-Activity Adventure",
    location: "Catalonia · May 2026",
    days: "5 Days",
    distance: "Sea to Peaks",
    href: "/infographics/catalan-adventure",
    accent: "bg-[#3D3B8E]",
    internal: true,
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
        <section className="bg-primary py-24 px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6 text-white/60 uppercase tracking-widest text-xs font-medium">
            <Map className="w-4 h-4" />
            <span>Whole Journeys</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-4">
            Infographic Itineraries
          </h1>
          <p className="text-white/80 italic text-4xl md:text-5xl mb-8" style={{ fontFamily: "'Great Vibes', cursive" }}>
            designed by Kathy
          </p>
          <p className="max-w-2xl mx-auto text-white/70 text-base md:text-lg leading-relaxed">
            Each infographic is a living travel document — built to be read before you pack, 
            carried on your phone while you walk, and shared with fellow travellers. 
            Every hotel is one tap from Google Maps, every vegan lunch spot is linked, 
            and the full route opens in your maps app. No PDFs to scroll, no spreadsheets to decipher.
          </p>
        </section>

        <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {itineraries.map((item) => {
              const cardInner = (
                <>
                  <div className={`${item.accent} p-5 flex items-center justify-between`}>
                    <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">{item.region}</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Map className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 p-6 flex flex-col gap-3">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-primary group-hover:text-secondary transition-colors">{item.title}</h2>
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
                </>
              );
              const cls = "group block rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300";
              return item.internal ? (
                <Link key={item.title} href={item.href} className={cls}>{cardInner}</Link>
              ) : (
                <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>{cardInner}</a>
              );
            })}
          </div>
        </section>
        <section className="bg-stone-50 border-t border-stone-100 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-2">Use on your phone</h2>
            <p className="text-stone-500 text-sm">These itineraries are designed to live on your phone for the duration of the trip — no app download, no printing required.</p>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-stone-800">Add to Home Screen</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Open the itinerary in your browser, tap the <strong>Share</strong> button (iOS) or the <strong>⋮ menu</strong> (Android), then choose <strong>"Add to Home Screen."</strong> It opens instantly like an app — no URL to type.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-bold text-stone-800">One-tap Maps &amp; Calls</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Every hotel address opens directly in <strong>Google Maps</strong> for walking or driving directions. Every phone number is a tap-to-call link — no copying numbers out of a PDF.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-bold text-stone-800">Bookmark for Offline</h3>
              <p className="text-stone-500 text-sm leading-relaxed">
                Load the page on <strong>Wi-Fi before you set off</strong> each day — your browser caches it so the itinerary stays readable even in areas with no signal on the trail.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
