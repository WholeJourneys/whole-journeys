import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Globe, HeartHandshake, Mountain, Camera, Bike, ChevronDown, ChevronUp } from "lucide-react";
import { useSiteContent } from "@/hooks/use-admin-data";

const DEFAULTS: Record<string, string> = {
  about_subtitle: "Since 1998, Kathy Dragon has been crafting life-changing journeys for curious travelers — from Bhutan to Belize, Patagonia to Provence, Kerala to Kilimanjaro.",
  about_bio_1: "Kathy Dragon has spent three decades spanning every facet of the travel industry — from guiding for Country Walkers and Lindblad Expeditions/National Geographic, to launching her own award-winning ventures. Her tours have earned National Geographic's coveted Trips of a Lifetime distinction, and she has consulted for organizations from TUI to the World Bank on agritourism and responsible travel.",
  about_bio_2: "From Bhutan to Belize, Croatia to Czech Republic, Patagonia to Provence, Kerala to Kilimanjaro — she's been there, often more than once — and has personally escorted more than 6,000 guests on life-changing adventures. Along the way she has trained hundreds of guides and tour operators on how to connect North American travelers with genuinely local experiences.",
  about_bio_3: "When she's not on the road, Kathy calls Boulder, Colorado home — where she runs trails, hikes, cycles, and skis. That same energy is woven into every itinerary: boutique properties, expert local guides, traditional cuisines, and active excursions crafted for curious travelers who want to go deeper, not just further.",
  about_bio_4: "Kathy founded The Dragon's Path in 1998 and co-founded Whole Journeys with Whole Foods Market in 2012. When WFM was acquired by Amazon, Whole Journeys returned to Kathy in 2016 as a fully independent company. Today she brings that same hands-on expertise to her role as a Virtuoso Coastline travel advisor — designing both guided group adventures and bespoke private itineraries for travelers worldwide.",
  about_photo_url: "http://s3.amazonaws.com/whole-journeys-assets/production/page-images/kathy.jpg",
};

export default function About() {
  const { data: content } = useSiteContent();
  const c = (key: string) => content?.[key] ?? DEFAULTS[key] ?? "";
  const [showFull, setShowFull] = useState(false);

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
      <Navbar />

      {/* Kathy Bio — photo visible immediately below navbar */}
      <section className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Photo carousel + Whole Journeys founding story */}
            <div className="space-y-8">
              <div className="relative">
                <div className="rounded-2xl shadow-xl overflow-hidden w-full h-[600px] relative">
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
                <div className="absolute -bottom-6 left-6 right-6 bg-white/75 backdrop-blur-sm rounded-xl shadow-sm p-4 border border-white/60 flex items-center justify-between">
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
                <h3 className="text-lg font-display text-primary mb-3">How Whole Journeys Began</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In 2012, Kathy pitched the concept of the <em>"active foodie"</em> travel experience to her longtime friend and client John Mackey — wellness-focused trips built around meeting local producers in the field around the world. He said yes, and Whole Journeys was born as a Whole Foods Market partnership. When Whole Foods was acquired by Amazon in 2016, Kathy reacquired the company and has operated it independently ever since, including several summers leading food and active excursions aboard the Nat Geo Orion in Europe, the UK, the Baltics, and Scandinavia.
                </p>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-6 lg:pt-2">
              <div>
                <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-2 block">Our Story</span>
                <h1 className="text-4xl font-display font-semibold text-primary mb-6">A Life Spent Exploring</h1>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>{c("about_bio_1")}</p>
                  <p>{c("about_bio_2")}</p>
                  {showFull && (
                    <>
                      <p>{c("about_bio_4")}</p>
                    </>
                  )}
                </div>
                <button
                  onClick={() => setShowFull(!showFull)}
                  className="mt-4 flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                >
                  {showFull ? (
                    <><ChevronUp className="w-4 h-4" /> Show less</>
                  ) : (
                    <><ChevronDown className="w-4 h-4" /> Read more</>
                  )}
                </button>
              </div>

              {/* Hobbies */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { icon: Mountain, label: "Hiking" },
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

      {/* Whole Journeys + Coastline/Virtuoso */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <div>
                <h2 className="text-3xl font-display text-primary mb-4">Whole Journeys + Coastline & Virtuoso</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Today, Whole Journeys operates as both a boutique tour operator — specializing in active, cultural, and food-focused journeys for small groups and private travelers worldwide — and a full-service luxury travel agency. As an independent affiliate of Coastline Travel Advisors and a proud member of the exclusive Virtuoso network, Kathy can also book expedition cruises, safaris, and 4–5 star hotels with VIP perks, room upgrades, and property credits that independent travelers simply cannot access on their own.
                </p>
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
            Call Kathy directly at <a href="tel:+13039310785" className="text-secondary hover:underline font-medium">+1 (303) 931-0785</a> or send her an email — she loves talking travel.
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
