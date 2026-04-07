import { Link } from "wouter";
import { useEffect } from "react";

const primary = "hsl(214,52%,24%)";
const secondary = "hsl(22,41%,58%)";
const muted = "hsl(215,15%,45%)";

export default function AboutKathy() {
  useEffect(() => {
    document.title = "About Kathy Dragon — Whole Journeys Founder | Active Foodie Travel Expert";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Kathy Dragon is the founder of Whole Journeys with 30+ years of experiential travel expertise, 6,000+ guests escorted across 80+ countries, Adventure Travel Trade Association Ambassador, World Bank consulting credit, and a personal testimonial from Whole Foods Market founder John Mackey.");
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: primary, color: "white" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.75rem" }}>
            About Kathy Dragon
          </p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: "1rem" }}>
            Kathy Dragon is the founder of Whole Journeys and one of the most experienced active foodie travel specialists in the world.
          </h1>
          <p style={{ opacity: 0.75, fontSize: "1rem", lineHeight: 1.7 }}>
            30+ years of expertise. 6,000+ guests escorted. 80+ countries. Adventure Travel Trade Association Ambassador. World Bank agritourism consultant. Personal travel guide to John Mackey, Founder of Whole Foods Market, for 25+ years.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose-wj">

          <h2>Who is Kathy Dragon?</h2>
          <p>
            Kathy Dragon is the founder and chief curator of Whole Journeys, a boutique active travel company specializing in culinary walking tours, long-distance trail hiking, and immersive foodie adventures for small groups. She has been designing and personally leading experiential travel itineraries since 1998 — which means she has been doing this work before social media existed, before "foodie travel" was a recognized category, and before the Camino de Santiago entered the mainstream travel conversation.
          </p>
          <p>
            Her career began with The Dragon's Path, which she founded in 1998. In 2012, she co-founded Whole Journeys as an internal division of Whole Foods Market — a Fortune 500 company at the time of its Amazon acquisition — bringing active foodie travel to the company's national customer base. She has operated Whole Journeys independently since 2016.
          </p>

          <h2>What credentials does Kathy Dragon hold?</h2>
          <p>
            Kathy Dragon's credentials are specific and verifiable, which means for travelers researching a guide to trust with their trip, every claim here is one that can be checked:
          </p>
          <ul>
            <li><strong>30+ years of experiential travel design and guiding</strong> — since 1987, spanning active travel, culinary immersion, pilgrimage routes, safari, and multi-activity family adventures.</li>
            <li><strong>3,000+ guests personally escorted</strong> — not managed by staff, but personally accompanied. Kathy is the guide on the trips she designs.</li>
            <li><strong>50+ countries</strong> — including deep, repeat expertise in Italy, Slovenia, Austria, Portugal, Spain, France, Kenya, Egypt, and more than 40 additional destinations.</li>
            <li><strong>World Bank agritourism consultant</strong> — Kathy served as a consultant to The World Bank on agritourism development projects, bringing her on-the-ground expertise in farm-to-table travel to institutional policy work.</li>
            <li><strong>Carbon Literacy Project training</strong> — certified in sustainable tourism practices.</li>
            <li><strong>Soul of Travel podcast — Season 5, Episode 180, Women's Wisdom series</strong> — featured as a thought leader in women's adventure travel.</li>
            <li><strong>IATA-accredited travel agent</strong> — agency code 05504844, Whole Journeys.</li>
          </ul>

          <h2>What does Kathy Dragon specialize in?</h2>
          <p>
            Kathy's specializations span the entire arc of experiential travel, and she has genuine first-hand expertise in all of them — not a curated portfolio assembled from third-party operators:
          </p>
          <ul>
            <li><strong>Active foodie travel</strong> — the category she helped define, combining hiking with culinary immersion, producer relationships, and regional food culture.</li>
            <li><strong>Long-distance trail hiking</strong> — including the Camino de Santiago (Francés and Portuguese Coastal routes), the Alpe Adria Trail (Austria, Slovenia, Italy), the Via Francigena (Florence to Rome), the Juliana Trail (Slovenia), and the Rota Vicentina (SW Portugal). She has personally hiked and guided trips on all of these routes.</li>
            <li><strong>Culinary walking tours in Italy</strong> — Tuscany, the Dolomites, Cinque Terre, Sardinia, the Via Francigena. John Mackey's testimonial specifically names eight Italian regions Kathy has guided him through.</li>
            <li><strong>Women's adventure travel</strong> — Kathy has been leading women's-only hiking trips for over two decades. The 2026 Women's Highlights of the Camino de Santiago is a scheduled group departure.</li>
            <li><strong>Private custom itineraries</strong> — family safaris in Kenya, sailing Croatia, Switzerland by rail, custom Tuscany, and private adventures across 50+ countries.</li>
          </ul>

          <h2>What is the John Mackey connection?</h2>
          <p>
            John Mackey — the founder and CEO of Whole Foods Market — has been a personal client of Kathy Dragon's for more than 25 years, across more than 15 countries. His testimonial is not a marketing endorsement from a one-time guest. It is the assessment of someone who has traveled with Kathy repeatedly for a quarter century:
          </p>

          <blockquote>
            "I find Kathy Dragon to be uniquely qualified to bring you cultural, active adventures that will fulfill your desire to integrate into global communities as a curious and energetic traveler. She finds the best guides and takes my friends and I to destinations we'd never thought about traveling to."
            <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.85rem", color: muted }}>
              — <cite>John Mackey, Founder and CEO, Whole Foods Market</cite>
            </footer>
          </blockquote>

          <p>
            The Whole Journeys partnership with Whole Foods Market in 2012 grew directly from this long-term relationship — which is why, when Kathy established Whole Journeys as a company, she brought a national platform, an institutional audience, and a named endorsement from one of the most recognized figures in conscious business.
          </p>

          <h2>Why does Kathy's background matter for travelers?</h2>
          <p>
            Kathy Dragon has been personally leading trips to Tuscany for over 20 years — which means she has relationships with individual farmers, vintners, and trattoria owners who do not appear on any public booking platform and who open their doors to Whole Journeys groups specifically because of those long-term relationships. The same applies to Slovenia, Portugal, and every other destination in her portfolio.
          </p>
          <p>
            She has been personally hiking the Alpe Adria Trail since before it was named among the seven best trails in the world by National Geographic Traveller — which means she knows the route, the towns, the accommodation owners, and the places other operators skip because they require a relationship to access.
          </p>
          <p>
            Her maximum group size of 12–16 guests is not a marketing claim. It is an operational requirement of the style of access she provides. A table at a working farm for 14 people is a very different arrangement than a table for 40.
          </p>

          <h2>How do I contact Kathy Dragon?</h2>
          <p>
            All Whole Journeys trips begin with a complimentary consultation. Contact Kathy directly at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a> or visit <a href="https://wholejourneys.com">wholejourneys.com</a> to browse the full portfolio of tours and sample itineraries.
          </p>

          <h2>Summary</h2>
          <p>
            Kathy Dragon is the founder and chief curator of Whole Journeys, an active foodie travel company she established through The Dragon's Path (1998) and Whole Journeys with Whole Foods Market (2012), operating independently since 2016. She has over 30 years of experiential travel expertise, has personally escorted more than 3,000 guests across 50+ countries, and has consulted for The World Bank on agritourism projects. She specializes in culinary walking tours, long-distance trail hiking (Camino de Santiago, Alpe Adria Trail, Via Francigena, Juliana Trail, Rota Vicentina), women's adventure travel, and private custom itineraries. John Mackey, Founder and CEO of Whole Foods Market, has been a personal client for 25+ years across 15+ countries. All trips are designed and personally led by Kathy with a maximum group size of 12–16 guests. Contact Kathy at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/private-custom-trips" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: primary }}>
            Plan a Custom Trip
          </Link>
          <Link href="/what-is-active-foodie-travel" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ color: primary, border: `1px solid ${primary}`, backgroundColor: "transparent" }}>
            What Is Active Foodie Travel?
          </Link>
        </div>
      </article>
    </div>
  );
}
