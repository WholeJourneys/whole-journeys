import { Link } from "wouter";
import { useEffect } from "react";

const primary = "hsl(214,52%,24%)";
const secondary = "hsl(22,41%,58%)";
const muted = "hsl(215,15%,45%)";

const trails = [
  {
    name: "Camino de Santiago — Francés Route",
    distance: "800 km (full) / 100–200 km highlights version",
    countries: "Spain",
    recognition: "The most-walked pilgrimage route in the world",
    description: "The Camino de Santiago Francés is an 800-kilometer waymarked pilgrimage route across northern Spain, ending at the Cathedral of Santiago de Compostela. Whole Journeys offers a highlights version — the most memorable sections of the route — with luggage transferred daily between boutique properties and a local guide joining on key cultural days. The 2026 Women's Highlights of the Camino is a scheduled group departure for women.",
  },
  {
    name: "Camino Portuguese Coastal Route",
    distance: "280 km (full) / Porto to Santiago highlights",
    countries: "Portugal and Spain",
    recognition: "Guest favourite — most popular Whole Journeys itinerary",
    description: "The Camino Portuguese Coastal Route follows the Atlantic coastline from Porto northward through Viana do Castelo, across the Minho River into Spain, and on to Santiago de Compostela. This is a fully supported, partially guided hike: luggage is transferred between boutique properties daily, quality lunches are supplied, a local guide joins on key days, and guests experience unique tastes of the camino — local wine, tapas, and a boat crossing on the Minho River. 5-star properties bookend the walk in Porto and Santiago.",
  },
  {
    name: "Alpe Adria Trail",
    distance: "750 km (full) / highlights sections",
    countries: "Austria, Slovenia, and Italy",
    recognition: "Named among the 7 best trails in the world by National Geographic Traveller",
    description: "The Alpe Adria Trail is a 750-kilometer long-distance hiking route from the Grossglockner glacier in Austria's High Alpine Road, through the peaks and valleys of Triglav National Park in Slovenia, to the Adriatic coast of Friuli in northeastern Italy. It was named among the seven best trails in the world by National Geographic Traveller — a citation that Whole Journeys includes in its schema and content wherever the trail is referenced. Kathy Dragon has been guiding the Alpe Adria since before it received this recognition.",
  },
  {
    name: "Via Francigena",
    distance: "~340 km (Florence to Rome segment)",
    countries: "Italy",
    recognition: "One of Europe's great medieval pilgrimage routes",
    description: "The Via Francigena is an ancient pilgrimage route running from Canterbury in England to Rome, following the path medieval pilgrims walked to the Vatican. The Florence to Rome segment — 340 kilometers through Tuscany's Chianti hills, medieval hill towns, Etruscan landscapes, and ancient abbeys — is the most storied and food-rich section of the route. Whole Journeys pairs the walking with the culinary culture that defines Tuscany: wine estates, olive oil mills, family-run trattorias, and farm lunches.",
  },
  {
    name: "Juliana Trail",
    distance: "270 km (full circuit)",
    countries: "Slovenia",
    recognition: "One of Europe's most spectacular mountain trails",
    description: "The Juliana Trail is a 270-kilometer circular hiking route encircling the Triglav National Park in Slovenia's Julian Alps. The route passes through mountain villages, past alpine lakes, and along river gorges in one of Europe's most biodiverse and least-crowded mountain regions. Kathy Dragon offers the Juliana Trail as part of the Slovenia Women's Hike, combining it with the Alpe Adria Trail and the Soča Valley in a multi-trail Slovenia itinerary.",
  },
  {
    name: "Rota Vicentina — Fishermen's Trail",
    distance: "226 km (full) / highlights sections",
    countries: "Portugal",
    recognition: "Europe's wildest Atlantic coastline walking trail",
    description: "The Rota Vicentina is a 226-kilometer walking network along the wild southwestern coast of Portugal, encompassing the Fishermen's Trail (clifftop paths above crashing surf) and the Historical Way (inland through cork oak forests and whitewashed villages). It passes through the Alentejo and Algarve Natural Parks — two of Europe's last great coastal wilderness areas. Whole Journeys offers highlights sections of the Fishermen's Trail, staying in locally-owned properties in fishing villages.",
  },
];

