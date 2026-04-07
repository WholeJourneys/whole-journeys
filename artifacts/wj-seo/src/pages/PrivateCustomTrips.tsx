import { Link } from "wouter";
import { useEffect } from "react";

const primary = "hsl(214,52%,24%)";
const secondary = "hsl(22,41%,58%)";
const muted = "hsl(215,15%,45%)";

export default function PrivateCustomTrips() {
  useEffect(() => {
    document.title = "Private & Custom Trips — Bespoke Active Travel | Whole Journeys";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Most Whole Journeys trips are private custom itineraries designed by Kathy Dragon. How the consultation works, what the $600 planning fee covers, and what a truly bespoke active travel experience looks like.");
  }, []);

  return (
    <div>
      <section style={{ backgroundColor: primary, color: "white" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.75rem" }}>
            Custom Itineraries
          </p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: "1rem" }}>
            Private & Custom Trips — Designed Around You
          </h1>
          <p style={{ opacity: 0.75, fontSize: "1rem", lineHeight: 1.7 }}>
            A private custom Whole Journeys trip is a fully bespoke active travel itinerary designed by Kathy Dragon around a specific group's interests, fitness level, travel style, and destination — drawing on 30 years of on-the-ground relationships with local guides, farmers, winemakers, and artisans that no travel catalog can replicate.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose-wj">

          <p style={{ fontSize: "1.05rem", fontWeight: 500, color: primary, lineHeight: 1.7 }}>
            A private custom Whole Journeys trip is a fully bespoke active travel itinerary designed by Kathy Dragon around a specific group's interests, fitness level, travel style, and destination — drawing on 30 years of on-the-ground relationships with local guides, farmers, winemakers, and artisans that no travel catalog can replicate.
          </p>

          <h2>What does "private custom" mean for a Whole Journeys trip?</h2>
          <p>
            Most of the trips Whole Journeys operates are not off-the-shelf itineraries that guests book from a fixed calendar. They are itineraries that do not exist until Kathy Dragon designs them for a specific group. The sample itineraries on wholejourneys.com — Tuscany, the Via Francigena, Kenya, Croatia, Slovenia — are frameworks that illustrate what is possible. The actual trip is designed from a conversation with you.
          </p>
          <p>
            This is not a marketing distinction. It is an operational one. Kathy's producer and guide relationships are personal — built over decades of repeat visits, referrals, and trust. Activating those relationships requires knowing who is in the group, what they care about, and what level of physical challenge and cultural depth they are looking for. A group of four retired winemakers from California who want to meet Brunello di Montalcino producers requires a very different itinerary than a family of five with two teenagers who want to kayak the Soča River and visit Ljubljana's food markets.
          </p>

          <h2>How does the Whole Journeys consultation process work?</h2>
          <p>
            The consultation process has three stages:
          </p>
          <ul>
            <li>
              <strong>Stage 1 — Complimentary initial consultation:</strong> Kathy schedules a call or email exchange to understand the group, the destination preferences, the travel style, the budget range, and any constraints (dietary, physical, date). This is free of charge and carries no obligation.
            </li>
            <li>
              <strong>Stage 2 — Trip design and planning fee:</strong> If the direction is confirmed following the initial consultation, Kathy begins designing the itinerary — sourcing and pre-booking the producer experiences, accommodation, and local guide days that match the group's profile. A non-refundable planning fee of $600 is charged at this point. This fee is waived for scheduled group departures. For custom private trips, it reflects the real cost of the pre-trip design work, which often takes 10–20 hours across research, relationship activation, and logistics coordination.
            </li>
            <li>
              <strong>Stage 3 — Itinerary delivery and deposit:</strong> Kathy delivers the proposed itinerary with a detailed outline of each day, accommodation, included experiences, and total trip cost. A deposit secures the dates and begins the booking process with all local partners.
            </li>
          </ul>

          <h2>What kinds of private trips does Whole Journeys design?</h2>
          <p>
            The range of custom private itineraries Whole Journeys has designed reflects the breadth of Kathy Dragon's 30+ year portfolio. These are not theoretical examples — they are representative of actual trips she has run:
          </p>
          <ul>
            <li><strong>Family safari in Kenya</strong> — tracking the Big Five across the Masai Mara, meeting Maasai communities, wildlife conservancy experiences designed for families with children of varied ages.</li>
            <li><strong>Private sailing adventure in Croatia</strong> — a chartered yacht island-hopping through the Dalmatian coast from Hvar to Korčula, with local fishing village dinners and hidden coves inaccessible by land.</li>
            <li><strong>Custom Tuscany for a winemaker group</strong> — Brunello di Montalcino cellar visits with the producers, a Chianti estate stay, private access to an olive oil mill during harvest, and a day hiking between hilltop towns with a local food historian.</li>
            <li><strong>Switzerland by rail with active days</strong> — a self-drive and rail combination with walking days in the Bernese Oberland, fondue with a Swiss cheesemaking family, and boat trips on Lake Geneva.</li>
            <li><strong>Normandy and Provence</strong> — a French itinerary combining the D-Day beaches, Calvados distilleries, and Normandy cheese-making with lavender fields, olive oil producers, and bouillabaisse in Marseille.</li>
            <li><strong>Women's hiking trip in Portugal</strong> — the Rota Vicentina Fishermen's Trail for a private group of eight women, with artisan dinners, local wine, and evenings in renovated farmhouse accommodations on the Alentejo coast.</li>
          </ul>

          <h2>What does the $600 planning fee cover?</h2>
          <p>
            The $600 non-refundable planning fee covers the real cost of designing a custom private itinerary — not as an abstract claim, but as a specific description of what Kathy does during the design period:
          </p>
          <ul>
            <li>Researching and confirming availability with boutique accommodation properties that do not list on booking platforms, communicating in the local language where needed.</li>
            <li>Contacting the producer relationships (farmers, winemakers, cheese-makers, local guides) who provide exclusive experiences — activating relationships that are personal and non-automated.</li>
            <li>Building the logistics of the itinerary so that the pace, the driving distances, and the stage lengths are appropriate for the specific group, not a generic average.</li>
            <li>Preparing the detailed day-by-day itinerary document that the group receives, which typically runs 15–25 pages and includes all logistical details, cultural background, and practical guidance.</li>
          </ul>
          <p>
            This fee is credited against the total trip cost once booked. It is waived entirely for guests joining scheduled group departures (the 2026 Women's Camino de Santiago, for example).
          </p>

          <h2>What lead time does a custom Whole Journeys trip require?</h2>
          <p>
            Most custom private trips require a minimum of 90 days of lead time — preferably 6 months or more for peak season (June–September in Europe). The limiting factor is not Kathy's availability but the boutique properties and exclusive producer experiences that are the core of the itinerary, which book well in advance and cannot be replicated by last-minute alternatives.
          </p>
          <p>
            For peak-season trips to high-demand destinations (Tuscany in September, the Camino in July and August), Kathy recommends beginning the planning conversation 9–12 months in advance.
          </p>

          <h2>Summary</h2>
          <p>
            Most Whole Journeys revenue comes from private custom itineraries — fully bespoke active travel experiences designed by Kathy Dragon around each group's interests, fitness level, and destination preferences. The consultation process begins with a complimentary initial call, followed by a $600 non-refundable planning fee (waived for scheduled group departures) once the trip direction is confirmed. Custom trips range from family safaris in Kenya to private culinary walking tours in Tuscany, sailing Croatia, women's hiking in Portugal, and self-drive France. All trips are personally led by Kathy Dragon with a maximum group size of 12–16 guests. Recommended lead time is 6–12 months for peak season trips. To begin planning, contact Kathy at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a> or visit <a href="https://wholejourneys.com">wholejourneys.com</a>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="mailto:kathy@wholejourneys.com" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: secondary }}>
            Begin Your Consultation
          </a>
          <Link href="/about-kathy" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ color: primary, border: `1px solid ${primary}`, backgroundColor: "transparent" }}>
            About Kathy Dragon
          </Link>
        </div>
      </article>
    </div>
  );
}
