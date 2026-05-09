import { useState } from "react";
import { Link } from "wouter";
import { MapPin, BedDouble, Printer, Phone, ExternalLink, Mail, Globe, Info, Clock, Car, Mountain, Wind, Bike, Landmark, Utensils, Sunrise, Droplets, Navigation } from "lucide-react";

interface Activity { icon: string; text: string; }
interface Hotel { name: string; note: string; address: string; phone: string; url: string; }
interface MapLocation { category: "Lodging" | "Activity"; name: string; query: string; day: number; }
interface DayData { day: number; date: string; title: string; theme: string; details: string; meeting: string; transfer?: string; activities: Activity[]; hotel: Hotel; }

const ITINERARY: DayData[] = [
  {
    day: 1, date: "May 14", title: "Arrival in Girona", theme: "sea",
    details: "Arrive in Girona by flight or train. Explore the city and the Temps de Flors flower festival.",
    meeting: "Plan to arrive by May 14.",
    activities: [{ icon: "Info", text: "Explore Temps de Flors (Annual flower festival)" }],
    hotel: { name: "Hotel B&B Girona 3", note: "Room reserved under your name.", address: "Carrer de Miquel Martí i Pol, 11, 17190 Salt, Girona", phone: "+34 900 53 31 47", url: "https://www.hotelbb.com/es/hotel/girona-3" }
  },
  {
    day: 2, date: "May 15", title: "Mediterranean Coast & Cap de Creus", theme: "coast",
    details: "From the eastern edge of the Iberian Peninsula to a wild coastline of sculpted cliffs.",
    meeting: "7:50 AM at the hotel lobby. Meet guide Sílvia Vidal.", transfer: "~3 hours total",
    activities: [
      { icon: "Droplets", text: "Sea Kayaking: ~2.5 hrs at Port Lligat (Beginner-friendly)" },
      { icon: "Utensils", text: "Lunch at Cala Joncols (Secluded cove)" },
      { icon: "Mountain", text: "Coastal Hiking: 3 km, ~1 hr (+165m/-58m) at Cala Joncols" }
    ],
    hotel: { name: "Mas La Ferreria", note: "4★ Rural Hotel", address: "Veïnat de Ferreria, s/n, 17813 La Vall de Bianya, Girona", phone: "+34 972 29 00 81", url: "https://maslaferreria.com/" }
  },
  {
    day: 3, date: "May 16", title: "Volcanoes & Cycling in La Garrotxa", theme: "forest",
    details: "Discover La Garrotxa's volcanic landscape from above and on the ground.",
    meeting: "Early start (~06:15 AM) at Vol de Coloms.", transfer: "~2 hours total",
    activities: [
      { icon: "Wind", text: "Hot-air balloon flight (~1.5 hrs) over volcanoes" },
      { icon: "Utensils", text: "Traditional farmer's breakfast" },
      { icon: "Bike", text: "E-bike ride: ~2 hrs through La Fageda d'en Jordà" },
      { icon: "Sunrise", text: "Farmhouse visit at Can Pastoret" }
    ],
    hotel: { name: "Hotel La Coma", note: "Mountain Hotel", address: "Carrer de la Coma, s/n, 17869 Setcases, Girona", phone: "+34 972 74 06 09", url: "https://www.hotellacoma.com/" }
  },
  {
    day: 4, date: "May 17", title: "Culture & Alpine Landscapes", theme: "alpine",
    details: "Travel deeper into the Pyrenees into high valleys and historic settlements.",
    meeting: "Morning departure towards Camprodon.", transfer: "~3 hours total",
    activities: [
      { icon: "Landmark", text: "Guided exploration of medieval Camprodon" },
      { icon: "Utensils", text: "Cheese-tasting & monastery visit in Sant Joan de les Abadesses" },
      { icon: "Mountain", text: "Alpine Hiking: 4.5 km, ~2 hrs (±152m) at La Molina ski resort" }
    ],
    hotel: { name: "Hotel Pessets", note: "Lleida Region", address: "Av. de la Diputació, 3, 25560 Sort, Lleida", phone: "+34 973 62 00 00", url: "https://www.hotelpessets.com/" }
  },
  {
    day: 5, date: "May 18", title: "Rivers & High Mountain Landscapes", theme: "peaks",
    details: "A day shaped by water and high-mountain terrain, ending in Val d'Aran.",
    meeting: "Morning departure for whitewater rafting.", transfer: "~2 hours total",
    activities: [
      { icon: "Droplets", text: "Whitewater Rafting: 18 km, ~3 hrs (Class III-IV) at La Rafting Company, Sort" },
      { icon: "Utensils", text: "Lunch at Batlliu de Sort (High-mountain vineyard)" },
      { icon: "Mountain", text: "National Park Hiking: 3 km, ~2 hr (±82m) at Sant Maurici lake" }
    ],
    hotel: { name: "Parador de Vielha", note: "4★ Event Hotel in Val d'Aran", address: "Ctra. del Túnel, s/n, 25530 Vielha, Lleida", phone: "+34 973 64 01 00", url: "https://parador.es/es/paradores/parador-de-vielha" }
  }
];

