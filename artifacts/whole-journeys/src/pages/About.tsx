import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Globe, HeartHandshake, Mountain, Camera, Bike } from "lucide-react";
import { useSiteContent } from "@/hooks/use-admin-data";

const DEFAULTS: Record<string, string> = {
  about_subtitle: "Since 1998, Kathy Dragon has been crafting life-changing journeys for curious travelers — from Bhutan to Belize, Patagonia to Provence, Kerala to Kilimanjaro.",
  about_bio_1: "As a professional in the Adventure and Experiential Travel industry for more than two decades, Kathy has primarily guided small group tours for active adults worldwide — along with wearing all the other hats involved in running such a business.",
  about_bio_2: "From Bhutan to Belize, Croatia to Czech Republic, Patagonia to Provence, Kerala to Kilimanjaro — she's been there, often more than once — and has personally escorted more than 6,000 guests on life-changing adventures.",
  about_bio_3: "The trips Kathy designs allow for authentic experiences involving rich cultural connections. She stays at boutique properties, employs expert local guides, samples traditional cuisines, and engages in active excursions — all within a framework of responsible tourism.",
  about_bio_4: "Since 1998, Kathy has led small group cultural walking adventures worldwide through her company The Dragon's Path, and founded Whole Journeys in 2012. Along the way she has trained hundreds of guides and tour operators on the nuances of understanding the North American traveler.",
  about_photo_url: "http://s3.amazonaws.com/whole-journeys-assets/production/page-images/kathy.jpg",
};

export default function About() {
  const { data: content } = useSiteContent();
  const c = (key: string) => content?.[key] ?? DEFAULTS[key] ?? "";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-primary mb-6">
            A Life Spent Exploring
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {c("about_subtitle")}
          </p>
        </div>
      </section>

      {/* Kathy Bio */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={c("about_photo_url")}
                alt="Kathy Dragon, Founder of Whole Journeys"
                className="rounded-2xl shadow-xl w-full object-cover object-top h-[600px]"
              />
              <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-xl shadow-lg p-5 border border-border/50">
                <p className="text-sm font-medium text-foreground">Kathy Dragon</p>
                <p className="text-xs text-muted-foreground mt-0.5">Founder & Executive Director · Boulder, Colorado</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-display text-primary mb-4">Meet Kathy</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{c("about_bio_1")}</p>
                  <p>{c("about_bio_2")}</p>
                  <p>{c("about_bio_3")}</p>
                  <p>{c("about_bio_4")}</p>
                </div>
              </div>

              {/* Hobbies */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon: Mountain, label: "Trail Running" },
                  { icon: Bike, label: "Cycling" },
                  { icon: Camera, label: "Photography" },
                  { icon: Globe, label: "Skiing" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground border border-border/50">
                    <Icon className="w-4 h-4 text-secondary" />
                    {label}
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground italic border-l-2 border-secondary pl-4">
                "I believe why we travel, where we travel, what we do while we are there, and when we return home, can effect positive change." — Kathy Dragon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-muted/30 border-y border-border/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "6,000+", label: "Guests Escorted" },
              { value: "80+", label: "Countries Explored" },
              { value: "1998", label: "Dragon's Path Founded" },
              { value: "27+", label: "Years of Experience" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-display font-semibold text-primary mb-2">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Whole Journeys Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div>
                <h2 className="text-3xl font-display text-primary mb-4">The Whole Journeys Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Whole Journeys was founded in 2012 and has been solely owned and operated by Kathy Dragon since 2016. The company grew from a vision to connect travelers with the local flavors of the destinations they pass through — incorporating the passion of local producers into every journey.
                  </p>
                  <p>
                    The Whole Journeys <em>"Active Foodie"</em> adventures explore local landscapes through walking, hiking, and cycling between historic villages, breathtaking countrysides, and legendary pathways, while focusing on the culture and traditions of food.
                  </p>
                  <p>
                    Today, Whole Journeys has evolved to include both bespoke hand-crafted tour itineraries and, as a Virtuoso Coastline travel agent, access to the world's finest hotels and luxury properties with exclusive VIP perks.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-display text-primary mb-3">A Virtuoso Coastline Partner</h3>
                <p className="text-muted-foreground leading-relaxed">
                  As an independent affiliate of Coastline Travel Advisors and a proud member of the exclusive Virtuoso network, Whole Journeys leverages global relationships to secure VIP treatment, room upgrades, exclusive amenities, and specialized access that independent travelers simply cannot obtain on their own.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80"
                alt="Beautiful European destination"
                className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial – John Mackey */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl text-secondary/40 font-serif mb-6 leading-none">"</div>
          <blockquote className="text-xl md:text-2xl font-display text-primary leading-relaxed mb-8">
            For over 25 years I've personally been choosing to organize my trips with travel companion and friend Kathy Dragon. I find her to be uniquely qualified to bring you cultural, active adventures that will fulfill your desire to integrate into global communities.
          </blockquote>
          <div>
            <p className="font-semibold text-foreground">John Mackey</p>
            <p className="text-sm text-muted-foreground">Co-Founder & Co-CEO, Whole Foods Market</p>
          </div>
          <div className="mt-6 text-sm text-muted-foreground italic">
            Kathy has developed and led John's trips to Hawaii, Scotland, Peru, Argentina, Chile, New Zealand, Italy (Tuscany, Cinque Terre, Sardinia, Dolomites), Croatia, Turkey, France, Switzerland, and Spain.
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-display mb-4">Our Core Philosophy</h2>
            <p className="text-white/80 font-light">Every journey Whole Journeys designs adheres to these principles.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <Globe className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-medium mb-3">Immersive Connection</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                We connect you with local artisans, farmers, winemakers, chefs, and storytellers — face-to-face, through-the-back-door experiences that transform the way you see the world.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <Leaf className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-medium mb-3">Responsible Tourism</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                We actively partner with eco-conscious operators and community-owned initiatives to ensure your travel dollars support local ecosystems and the people who call those places home.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-2xl backdrop-blur-sm border border-white/10">
              <HeartHandshake className="w-10 h-10 text-secondary mb-6" />
              <h3 className="text-xl font-medium mb-3">Personal Service</h3>
              <p className="text-white/70 font-light text-sm leading-relaxed">
                Small groups of 16 maximum, boutique properties, expert local guides. From the initial conversation to the welcome-home call, Kathy is your dedicated advocate every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display text-primary mb-4">Ready to Plan Your Journey?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Call Kathy directly at <a href="tel:+13039310785" className="text-secondary hover:underline font-medium">+1 (303) 931-0785</a> or send her an email — she loves talking travel.
          </p>
          <a
            href="mailto:kathy@wholejourneys.com"
            className="inline-block px-10 py-4 bg-primary text-white rounded-sm font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors shadow-lg"
          >
            Email Kathy
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
