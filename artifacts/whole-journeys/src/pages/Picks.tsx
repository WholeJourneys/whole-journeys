import { useState } from "react";
import SEO from "@/components/SEO";
import { ExternalLink, BookOpen, Hotel, Map, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourModal from "@/components/TourModal";
import { useTours, type Tour } from "@/hooks/use-tours";
import { usePicksHotels, usePicksArticles, usePicksTrips } from "@/hooks/use-admin-data";
import { motion } from "framer-motion";
import { CATEGORY_COLORS } from "@/components/TourCard";

// Sample data shown when DB sections are empty
const SAMPLE_ARTICLES = [
  {
    id: -1,
    title: "Why I Keep Going Back to the Camino de Santiago",
    excerpt: "There's something about walking 500 miles that strips away everything unnecessary. I've done it three times now, and each time I arrive in Santiago I cry.",
    category: "Walking & Hiking",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
    url: "#",
    readTime: "6 min read",
    sortOrder: 0,
    active: true,
    updatedAt: new Date(),
  },
  {
    id: -2,
    title: "The Secret to Booking a Safari Without Getting Ripped Off",
    excerpt: "Most people have no idea how different two \"5-star safaris\" can be. Here's what I look for after 20 years of sending clients to East Africa.",
    category: "Safari & Wildlife",
    imageUrl: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    url: "#",
    readTime: "8 min read",
    sortOrder: 1,
    active: true,
    updatedAt: new Date(),
  },
  {
    id: -3,
    title: "Slovenia: Europe's Best-Kept Secret (For Now)",
    excerpt: "Before the crowds discover it, Lake Bled and the Julian Alps offer the kind of unhurried beauty that feels impossible to find anywhere else in summer.",
    category: "Hidden Gems",
    imageUrl: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800&q=80",
    url: "#",
    readTime: "5 min read",
    sortOrder: 2,
    active: true,
    updatedAt: new Date(),
  },
];

const SAMPLE_HOTELS = [
  {
    id: -1,
    name: "Belmond Hotel Caruso",
    location: "Ravello, Amalfi Coast, Italy",
    description: "Perched 300 metres above the Tyrrhenian Sea in a converted 11th-century palace, Caruso is the most dramatic hotel I've ever stayed in. The infinity pool overlooking the coast is unforgettable.",
    imageUrl: "https://img.belmond.com/f_auto/t_640x360/photos/car/car-gst-pool29.jpg",
    bookUrl: "https://travelpro365.com/consumer/wholejourneys",
    perk1: "Daily breakfast for two",
    perk2: "$100 hotel credit",
    perk3: "Room upgrade on arrival (subject to availability)",
    sortOrder: 0,
    active: true,
    updatedAt: new Date(),
  },
  {
    id: -2,
    name: "andBeyond Ngorongoro Crater Lodge",
    location: "Ngorongoro, Tanzania",
    description: "Maasai-inspired suites on the rim of the world's largest volcanic caldera. Butler service, fireplaces, and a view that makes you feel like you're dreaming.",
    imageUrl: "https://www.luxurytravelmagazine.com/files/610/6/1106/Ngorongoro_Crater_Lodge_9_big_bu.jpg",
    bookUrl: "https://travelpro365.com/consumer/wholejourneys",
    perk1: "Daily breakfast included",
    perk2: "Welcome amenity",
    perk3: "Early check-in / late checkout",
    sortOrder: 1,
    active: true,
    updatedAt: new Date(),
  },
  {
    id: -3,
    name: "Hotel de la Cité Carcassonne",
    location: "Carcassonne, France",
    description: "A fairy-tale hotel built inside a UNESCO medieval fortress. You fall asleep to silence, wake up to the sound of bells, and step out into history every morning.",
    imageUrl: "https://www.ahstatic.com/photos/8613_ho_00_p_1024x768.jpg",
    bookUrl: "https://travelpro365.com/consumer/wholejourneys",
    perk1: "Complimentary breakfast",
    perk2: "$100 food & beverage credit",
    perk3: "Preferred room category",
    sortOrder: 2,
    active: true,
    updatedAt: new Date(),
  },
];

export default function Picks() {
  const { data: tours } = useTours();
  const { data: dbHotels = [] } = usePicksHotels();
  const { data: dbArticles = [] } = usePicksArticles();
  const { data: dbTrips = [] } = usePicksTrips();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const activeHotels = dbHotels.filter((h) => h.active);
  const activeArticles = dbArticles.filter((a) => a.active);
  const activeTrips = dbTrips.filter((t) => t.active);

  const allTours = tours ?? [];
  const featuredTours = allTours.filter((t) => activeTrips.some((pt) => pt.tourId === t.id));

  // Use real data if available, otherwise show samples
  const displayHotels = activeHotels.length > 0 ? activeHotels : SAMPLE_HOTELS;
  const displayArticles = activeArticles.length > 0 ? activeArticles : SAMPLE_ARTICLES;
  const displayTours = featuredTours.length > 0 ? featuredTours : allTours.slice(0, 3);

  const showHotels = true;
  const showArticles = true;
  const showTrips = displayTours.length > 0;
  const nothingYet = false;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Kathy's Picks"
        description="Kathy Dragon's personal recommendations — handpicked tours, boutique hotels, and travel reads she loves and trusts. Curated for curious, discerning travelers."
        path="/picks"
      />
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
              {displayArticles.map((article, idx) => (
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
              {displayHotels.map((hotel, idx) => (
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
                      href={hotel.bookUrl || "https://travelpro365.com/consumer/wholejourneys"}
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
              A few itineraries I keep coming back to. Click any trip for an overview, then view the full itinerary on Travefy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayTours.map((tour, idx) => (
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
                    <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-primary/80">
                      View Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
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
