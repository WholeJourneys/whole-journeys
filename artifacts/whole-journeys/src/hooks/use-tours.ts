import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Tour {
  id: string;
  name: string;
  destination: string;
  region: string;
  country: string[];
  duration: number | null;
  price: number | null;
  groupSize: string;
  categories: string[];
  description: string;
  imageUrl: string;
  highlights: string[];
  travefyUrl: string;
}

export const ALL_CATEGORIES = [
  "Adventure",
  "Country Estates",
  "Culture",
  "Family",
  "Self-Drive",
  "Self-Guided",
  "Ski & Snow",
  "Wellness",
  "Wildlife",
  "Women's",
] as const;

export const ALL_REGIONS = [
  "Africa",
  "Arctic/Antarctic",
  "Asia",
  "Europe",
  "Middle East",
  "Oceania",
  "South America",
] as const;

export type Category = (typeof ALL_CATEGORIES)[number];
export type Region = (typeof ALL_REGIONS)[number];

const CDN = "https://d6ham14n5a27z.cloudfront.net/img/c_w1200,h720,mFocusCover";
const BASE_URL = "https://trips.wholejourneys.com/discover/trip";

export const TRAVEFY_TOURS: Tour[] = [
  {
    id: "via-francigena",
    name: "Italy's Via Francigena: The Road to Rome",
    destination: "Italy",
    region: "Europe",
    country: ["Italy"],
    duration: null,
    price: null,
    groupSize: "Private or Small Group",
    categories: ["Self-Guided", "Culture", "Adventure", "Wellness"],
    description: "A shortened version of the famous pilgrimage, Via Francigena, from Florence to Rome. Walk through medieval hill towns, vineyards, and ancient abbeys on one of Europe's great pilgrim routes.",
    imageUrl: `${CDN}/i_hf49babc7f831cdee3ca0cdc8aaee102dc05a8bf0.jpg`,
    highlights: ["Florence to Rome on foot", "Medieval hill towns", "Etruscan landscapes"],
    travefyUrl: `${BASE_URL}/6yw9rqygvnrzqz2a5wrg5wuclvmmetq`,
  },
  {
    id: "rota-vicentina",
    name: "Portugal's Coastal Camino: Rota Vicentina",
    destination: "Portugal",
    region: "Europe",
    country: ["Portugal"],
    duration: null,
    price: null,
    groupSize: "Private or Small Group",
    categories: ["Self-Guided", "Adventure", "Wellness"],
    description: "Hike Europe's wildest Atlantic coastline on Portugal's stunning Fishermen's Trail. Walk clifftop paths above crashing surf, through cork oak forests and whitewashed fishing villages.",
    imageUrl: `${CDN}/i_h2f3e7406f097c36a22f9519bf506013b90f10513.jpg`,
    highlights: ["Fishermen's Trail clifftops", "Wild Atlantic surf", "Whitewashed fishing villages"],
    travefyUrl: `${BASE_URL}/6yw9rqetjmd2qz2allx3gqlgunnjmaq`,
  },
  {
    id: "slovenia-croatia-istanbul",
    name: "Best of Slovenia + Croatia (Istanbul Extension)",
    destination: "Slovenia, Croatia & Turkey",
    region: "Europe",
    country: ["Slovenia", "Croatia", "Turkey"],
    duration: null,
    price: null,
    groupSize: "Private",
    categories: ["Culture", "Adventure"],
    description: "Experience Slovenia and Croatia on a private journey with an optional extension to Istanbul — from the Julian Alps to the Adriatic coast and the magnificence of the Bosphorus.",
    imageUrl: `${CDN}/i_hc61f0982b9a10f51c3a7625155a22d596c2ae1cb.jpg`,
    highlights: ["Julian Alps", "Dubrovnik Old Town", "Istanbul Bosphorus"],
    travefyUrl: `${BASE_URL}/6yw9rqyffb9zqz2axmrs5kgraw9pbqq`,
  },
  {
    id: "slovenia-hiking",
    name: "Slovenia Hiking",
    destination: "Slovenia",
    region: "Europe",
    country: ["Slovenia"],
    duration: null,
    price: null,
    groupSize: "Small Group",
    categories: ["Adventure", "Self-Guided", "Wellness"],
    description: "Sampling the best of Slovenia's hiking including Triglav National Park. Enjoy full days of hikes followed by evenings in boutique properties in one of Europe's most beautiful and undiscovered countries.",
    imageUrl: `${CDN}/i_hfc407d1cc5982b36f36302f3788f883d5018b588.jpg`,
    highlights: ["Triglav National Park", "Lake Bled", "Boutique mountain stays"],
    travefyUrl: `${BASE_URL}/6yw9rqrcnzd2qz2acz24fmfl2h5w7zq`,
  },
  {
    id: "taste-of-tuscany",
    name: "Taste of Tuscany: An Active Foodie Adventure for Two",
    destination: "Italy",
    region: "Europe",
    country: ["Italy"],
    duration: null,
    price: null,
    groupSize: "Private (Couple)",
    categories: ["Culture", "Wellness"],
    description: "A one-week deep local dive into Tuscany's countryside and culture, plus private tours in Florence, Siena, and Rome. Everything is adaptable — this is a sample of a recent trip.",
    imageUrl: `${CDN}/i_hd50d55abf0b7757f414ff72b916c42353362ac7a.jpg`,
    highlights: ["Private Florence & Siena tours", "Chianti wine estate stay", "Farm-to-table cooking"],
    travefyUrl: `${BASE_URL}/6yw9rqrxumb2qz2aqgysjsmj4jcylhq`,
  },
  {
    id: "croatia-sailing",
    name: "Private Sailing Adventure: Croatia",
    destination: "Croatia",
    region: "Europe",
    country: ["Croatia"],
    duration: null,
    price: null,
    groupSize: "Private Yacht",
    categories: ["Adventure"],
    description: "Sail the crystal-clear Adriatic on a private charter yacht, island-hopping between Hvar, Korčula, and the Dalmatian coast. Swim in hidden coves, dine at waterfront konobas, and watch the sun set from the sea.",
    imageUrl: `${CDN}/i_hea8707f85b409766249b64251f7058e3045a0552.jpg`,
    highlights: ["Private Yacht Charter", "Dalmatian Islands", "Hidden Adriatic Coves"],
    travefyUrl: `${BASE_URL}/6yw9rqkrgk8zqz2anmeplsu8sp2gwja`,
  },
  {
    id: "slovenia-womens-hike",
    name: "Slovenia Women's Hike – Juliana, Alpe Adria & Soča Trails",
    destination: "Slovenia",
    region: "Europe",
    country: ["Slovenia"],
    duration: null,
    price: null,
    groupSize: "Women Only",
    categories: ["Women's", "Adventure", "Self-Guided", "Wellness"],
    description: "A women-only hiking journey through Slovenia's most spectacular trails — the Juliana Trail, Alpe Adria, and the emerald Soča Valley. Guided evenings with local women experts.",
    imageUrl: `${CDN}/i_h2b21e4b5f246df23eefb77d9482ee1cc6fb8c1ce.jpg`,
    highlights: ["Juliana Trail", "Soča Valley", "Women-Only Expert Guides"],
    travefyUrl: `${BASE_URL}/6yw9rqkrrgk2qz2amqqsang2n64ghda`,
  },
  {
    id: "alpe-adria",
    name: "Highlights of the Alpe Adria Trail",
    destination: "Slovenia, Austria & Italy",
    region: "Europe",
    country: ["Slovenia", "Austria", "Italy"],
    duration: null,
    price: null,
    groupSize: "Small Group or Private",
    categories: ["Adventure", "Self-Guided"],
    description: "Walk the iconic Alpe Adria Trail from the Grossglockner glacier in Austria through Slovenia's Triglav National Park to the Adriatic Sea in Italy — one of Europe's great long-distance walks.",
    imageUrl: `${CDN}/i_h3a35c17b67c156981da03fb3d96701dc53f5f109.jpg`,
    highlights: ["Grossglockner High Alpine Road", "Triglav Crossing", "Adriatic Finish"],
    travefyUrl: `${BASE_URL}/6yw9rqk43r52qz2adv9blmf6rwftblq`,
  },
  {
    id: "camino-womens-2026",
    name: "2026: Highlights of the Camino de Santiago (Women's Hike)",
    destination: "Spain",
    region: "Europe",
    country: ["Spain"],
    duration: null,
    price: null,
    groupSize: "Women Only",
    categories: ["Women's", "Adventure", "Self-Guided", "Wellness"],
    description: "Walk the most iconic pilgrimage in the world with a community of like-minded women. This highlights version captures the soul of the Camino without the full multi-week commitment.",
    imageUrl: `${CDN}/i_h9a1fe2f70324cdf8bc17a66936132e555738456d.jpg`,
    highlights: ["Camino Francés Route", "Arriving in Santiago", "Women's Community"],
    travefyUrl: `${BASE_URL}/6yw9rqu4t7azqz2a68wqlbvb8gjyzyq`,
  },
  {
    id: "slovenia-family",
    name: "Slovenia: Family Hand-Crafted Itinerary",
    destination: "Slovenia",
    region: "Europe",
    country: ["Slovenia"],
    duration: null,
    price: null,
    groupSize: "Family Groups",
    categories: ["Family", "Adventure"],
    description: "A partially or fully guided multi-activity family adventure built around Slovenia's extraordinary natural landscape — think castle hikes, kayaking, waterfalls, and farm stays perfect for all ages.",
    imageUrl: `${CDN}/i_hd84f42e400e0924410aee64720bf60921668309b~f_w1355,h813,x-31,y-331.jpg`,
    highlights: ["Bled Castle Hike", "Soča River Kayaking", "Farm-to-Table Family Dinners"],
    travefyUrl: `${BASE_URL}/6yw9rqyx953zqz2a4dgfj6ff8w9gykq`,
  },
  {
    id: "northern-portugal",
    name: "Northern Portugal: Private",
    destination: "Portugal",
    region: "Europe",
    country: ["Portugal"],
    duration: null,
    price: null,
    groupSize: "Private",
    categories: ["Self-Drive", "Self-Guided", "Culture"],
    description: "A partially guided, self-drive journey through Northern Portugal's wine country, medieval towns, and dramatic coastline. Can also be arranged fully guided.",
    imageUrl: `${CDN}/i_h593ce8d1a4d2ecca7391cacb98e935b36a9b3c3d.jpg`,
    highlights: ["Douro Valley Wine Country", "Porto Old Town", "Minho Region"],
    travefyUrl: `${BASE_URL}/6yw9rqrxuvk2qz2a9hhed3s34urnuka`,
  },
  {
    id: "slovenia-istria-cycling",
    name: "Slovenia & Istria Cycling: Self-Guided (sample)",
    destination: "Slovenia & Croatia",
    region: "Europe",
    country: ["Slovenia", "Croatia"],
    duration: null,
    price: null,
    groupSize: "Private or Small Group",
    categories: ["Self-Guided", "Self-Drive", "Adventure"],
    description: "Self-guided cycling through Slovenia and Istria on quiet back roads through vineyards, truffle farms, and hilltop towns. Can also be arranged as a fully guided multi-activity trip.",
    imageUrl: `${CDN}/i_h8f937e9efc901a30bd04c0288cfa6b55440ddef6.jpg`,
    highlights: ["Istrian Wine & Truffle Country", "Julian Alps Cycling", "Piran Coastal Town"],
    travefyUrl: `${BASE_URL}/6yw9rqy42elzqz2az2ml4be5gs34cma`,
  },
  {
    id: "egypt-family",
    name: "Family Egypt with Red Sea: Sample",
    destination: "Egypt",
    region: "Africa",
    country: ["Egypt"],
    duration: null,
    price: null,
    groupSize: "Family Groups",
    categories: ["Family", "Culture"],
    description: "A private family exploration of Egypt — from the pyramids of Giza and Luxor temples to Red Sea snorkeling. Fully customizable with child-friendly guides and experiences.",
    imageUrl: `${CDN}/i_hf1f3668470a8ca1c16bab73c9b0bf0f6cb7a4599~f_w1593,h626,x-1,y-282.jpg`,
    highlights: ["Pyramids of Giza", "Luxor Temples", "Red Sea Snorkeling"],
    travefyUrl: `${BASE_URL}/6yw9rqys8x3zqz2ayv22dbctrrvr5aa`,
  },
  {
    id: "kenya-family",
    name: "Kenya Family Adventure: Sample",
    destination: "Kenya",
    region: "Africa",
    country: ["Kenya"],
    duration: null,
    price: null,
    groupSize: "Family Groups",
    categories: ["Family", "Wildlife", "Adventure"],
    description: "A family safari adventure in Kenya — tracking the Big Five across the Masai Mara, meeting Maasai communities, and experiencing the Great Migration. Built for families with children of all ages.",
    imageUrl: `${CDN}/i_h7a36424a1344da5ce42abd8149d774da311be23a.jpg`,
    highlights: ["Masai Mara Safari", "Great Migration", "Maasai Village Visit"],
    travefyUrl: `${BASE_URL}/6yw9rqw4zztzqz2ayqztyc74ga8gxla`,
  },
  {
    id: "switzerland-private",
    name: "Switzerland Private: Sample",
    destination: "Switzerland",
    region: "Europe",
    country: ["Switzerland"],
    duration: null,
    price: null,
    groupSize: "Private",
    categories: ["Culture", "Self-Drive", "Wellness"],
    description: "Highlights of Switzerland — Zurich, Basel, Montreux, Gruyère, Grindelwald, Berne, and Lucerne — by first-class rail. Private city guides and curated experiences along the way.",
    imageUrl: `${CDN}/i_h458270c5b0a19b2c392b1c21bcd70ddcbd8c80b5.jpg`,
    highlights: ["Swiss First-Class Rail", "Grindelwald Jungfrau", "Lucerne Old Town"],
    travefyUrl: `${BASE_URL}/6yw9rquszul2qz2a4gk9labmglyhpzq`,
  },
  {
    id: "france-normandy",
    name: "Springtime in the South of France + Normandy",
    destination: "France",
    region: "Europe",
    country: ["France"],
    duration: null,
    price: null,
    groupSize: "Private (2-4 people)",
    categories: ["Culture", "Country Estates", "Self-Drive"],
    description: "Explore Provence, the Côte d'Azur, and Normandy in a relaxed bespoke itinerary. Lavender fields, Riviera villages, D-Day beaches, and Norman abbeys — France at its most evocative.",
    imageUrl: `${CDN}/i_h70fdb4041c67dd288674bd099ab75323d12dfb86.jpg`,
    highlights: ["Provence Lavender Season", "Côte d'Azur", "Normandy D-Day Beaches"],
    travefyUrl: `${BASE_URL}/6yw9rqq3yte2qz2alspwmlpdwmmp5rq`,
  },
  {
    id: "sicily-villa",
    name: "Sicily's Ionian Riviera: Villa-Based Discovery",
    destination: "Sicily, Italy",
    region: "Europe",
    country: ["Italy"],
    duration: null,
    price: null,
    groupSize: "Private",
    categories: ["Country Estates", "Culture", "Wellness"],
    description: "Discover Sicily from a private villa on the Ionian Riviera — Mt. Etna, ancient Greek temples, baroque towns, and local markets. A relaxed, villa-based way to experience one of the Mediterranean's most extraordinary islands.",
    imageUrl: `${CDN}/i_h54a051b7988e26bbcce850872c1d90311824830f~f_w1996,h784,x-3,y-98.jpg`,
    highlights: ["Private Villa Base", "Mt. Etna", "Valley of the Temples"],
    travefyUrl: `${BASE_URL}/6yw9rqu4tpwzqz2ahn3kknantpagxuq`,
  },
  {
    id: "greece-island-hiking",
    name: "Greece: Island Hiking",
    destination: "Greece",
    region: "Europe",
    country: ["Greece"],
    duration: null,
    price: null,
    groupSize: "Small Group or Private",
    categories: ["Adventure", "Self-Guided", "Wellness"],
    description: "Hike the dramatic caldera of Santorini, the mythic trails of Crete's Samaria Gorge, and the ancient paths of the Peloponnese. Island-hop between hikes on ferries with boutique hotel stays.",
    imageUrl: `${CDN}/i_h52878b5d1af87c7a4eb43335ab75f1de587c66cf.jpg`,
    highlights: ["Santorini Caldera Trail", "Samaria Gorge", "Peloponnese Ancient Paths"],
    travefyUrl: `${BASE_URL}/6yw9rqtfxwb2qz2anze8jntcctudy3a`,
  },
];

async function fetchTags(): Promise<Record<string, string[]>> {
  try {
    const res = await fetch("/api/tours/tags");
    if (!res.ok) return {};
    return await res.json();
  } catch {
    return {};
  }
}

export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const storedTags = await fetchTags();
      return TRAVEFY_TOURS.map((tour) => ({
        ...tour,
        categories: storedTags[tour.id] ?? tour.categories,
      }));
    },
  });
}

export function useUpdateTourTags() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ tourId, categories }: { tourId: string; categories: string[] }) => {
      const res = await fetch(`/api/tours/tags/${tourId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categories }),
      });
      if (!res.ok) throw new Error("Failed to save tags");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });
}
