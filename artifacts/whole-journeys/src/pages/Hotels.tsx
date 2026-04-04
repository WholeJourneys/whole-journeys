import { motion } from "framer-motion";
import { ExternalLink, Star, Gift, Coffee, ArrowUpRight, CreditCard, Clock, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BOOKING_URL = "https://travelpro365.com/consumer/wholejourneys";

const VIRTUOSO_PERKS = [
  {
    icon: ArrowUpRight,
    title: "Room Upgrade on Arrival",
    description: "Subject to availability, Virtuoso guests are prioritized for complimentary upgrades at check-in.",
  },
  {
    icon: Coffee,
    title: "Daily Breakfast for Two",
    description: "Start every morning right — included at no extra charge at hundreds of top properties worldwide.",
  },
  {
    icon: CreditCard,
    title: "Hotel Credit to Spend",
    description: "A property credit (typically $100) to use on dining, spa, or activities during your stay.",
  },
  {
    icon: Clock,
    title: "Early Check-In & Late Checkout",
    description: "When available, arrive early and linger longer — without the extra night's fee.",
  },
  {
    icon: Gift,
    title: "Welcome Amenity",
    description: "A thoughtful gift on arrival — from a fruit basket to champagne — personally arranged by the property.",
  },
  {
    icon: Star,
    title: "VIP Guest Status",
    description: "Virtuoso properties know you're coming through us. Expect attentive, personalized service from the moment you arrive.",
  },
];

const FEATURED_PROPERTIES = [
  {
    name: "Belmond Hotel Cipriani",
    location: "Venice, Italy",
    description: "Legendary grande dame on Giudecca Island, with sweeping lagoon views and a heated outdoor pool.",
    imageUrl: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800&q=80",
    category: "Historic Icon",
  },
  {
    name: "Singita Grumeti",
    location: "Serengeti, Tanzania",
    description: "Ultra-exclusive camps on a private 350,000-acre concession in the heart of the Great Migration corridor.",
    imageUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80",
    category: "Safari Lodge",
  },
  {
    name: "Four Seasons George V",
    location: "Paris, France",
    description: "The most celebrated address in Paris — steps from the Champs-Élysées, with three Michelin-starred restaurants.",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    category: "City Luxury",
  },
];

export default function Hotels() {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=85)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full border border-white/30 text-white/90 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Virtuoso Preferred Hotels
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-white mb-6 leading-tight">
              The world's finest hotels —<br />
              <span className="text-secondary italic font-light">with perks you can't book alone.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              As a Virtuoso Coastline member, Whole Journeys unlocks exclusive amenities at over 1,200 of the world's best hotels — at the same price you'd pay booking direct.
            </p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white text-primary rounded-sm font-semibold tracking-wide uppercase hover:bg-secondary hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-sm"
            >
              Search & Book Hotels
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="mt-4 text-white/60 text-xs uppercase tracking-widest">
              Powered by Coastline TravelPro 365
            </p>
          </motion.div>
        </div>
      </section>

      {/* SAME PRICE CALLOUT */}
      <section className="bg-secondary/10 border-y border-secondary/20 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0" />
            <p className="text-foreground font-medium text-lg">
              <span className="text-secondary font-semibold">Same price as booking direct</span> — Virtuoso perks are included at no extra cost. You pay the same rate; we add the benefits.
            </p>
          </div>
        </div>
      </section>

      {/* VIRTUOSO PERKS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-3 block">What You Get</span>
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-4">Your Virtuoso Perks</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-light">
              Every hotel booked through Whole Journeys comes with the following amenities — automatically included when you book.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIRTUOSO_PERKS.map((perk, idx) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className="flex gap-5 p-6 bg-card rounded-2xl border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <perk.icon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-display font-medium text-foreground mb-1.5">{perk.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{perk.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-muted/30 border-t border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-3 block">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-display text-primary">How it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              {
                step: "01",
                title: "Search Hotels",
                body: "Browse our TravelPro 365 platform to search by destination, dates, and property type — from boutique city hotels to remote lodges.",
              },
              {
                step: "02",
                title: "Book Securely",
                body: "Reserve directly through the platform. Your Virtuoso perks are automatically attached to every qualifying reservation.",
              },
              {
                step: "03",
                title: "Arrive as a VIP",
                body: "The hotel knows you're a Whole Journeys guest. Expect a warm welcome, your upgrade, and all perks ready on arrival.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-display font-semibold text-lg mb-5">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-3 block">A Few Favorites</span>
            <h2 className="text-3xl md:text-4xl font-display text-primary">Properties Kathy Loves</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {FEATURED_PROPERTIES.map((prop, idx) => (
              <motion.div
                key={prop.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 bg-card"
              >
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${prop.imageUrl})` }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {prop.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{prop.location}</p>
                  <h3 className="font-display text-lg font-medium text-foreground mb-2">{prop.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{prop.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6 text-sm">Ready to find your perfect stay?</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-white rounded-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
            >
              Open Hotel Booking Platform
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="mt-3 text-muted-foreground text-xs">
              Powered by Coastline TravelPro 365 · Virtuoso Member Agency
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
