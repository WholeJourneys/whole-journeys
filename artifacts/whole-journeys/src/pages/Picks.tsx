import { useState } from "react";
import { ExternalLink, BookOpen, Hotel, Map } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourModal from "@/components/TourModal";
import { useTours, type Tour } from "@/hooks/use-tours";
import { usePicksHotels, usePicksArticles, usePicksTrips } from "@/hooks/use-admin-data";
import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/components/TourCard";

// Fallback data shown if the DB is empty
const DEFAULT_ARTICLE_IMAGE = "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80";
const DEFAULT_HOTEL_IMAGE = "https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80";

export default function Picks() {
  const { data: tours } = useTours();
  const { data: dbHotels = [] } = usePicksHotels();
  const { data: dbArticles = [] } = usePicksArticles();
  const { data: dbTrips = [] } = usePicksTrips();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const activeHotels = dbHotels.filter((h) => h.active);
  const activeArticles = dbArticles.filter((a) => a.active);
  const activeTrips = dbTrips.filter((t) => t.active);
  const featuredTours = (tours ?? []).filter((t) => activeTrips.some((pt) => pt.tourId === t.id));

  const showHotels = activeHotels.length > 0;
  const showArticles = activeArticles.length > 0;
  const showTrips = featuredTours.length > 0;
  const nothingYet = !showHotels && !showArticles && !showTrips;

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
          <h1 className="text-4xl md:text-6xl font-display font-semibold mb-5">Kathy's Picks</h1>
          <p className="text-white/80 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Hotels I love, trips I believe in, and dispatches from the road. Updated whenever something catches my eye.
          </p>
        </div>
      </section>

      {nothingYet && (
        <section className="py-24 text-center text-muted-foreground">
          <p className="text-lg">Kathy's picks are coming soon — check back shortly!</p>
        </section>
      )}

      {/* Articles */}
      {showArticles && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-10">
              <BookOpen className="w-6 h-6 text-secondary" />
              <h2 className="text-3xl font-display text-primary">From the Journal</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeArticles.map((article, idx) => (
                <motion.a
                  key={article.id}
                  href={article.url || "#"}
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
                      style={{ backgroundImage: `url(${article.imageUrl || DEFAULT_ARTICLE_IMAGE})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {article.category && (
                      <div className="absolute bottom-4 left-4">
                        <span className="px-2.5 py-1 bg-secondary/90 text-white text-xs font-semibold rounded-full">{article.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{article.readTime}</span>
                      <span className="flex items-center gap-1 text-primary font-medium">Read <ExternalLink className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hotels */}
      {showHotels && (
        <section className={`py-20 ${showArticles ? "bg-muted/30 border-t border-border/50" : ""}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <Hotel className="w-6 h-6 text-secondary" />
              <h2 className="text-3xl font-display text-primary">Hotels I Love</h2>
            </div>
            <p className="text-muted-foreground mb-10 text-sm">
              Booked through Whole Journeys, these properties include exclusive Virtuoso perks you can't get on your own.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {activeHotels.map((hotel, idx) => (
                <motion.div
                  key={hotel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${hotel.imageUrl || DEFAULT_HOTEL_IMAGE})` }} />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-1">{hotel.location}</div>
                    <h3 className="font-display text-xl font-medium text-foreground mb-3">{hotel.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">{hotel.description}</p>
                    {[hotel.perk1, hotel.perk2, hotel.perk3].some(Boolean) && (
                      <div className="mb-5 space-y-1.5">
                        <div className="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">Virtuoso Perks</div>
                        {[hotel.perk1, hotel.perk2, hotel.perk3].filter(Boolean).map((perk) => (
                          <div key={perk} className="flex items-start gap-2 text-xs text-muted-foreground">
                            <span className="text-secondary mt-0.5">✦</span>{perk}
                          </div>
                        ))}
                      </div>
                    )}
                    <a
                      href={hotel.bookUrl || "https://book.wholejourneys.com"}
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
      )}

      {/* Featured Trips */}
      {showTrips && (
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
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${tour.imageUrl})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {tour.categories.slice(0, 2).map((cat) => (
                        <span key={cat} className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${CATEGORY_COLORS[cat] ?? "bg-white/80 text-primary"}`}>{cat}</span>
                      ))}
                    </div>
                    <div className="absolute bottom-3 left-4 text-white/90 text-sm font-medium">{tour.destination}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-display text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{tour.name}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">{tour.description}</p>
                    <a
                      href={activeTrips.find((t) => t.tourId === tour.id)?.customUrl || tour.travefyUrl}
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
      )}

      <Footer />
      <TourModal tour={selectedTour} isOpen={!!selectedTour} onClose={() => setSelectedTour(null)} />
    </div>
  );
}
