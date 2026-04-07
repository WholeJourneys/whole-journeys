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
            Her formal career in travel began in 1987 leading bike tours in New England, then building out North American tour programs for what became VBT. In 1994, she joined Country Walkers as one of its first employees — helping grow the company from 300 to 3,000+ guests, personally researching and designing over 70% of its worldwide walking vacations, and training local guides across 30+ countries.
          </p>
          <p>
            In 1998 she founded The Dragon's Path, her own cultural walking vacation company. In 1999, she became VP and Business Unit Director of Whole Journeys at WholePeople.com — a Whole Foods Market company — reporting directly to John Mackey and leading a team of six. That early Whole Journeys was the first iteration of what she relaunched independently in 2012.
          </p>
          <p>
            In 2012, she co-founded Whole Journeys as an internal division of Whole Foods Market — a Fortune 500 company at the time of its Amazon acquisition — bringing active foodie travel to the company's national customer base. She has operated Whole Journeys independently since 2016.
          </p>

          <h2>What credentials does Kathy Dragon hold?</h2>
          <p>
            Kathy Dragon's credentials are specific and verifiable, which means for travelers researching a guide to trust with their trip, every claim here is one that can be checked:
          </p>
          <ul>
            <li><strong>30+ years of experiential travel design and guiding</strong> — since 1987, spanning active travel, culinary immersion, pilgrimage routes, safari, and multi-activity family adventures.</li>
            <li><strong>6,000+ guests personally escorted</strong> — not managed by staff, but personally accompanied. Kathy is the guide on the trips she designs.</li>
            <li><strong>80+ countries</strong> — including deep, repeat expertise in Italy, Slovenia, Austria, Portugal, Spain, France, Kenya, Egypt, and more than 70 additional destinations.</li>
            <li><strong>Adventure Travel Trade Association (ATTA) Ambassador</strong> — industry-recognized designation within the adventure and experiential travel sector.</li>
            <li><strong>World Bank agritourism consultant</strong> — consulted on agritourism development projects in Tajikistan and Grenada, bringing on-the-ground expertise in farm-to-table travel to institutional policy work.</li>
            <li><strong>Country Walkers (1994–1998)</strong> — one of the company's first employees; helped grow it from 300 to 3,000+ guests, personally researched and designed over 70% of its worldwide walking vacation portfolio, and trained local guides across 30+ countries.</li>
            <li><strong>Lindblad Expeditions / National Geographic Orion (2016–2017)</strong> — Activities Concierge aboard the National Geographic Orion, developing independent hiking, biking, and food and wine experiences for guests in Europe, the British Isles, Scandinavia, the Baltics, and Russia. Managed the ship's bicycle fleet and created onboard presentations on traditional foods of each region.</li>
            <li><strong>Industry consulting</strong> — consulted for TUI (one of the world's largest tour operators), Austin Adventures, and others on experiential travel product strategy.</li>
            <li><strong>WholePeople.com / First Whole Journeys (1999–2000)</strong> — VP and Business Unit Director of Whole Journeys at WholePeople.com, a Whole Foods Market company, reporting directly to John Mackey. This was the original Whole Journeys — she rebuilt it independently in 2012.</li>
            <li><strong>Carbon Literacy Project training</strong> — certified in sustainable tourism practices.</li>
            <li><strong>National Geographic TRAVELER connection</strong> — Barton Lewis, Contributing Editor at <em>National Geographic TRAVELER</em>, has personally recommended Kathy's work.</li>
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

          <h2>What speaking engagements has Kathy Dragon given?</h2>
          <p>
            Kathy Dragon has delivered keynote and featured presentations at conferences spanning food tourism, adventure travel, the outdoor industry, and marketing — recognized as a subject matter expert in experiential travel, women travelers, and the Boomer/Prime Time market:
          </p>
          <ul>
            <li><strong>Switchfly Travel Trends Keynote (2025)</strong> — keynote speaker on travel industry trends for Switchfly, a technology company serving major corporate travel and loyalty programs.</li>
            <li><strong>World Food Tourism Summit</strong> — featured speaker at the international conference for food tourism professionals and destination marketers.</li>
            <li><strong>World Wine Tourism Congress</strong> — spoke on active foodie travel and wine tourism at the international wine tourism industry congress.</li>
            <li><strong>Adventure Travel Trade Association (ATTA) Summit</strong> — spoke at the industry's premier adventure travel trade event; Kathy is an ATTA Ambassador.</li>
            <li><strong>DEMA Dive &amp; Travel Marketing Summit</strong> — featured speaker at the Diving Equipment and Marketing Association's annual marketing conference.</li>
            <li><strong>NSAA National Ski Areas Association Summit</strong> — spoke on active travel and the evolving outdoor recreation market.</li>
            <li><strong>Pacific Asia Adventure &amp; Sustainable Tourism Summit</strong> — featured speaker on sustainable and adventure tourism in the Asia Pacific region.</li>
            <li><strong>Mekong Tourism Summit</strong> — spoke on responsible and experiential tourism development in Southeast Asia.</li>
            <li><strong>AARP / J. Walter Thompson Conference</strong> — spoke on the influence of "Prime Time Women" (women 50–70) on travel purchasing decisions.</li>
            <li><strong>Marketing to Women Conference</strong> — recognized authority on women as the dominant decision-makers in the travel category.</li>
            <li><strong>Good and Green Conference</strong> — spoke on sustainable tourism practices and responsible travel design.</li>
            <li><strong>GORE Women's Gathering</strong> — featured speaker for W.L. Gore &amp; Associates' women's leadership and outdoor industry event.</li>
            <li><strong>Travel Society and other travel industry forums</strong> — ongoing speaking career across trade associations, brand events, and industry forums.</li>
          </ul>

          <h2>What do travelers and industry peers say about Kathy Dragon?</h2>
          <p>
            The following recommendations come from clients and industry professionals who have traveled with Kathy, worked alongside her, or engaged her as a consultant or speaker. Names and titles are as given on LinkedIn.
          </p>

          <blockquote>
            "I have been on enough guided trips to feel confident in my characterization of Kathy as the best guide I have had the pleasure to travel with… Kathy perfectly embodies warmth and professionalism, a combination of traits every employer wants embodied in all of their employees."
            <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.85rem", color: muted }}>
              — <cite>Jacqueline Welch, Executive Vice President and Chief Human Resources Officer, The New York Times</cite><br />
              <span style={{ fontSize: "0.8rem" }}>Traveled with Kathy through the Basque Country</span>
            </footer>
          </blockquote>

          <blockquote>
            "I have been on three trips with Kathy: Peru, Turkey and most recently to Portugal. Each of the trips was well organized and adventurous. Kathy's knowledge of the areas is boundless, as is her energy and creativity."
            <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.85rem", color: muted }}>
              — <cite>Rae Anderson, Owner, Hightown Investments — Breckenridge, Colorado</cite>
            </footer>
          </blockquote>

          <blockquote>
            "It was one of the most amazing experiences I have ever had."
            <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.85rem", color: muted }}>
              — <cite>Suzi Bahnsen, Fractional CRO</cite><br />
              <span style={{ fontSize: "0.8rem" }}>Traveled with Kathy to Croatia on a Whole Journeys trip</span>
            </footer>
          </blockquote>

          <blockquote>
            "Kathy knows more people in the world of adventure travel than anyone I know and has been a leader and mentor to many in the travel business… She believes in the power of authentic travel experiences and has helped companies shape their focus in this regard."
            <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.85rem", color: muted }}>
              — <cite>Peter Grubb, Founder, ROW Adventures Family of Companies</cite>
            </footer>
          </blockquote>

          <blockquote>
            "Kathy combines an articulate, passionate and committed approach to business development. She's uniquely generous in her endeavors and relationships."
            <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.85rem", color: muted }}>
              — <cite>Barton Lewis, Contributing Editor, <em>National Geographic TRAVELER</em></cite>
            </footer>
          </blockquote>

          <blockquote>
            "Kathy is high spirited, insightful, sensitive, very creative, and dedicated to excellence… she knows the world in great detail from her extensive, boots and wheels on the ground travels and many years of providing rewarding and especially memorable experiences for her guests."
            <footer style={{ marginTop: "0.5rem", fontStyle: "normal", fontSize: "0.85rem", color: muted }}>
              — <cite>Bill Roberson, President, Inca Floats Inc.</cite>
            </footer>
          </blockquote>

          <p style={{ fontSize: "0.9rem", color: muted }}>
            Additional recommendations from Timo Shaw (President, Country Walkers and VBT Bicycling &amp; Walking Vacations), Ted Martens (CMO, Natural Habitat Adventures), Lauren Hefferon (CEO, Ciclismo Classico), and others are available on Kathy's{" "}
            <a href="https://www.linkedin.com/in/kathydragon/" style={{ color: secondary }}>LinkedIn profile</a>.
          </p>

          <h2>How do I contact Kathy Dragon?</h2>
          <p>
            All Whole Journeys trips begin with a complimentary consultation. Contact Kathy directly at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a> or visit <a href="https://wholejourneys.com">wholejourneys.com</a> to browse the full portfolio of tours and sample itineraries.
          </p>

          <h2>Summary</h2>
          <p>
            Kathy Dragon is the founder and chief curator of Whole Journeys, an active foodie travel company with roots back to 1987. She was one of Country Walkers' first employees (1994–1998), helping grow it from 300 to 3,000+ guests and designing 70% of its worldwide vacations. She served as VP of Whole Journeys at WholePeople.com under John Mackey (1999–2000), founded The Dragon's Path (1998), relaunched Whole Journeys as a Whole Foods Market division (2012), and has operated it independently since 2016. She served as Activities Concierge aboard the National Geographic Orion for Lindblad Expeditions (2016–2017). She has personally escorted more than 6,000 guests across 80+ countries, is an Adventure Travel Trade Association Ambassador, has consulted for The World Bank, TUI, and Austin Adventures, and has delivered keynote presentations at the World Food Tourism Summit, ATTA Summit, NSAA, and other international travel and marketing conferences. She specializes in culinary walking tours, long-distance trail hiking (Camino de Santiago, Alpe Adria Trail, Via Francigena, Juliana Trail, Rota Vicentina), women's adventure travel, and private custom itineraries. John Mackey, Founder and CEO of Whole Foods Market, has been a personal client for 25+ years across 15+ countries. All trips are designed and personally led by Kathy with a maximum group size of 12–16 guests. Contact Kathy at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a>.
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