const MAP_LOCATIONS: MapLocation[] = [
  { category: "Lodging", name: "Hotel B&B Girona 3", query: "Hotel B&B Girona 3", day: 1 },
  { category: "Lodging", name: "Mas La Ferreria", query: "Mas La Ferreria Vall de Bianya", day: 2 },
  { category: "Lodging", name: "Hotel La Coma", query: "Hotel La Coma Setcases", day: 3 },
  { category: "Lodging", name: "Hotel Pessets", query: "Hotel Pessets Sort", day: 4 },
  { category: "Lodging", name: "Parador de Vielha", query: "Parador de Vielha", day: 5 },
  { category: "Activity", name: "Portlligat Kayaking", query: "Portlligat Cadaques", day: 2 },
  { category: "Activity", name: "Cala Jóncols", query: "Cala Joncols Roses", day: 2 },
  { category: "Activity", name: "Vol de Coloms", query: "Vol de Coloms Santa Pau", day: 3 },
  { category: "Activity", name: "Can Pastoret", query: "Can Pastoret Mollo", day: 3 },
  { category: "Activity", name: "Camprodon Village", query: "Camprodon", day: 4 },
  { category: "Activity", name: "Sant Joan de les Abadesses", query: "Monestir de Sant Joan de les Abadesses", day: 4 },
  { category: "Activity", name: "La Molina Ski Resort", query: "La Molina", day: 4 },
  { category: "Activity", name: "La Rafting Company Sort", query: "La Rafting Company Sort", day: 5 },
  { category: "Activity", name: "Celler Batlliu de Sort", query: "Celler Batlliu de Sort", day: 5 },
  { category: "Activity", name: "Estany de Sant Maurici", query: "Estany de Sant Maurici", day: 5 },
];

const themeGradients: Record<string, string> = {
  sea: "bg-gradient-to-br from-blue-600 to-cyan-600",
  coast: "bg-gradient-to-br from-cyan-600 to-teal-600",
  forest: "bg-gradient-to-br from-emerald-600 to-green-700",
  alpine: "bg-gradient-to-br from-slate-600 to-slate-700",
  peaks: "bg-gradient-to-br from-slate-700 to-slate-900",
};

const ActivityIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactElement> = {
    Info: <Info size={18} className="text-slate-400"/>,
    Droplets: <Droplets size={18} className="text-slate-400"/>,
    Mountain: <Mountain size={18} className="text-slate-400"/>,
    Wind: <Wind size={18} className="text-slate-400"/>,
    Bike: <Bike size={18} className="text-slate-400"/>,
    Sunrise: <Sunrise size={18} className="text-slate-400"/>,
    Landmark: <Landmark size={18} className="text-slate-400"/>,
    Utensils: <Utensils size={18} className="text-slate-400"/>,
  };
  return icons[name] ?? <Info size={18} className="text-slate-400"/>;
};

