import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Compass, Globe, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import { useTours, type Tour } from "@/hooks/use-tours";

export default function Home() {
  const { data: tours, isLoading } = useTours();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  // Get 3 featured tours
  const featuredTours = tours?.slice(0, 3) || [];

  const scrollToTours = () => {
    document.getElementById('signature-tours')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* hero scenic mountain landscape */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full border border-white/30 text-white/90 text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
              Curated Luxury Travel
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-semibold text-white mb-6 leading-tight text-balance">
              Experience the World <br/><span className="text-secondary italic font-light">Differently</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              We design extraordinary journeys for the modern explorer. From remote wilderness safaris to exclusive cultural immersions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a 
                href="https://book.wholejourneys.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-sm font-medium tracking-wide uppercase hover:bg-white/90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Book Hotels & Partners
              </a>
              <button 
                onClick={scrollToTours}
                className="w-full sm:w-auto px-8 py-4 bg-primary/80 backdrop-blur-md text-white border border-white/20 rounded-sm font-medium tracking-wide uppercase hover:bg-primary transition-all flex items-center justify-center gap-2"
              >
                Explore Signature Tours
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/50" />
        </div>
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
                Travel designed for the <br/>curious soul.
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As a Virtuoso Coastline travel agent, we unlock doors to the world's most exclusive properties and experiences. Whether you prefer to book your own luxury hotels through our portal or have us curate a bespoke expedition to the ends of the earth, your journey is our passion.
              </p>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center gap-2 text-secondary font-medium uppercase tracking-wide hover:gap-4 transition-all">
                  Read our story <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* aesthetic travel detail */}
              <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80" alt="Coffee and maps" className="rounded-2xl h-64 object-cover w-full mt-8" />
              {/* aesthetic luxury hotel */}
              <img src="https://pixabay.com/get/g7e0c244c447343bf3b7ca198a4f2195450f6fe5977ea0c48ff8b4cbd9e0a193346c31faa2b6f9061ffac34d3e69dee7c09f16b2bf822ac37a574549eb183d318_1280.jpg" alt="Luxury suite" className="rounded-2xl h-80 object-cover w-full" />
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
              {[1, 2, 3].map(i => (
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

      {/* COASTLINE BOOKING SECTION */}
      <section className="py-24 relative overflow-hidden">
        {/* luxury resort pool */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-primary/90" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Compass className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
            Know exactly what you want?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            As a Coastline Virtuoso agency, we offer exclusive access to our TravelPro 365 booking platform. Book top-tier hotels directly, while enjoying our VIP Virtuoso perks and amenities.
          </p>
          <a 
            href="https://book.wholejourneys.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 bg-white text-primary rounded-sm font-semibold tracking-wide uppercase hover:bg-secondary hover:text-white transition-colors shadow-xl"
          >
            Access Booking Platform
          </a>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium text-foreground mb-3">Virtuoso Network</h3>
              <p className="text-muted-foreground text-sm">Access to exclusive amenities, upgrades, and experiences globally.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium text-foreground mb-3">Deep Expertise</h3>
              <p className="text-muted-foreground text-sm">Decades of combined experience designing complex international itineraries.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-6">
                <Compass className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-medium text-foreground mb-3">Seamless Journeys</h3>
              <p className="text-muted-foreground text-sm">From the moment you leave your door until you return home.</p>
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
