import { useState, useEffect } from "react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Globe, HeartHandshake } from "lucide-react";
import { useSiteContent } from "@/hooks/use-admin-data";

const DEFAULTS: Record<string, string> = {
  about_subtitle: "Since 1998, Kathy Dragon has been crafting life-changing journeys for curious travelers — from Bhutan to Belize, Patagonia to Provence, Kerala to Kilimanjaro.",
  about_bio_1: "My journey in the travel industry began in 1987, when I started leading bike trips in New England. That early work eventually grew into running all of North American Tours for the company that is now VBT. From there I moved into student programs, developing Rainforest Workshops in Costa Rica and immersive cultural programs for high school students in Peru and Ecuador — experiences designed to go well beyond typical tourism.",
  about_bio_1b: "In 1995 I became one of the first employees at Country Walkers, where I helped build the company from the ground up, creating and leading trips across the globe.",
  about_bio_1c: "Three years later, in 1998, I founded my own company, The Dragon's Path, offering cultural walking vacations worldwide. During that period I also created ActiveWomen.com and began speaking publicly on the influence and importance of what I called \"Prime Time Women\" — women between 50 and 70 — and their forceful influence on the travel industry.",
  about_bio_2: "Around 2008, I consulted for EONS.com, an ambitious platform competing with AARP and Facebook to become the go-to lifestyle destination for the 50+ market. I built and led their travel division, curating partnerships with operators I knew and trusted. I later took over the site and relaunched it as TravelDragon.com — a robust platform that still hosts 400+ companies and 5,000+ tours — though it's currently more of a legacy asset than an active venture. During this period I also consulted for the World Bank on projects in Tajikistan and Grenada, focusing on the intersection of agriculture and tourism — a space I find endlessly interesting.",
  about_photo_url: "http://s3.amazonaws.com/whole-journeys-assets/production/page-images/kathy.jpg",
};

