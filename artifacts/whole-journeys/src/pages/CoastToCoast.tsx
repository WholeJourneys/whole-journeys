import { useState } from "react";
import { Link } from "wouter";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { MapPin, BedDouble, Utensils, Printer, Mountain, Navigation, Info, ExternalLink, Mail, Globe, Leaf, Phone } from "lucide-react";

interface Hotel { name: string; address: string; phone: string; mapsQuery: string; rooms?: string; }
interface VeganSpot { label: string; name: string; mapsQuery?: string; }
interface DayData {
  day: number; date: string; label: string; from: string; to: string;
  miles: number | null; hotel: Hotel | null; hotels?: Hotel[]; terrain: string; history: string;
  veganEats: VeganSpot[]; notes?: string;
}

const days: DayData[] = [
  {
    day: 1, date: "08 Jun", label: "Arrival", from: "Manchester Airport", to: "St. Bees", miles: null,
    hotel: null,
    hotels: [
      { name: "The Manor", address: "Main St, St Bees, CA27 0DE", phone: "01946 820587", mapsQuery: "The Manor St Bees Cumbria", rooms: "1x Dbl/Single (Craig)" },
      { name: "Stonehouse Farm", address: "Main St, St Bees, CA27 0DE", phone: "01946 822224", mapsQuery: "Stonehouse Farm St Bees Cumbria", rooms: "1x Twin, 2x Dbl/Single" },
    ],
    terrain: "Coastal village setting.",
    history: "The hike begins at St Bees Priory (founded 1120). Tradition dictates dipping your boots in the Irish Sea and picking up a pebble to carry to the opposite coast.",
    veganEats: [{ label: "Dinner", name: "The Manor — dedicated vegan options at your accommodation" }],
    notes: "10:30 AM scheduled transfer from Manchester Airport (MAN) to St. Bees."
  },
  {
    day: 2, date: "09 Jun", label: "Day 1", from: "St. Bees", to: "Ennerdale", miles: 14.0,
    hotel: { name: "Ennerdale Country Hotel", address: "Main St, Cleator Moor, CA23 3DT", phone: "01946 813907", mapsQuery: "Ennerdale Country Hotel Cleator Moor", rooms: "1x Twin, 1x Dbl/Single, 2x Single" },
    terrain: "High red coastal cliffs, farmland, and forestry tracks.",
    history: "You cross into the Lake District National Park. Ennerdale Water is the most remote of the lakes, serving as a peaceful reservoir.",
    veganEats: [
      { label: "Lunch", name: "The Gather Cafe, Ennerdale Bridge", mapsQuery: "The Gather Cafe Ennerdale Bridge" },
      { label: "Dinner", name: "Check hotel restaurant for evening meals" }
    ],
    notes: "Passenger Transfer (~5:00 PM). Call Ennerdale Taxi (01946 810024) upon arrival for off-trail transfer."
  },
  {
    day: 3, date: "10 Jun", label: "Day 2", from: "Ennerdale", to: "Rosthwaite", miles: 14.5,
    hotel: { name: "Glaramara Hotel", address: "Seatoller, Borrowdale, Nr Keswick, CA12", phone: "01768 777222", mapsQuery: "Glaramara Hotel Seatoller Borrowdale", rooms: "1x Twin, 3x Single" },
    terrain: "Rugged mountains, steep passes (Black Sail / Loft Beck), and rocky trails.",
    history: "Borrowdale is famed for its green slate and historic graphite mining, which started the pencil industry in nearby Keswick in the 1500s.",
    veganEats: [
      { label: "Lunch", name: "Packed lunch required — remote stretch over the fells" },
      { label: "Dinner", name: "Flock-in Tearoom, Rosthwaite", mapsQuery: "Flock In Tearoom Rosthwaite Borrowdale" }
    ],
    notes: "Passenger Transfer (~9:15 AM) back to the trail."
  },
  {
    day: 4, date: "11 Jun", label: "Day 3", from: "Rosthwaite", to: "Glenridding", miles: 18.0,
    hotel: { name: "Ullswater Inn", address: "A592, Penrith, CA11 0PB, Glenridding", phone: "01915 803610", mapsQuery: "Ullswater Inn Glenridding", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "High mountain passes (Grisedale Tarn), steep ascents and descents.",
    history: "You hike in the shadow of Helvellyn, England's 3rd highest peak. This area is steeped in 19th-century lead mining history.",
    veganEats: [
      { label: "Lunch", name: "Packed lunch required — high mountain passes, no facilities" },
      { label: "Dinner", name: "Helvellyn Country Kitchen, Glenridding", mapsQuery: "Helvellyn Country Kitchen Glenridding" }
    ]
  },
  {
    day: 5, date: "12 Jun", label: "Day 4", from: "Glenridding", to: "Shap", miles: 16.0,
    hotel: { name: "Kings Arms Hotel", address: "Main Street, Shap, CA10 3NU", phone: "01931 716277", mapsQuery: "Kings Arms Hotel Shap Cumbria", rooms: "1x Twin, 3x Single" },
    terrain: "High ridges (Kidsty Pike — highest point at 780m), boggy moorland, and Haweswater lakeshore.",
    history: "Shap marks the geological transition from volcanic Lake District rocks to the limestone of the Pennines. Look for the ruins of Shap Abbey, founded in 1199.",
    veganEats: [
      { label: "Lunch", name: "Packed lunch required — climb over Kidsty Pike" },
      { label: "Dinner", name: "The Abbey Kitchen, Shap", mapsQuery: "The Abbey Kitchen Shap" }
    ]
  },
  {
    day: 6, date: "13 Jun", label: "Day 5", from: "Shap", to: "Kirkby Stephen", miles: 21.0,
    hotel: { name: "Jolly Farmers Guest House", address: "High Street, Kirkby Stephen, CA17 4SH", phone: "01768 371063", mapsQuery: "Jolly Farmers Guest House Kirkby Stephen", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "Rolling grassy moors, limestone pavements, and farmland paths.",
    history: "Kirkby Stephen is a historic market town granted a charter in 1353. A vital stop for drovers moving cattle from Scotland.",
    veganEats: [
      { label: "Lunch", name: "Orton Scar Cafe, Orton village", mapsQuery: "Orton Scar Cafe Orton Cumbria" },
      { label: "Dinner", name: "Mango Tree (Indian), Kirkby Stephen", mapsQuery: "Mango Tree Kirkby Stephen" }
    ]
  },
  {
    day: 7, date: "14 Jun", label: "Day 6", from: "Kirkby Stephen", to: "Keld", miles: 12.0,
    hotel: { name: "Keld Lodge", address: "Keld, DL11 6LL", phone: "01748 886259", mapsQuery: "Keld Lodge Keld Yorkshire", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "Exposed high moorland, peat bogs, and steep descents.",
    history: "You pass the Nine Standards — a line of mysterious dry-stone cairns on the ridge. Their origin is unknown, but they have stood for centuries.",
    veganEats: [
      { label: "Lunch", name: "Packed lunch required — crossing Nine Standards Rigg" },
      { label: "Dinner", name: "Keld Lodge — vegan accommodated with advance notice", mapsQuery: "Keld Lodge Keld Yorkshire" }
    ]
  },
  {
    day: 8, date: "15 Jun", label: "Day 7", from: "Keld", to: "Reeth", miles: 11.0,
    hotel: { name: "The Burgoyne Hotel", address: "The Green, Reeth, DL11 6SN", phone: "01748 884292", mapsQuery: "The Burgoyne Hotel Reeth", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "Valley floor walking, old lead mine ruins, and grassy meadows.",
    history: "'Capital of Swaledale.' Reeth was a booming 18th-century lead mining town. The vast village green was designed for markets and fairs.",
    veganEats: [
      { label: "Lunch", name: "Muker Village Tea Shop (slight detour)", mapsQuery: "Muker Village Tea Shop Swaledale" },
      { label: "Dinner", name: "Copper Kettle, Reeth", mapsQuery: "Copper Kettle Reeth" }
    ]
  },
  {
    day: 9, date: "16 Jun", label: "Day 8", from: "Reeth", to: "Richmond", miles: 11.0,
    hotel: { name: "66 Frenchgate", address: "Frenchgate, Richmond, DL10 7AG", phone: "01748 823421", mapsQuery: "66 Frenchgate Richmond Yorkshire", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "Wooded valleys, riverside paths along the River Swale.",
    history: "Richmond is dominated by Richmond Castle, a massive Norman fortress built in 1071 to subdue rebellions in the North.",
    veganEats: [
      { label: "Lunch", name: "Packed lunch — largely rural, riverside stretch" },
      { label: "Dinner", name: "Wilfred Deli, Richmond", mapsQuery: "Wilfred Deli Richmond North Yorkshire" }
    ]
  },
  {
    day: 10, date: "17 Jun", label: "Rest Day", from: "Richmond", to: "Richmond", miles: 0,
    hotel: { name: "66 Frenchgate", address: "Frenchgate, Richmond, DL10 7AG", phone: "01748 823421", mapsQuery: "66 Frenchgate Richmond Yorkshire", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "Cobblestone streets and town exploration.",
    history: "Visit the Georgian Theatre Royal, built in 1788 — Britain's most complete surviving Georgian playhouse.",
    veganEats: [{ label: "All Day", name: "The Station Cafe, Richmond (in the old railway station)", mapsQuery: "The Station Cafe Richmond North Yorkshire" }]
  },
  {
    day: 11, date: "18 Jun", label: "Day 9", from: "Richmond", to: "Ingleby Cross", miles: 23.0,
    hotel: { name: "Park House Country Guesthouse", address: "Ingleby Cross, DL6 3PE", phone: "01609 882899", mapsQuery: "Park House Country Guesthouse Ingleby Cross", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "Very flat farmland, quiet country lanes, and field boundaries.",
    history: "This flat stretch connects the Dales to the Moors. Near the end you pass close to Mount Grace Priory, a 14th-century Carthusian monastery.",
    veganEats: [
      { label: "Lunch", name: "The White Swan, Danby Wiske — classic on-trail stop", mapsQuery: "White Swan Danby Wiske" },
      { label: "Dinner", name: "The Blue Bell Inn, near Ingleby Cross", mapsQuery: "Blue Bell Inn Ingleby Cross" }
    ]
  },
  {
    day: 12, date: "19 Jun", label: "Day 10", from: "Ingleby Cross", to: "Blakey", miles: 21.0,
    hotel: { name: "Fox and Hounds Inn", address: "45 Brook Lane, Ainthorpe, YO21 2LD", phone: "01287 660218", mapsQuery: "Fox and Hounds Inn Ainthorpe", rooms: "1x Twin, 2x Dbl/Single, 1x Pod" },
    terrain: "Steep wooded escarpments, expansive open heather moorland.",
    history: "High on the moors, the Lion Inn (Blakey Ridge) is a 16th-century freehouse — the 4th highest pub in England.",
    veganEats: [
      { label: "Lunch", name: "Lord Stones Cafe, Carlton Bank", mapsQuery: "Lord Stones Cafe Carlton Bank" },
      { label: "Dinner", name: "The Lion Inn, Blakey Ridge — hearty vegan pub grub", mapsQuery: "Lion Inn Blakey Ridge North York Moors" }
    ],
    notes: "Passenger Transfer (~5:00 PM). Taxi off-trail from The Lion Inn — call Luci Wilson 07956647559."
  },
  {
    day: 13, date: "20 Jun", label: "Day 11", from: "Blakey", to: "Grosmont", miles: 13.75,
    hotel: { name: "The Station Tavern", address: "Front Street, Grosmont, YO22 5PA", phone: "01947 501629", mapsQuery: "Station Tavern Grosmont", rooms: "2x Twin (John sharing to avoid transfer), 1x Dbl/Single" },
    terrain: "Flat old railway tracks, heather moorland, and descending into valleys.",
    history: "Grosmont is famous for the North Yorkshire Moors Railway, a heritage steam railway on tracks dating back to the 1830s.",
    veganEats: [
      { label: "Lunch", name: "Arncliffe Arms, Glaisdale", mapsQuery: "Arncliffe Arms Glaisdale" },
      { label: "Dinner", name: "Geall Gallery & Cafe, Grosmont", mapsQuery: "Geall Gallery Cafe Grosmont" }
    ],
    notes: "Morning taxi return to Blakey trail (~9:15 AM). No evening transfer needed."
  },
  {
    day: 14, date: "21 Jun", label: "Day 12", from: "Grosmont", to: "Robin Hood's Bay", miles: 15.5,
    hotel: { name: "Victoria Hotel", address: "Station Road, Robin Hood's Bay, YO22 4RL", phone: "01947 880205", mapsQuery: "Victoria Hotel Robin Hoods Bay", rooms: "1x Twin, 3x Dbl/Single" },
    terrain: "Riverside paths, undulating coastal cliffs leading down to the North Sea.",
    history: "Robin Hood's Bay was a notorious 18th-century smuggling hub with hidden tunnels connecting houses. Finish by dropping your pebble in the North Sea.",
    veganEats: [
      { label: "Lunch", name: "Falling Foss Tea Garden — magical woodland cafe on the trail", mapsQuery: "Falling Foss Tea Garden North Yorkshire" },
      { label: "Dinner", name: "Brambles Bistro or Smugglers Bistro, Robin Hood's Bay", mapsQuery: "Brambles Bistro Robin Hoods Bay" }
    ]
  },
  {
    day: 15, date: "22 Jun", label: "Departure", from: "Robin Hood's Bay", to: "Manchester / York", miles: null,
    hotel: null, terrain: "", history: "",
    veganEats: [],
    notes: "~9:00 AM departure. John & Glen: transfer to York Station. Others: independently to Manchester Airport (MAN) or York Station for London. Esk Taxi: 01947 605705 · rogertreed@gmail.com"
  },
];

const mileageData = days
  .filter(d => d.miles !== null && d.miles > 0)
  .map(d => ({ name: d.to.split(" ")[0], miles: d.miles as number, date: d.date }));

function gmaps(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export default function CoastToCoast() {
  const [activeDay, setActiveDay] = useState(1);
  const active = days[activeDay - 1];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 antialiased">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-700 to-blue-800 text-white py-16 px-6 text-center shadow-xl relative">
        <Link href="/infographics" className="absolute top-6 left-6 text-[11px] font-black uppercase tracking-widest text-emerald-200 hover:text-white transition-colors print:hidden">← Back</Link>
        <a href="/coast-to-coast.pdf" download className="absolute top-6 right-6 print:hidden p-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition" title="Download PDF"><Printer size={18} className="text-white"/></a>
        <div className="text-5xl mb-4">🥾 🎒 🌊</div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-3 tracking-tight">Coast to Coast Adventure</h1>
        <p className="text-xl font-light text-emerald-100">St. Bees to Robin Hood's Bay · June 8–22, 2026</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 print:hidden">
          <a
            href="https://www.google.com/maps/d/edit?mid=1EVNrO4953exogoNFGkIAvNJ4B_XiI4c&usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-emerald-800 font-black text-sm uppercase tracking-widest px-6 py-3 rounded-2xl shadow-lg hover:bg-emerald-50 transition-colors"
          >
            <Navigation size={18} /> View Full Route on Google Maps
          </a>
          <a
            href="/coast-to-coast.pdf"
            download="Coast-to-Coast-Adventure.pdf"
            className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-black text-sm uppercase tracking-widest px-6 py-3 rounded-2xl shadow-lg hover:bg-white/20 transition-colors"
          >
            <Printer size={18} /> Download PDF
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Summary Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[["🗺️","190.7","Total Miles","emerald"],["🏔️","12","Walking Days","blue"],["☕","1","Rest Day (Richmond)","amber"],["🚐","20kg","Luggage Limit","red"]].map(([emoji,val,label,color]) => (
            <div key={label} className={`bg-white rounded-2xl shadow-md p-6 border-t-4 border-${color}-500`}>
              <div className="text-4xl mb-2">{emoji}</div>
              <div className="text-3xl font-black text-stone-800 mb-1">{val}</div>
              <div className={`text-xs font-bold text-${color}-600 uppercase tracking-wider`}>{label}</div>
            </div>
          ))}
        </section>

        {/* Mileage Chart */}
        <section className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-1">Daily Mileage Profile</h2>
          <p className="text-stone-500 text-sm mb-6">Peak endurance days around Shap, Kirkby Stephen, and Ingleby Cross.</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mileageData} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
              <XAxis dataKey="name" angle={-40} textAnchor="end" tick={{ fontSize: 11 }} interval={0} />
              <YAxis tick={{ fontSize: 11 }} unit=" mi" />
              <Tooltip formatter={(v) => [`${v} miles`]} labelFormatter={(_, payload) => payload?.[0]?.payload?.date ?? ""} />
              <Bar dataKey="miles" radius={[4,4,0,0]}>
                {mileageData.map((entry, i) => (
                  <Cell key={i} fill={entry.miles >= 20 ? "#ef4444" : entry.miles >= 16 ? "#f97316" : "#10b981"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-green-500 inline-block"></span>Easy (&lt;16 mi)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-orange-500 inline-block"></span>Moderate (16–19 mi)</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-red-500 inline-block"></span>Hard (20+ mi)</span>
          </div>
        </section>

        {/* Accommodation Breakdown */}
        <section className="bg-white rounded-3xl shadow-xl p-6 lg:p-10 border border-stone-100">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Accommodation &amp; Logistics</h2>
          <p className="text-stone-500 text-sm mb-8">Your evenings are spent in a carefully curated selection of traditional English establishments. The daily <a href="https://www.sherpavan.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-700">Sherpa Van</a> service collects your 20kg bags by <strong>8:30 AM</strong> and delivers them to your next destination by <strong>4:30 PM</strong>, so you hike with only a light daypack.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { pct: "50%", emoji: "🏨", label: "Historic Hotels & Inns", desc: "Classic pubs and inns like The Manor and Fox & Hounds — hearty meals and local ales." },
              { pct: "36%", emoji: "🏡", label: "Guest Houses", desc: "Cozy, family-run B&Bs like Stonehouse Farm and 66 Frenchgate with home-cooked breakfasts." },
              { pct: "14%", emoji: "🌿", label: "Lodges", desc: "Moorland lodges like Keld Lodge situated right on the trails." },
            ].map(({ pct, emoji, label, desc }) => (
              <div key={label} className="flex flex-col gap-2 bg-stone-50 rounded-2xl p-5 border border-stone-100">
                <div className="text-3xl">{emoji}</div>
                <div className="text-2xl font-black text-emerald-700">{pct}</div>
                <div className="font-bold text-stone-800 text-sm">{label}</div>
                <div className="text-xs text-stone-500 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Itinerary */}
        <section>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 flex items-center gap-2"><Navigation size={22} className="text-emerald-600"/> Complete Itinerary</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Day selector */}
            <div className="lg:col-span-4 space-y-1.5">
              {days.map((d) => (
                <button key={d.day} onClick={() => setActiveDay(d.day)} className={`w-full text-left p-3 rounded-xl transition-all border-2 ${activeDay === d.day ? "bg-emerald-800 text-white border-emerald-800 shadow-lg translate-x-1" : "bg-white hover:bg-emerald-50 border-white hover:border-emerald-100 text-stone-600"}`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeDay === d.day ? "bg-emerald-600 text-emerald-100" : "bg-stone-100 text-stone-500"}`}>{d.date}</span>
                    <span className="text-[11px] font-mono opacity-60">{d.miles != null && d.miles > 0 ? `${d.miles} mi` : d.miles === 0 ? "Rest" : ""}</span>
                  </div>
                  <p className="font-bold text-sm mt-1 leading-tight">
                    {d.label === "Rest Day" ? `Rest — ${d.to}`
                      : d.label === "Arrival" ? `🚐 Arrival: ${d.from} → ${d.to}`
                      : d.label === "Departure" ? `🚐 Departure: ${d.from} → ${d.to}`
                      : `${d.from} → ${d.to}`}
                  </p>
                </button>
              ))}
            </div>

            {/* Detail card */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
                {/* Card header */}
                <div className="bg-gradient-to-r from-emerald-700 to-blue-800 text-white p-6">
                  <p className="text-emerald-200 text-xs font-black uppercase tracking-widest mb-1">{active.date} · {active.label}</p>
                  <h3 className="text-2xl md:text-3xl font-extrabold">
                    {active.label === "Arrival" ? `🚐 ${active.from} → ${active.to}`
                      : active.label === "Departure" ? `🚐 ${active.from} → ${active.to}`
                      : active.label === "Rest Day" ? `Rest Day — Richmond`
                      : `${active.from} → ${active.to}`}
                  </h3>
                  {active.miles != null && active.miles > 0 && (
                    <div className="mt-2 inline-flex items-center gap-2 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-black">
                      <Mountain size={13}/> {active.miles} miles
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-5">
                  {/* Notes */}
                  {active.notes && (
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                      <div className="flex items-center gap-2 text-blue-700 font-black uppercase text-xs tracking-widest mb-1.5"><Info size={14}/> Logistics</div>
                      <p className="text-stone-700 text-sm leading-relaxed">{active.notes}</p>
                    </div>
                  )}

                  {/* Terrain */}
                  {active.terrain && (
                    <div className="p-4 bg-stone-50 border border-stone-100 rounded-2xl">
                      <div className="flex items-center gap-2 text-stone-500 font-black uppercase text-xs tracking-widest mb-1.5"><Navigation size={14}/> Terrain</div>
                      <p className="text-stone-700 text-sm leading-relaxed">{active.terrain}</p>
                    </div>
                  )}

                  {/* History */}
                  {active.history && (
                    <div>
                      <p className="text-stone-600 font-serif text-base italic border-l-4 border-emerald-300 pl-4 py-1 leading-relaxed">{active.history}</p>
                    </div>
                  )}

                  {/* Hotel(s) */}
                  {(active.hotel || (active.hotels && active.hotels.length > 0)) && (
                    <div className="border-t border-stone-100 pt-5">
                      <div className="flex items-center gap-2 text-stone-500 font-black uppercase text-xs tracking-widest mb-3"><BedDouble size={14}/> Tonight's Stay</div>
                      <div className="space-y-3">
                        {(active.hotels ?? (active.hotel ? [active.hotel] : [])).map((h, i, arr) => (
                          <div key={i} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
                            {arr.length > 1 && (
                              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">Option {i + 1}</p>
                            )}
                            <p className="font-black text-indigo-900 text-lg">{h.name}</p>
                            <p className="text-xs text-stone-500 mt-0.5">{h.address}</p>
                            {h.rooms && (
                              <p className="text-xs font-semibold text-indigo-600 mt-1 mb-3">🛏 {h.rooms}</p>
                            )}
                            {!h.rooms && <div className="mb-3" />}
                            <div className="flex flex-wrap gap-3">
                              <a href={`tel:${h.phone.replace(/[^0-9]/g, "")}`} className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
                                <Phone size={13}/> {h.phone}
                              </a>
                              <a href={gmaps(h.mapsQuery)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
                                <MapPin size={13}/> View on Google Maps <ExternalLink size={10}/>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vegan Eats */}
                  {active.veganEats.length > 0 && (
                    <div className="border-t border-stone-100 pt-5">
                      <div className="flex items-center gap-2 text-stone-500 font-black uppercase text-xs tracking-widest mb-3"><Leaf size={14}/> Vegan Eats</div>
                      <div className="space-y-2">
                        {active.veganEats.map((spot, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                            <Utensils size={13} className="text-green-600 mt-0.5 shrink-0"/>
                            <div className="flex-1">
                              <span className="text-[10px] font-black text-green-700 uppercase tracking-wider">{spot.label}: </span>
                              {spot.mapsQuery ? (
                                <a href={gmaps(spot.mapsQuery)} target="_blank" rel="noopener noreferrer" className="text-sm text-green-900 font-semibold hover:underline inline-flex items-center gap-1">
                                  {spot.name} <ExternalLink size={10} className="text-green-500"/>
                                </a>
                              ) : (
                                <span className="text-sm text-stone-700">{spot.name}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto border-t border-stone-200 mt-8 px-4 py-10 print:hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-400 font-serif italic">Infographic designed by <span className="font-black text-stone-600">Kathy Dragon</span>, Whole Journeys</p>
          <div className="flex items-center gap-5">
            <a href="mailto:kathy.dragon@wholejourneys.com" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-700 hover:text-emerald-900 transition-colors"><Mail size={13}/> kathy.dragon@wholejourneys.com</a>
            <a href="https://www.wholejourneys.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-700 hover:text-emerald-900 transition-colors"><Globe size={13}/> wholejourneys.com</a>
          </div>
        </div>
        <p className="text-center text-[11px] text-stone-400 mt-3">Luggage transfers by <a href="https://www.sherpavan.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-600">Sherpa Van</a></p>
      </footer>
    </div>
  );
}
