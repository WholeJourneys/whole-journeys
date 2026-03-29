import { useState } from "react";
import { ExternalLink, BookOpen, Hotel, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourModal from "@/components/TourModal";
import { useTours, type Tour } from "@/hooks/use-tours";
import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/components/TourCard";

// ─── EDIT THESE TO CUSTOMIZE KATHY'S PICKS ────────────────────────────────

const FEATURED_HOTELS = [
  {
    id: "hotel-1",
    name: "Castello di Casole",
    location: "Tuscany, Italy",
    description: "A restored 10th-century castle estate surrounded by 4,200 acres of Tuscan countryside. Virtuoso guests enjoy a room upgrade, daily breakfast, and a $100 resort credit.",
    imageUrl: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80",
    bookUrl: "https://book.wholejourneys.com",
    virtPerks: ["Room upgrade on arrival", "Daily breakfast for two", "$100 resort credit"],
  },
  {
    id: "hotel-2",
    name: "Aman Venice",
    location: "Venice, Italy",
    description: "A 16th-century palazzo on the Grand Canal, steps from the Accademia. One of the most romantic hotels in the world — and virtually impossible to find otherwise at Virtuoso rates.",
    imageUrl: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80",
    bookUrl: "https://book.wholejourneys.com",
    virtPerks: ["Early check-in / late checkout", "Complimentary canal boat transfer", "Welcome amenity"],
  },
  {
    id: "hotel-3",
    name: "Six Senses Douro Valley",
    location: "Portugal",
    description: "A vineyard-set retreat in the heart of Portugal's wine country with sweeping river views. Wellness, wine, and walking trails — all in one spectacular place.",
    imageUrl: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800&q=80",
    bookUrl: "https://book.wholejourneys.com",
    virtPerks: ["Room upgrade on arrival", "Daily breakfast", "Douro Valley wine tasting"],
  },
];

const FEATURED_TRIP_IDS = [
  "taste-of-tuscany",
  "rota-vicentina",
  "sicily-villa",
];

const ARTICLES = [
  {
    id: "article-1",
    title: "Packing Tips for the Camino de Santiago",
    excerpt: "After walking multiple Caminos, here's exactly what I pack — and what I wish I'd left at home. The art of the 8kg pack changes everything.",
    category: "Gear & Planning",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    url: "https://substack.com", // ← replace with real Substack article URL
    readTime: "6 min read",
  },
  {
    id: "article-2",
    title: "Why Slovenia Should Be Your Next European Adventure",
    excerpt: "It has the mountains of Switzerland, the coast of Croatia, and the food scene of Northern Italy — all without the crowds. Here's my case for Slovenia.",
    category: "Destination Guide",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    url: "https://substack.com", // ← replace with real Substack article URL
    readTime: "8 min read",
  },
  {
    id: "article-3",
    title: "The Case for Women-Only Travel",
    excerpt: "I've led women-only groups for over 20 years. Here's what I've learned about why these trips create something rare and irreplaceable.",
    category: "Travel Philosophy",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
    url: "https://substack.com", // ← replace with real Substack article URL
    readTime: "5 min read",
  },
];

// ──────────────────────────────────────────────────────────────────────────

export default function Picks() {
  const { data: tours } = useTours();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const featuredTours = (tours ?? []).filter((t) => FEATURED_TRIP_IDS.includes(t.id));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=60)", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-4 block">Curated by Kathy Dragon</span>
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-5">
            Kathy's Picks
          </h1>
          <p className="text-white/80 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Hotels I love, trips I believe in, and dispatches from the road. Updated whenever something catches my eye.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <BookOpen className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-display text-primary">From the Journal</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article, idx) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group block bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-2.5 py-1 bg-secondary/90 text-white text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.readTime}</span>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                      Read <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20 bg-muted/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Hotel className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-display text-primary">Hotels I Love</h2>
          </div>
          <p className="text-muted-foreground mb-10 text-sm">
            Booked through Whole Journeys, these properties include exclusive Virtuoso perks you can't get on your own.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_HOTELS.map((hotel, idx) => (
              <motion.div
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${hotel.imageUrl})` }}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1">{hotel.location}</div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-3">{hotel.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{hotel.description}</p>
                  
                  <div className="mb-5 space-y-1.5">
                    <div className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">Virtuoso Perks</div>
                    {hotel.virtPerks.map((perk) => (
                      <div key={perk} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="text-secondary mt-0.5">✦</span>
                        {perk}
                      </div>
                    ))}
                  </div>

                  <a
                    href={hotel.bookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-primary text-white text-sm font-medium rounded-md text-center hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Book with Virtuoso Perks <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Trips */}
      <section className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Map className="w-6 h-6 text-secondary" />
            <h2 className="text-3xl font-display text-primary">Trips I'm Excited About</h2>
          </div>
          <p className="text-muted-foreground mb-10 text-sm">
            A few itineraries I keep coming back to. Click to see the full itinerary on Travefy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTours.map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedTour(tour)}
              >
                <div className="relative h-52 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${tour.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {tour.categories.slice(0, 2).map((cat) => (
                      <span key={cat} className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${CATEGORY_COLORS[cat] ?? "bg-white/80 text-primary"}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-3 left-4 text-white/90 text-sm font-medium">{tour.destination}</div>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {tour.name}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">{tour.description}</p>
                  <a
                    href={tour.travefyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80"
                  >
                    View Itinerary <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <TourModal
        tour={selectedTour}
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
      />
    </div>
  );
}
