import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Globe, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-primary mb-6">
            Crafting Journeys with Purpose
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whole Journeys was born from a simple belief: that travel should transform both the traveler and the destination. We are more than an agency; we are architects of experience.
          </p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* aesthetic vintage map or compass */}
            <div className="relative">
               <img 
                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" 
                 alt="Vintage map exploration" 
                 className="rounded-2xl shadow-xl w-full object-cover h-[600px]"
               />
               <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-6 rounded-full shadow-xl flex items-center justify-center hidden md:flex">
                 <img src={`${import.meta.env.BASE_URL}images/virtuoso-badge.png`} alt="Virtuoso Member" className="w-full h-full object-contain" />
               </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-display text-primary mb-4">A Virtuoso Coastline Partner</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As an independent affiliate of Coastline Travel Advisors and a proud member of the exclusive Virtuoso network, we leverage global relationships to secure VIP treatment, room upgrades, exclusive amenities, and specialized access for our clients.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-display text-primary mb-4">Two Ways to Travel</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We cater to distinct travel styles. Through our <a href="https://book.wholejourneys.com" className="text-secondary hover:underline">Coastline Booking Portal</a>, confident travelers can directly reserve luxury hotels and partner tours with our embedded perks. Alternatively, our bespoke planning service constructs entirely custom, ground-up itineraries utilizing our global network of destination specialists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display mb-4">Our Core Philosophy</h2>
            <p className="text-white/80 font-light">We believe travel is a privilege that comes with responsibility. Every journey we design adheres to these principles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <Globe className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-medium mb-3">Immersive Connection</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                We design itineraries that move beyond sightseeing. We connect you with local artisans, conservationists, and storytellers to experience the true pulse of a destination.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <Leaf className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-medium mb-3">Sustainable Footprint</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                We actively partner with eco-lodges, carbon-neutral operators, and community-owned initiatives to ensure your travel dollars support local ecosystems.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <HeartHandshake className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-medium mb-3">Uncompromising Service</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                From the initial consultation to the welcome-home call, we act as your dedicated advocate, ensuring every logistical detail is flawlessly executed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
