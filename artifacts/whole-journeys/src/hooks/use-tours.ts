import { useQuery } from "@tanstack/react-query";

export interface Tour {
  id: string;
  name: string;
  destination: string;
  region: string;
  country: string[];
  duration: number;
  price: number;
  groupSize: string;
  categories: string[];
  description: string;
  imageUrl: string;
  highlights: string[];
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

const MOCK_TOURS: Tour[] = [
  {
    id: "patagonia",
    name: "Patagonia: End of the Earth",
    destination: "Chile & Argentina",
    region: "South America",
    country: ["Chile", "Argentina"],
    duration: 14,
    price: 8500,
    groupSize: "Small Group (Max 12)",
    categories: ["Adventure", "Wildlife", "Self-Guided"],
    description:
      "Journey to the edge of the world. Hike beneath the towering granite spires of Torres del Paine, witness the thunderous calving of the Perito Moreno Glacier, and explore vast, untamed wilderness in absolute luxury.",
    imageUrl:
      "https://images.unsplash.com/photo-1527004013197-225b2050dd09?q=80&w=2072&auto=format&fit=crop",
    highlights: [
      "Torres del Paine National Park",
      "Perito Moreno Glacier Trek",
      "Luxury Eco-Camp Stay",
    ],
  },
  {
    id: "rwanda",
    name: "Rwanda Gorillas & Beyond",
    destination: "Rwanda & Uganda",
    region: "Africa",
    country: ["Rwanda", "Uganda"],
    duration: 10,
    price: 12000,
    groupSize: "Intimate (Max 6)",
    categories: ["Wildlife", "Adventure", "Women's"],
    description:
      "A profound wildlife encounter. Trek through mist-shrouded volcanic mountains to sit quietly with mountain gorillas, followed by savannah safaris searching for tree-climbing lions.",
    imageUrl:
      "https://images.unsplash.com/photo-1583344605912-32b00dc9e4aa?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Private Gorilla Trekking",
      "Chimpanzee Tracking",
      "Conservation Briefings",
    ],
  },
  {
    id: "bhutan",
    name: "Bhutan: Kingdom in the Clouds",
    destination: "Bhutan",
    region: "Asia",
    country: ["Bhutan"],
    duration: 12,
    price: 9200,
    groupSize: "Private",
    categories: ["Culture", "Wellness", "Women's"],
    description:
      "Discover the last great Himalayan kingdom. Hike to the iconic Tiger's Nest monastery, receive private blessings from local monks, and unwind in world-class wellness retreats hidden in verdant valleys.",
    imageUrl:
      "https://images.unsplash.com/photo-1543324673-8a3560f38eb4?q=80&w=2069&auto=format&fit=crop",
    highlights: [
      "Tiger's Nest Hike",
      "Traditional Hot Stone Baths",
      "Punakha Dzong",
    ],
  },
  {
    id: "svalbard",
    name: "Svalbard Arctic Expedition",
    destination: "Norway (Arctic)",
    region: "Arctic/Antarctic",
    country: ["Norway"],
    duration: 10,
    price: 11500,
    groupSize: "Expedition Ship",
    categories: ["Adventure", "Wildlife"],
    description:
      "Navigate the realm of the polar bear under the midnight sun. Kayak past massive glacier faces, zodiac cruise among walruses, and experience the stark, haunting beauty of the high Arctic.",
    imageUrl:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1974&auto=format&fit=crop",
    highlights: [
      "Polar Bear Viewing",
      "Midnight Sun Kayaking",
      "Ice Cave Exploration",
    ],
  },
  {
    id: "galapagos",
    name: "Galápagos Islands Deep Dive",
    destination: "Ecuador",
    region: "South America",
    country: ["Ecuador"],
    duration: 8,
    price: 7800,
    groupSize: "Small Yacht",
    categories: ["Wildlife", "Family", "Adventure"],
    description:
      "Walk in Darwin's footsteps. Snorkel with playful sea lions, step around ancient giant tortoises, and observe blue-footed boobies in the world's most pristine living laboratory.",
    imageUrl:
      "https://images.unsplash.com/photo-1533215886475-7b54a7cc3fc3?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Snorkeling with Sea Lions",
      "Giant Tortoise Reserves",
      "Volcanic Landscapes",
    ],
  },
  {
    id: "morocco",
    name: "Morocco: Sahara to Medina",
    destination: "Morocco",
    region: "Africa",
    country: ["Morocco"],
    duration: 10,
    price: 5400,
    groupSize: "Small Group (Max 10)",
    categories: ["Culture", "Adventure", "Self-Drive"],
    description:
      "A sensory feast. Wander the labyrinthine souks of Marrakech, traverse the High Atlas Mountains, and sleep under a blanket of stars in a luxury Sahara desert camp.",
    imageUrl:
      "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2071&auto=format&fit=crop",
    highlights: [
      "Luxury Desert Camp",
      "Private Cooking Masterclass",
      "Atlas Mountain Trek",
    ],
  },
  {
    id: "japan",
    name: "Japan Off the Beaten Path",
    destination: "Japan",
    region: "Asia",
    country: ["Japan"],
    duration: 16,
    price: 8900,
    groupSize: "Small Group (Max 8)",
    categories: ["Culture", "Wellness", "Self-Guided"],
    description:
      "Beyond the neon. Journey through ancient cedar forests on the Nakasendo trail, meditate with Zen monks, and experience omotenashi (hospitality) at remote, historic ryokans.",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Nakasendo Trail Hiking",
      "Exclusive Geisha Encounter",
      "Onsen Retreats",
    ],
  },
  {
    id: "antarctica",
    name: "Antarctica: White Continent",
    destination: "Antarctica",
    region: "Arctic/Antarctic",
    country: ["Antarctica"],
    duration: 12,
    price: 18000,
    groupSize: "Luxury Expedition",
    categories: ["Adventure", "Wildlife"],
    description:
      "The ultimate frontier. Cross the Drake Passage to a world of sculpted icebergs, immense penguin rookeries, and breaching whales. A transformative journey to the bottom of the world.",
    imageUrl:
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Zodiac Iceberg Cruising",
      "Continental Landing",
      "Whale Watching",
    ],
  },
  {
    id: "borneo",
    name: "Borneo Wildlife Safari",
    destination: "Malaysia",
    region: "Asia",
    country: ["Malaysia"],
    duration: 10,
    price: 7200,
    groupSize: "Small Group (Max 8)",
    categories: ["Wildlife", "Adventure"],
    description:
      "Immerse yourself in one of the earth's oldest rainforests. Cruise the Kinabatangan River in search of pygmy elephants and encounter wild orangutans swinging through the primary canopy.",
    imageUrl:
      "https://images.unsplash.com/photo-1533587903565-d04b3abce0dc?q=80&w=1974&auto=format&fit=crop",
    highlights: [
      "Orangutan Rehabilitation",
      "River Safaris",
      "Rainforest Canopy Walk",
    ],
  },
  {
    id: "peru",
    name: "Peru: Inca & Amazon",
    destination: "Peru",
    region: "South America",
    country: ["Peru"],
    duration: 14,
    price: 6800,
    groupSize: "Small Group (Max 12)",
    categories: ["Culture", "Adventure", "Family"],
    description:
      "From ancient ruins to the jungle floor. Explore the Sacred Valley, arrive at Machu Picchu aboard the luxury Hiram Bingham train, and venture deep into the pristine Amazon basin.",
    imageUrl:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Machu Picchu Private Tour",
      "Amazon Eco-Lodge",
      "Cusco Culinary Tour",
    ],
  },
  {
    id: "scottish-highlands",
    name: "Scottish Highlands: Castles & Glens",
    destination: "Scotland",
    region: "Europe",
    country: ["United Kingdom"],
    duration: 10,
    price: 6200,
    groupSize: "Private or Small Group",
    categories: ["Country Estates", "Self-Drive", "Culture", "Wellness"],
    description:
      "Wind through mist-laden glens and past ancient castles in a private car. Stay in legendary country house hotels, distillery lodges, and historic clan estates. Scotland at its most atmospheric.",
    imageUrl:
      "https://images.unsplash.com/photo-1506377585622-bedcbb5a9baa?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Private Castle Stays",
      "Single Malt Distillery Trail",
      "Isle of Skye Driving Tour",
    ],
  },
  {
    id: "chamonix-ski",
    name: "Chamonix: Powder & Peaks",
    destination: "France & Switzerland",
    region: "Europe",
    country: ["France", "Switzerland"],
    duration: 8,
    price: 7500,
    groupSize: "Small Group or Private",
    categories: ["Ski & Snow", "Adventure", "Wellness"],
    description:
      "Ski the legendary Vallée Blanche off-piste run, heli-ski untouched Swiss powder, and recover each evening with alpine spa treatments in a 5-star chalet hotel in Chamonix.",
    imageUrl:
      "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Vallée Blanche Off-Piste",
      "Heli-Skiing Swiss Alps",
      "5-Star Chalet Spa",
    ],
  },
  {
    id: "women-costa-rica",
    name: "Women's Costa Rica Wellness Retreat",
    destination: "Costa Rica",
    region: "South America",
    country: ["Costa Rica"],
    duration: 9,
    price: 4900,
    groupSize: "Women Only (Max 10)",
    categories: ["Women's", "Wellness", "Wildlife", "Adventure"],
    description:
      "A restorative escape designed exclusively for women. Surf Pacific swells at dawn, practice yoga in cloud forest canopy studios, and connect with extraordinary wildlife in one of the world's most biodiverse countries.",
    imageUrl:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Women-Only Expert-Led Surfing",
      "Cloud Forest Yoga & Meditation",
      "Sloth Sanctuary Visit",
    ],
  },
  {
    id: "provence-drive",
    name: "Provence: Lavender & Châteaux",
    destination: "France",
    region: "Europe",
    country: ["France"],
    duration: 8,
    price: 5800,
    groupSize: "Private",
    categories: ["Self-Drive", "Country Estates", "Culture", "Wellness"],
    description:
      "Cruise through rows of purple lavender in a classic convertible. Lunch at Michelin-starred bastides, sip wine at centuries-old châteaux, and explore hilltop villages untouched by time.",
    imageUrl:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Lavender Field Season",
      "Private Château Wine Tasting",
      "Les Baux & Gordes Villages",
    ],
  },
  {
    id: "dolomites-ski",
    name: "Dolomites Family Ski Adventure",
    destination: "Italy",
    region: "Europe",
    country: ["Italy"],
    duration: 7,
    price: 5500,
    groupSize: "Family Groups",
    categories: ["Ski & Snow", "Family", "Adventure"],
    description:
      "Italy's most spectacular ski region, where dramatic pink limestone peaks frame perfectly groomed pistes. Private ski lessons for kids, gourmet mountain lunches, and cosy alpine evenings for the whole family.",
    imageUrl:
      "https://images.unsplash.com/photo-1551524163-c5f8b9b0e8e7?q=80&w=2070&auto=format&fit=crop",
    highlights: [
      "Sellaronda Ski Circuit",
      "Private Children's Ski School",
      "Alta Badia Gourmet Safari",
    ],
  },
];

export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      return MOCK_TOURS;
    },
  });
}
