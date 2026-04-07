import { Link } from "wouter";
import { useEffect } from "react";

const primary = "hsl(214,52%,24%)";
const secondary = "hsl(22,41%,58%)";
const muted = "hsl(215,15%,45%)";

export default function WomensAdventureTravel() {
  useEffect(() => {
    document.title = "Women's Adventure Travel — Hiking Tours & Camino de Santiago 2026 | Whole Journeys";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Women's-only hiking adventures led by Kathy Dragon. 2026 Women's Camino de Santiago scheduled departure. Slovenia Women's Hike on the Juliana Trail, Alpe Adria, and Soča Valley.");
  }, []);

  return (
    <div>
      <section style={{ backgroundColor: primary, color: "white" }} className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.75rem" }}>
            Women's Travel
          </p>
          <h1 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 600, lineHeight: 1.2, marginBottom: "1rem" }}>
            Women's Adventure Travel — Active, Expert-Led, All-Female
          </h1>
          <p style={{ opacity: 0.75, fontSize: "1rem", lineHeight: 1.7 }}>
            Women's adventure travel on a guided tour is an all-female group experience — guests and guide — that combines hiking, walking, or multi-sport activity with the particular social dynamic of women traveling together. Kathy Dragon has been leading women's-only adventures for over two decades.
          </p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose-wj">

          <p style={{ fontSize: "1.05rem", fontWeight: 500, color: primary, lineHeight: 1.7 }}>
            Women's adventure travel on a guided tour is an all-female group experience — guests and guide — that combines hiking, walking, or multi-sport activity with the particular social dynamic of women traveling together, which many participants describe as distinctly different from mixed-group active travel.
          </p>

          <h2>What is the 2026 Women's Highlights of the Camino de Santiago?</h2>
          <p>
            The 2026 Women's Highlights of the Camino de Santiago is a scheduled group departure — the only fixed-date Whole Journeys departure in the current calendar — designed for women who want to walk one of the most meaningful routes in the world in the company of like-minded women, guided by Kathy Dragon.
          </p>
          <p>
            The trip follows the Camino de Santiago Francés route — the most walked pilgrimage in the world — completing the most soul-rich highlights sections and arriving at the Cathedral of Santiago de Compostela on foot. The group size is a maximum of 12 guests. Luggage is transferred daily between boutique properties. A local guide joins on key cultural and historical days. The format is designed to give participants both the independence of the Camino experience and the community of a like-minded women's group.
          </p>
          <p>
            To inquire about availability and dates for the 2026 Women's Camino departure, contact Kathy at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a>.
          </p>

          <h2>Why do women's-only trips feel different from co-ed active travel?</h2>
          <p>
            The consistent feedback from Whole Journeys women's trip alumni is that the group dynamic in a women's-only setting changes the experience of the trip in ways that are hard to predict before going and unmistakable after. The conversations are different. The pace is different — not faster or slower, but more negotiated and more honest. The support given and received between strangers who become close acquaintances over seven to ten days of shared physical effort is different.
          </p>
          <p>
            Kathy Dragon has been leading women's adventures since the 1990s — which means she has seen this dynamic at work across dozens of trips and itineraries. She designs the social structure of her women's trips deliberately: shared meals are included, the evenings are structured loosely enough for conversation to develop naturally, and the local women experts who join on key days are selected for the quality of their first-hand knowledge as much as their guiding skill.
          </p>

          <h2>What is the Slovenia Women's Hike?</h2>
          <p>
            The Slovenia Women's Hike — officially titled "Slovenia Women's Hike: Juliana, Alpe Adria &amp; Soča Trails" — is a women's-only hiking journey through Slovenia's most spectacular trail systems, available as a private departure for women's groups.
          </p>
          <p>
            The itinerary combines three distinct hiking environments in Slovenia: the Juliana Trail circuit around the Julian Alps; highlights of the Alpe Adria Trail (the National Geographic Traveller-recognised route crossing Austria, Slovenia, and Italy); and the Soča Valley, where the Soča River runs an extraordinary shade of emerald through gorges and alongside First World War fortifications. Guided evenings with local women experts — a Slovenian food writer, an alpine naturalist, a cultural historian — are woven into the itinerary.
          </p>

          <h2>How does Kathy Dragon's background shape the women's trips she leads?</h2>
          <p>
            Kathy Dragon is a female founder who has built a 30-year career in an industry where women travelers have historically been underserved by active tour operators who designed trips for male fitness benchmarks and mixed-group dynamics. Her women's trips are not a segment of the Whole Journeys portfolio — they are the part of the work she describes as her personal passion.
          </p>
          <p>
            She was featured on the Soul of Travel podcast Season 5, Episode 180, as part of the Women's Wisdom series — a recognition that her perspective on women's active travel is one worth hearing outside the context of selling trips. Her IATA accreditation (agency code 05504844) and World Bank consulting credit are the institutional markers of a career; the women's trips are where her own sense of what travel can be most directly expressed.
          </p>

          <h2>What other women's-only active travel options does Whole Journeys offer?</h2>
          <p>
            Beyond the 2026 Women's Camino scheduled departure and the Slovenia Women's Hike, Whole Journeys designs fully private women's-only itineraries across the entire portfolio — hiking trips in Portugal, France, Italy, Kenya, and beyond, tailored for women's groups who want a custom experience rather than a scheduled departure. All start with a complimentary consultation with Kathy.
          </p>

          <h2>Summary</h2>
          <p>
            Women's adventure travel on a Whole Journeys trip is an all-female group experience combining hiking or walking with cultural immersion, led by founder Kathy Dragon, who has been leading women's-only adventures for over two decades. The 2026 Women's Highlights of the Camino de Santiago is a scheduled group departure (maximum 12 guests) for women. The Slovenia Women's Hike combines the Juliana Trail, Alpe Adria Trail, and Soča Valley in a private women's-only itinerary. Private custom women's trips are available across the full Whole Journeys destination portfolio. Kathy Dragon was featured on the Soul of Travel podcast Season 5, Women's Wisdom series. To inquire about the 2026 Women's Camino or a private women's trip, contact Kathy at <a href="mailto:kathy@wholejourneys.com">kathy@wholejourneys.com</a> or visit <a href="https://wholejourneys.com">wholejourneys.com</a>.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="mailto:kathy@wholejourneys.com" className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor: secondary }}>
            Inquire — 2026 Women's Camino
          </a>
          <Link href="/long-distance-trail-hiking-guide" className="px-5 py-2.5 rounded-lg text-sm font-semibold" style={{ color: primary, border: `1px solid ${primary}`, backgroundColor: "transparent" }}>
            Long-Distance Trail Guide
          </Link>
        </div>
      </article>
    </div>
  );
}