export default function About() {
  const { data: content } = useSiteContent();
  const c = (key: string) => content?.[key] ?? DEFAULTS[key] ?? "";

  const photos = [
    { src: "/kathy-montblanc.jpeg", alt: "Kathy Dragon on trail with Mont Blanc behind her" },
    { src: "/kathy-dolomites.jpeg", alt: "Kathy Dragon in the Dolomites" },
    { src: "/kathy-strudel.jpeg", alt: "Kathy Dragon at a mountain hut with Whole Journeys water bottle", position: "object-center" },
    { src: "/kathy-vineyard.jpeg", alt: "Kathy Dragon harvesting grapes in a vineyard" },
    { src: "/kathy-wine-mountains.jpeg", alt: "Kathy Dragon enjoying a meal with mountain views" },
    { src: "/kathy-triglav.jpeg", alt: "Kathy Dragon at Triglav National Park, Slovenia" },
    { src: "/kathy-picos.jpg", alt: "Kathy Dragon with a local resident in Picos de Europa, Spain" },
  ];
  const [activePhoto, setActivePhoto] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActivePhoto((i) => (i + 1) % photos.length);
        setFading(false);
      }, 400);
    }, 5000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const GROUP_PHOTOS = [
    "/guests-coastal-group.png",
    "/guests-alpine.jpeg",
    "/guests-waterfall.jpeg",
    "/guest-meadow.jpeg",
    "/guests-coffee-turkey.jpeg",
    "/guests-via-francigena.jpeg",
    "/guests-laughing-coffee.jpeg",
    "/guests-restaurant.jpeg",
    "/womens-hike.jpeg",
  ];
  const [hotelIdx, setHotelIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setHotelIdx((i) => (i + 1) % GROUP_PHOTOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="About Kathy Dragon"
        description="Meet Kathy Dragon — independent travel advisor and Virtuoso member with decades of experience designing extraordinary, immersive journeys for curious travelers worldwide."
        path="/about"
      />
      <Navbar />

      {/* Kathy Quote — top of page */}
      <div className="pt-24 bg-primary/5 border-b border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
          <p className="text-xl md:text-2xl font-display text-primary italic leading-relaxed">
            "I believe why we travel, where we travel, what we do while we are there, and when we return home, can effect positive change."
          </p>
          <p className="mt-4 text-sm font-medium text-secondary tracking-widest uppercase">— Kathy Dragon</p>
        </div>
      </div>

      {/* Kathy Bio — photo + bio text */}
      <section className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Photo carousel + Whole Journeys founding story */}
            <div className="space-y-8">
              <div className="relative">
                <div className="rounded-2xl shadow-xl overflow-hidden w-full h-[380px] sm:h-[500px] lg:h-[600px] relative">
                  {photos.map((photo, i) => (
                    <img
                      key={photo.src}
                      src={photo.src}
                      alt={photo.alt}
                      className={`absolute inset-0 w-full h-full object-cover ${photo.position ?? "object-top"} transition-opacity duration-300`}
                      style={{ opacity: i === activePhoto ? (fading ? 0 : 1) : 0 }}
                    />
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/75 backdrop-blur-sm rounded-xl shadow-sm p-3 border border-white/60 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground/80">Kathy Dragon</p>
                    <p className="text-xs text-muted-foreground/80 mt-0.5">Founder & Chief Curator · Boulder, Colorado</p>
                  </div>
                  <div className="flex gap-2">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setFading(true); setTimeout(() => { setActivePhoto(i); setFading(false); }, 400); }}
                        className={`w-2 h-2 rounded-full transition-colors ${i === activePhoto ? "bg-secondary" : "bg-border"}`}
                        aria-label={`Photo ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Whole Journeys founding story — right under the photo */}
              <div className="mt-8 pt-2 border-t border-border/40">
                <h3 className="text-2xl font-display text-primary mb-4">How Whole Journeys Began</h3>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
                  <p>
                    In 2012 I pitched an idea to my good friend and longtime client John Mackey: a travel company centered around what I called the <em>"active foodie"</em> experience — wellness-focused, hands-on cooking, hiking and biking trips designed around meeting Whole Foods Market producers in the field around the world. He said yes, and Whole Journeys was born. When Whole Foods was acquired by Amazon in 2016, I reacquired the company and continued building it independently.
                  </p>
                  <p>
                    Today Whole Journeys is a boutique tour operator specializing in active, cultural, and food-focused travel — worldwide, for both small groups and FIT (individual, couples, and families) in guided and self-guided formats.
                  </p>
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-6 lg:pt-2">
              <div>
                <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-2 block">Our Story</span>
                <h1 className="text-4xl font-display font-semibold text-primary mb-6">A Life Spent Exploring</h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{c("about_bio_1")}</p>
                  <p>{c("about_bio_1b")}</p>
                  <p>{c("about_bio_1c")}</p>
                  <p>{c("about_bio_2")}</p>
                </div>
              </div>
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

      {/* Whole Journeys + Coastline/Virtuoso */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div>
                <h2 className="text-3xl font-display text-primary mb-4">Whole Journeys + Coastline & Virtuoso</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    In order to provide additional services to guests, Kathy is also an independent affiliate of Coastline Travel Advisors and a proud member of the exclusive Virtuoso network. This partnership allows her to book travel outside her portfolio including expedition cruises, safaris, biking and cultural private and group trips.
                  </p>
                  <p>
                    On the site, the live "browse and book" offers a convenient way for clients to book 4–5 star hotels with VIP perks, room upgrades, and property credits that independent travelers simply cannot access on their own.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="rounded-2xl shadow-xl overflow-hidden w-full h-[500px] relative">
                  {GROUP_PHOTOS.map((src, i) => (
                    <div
                      key={src}
                      className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                      style={{
                        backgroundImage: `url(${src})`,
                        opacity: i === hotelIdx ? 1 : 0,
                      }}
                    />
                  ))}
                </div>
                <div className="absolute -bottom-6 left-6 right-6 bg-white/75 backdrop-blur-sm rounded-xl shadow-sm p-4 border border-white/60">
                  <p className="text-sm font-medium text-foreground/80">Whole Journeys Guests</p>
                </div>
              </div>
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
            <a href="mailto:travel@wholejourneys.com" className="text-secondary hover:underline font-medium">Send Kathy an email</a> — she loves talking travel.
          </p>
          <a
            href="mailto:travel@wholejourneys.com"
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
