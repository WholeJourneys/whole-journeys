import { Link } from "wouter";
import { useEffect } from "react";

const primary = "hsl(214,52%,24%)";
const secondary = "hsl(22,41%,58%)";
const muted = "hsl(215,15%,45%)";

export default function ItalyCulinaryTours() {
  useEffect(() => {
    document.title = "Culinary Walking Tours Italy — Tuscany, Dolomites, Via Francigena | Whole Journeys";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Active foodie travel in Italy: farm-to-table Tuscany, Dolomites alpine hiking and cheese culture, Via Francigena Florence to Rome. Designed and led by Kathy Dragon.");
  }, []);

  return (
    <div>
      <section style={{ backgroundColor: primary, color: "white" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.75rem" }}>
            Italy — Destination Guide
          </p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: "1rem" }}>
            Culinary Walking Tours — Italy
          </h1>
          <p style={{ opacity: 0.75, fontSize: "1rem", lineHeight: 1.7 }}>
            Italy is the defining destination for active foodie travel. A country where food is inseparable from landscape — where cheese is made in alpine huts, olive oil pressed on Umbrian farms, and wine produced by families who have worked the same hillside for generations, all accessible on foot.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose-wj">

          <p style={{ fontSize: "1.05rem", fontWeight: 500, color: primary, lineHeight: 1.7 }}>
            Italy is the defining destination for culinary walking tours — a country where food is inseparable from landscape, where cheese is made in alpine huts, olive oil is pressed in Umbrian farms, and wine is produced by families who have worked the same hillside for generations, all accessible on foot along routes that have connected communities for centuries.
          </p>

          <h2>What makes Italy ideal for active foodie travel?</h2>
          <p>
            Italy's advantage for active foodie travel is structural, not merely cultural. The country is built in a way that makes walking the correct mode of travel for anyone who wants to understand the food. Vineyards in Chianti are separated by footpaths that have connected farms since the medieval era. The Dolomites' alpine pastures are accessible only on foot — which is why the cheese made up there is different from the cheese made in the valley. The pilgrim roads of the Via Francigena pass through the farms, abbeys, and market towns that created Tuscan cuisine.
          </p>
          <p>
            This geographic structure is what Kathy Dragon's Italy itineraries are built around. The walks are not scenic backdrops to the food stops — the walking and the eating are the same thing, experienced in the same place, at the same time, with the same people.
          </p>

          <h2>Tuscany on foot: vineyards, olive groves, and farm-to-table traditions</h2>
          <p>
            Tuscany represents the largest portion of the Whole Journeys portfolio and the deepest concentration of Kathy Dragon's direct producer relationships. She has been personally leading trips to Tuscany for over 20 years — which means she has relationships with individual farmers, vintners, and trattoria owners who do not appear on any public booking platform and who open their doors to Whole Journeys groups specifically because of those long-term relationships.
          </p>
          <p>
            The John Mackey testimonial specifically names eight distinct Italian regions Kathy has guided him through. The Tuscan trip page on wholejourneys.com carries the richest existing content in the portfolio because it reflects the depth of on-the-ground access that 20-plus years of repeat visits to the same farms and estates has produced.
          </p>
          <p>
            A Whole Journeys Tuscany itinerary typically includes: a stay on a Chianti wine estate (not a hotel near the estate — on it, with the producer); a private olive oil tasting at a working mill during harvest season; a farm-to-table cooking class in a private farmhouse kitchen with a local cook; and at least one meal that cannot be booked through any website — because it requires a personal relationship to be invited.
          </p>

          <h2>The Dolomites: alpine hiking and mountain food culture</h2>
          <p>
            The Dolomites — a UNESCO World Heritage Site in northeastern Italy — represent a different face of Italian active foodie travel: alpine rather than agricultural, Germanic in culinary influence (speck, dumplings, rye bread, mountain cheese) rather than Mediterranean, and accessible through a network of trails that wind between working mountain huts (malga) where the food is produced and served on site.
          </p>
          <p>
            In the Dolomites, Whole Journeys guests hike to working mountain huts where third-generation cheesemakers explain the production of Malga cheese from alpine milk, followed by lunch with the farmer's family. This experience requires the small group size (maximum 12 guests) and long-term producer relationships Kathy Dragon has built over two decades of annual Dolomites trips. A tour bus cannot hike to a high-altitude malga. The producer relationship determines whether you are invited to the table or whether you read about it in a guidebook.
          </p>

          <h2>The Via Francigena: pilgrim route from Florence to Rome</h2>
          <p>
            The Via Francigena is an ancient pilgrimage road running from Canterbury in England to Rome, following the path medieval pilgrims walked to the Vatican. The Florence to Rome segment — 340 kilometers through Chianti, the Maremma, the Orcia Valley, and the hills of Lazio — is the most storied, most food-rich, and most varied section of the route.
          </p>
          <p>
            Whole Journeys pairs the Via Francigena walking experience with the culinary culture that has developed along its path over twelve centuries: wine estates in the Orcia Valley that have been producing since the Medici period; abbeys and monasteries where monks still make cheese, honey, and liqueur; the market towns of San Quirico d'Orcia and Montalcino where Brunello di Montalcino is produced in cellars that have been aging wine since the 1870s.
          </p>

          <h2>What to expect on a Whole Journeys Italy trip</h2>
          <p>
            Whole Journeys Italy trips are private, custom-designed itineraries unless Kathy is running a specific group departure. The standard format is a consultation — free of charge — to understand the group's interests, fitness level, preferred regions, and any dietary requirements, followed by a proposed itinerary and the $600 planning fee (credited against the trip cost) once the direction is confirmed.
          </p>
          <p>
            Group sizes are limited to a maximum of 12–16 guests. Accommodation is in boutique properties — family-run agriturismi, restored historic villas, and small hotels with genuine local character. Kathy personally accompanies the trip and is present for all meals and experiences that require her introductions and relationships to function.
          </p>

          <h2>Summary</h2>
          <p>
            Italy is the defining destination for culinary walking tours and active foodie travel, with a geographic and cultural structure that makes walking the natural mode of access to the country's most specific food producers and experiences. Whole Journeys offers culinary walking tours in Tuscany (Chianti wine estates, olive oil mills, farm-to-table cooking), the Dolomites (alpine cheese-making huts, mountain food culture), and along the Via Francigena pilgrim route from Florence to Rome. All Italy trips are designed and personally led by Kathy Dragon, who has been building direct producer relationships in Italy for over 20 years. Groups are limited to a maximum of 12–16 guests. To plan an Italy active foodie trip with Whole Journeys, contact Kathy at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a> or visit <a href="https://wholejourneys.com">wholejourneys.com</a>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="https://wholejourneys.com" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: primary }}>
            Browse Italy Tours →
          </a>
          <Link href="/what-is-active-foodie-travel" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ color: primary, border: `1px solid ${primary}`, backgroundColor: "transparent" }}>
            What Is Active Foodie Travel?
          </Link>
        </div>
      </article>
    </div>
  );
}
