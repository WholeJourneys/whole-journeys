import { useState, useEffect } from "react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Compass, Globe, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import { useTours, type Tour } from "@/hooks/use-tours";
import { useActiveSpecials, buildSpecialUrl } from "@/hooks/use-specials";

const HERO_SLIDES = [
  {
    // Coastal village — likely Cinque Terre
    url: "https://images.unsplash.com/photo-1499678329028-101435549a4e?w=1920&q=85",
    caption: "Cinque Terre, Italy",
  },
  {
    // Mirror-lake reflection of the Alps — no people
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=85",
    caption: "The Alps, Europe",
  },
  {
    url: "/hero-camino.jpeg",
    caption: "Camino de Santiago, Spain",
  },
  {
    url: "/hero-rhone-alps.jpeg",
    caption: "Rhône-Alpes, France",
  },
  {
    // Dramatic Dolomite mountain peaks — no people
    url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=85",
    caption: "The Dolomites, Italy",
  },
  {
    // African savanna at golden hour — no people
    url: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=85",
    caption: "Serengeti, Tanzania",
  },
  {
    url: "/machu-picchu.jpg",
    caption: "Machu Picchu, Peru",
  },
  {
    url: "/hero-triglav-lake.jpg",
    caption: "7 Lakes Hike, Triglav National Park",
  },
  {
    url: "/hero-triglav-hiker.jpg",
    caption: "Hiking Slovenia",
  },
  {
    url: "/hero-dalmatian-coast.jpg",
    caption: "Dalmatian Coast, Croatia",
  },
  {
    url: "/hero-stari-grad.jpg",
    caption: "Stari Grad, Hvar, Croatia",
  },
];

const SLIDE_INTERVAL = 6000;

export default function Home() {
  const { data: tours, isLoading } = useTours();
  const { data: specials } = useActiveSpecials();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredTours = tours?.slice(0, 3) || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const scrollToTours = () => {
    document.getElementById("signature-tours")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Curated Experiential Travel"
        description="Thoughtfully designed extraordinary journeys for curious travelers. Explore signature walking tours in Europe and beyond, personally curated by Kathy Dragon — independent travel advisor and Virtuoso member."
        path="/"
      />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">

        {/* Slideshow */}
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].url})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/45" />

        {/* Caption */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`caption-${currentSlide}`}
            className="absolute bottom-20 left-8 text-white/70 text-xs font-medium uppercase tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {HERO_SLIDES[currentSlide].caption}
          </motion.div>
        </AnimatePresence>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentSlide ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-white/30 text-white/90 text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
              Curated Experiential Travel
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold text-white mb-6 leading-tight text-balance">
              Experience the World <br /><span className="text-secondary italic font-light">Differently</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Thoughtfully designing extraordinary experiences for curious travelers.
            </p>

            <div className="flex items-center justify-center">
              <button
                onClick={scrollToTours}
                className="w-full sm:w-auto px-10 py-4 bg-primary/80 backdrop-blur-md text-white border border-white/20 rounded-sm font-medium tracking-wide uppercase hover:bg-primary transition-all flex items-center justify-center gap-2"
              >
                Explore Signature Tours
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

          </motion.div>
        </div>

        {/* FEATURED SPECIAL — bottom-right floating card (only when active specials exist) */}
        {specials && specials.length > 0 && (
          <div className="absolute bottom-16 right-6 z-10 hidden sm:block">
            {specials.slice(0, 1).map((s) => (
              <a
                key={s.id}
                href={buildSpecialUrl(s.linkUrl, s.referralTag)}
                target={s.linkUrl ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex flex-col gap-1 w-56 px-4 py-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 text-white hover:bg-black/55 transition-all"
              >
                {s.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary/90">{s.badge}</span>
                )}
                <span className="text-sm font-semibold leading-snug">{s.title}</span>
                {s.description && (
                  <span className="text-xs text-white/60 leading-snug line-clamp-2">{s.description}</span>
                )}
              </a>
            ))}
          </div>
        )}

      </section>

      {/* PHILOSOPHY/INTRO */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-display text-primary leading-tight">
                Travel designed for the <br />curious soul.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every journey I design starts with a conversation — where you dream of going, who you're traveling with, how you like to move through a place, and what truly matters to you: extraordinary food, deep history, time in nature, local culture, meaningful activity, or a quiet weaving of all of it. Whether it's a women's hiking week in Slovenia, a family adventure in Kenya, or a slow private drive through the French countryside, I build each trip around you. No templates. No filler days.
              </p>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center gap-2 text-secondary font-medium uppercase tracking-wide hover:gap-4 transition-all">
                  My story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <img src="/local-culture-china.jpg" alt="Local women in traditional dress, China" className="rounded-2xl h-64 object-cover w-full mt-8" />
              <img src="/kathy-ski-pastry.jpeg" alt="Kathy Dragon enjoying a mountain lunch after skiing" className="rounded-2xl h-80 object-cover w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section id="signature-tours" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-2 block">Inspiration</span>
              <h2 className="text-4xl font-display text-primary">Signature Sample Journeys</h2>
            </div>
            <Link href="/tours" className="inline-flex items-center gap-2 text-primary font-medium border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors">
              View All Tours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-card rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour, idx) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <TourCard tour={tour} onClick={setSelectedTour} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FEATURED SPECIALS — only renders when there's something to show */}
      {specials && specials.length > 0 && (
        <section className="py-14 bg-muted/40 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-6">
              Featured Right Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {specials.map((s) => (
                <a
                  key={s.id}
                  href={s.linkUrl || "#"}
                  target={s.linkUrl ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex gap-4 bg-background rounded-xl border border-border p-4 hover:shadow-md transition-all hover:border-primary/20"
                >
                  {s.imageUrl && (
                    <img
                      src={s.imageUrl}
                      alt={s.title}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    {s.badge && (
                      <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded-full mb-1.5">
                        {s.badge}
                      </span>
                    )}
                    <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                      {s.title}
                    </p>
                    {s.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VALUE PROPS */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-medium text-foreground mb-3">Personally Designed</h3>
              <p className="text-muted-foreground text-base">Every itinerary is built from scratch for you — not pulled from a catalog or assembled by a call center.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-medium text-foreground mb-3">Deep Local Knowledge</h3>
              <p className="text-muted-foreground text-base">I've walked the trails, stayed in the properties, and know the people who make the difference on the ground.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-medium text-foreground mb-3">One Person, Start to Finish</h3>
              <p className="text-muted-foreground text-base">From first conversation to your journey home, you work with me directly — not a team, not a ticket queue.</p>
            </div>
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
