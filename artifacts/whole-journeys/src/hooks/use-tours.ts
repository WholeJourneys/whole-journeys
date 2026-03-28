import { useQuery } from "@tanstack/react-query";

export interface Tour {
  id: string;
  name: string;
  destination: string;
  region: string;
  duration: number; // in days
  price: number;
  groupSize: string;
  type: string[];
  description: string;
  imageUrl: string;
  highlights: string[];
}

const MOCK_TOURS: Tour[] = [
  {
    id: "patagonia",
    name: "Patagonia: End of the Earth",
    destination: "Chile & Argentina",
    region: "South America",
    duration: 14,
    price: 8500,
    groupSize: "Small Group (Max 12)",
    type: ["Adventure", "Wildlife"],
    description: "Journey to the edge of the world. Hike beneath the towering granite spires of Torres del Paine, witness the thunderous calving of the Perito Moreno Glacier, and explore vast, untamed wilderness in absolute luxury.",
    imageUrl: "https://images.unsplash.com/photo-1527004013197-225b2050dd09?q=80&w=2072&auto=format&fit=crop", // patagonia mountains
    highlights: ["Torres del Paine National Park", "Perito Moreno Glacier Trek", "Luxury Eco-Camp Stay"]
  },
  {
    id: "rwanda",
    name: "Rwanda Gorillas & Beyond",
    destination: "Rwanda & Uganda",
    region: "Africa",
    duration: 10,
    price: 12000,
    groupSize: "Intimate (Max 6)",
    type: ["Wildlife", "Adventure"],
    description: "A profound wildlife encounter. Trek through mist-shrouded volcanic mountains to sit quietly with mountain gorillas, followed by savannah safaris searching for tree-climbing lions.",
    imageUrl: "https://images.unsplash.com/photo-1583344605912-32b00dc9e4aa?q=80&w=2070&auto=format&fit=crop", // gorilla in mist
    highlights: ["Private Gorilla Trekking", "Chimpanzee Tracking", "Conservation Briefings"]
  },
  {
    id: "bhutan",
    name: "Bhutan: Kingdom in the Clouds",
    destination: "Bhutan",
    region: "Asia",
    duration: 12,
    price: 9200,
    groupSize: "Private",
    type: ["Culture", "Wellness"],
    description: "Discover the last great Himalayan kingdom. Hike to the iconic Tiger's Nest monastery, receive private blessings from local monks, and unwind in world-class wellness retreats hidden in verdant valleys.",
    imageUrl: "https://images.unsplash.com/photo-1543324673-8a3560f38eb4?q=80&w=2069&auto=format&fit=crop", // bhutan tigers nest
    highlights: ["Tiger's Nest Hike", "Traditional Hot Stone Baths", "Punakha Dzong"]
  },
  {
    id: "svalbard",
    name: "Svalbard Arctic Expedition",
    destination: "Norway (Arctic)",
    region: "Arctic/Antarctic",
    duration: 10,
    price: 11500,
    groupSize: "Expedition Ship",
    type: ["Adventure", "Wildlife"],
    description: "Navigate the realm of the polar bear under the midnight sun. Kayak past massive glacier faces, zodiac cruise among walruses, and experience the stark, haunting beauty of the high Arctic.",
    imageUrl: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1974&auto=format&fit=crop", // arctic glacier
    highlights: ["Polar Bear Viewing", "Midnight Sun Kayaking", "Ice Cave Exploration"]
  },
  {
    id: "galapagos",
    name: "Galápagos Islands Deep Dive",
    destination: "Ecuador",
    region: "South America",
    duration: 8,
    price: 7800,
    groupSize: "Small Yacht",
    type: ["Wildlife", "Family"],
    description: "Walk in Darwin's footsteps. Snorkel with playful sea lions, step around ancient giant tortoises, and observe blue-footed boobies in the world's most pristine living laboratory.",
    imageUrl: "https://images.unsplash.com/photo-1533215886475-7b54a7cc3fc3?q=80&w=2070&auto=format&fit=crop", // galapagos turtle
    highlights: ["Snorkeling with Sea Lions", "Giant Tortoise Reserves", "Volcanic Landscapes"]
  },
  {
    id: "morocco",
    name: "Morocco: Sahara to Medina",
    destination: "Morocco",
    region: "Africa",
    duration: 10,
    price: 5400,
    groupSize: "Small Group (Max 10)",
    type: ["Culture", "Adventure"],
    description: "A sensory feast. Wander the labyrinthine souks of Marrakech, traverse the High Atlas Mountains, and sleep under a blanket of stars in a luxury Sahara desert camp.",
    imageUrl: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2071&auto=format&fit=crop", // morocco architecture
    highlights: ["Luxury Desert Camp", "Private Cooking Masterclass", "Atlas Mountain Trek"]
  },
  {
    id: "japan",
    name: "Japan Off the Beaten Path",
    destination: "Japan",
    region: "Asia",
    duration: 16,
    price: 8900,
    groupSize: "Small Group (Max 8)",
    type: ["Culture", "Wellness"],
    description: "Beyond the neon. Journey through ancient cedar forests on the Nakasendo trail, meditate with Zen monks, and experience omotenashi (hospitality) at remote, historic ryokans.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop", // japan nature temple
    highlights: ["Nakasendo Trail Hiking", "Exclusive Geisha Encounter", "Onsen Retreats"]
  },
  {
    id: "antarctica",
    name: "Antarctica: White Continent",
    destination: "Antarctica",
    region: "Arctic/Antarctic",
    duration: 12,
    price: 18000,
    groupSize: "Luxury Expedition",
    type: ["Adventure", "Wildlife"],
    description: "The ultimate frontier. Cross the Drake Passage to a world of sculpted icebergs, immense penguin rookeries, and breaching whales. A transformative journey to the bottom of the world.",
    imageUrl: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop", // antarctica penguins
    highlights: ["Zodiac Iceberg Cruising", "Continental Landing", "Whale Watching"]
  },
  {
    id: "borneo",
    name: "Borneo Wildlife Safari",
    destination: "Malaysia",
    region: "Asia",
    duration: 10,
    price: 7200,
    groupSize: "Small Group (Max 8)",
    type: ["Wildlife", "Adventure"],
    description: "Immerse yourself in one of the earth's oldest rainforests. Cruise the Kinabatangan River in search of pygmy elephants and encounter wild orangutans swinging through the primary canopy.",
    imageUrl: "https://images.unsplash.com/photo-1533587903565-d04b3abce0dc?q=80&w=1974&auto=format&fit=crop", // jungle rainforest
    highlights: ["Orangutan Rehabilitation", "River Safaris", "Rainforest Canopy Walk"]
  },
  {
    id: "peru",
    name: "Peru: Inca & Amazon",
    destination: "Peru",
    region: "South America",
    duration: 14,
    price: 6800,
    groupSize: "Small Group (Max 12)",
    type: ["Culture", "Adventure"],
    description: "From ancient ruins to the jungle floor. Explore the Sacred Valley, arrive at Machu Picchu aboard the luxury Hiram Bingham train, and venture deep into the pristine Amazon basin.",
    imageUrl: "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop", // machu picchu
    highlights: ["Machu Picchu Private Tour", "Amazon Eco-Lodge", "Cusco Culinary Tour"]
  }
];

export function useTours() {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      return MOCK_TOURS;
    },
  });
}