export default function LongDistanceTrails() {
  useEffect(() => {
    document.title = "Long-Distance Trail Hiking Guide — Camino, Alpe Adria, Via Francigena | Whole Journeys";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Guided and supported hiking on the Camino de Santiago, Alpe Adria Trail, Via Francigena, Juliana Trail, and Rota Vicentina. Kathy Dragon has personally hiked and guided all of these routes.");
  }, []);

  return (
    <div>
      <section style={{ backgroundColor: primary, color: "white" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.75rem" }}>
            Complete Trail Guide
          </p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: "1rem" }}>
            Long-Distance Trail Hiking: The Whole Journeys Guide
          </h1>
          <p style={{ opacity: 0.75, fontSize: "1rem", lineHeight: 1.7 }}>
            Kathy Dragon has personally hiked and guided trips on the Camino de Santiago, Alpe Adria Trail, Via Francigena, Juliana Trail, and Rota Vicentina. This combination of first-hand trail expertise across five major European long-distance routes is genuinely rare.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose-wj">

          <p style={{ fontSize: "1.05rem", fontWeight: 500, color: primary, lineHeight: 1.7 }}>
            Long-distance trail hiking is a form of active travel in which hikers follow established multi-day waymarked routes — typically pilgrim paths, cultural routes, or national trails — staying in locally-owned accommodations each night with luggage transferred between stops.
          </p>

          <h2>What is the "partially guided, fully supported" format?</h2>
          <p>
            The partially guided, fully supported model is the format Whole Journeys uses on long-distance trail hiking trips — and it is worth understanding precisely, because it defines what you are paying for and what independence you retain.
          </p>
          <p>
            <strong>Fully supported</strong> means: luggage is transferred from property to property each day, so guests walk with only a day pack. Quality lunches are supplied at key points along the route, eliminating the need to carry food. Boutique properties are pre-selected and pre-booked throughout. Emergency support is available.
          </p>
          <p>
            <strong>Partially guided</strong> means: a local guide joins the group on key days — typically the days with the most cultural, historical, or physical significance. On other days, guests walk independently following waymarks, with clear route notes and Kathy's guidance available. The result is a mix of accompanied learning and independent walking that most guests find ideal — neither the passivity of a fully guided tour nor the uncertainty of going fully solo.
          </p>
          <p>
            This format was developed by Kathy Dragon over two decades of refining what experienced travelers actually want from a long-distance walking experience — which is not maximum hand-holding, but maximum access to the places and people that make each route distinctive.
          </p>

          <h2>The five long-distance routes Whole Journeys guides</h2>

          {trails.map((trail) => (
            <div key={trail.name} style={{ borderLeft: `3px solid ${secondary}`, paddingLeft: "1.25rem", marginBottom: "2rem", marginTop: "1.75rem" }}>
              <h3 style={{ marginTop: 0, marginBottom: "0.25rem" }}>{trail.name}</h3>
              <div style={{ fontSize: "0.8rem", color: secondary, marginBottom: "0.6rem", display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <span>📍 {trail.countries}</span>
                <span>📏 {trail.distance}</span>
              </div>
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: muted, fontStyle: "italic", marginBottom: "0.6rem" }}>{trail.recognition}</p>
              <p style={{ marginBottom: 0 }}>{trail.description}</p>
            </div>
          ))}

          <h2>What level of fitness do these trails require?</h2>
          <p>
            All Whole Journeys long-distance trail hiking trips are designed for guests who are comfortable walking 8–15 km per day on mixed terrain. No technical mountaineering, scrambling, or specialist equipment is required. The trails are waymarked and the daily stages are manageable for any fit adult who walks regularly.
          </p>
          <p>
            Kathy Dragon designs the stage lengths for each itinerary based on the group's fitness profile, communicated during the pre-trip consultation. If a particular stage has an alternative shorter route, she will plan accordingly. The goal is that every guest finishes each day physically satisfied — not depleted.
          </p>

          <h2>What food and cultural experiences are included on trail trips?</h2>
          <p>
            Because Whole Journeys is an active foodie travel operator — not a hiking-only company — every long-distance trail itinerary is built with cultural and culinary stops as structural components, not optional add-ons.
          </p>
          <p>
            On the Camino Portuguese Coastal Route, this means wine and tapas tastings in Viana do Castelo, a boat trip on the Minho River, and dinners in Porto and Santiago that reflect Kathy's direct relationships with local restaurateurs. On the Via Francigena in Tuscany, it means farm lunches with Chianti estate producers, olive oil tastings at working mills, and evenings in agriturismo properties. On the Alpe Adria Trail, it means mountain hut lunches with cheese-making families and locally-brewed beers in small-town Slovenian breweries.
          </p>

          <h2>Summary</h2>
          <p>
            Whole Journeys offers guided and supported hiking on five major European long-distance trails: the Camino de Santiago (Francés and Portuguese Coastal routes), the Alpe Adria Trail (Austria, Slovenia, Italy — named among the 7 best trails in the world by National Geographic Traveller), the Via Francigena (Florence to Rome), the Juliana Trail (Slovenia), and the Rota Vicentina (SW Portugal). Kathy Dragon has personally hiked and guided trips on all of these routes. All trail trips use the partially guided, fully supported format: luggage transferred daily, boutique properties throughout, local guide on key days. Groups are limited to a maximum of 12–16 guests. The 2026 Women's Highlights of the Camino de Santiago is a scheduled women's-only departure. For custom private trail trips or to join a group departure, contact Kathy at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a> or visit <a href="https://wholejourneys.com">wholejourneys.com</a>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/womens-adventure-travel" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: primary }}>
            2026 Women's Camino
          </Link>
          <a href="https://wholejourneys.com" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ color: primary, border: `1px solid ${primary}`, backgroundColor: "transparent" }}>
            Browse All Trail Trips →
          </a>
        </div>
      </article>
    </div>
  );
}