function gmaps(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function CatalanAdventure() {
  const [activeTab, setActiveTab] = useState<"itinerary" | "map">("itinerary");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 via-teal-700 to-slate-800 text-white pt-8 pb-8 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-white/20 gap-4">
            <Link href="/infographics" className="text-[11px] font-black uppercase tracking-widest text-teal-200 hover:text-white transition-colors print:hidden">← Infographics</Link>
            <div className="flex items-center gap-3">
              <div className="text-sm text-teal-50 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                Infographic by <span className="font-bold text-white">Kathy Dragon, Whole Journeys</span>
              </div>
              <button onClick={() => window.print()} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white rounded-full px-4 py-2 shadow-md transition-colors print:hidden">
                <Printer size={16}/> <span className="font-medium text-sm">Save PDF</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">Sea to Peaks</h1>
              <h2 className="text-xl font-light text-cyan-100">A Catalan Multi-Activity Adventure</h2>
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="font-medium">May 14–18</span>
              </div>
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="font-medium text-sm">Level 2+ (Easy Active)</span>
              </div>
              <a
                href="https://www.google.com/maps/d/edit?mid=1cHINraNVWMPCkzYchdHiqkmx3LHKdvg&usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="print:hidden flex items-center gap-2 bg-white text-teal-800 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-md hover:bg-teal-50 transition-colors"
              >
                <Navigation size={15} /> Full Route Map
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ["Route","Costa Brava → Garrotxa → Pyrenees"],
              ["Guide","Sílvia Vidal · Outdoor Adventour"],
              ["Contact","tel:+34656590649","+34 656 590 649"],
            ].map(([label, val, display]) => (
              <div key={label} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs text-cyan-200 uppercase tracking-wider font-semibold mb-1">{label}</p>
                {display ? (
                  <a href={val} className="font-bold text-white hover:text-teal-200 transition-colors">{display}</a>
                ) : (
                  <p className="font-bold text-white">{val}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-2 print:hidden">
        <div className="flex bg-white rounded-2xl shadow-sm border border-slate-200 p-1 w-fit">
          {(["itinerary","map"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all ${activeTab === tab ? "bg-teal-600 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>{tab === "map" ? "Map & Locations" : "Itinerary"}</button>
          ))}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === "itinerary" ? (
          <div className="space-y-6">
            {ITINERARY.map((day) => (
              <div key={day.day} className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                {/* Sidebar */}
                <div className={`${themeGradients[day.theme]} text-white p-6 md:w-44 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start shrink-0`}>
                  <div>
                    <p className="text-white/80 font-bold uppercase tracking-wider text-xs mb-1">Day {day.day}</p>
                    <h3 className="text-xl font-bold">{day.date}</h3>
                  </div>
                  <div className="md:mt-6">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center border border-white/30 font-bold text-sm">{day.day}</div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 flex-grow">
                  <h4 className="text-xl font-bold text-slate-800 mb-1">{day.title}</h4>
                  <p className="text-slate-500 text-sm mb-4">{day.details}</p>
                  <div className="bg-emerald-50 text-emerald-900 p-3 rounded-lg flex items-start gap-2.5 mb-3 border border-emerald-100">
                    <Clock size={15} className="text-emerald-600 shrink-0 mt-0.5"/>
                    <p className="text-sm font-medium">{day.meeting}</p>
                  </div>
                  {day.transfer && (
                    <div className="bg-blue-50 text-blue-900 p-3 rounded-lg flex items-start gap-2.5 mb-4 border border-blue-100">
                      <Car size={15} className="text-blue-600 shrink-0 mt-0.5"/>
                      <p className="text-sm font-medium">Driving / Transfer: {day.transfer}</p>
                    </div>
                  )}
                  <div className="space-y-2 mb-5">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <ActivityIcon name={act.icon}/>
                        <p className="text-slate-700 font-medium text-sm">{act.text}</p>
                      </div>
                    ))}
                  </div>
                  {/* Hotel */}
                  <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50 p-4 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <div>
                        <p className="text-[10px] text-indigo-400 uppercase tracking-wider font-bold mb-0.5">Accommodation</p>
                        <p className="font-bold text-slate-800 text-base">{day.hotel.name}</p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mt-2 sm:mt-0 w-max">{day.hotel.note}</span>
                    </div>
                    <div className="space-y-2 mt-3 text-sm">
                      <a href={gmaps(day.hotel.name + " " + day.hotel.address)} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-slate-600 hover:text-indigo-600 transition-colors group">
                        <MapPin size={14} className="text-slate-400 group-hover:text-indigo-500 shrink-0 mt-0.5"/>
                        <span>{day.hotel.address}</span>
                        <ExternalLink size={11} className="text-slate-300 group-hover:text-indigo-400 shrink-0 mt-0.5"/>
                      </a>
                      <a href={`tel:${day.hotel.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
                        <Phone size={14} className="text-slate-400 shrink-0"/>
                        <span>{day.hotel.phone}</span>
                      </a>
                      <a href={day.hotel.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                        <ExternalLink size={14} className="shrink-0"/> Visit Hotel Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Route overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-bold mb-5 flex items-center gap-2"><Navigation size={18} className="text-teal-500"/> Journey Route Overview</h3>
              <div className="w-full h-20 relative flex items-center justify-between px-4">
                <div className="absolute top-1/2 left-8 right-8 h-1 bg-teal-200 -translate-y-1/2 rounded-full"></div>
                {[{name:"Girona",dot:"bg-blue-500"},{name:"Cap de Creus",dot:"bg-cyan-500"},{name:"La Garrotxa",dot:"bg-emerald-500"},{name:"Ripollès",dot:"bg-slate-500"},{name:"Val d'Aran",dot:"bg-slate-800"}].map((stop, i) => (
                  <div key={i} className="flex flex-col items-center relative z-10">
                    <div className={`w-4 h-4 rounded-full ${stop.dot} shadow-md ring-4 ring-white mb-2`}></div>
                    <p className="font-bold text-slate-700 text-xs bg-white px-1 rounded whitespace-nowrap">{stop.name}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400 mt-4 text-center">Mediterranean Sea → High Pyrenees</p>
            </div>

            {/* Hotels */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-base font-bold text-indigo-600 uppercase tracking-wider mb-4 border-b border-indigo-100 pb-2 flex items-center gap-2"><BedDouble size={16}/> Hotels & Lodging</h3>
              <div className="space-y-2">
                {MAP_LOCATIONS.filter(l => l.category === "Lodging").map((loc, i) => (
                  <a key={i} href={gmaps(loc.query)} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mr-3 font-bold text-xs">D{loc.day}</div>
                    <p className="flex-grow font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm">{loc.name}</p>
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-500"/>
                  </a>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-base font-bold text-teal-600 uppercase tracking-wider mb-4 border-b border-teal-100 pb-2 flex items-center gap-2"><MapPin size={16}/> Activities & Dining</h3>
              <div className="space-y-2">
                {MAP_LOCATIONS.filter(l => l.category === "Activity").map((loc, i) => (
                  <a key={i} href={gmaps(loc.query)} target="_blank" rel="noopener noreferrer" className="flex items-center p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mr-3 font-bold text-xs">D{loc.day}</div>
                    <p className="flex-grow font-semibold text-slate-800 group-hover:text-teal-600 transition-colors text-sm">{loc.name}</p>
                    <ExternalLink size={14} className="text-slate-300 group-hover:text-teal-500"/>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-4xl mx-auto border-t border-slate-200 mt-6 px-4 py-8 print:hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-serif italic">Infographic by <span className="font-black text-slate-600">Kathy Dragon</span>, Whole Journeys</p>
          <div className="flex items-center gap-5">
            <a href="mailto:kathy.dragon@wholejourneys.com" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-800 transition-colors"><Mail size={13}/> kathy.dragon@wholejourneys.com</a>
            <a href="https://www.wholejourneys.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-teal-600 hover:text-teal-800 transition-colors"><Globe size={13}/> wholejourneys.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
