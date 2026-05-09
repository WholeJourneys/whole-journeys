import { useState } from "react";
import { Link } from "wouter";
import { MapPin, BedDouble, Utensils, Printer, Mountain, Calendar, Navigation, Info, Star, ExternalLink, Mail, Globe, Leaf } from "lucide-react";

interface DayData {
  day: number; date: string; label: string; from: string; to: string;
  miles: number | null; hotel: string; hotelAddress: string; terrain: string;
  history: string; veganLunch: string; veganDinner: string; notes?: string;
}

const days: DayData[] = [
  { day: 1, date: "08 Jun", label: "Arrival", from: "Manchester Airport", to: "St. Bees", miles: null, hotel: "The Manor (CRAIG) / Stonehouse Farm (Others)", hotelAddress: "Main St, St Bees, CA27 0DE · 01946 820587 / 01946 822224", terrain: "Coastal village setting.", history: "The hike begins at St Bees Priory (founded 1120). Tradition dictates dipping your boots in the Irish Sea and picking up a pebble to carry to the opposite coast.", veganLunch: "", veganDinner: "The Manor (your accommodation) offers dedicated vegan options.", notes: "10:30 AM scheduled transfer from Manchester Airport (MAN) to St. Bees." },
  { day: 2, date: "09 Jun", label: "Day 1", from: "St. Bees", to: "Ennerdale", miles: 14.0, hotel: "Ennerdale Country Hotel", hotelAddress: "Main St, Cleator Moor, CA23 3DT · 01946 813907", terrain: "High red coastal cliffs, farmland, and forestry tracks.", history: "You cross into the Lake District National Park. Ennerdale Water is the most remote of the lakes, serving as a peaceful reservoir.", veganLunch: "The Gather Cafe (Ennerdale Bridge) is a superb on-trail stop.", veganDinner: "Check your hotel restaurant for evening meals.", notes: "Passenger Transfer (~5:00 PM). Call Ennerdale Taxi (01946 810024) upon arrival for off-trail transfer." },
  { day: 3, date: "10 Jun", label: "Day 2", from: "Ennerdale", to: "Rosthwaite", miles: 14.5, hotel: "Glaramara Hotel", hotelAddress: "Seatoller, Borrowdale, Nr Keswick, CA12 · 01768 777222", terrain: "Rugged mountains, steep passes (Black Sail / Loft Beck), and rocky trails.", history: "Borrowdale is famed for its green slate and historic graphite mining, which started the pencil industry in nearby Keswick in the 1500s.", veganLunch: "Packed lunch required — this is a highly remote stretch over the fells.", veganDinner: "Flock-in Tearoom (Rosthwaite) for early bites before your hotel dinner.", notes: "Passenger Transfer (~9:15 AM) back to the trail." },
  { day: 4, date: "11 Jun", label: "Day 3", from: "Rosthwaite", to: "Glenridding", miles: 18.0, hotel: "Ullswater Inn", hotelAddress: "A592, Penrith, CA11 0PB, Glenridding · 01915 803610", terrain: "High mountain passes (Grisedale Tarn), steep ascents and descents.", history: "You will hike in the shadow of Helvellyn, England's 3rd highest peak. This area is steeped in 19th-century lead mining history.", veganLunch: "Packed lunch required — high mountain passes offer no facilities.", veganDinner: "Helvellyn Country Kitchen or your hotel in Glenridding." },
  { day: 5, date: "12 Jun", label: "Day 4", from: "Glenridding", to: "Shap", miles: 16.0, hotel: "Kings Arms Hotel", hotelAddress: "Main Street, Shap, CA10 3NU · 01931 716277", terrain: "High ridges (Kidsty Pike — highest point), boggy moorland, and Haweswater lakeshore.", history: "Shap marks the geological transition from volcanic Lake District rocks to the limestone of the Pennines. Look for the ruins of Shap Abbey, founded in 1199.", veganLunch: "Packed lunch required for the climb over Kidsty Pike and along Haweswater.", veganDinner: "The Abbey Kitchen in Shap has vegan cakes and hearty options." },
  { day: 6, date: "13 Jun", label: "Day 5", from: "Shap", to: "Kirkby Stephen", miles: 21.0, hotel: "Jolly Farmers Guest House", hotelAddress: "High Street, Kirkby Stephen, CA17 4SH · 01768 371063", terrain: "Rolling grassy moors, limestone pavements, and farmland paths.", history: "Kirkby Stephen is a historic market town granted a charter in 1353. It was a vital stop for drovers moving cattle from Scotland.", veganLunch: "Orton Scar Cafe in the village of Orton makes for a perfect midway stop.", veganDinner: "Mango Tree (Indian) in Kirkby Stephen." },
  { day: 7, date: "14 Jun", label: "Day 6", from: "Kirkby Stephen", to: "Keld", miles: 12.0, hotel: "Keld Lodge", hotelAddress: "Keld, DL11 6LL · 01748 886259", terrain: "Exposed high moorland, peat bogs, and steep descents.", history: "You pass the Nine Standards — a line of mysterious dry-stone cairns on the ridge. Their origin is unknown, but they have stood for centuries.", veganLunch: "Packed lunch required for the crossing over Nine Standards Rigg.", veganDinner: "Keld Lodge (your accommodation) is accommodating for vegans with advance notice." },
  { day: 8, date: "15 Jun", label: "Day 7", from: "Keld", to: "Reeth", miles: 11.0, hotel: "The Burgoyne Hotel", hotelAddress: "The Green, Reeth, DL11 6SN · 01748 884292", terrain: "Valley floor walking, old lead mine ruins, and grassy meadows.", history: "Known as the 'Capital of Swaledale,' Reeth was a booming 18th-century lead mining town. The vast village green was designed for markets and fairs.", veganLunch: "Muker Village Tea Shop (slight detour) or grab snacks in Gunnerside.", veganDinner: "Copper Kettle in Reeth offers solid vegan-friendly choices." },
  { day: 9, date: "16 Jun", label: "Day 8", from: "Reeth", to: "Richmond", miles: 11.0, hotel: "66 Frenchgate", hotelAddress: "Frenchgate, Richmond, DL10 7AG · 01748 823421", terrain: "Wooded valleys, riverside paths along the River Swale.", history: "Richmond is dominated by Richmond Castle, a massive Norman fortress built in 1071 to subdue rebellions in the North.", veganLunch: "Packed lunch recommended for this largely rural, riverside stretch.", veganDinner: "Wilfred Deli in Richmond has excellent vegan sandwiches and salads." },
  { day: 10, date: "17 Jun", label: "Rest Day", from: "Richmond", to: "Richmond", miles: 0, hotel: "66 Frenchgate", hotelAddress: "Frenchgate, Richmond, DL10 7AG · 01748 823421", terrain: "Cobblestone streets and town exploration.", history: "Take time to visit the Georgian Theatre Royal, built in 1788 — Britain's most complete surviving Georgian playhouse.", veganLunch: "", veganDinner: "", notes: "All Day: The Station Cafe (housed in the old railway station) has great menus." },
  { day: 11, date: "18 Jun", label: "Day 9", from: "Richmond", to: "Ingleby Cross", miles: 23.0, hotel: "Park House Country Guesthouse", hotelAddress: "Ingleby Cross, DL6 3PE · 01609 882899", terrain: "Very flat farmland, quiet country lanes, and field boundaries.", history: "This flat stretch connects the Dales to the Moors. Near the end of the day you pass close to Mount Grace Priory, a 14th-century Carthusian monastery.", veganLunch: "The White Swan in Danby Wiske is a classic on-trail pint and lunch stop.", veganDinner: "The Blue Bell Inn near Ingleby Cross." },
  { day: 12, date: "19 Jun", label: "Day 10", from: "Ingleby Cross", to: "Blakey", miles: 21.0, hotel: "Fox and Hounds Inn", hotelAddress: "45 Brook Lane, Ainthorpe, YO21 2LD · 01287 660218", terrain: "Steep wooded escarpments, expansive open heather moorland.", history: "High on the moors, the Lion Inn (near Blakey Ridge) is a 16th-century freehouse and is famously the 4th highest pub in England.", veganLunch: "Lord Stones Cafe (Carlton Bank) is perfectly situated for midway lunch.", veganDinner: "The Lion Inn at Blakey Ridge offers hearty vegan pub grub.", notes: "Passenger Transfer (~5:00 PM). Taxi off-trail from The Lion Inn — call Luci Wilson 07956647559." },
  { day: 13, date: "20 Jun", label: "Day 11", from: "Blakey", to: "Grosmont", miles: 13.75, hotel: "The Station Tavern", hotelAddress: "Front Street, Grosmont, YO22 5PA · 01947 501629", terrain: "Flat old railway tracks, heather moorland, and descending into valleys.", history: "Grosmont is famous for the North Yorkshire Moors Railway, a heritage steam railway operating on tracks dating back to the 1830s.", veganLunch: "Arncliffe Arms in Glaisdale.", veganDinner: "Geall Gallery & Cafe in Grosmont offers lovely treats.", notes: "Morning taxi return to Blakey trail (~9:15 AM). No evening transfer needed." },
  { day: 14, date: "21 Jun", label: "Day 12", from: "Grosmont", to: "Robin Hood's Bay", miles: 15.5, hotel: "Victoria Hotel", hotelAddress: "Station Road, Robin Hood's Bay, YO22 4RL · 01947 880205", terrain: "Riverside paths, undulating coastal cliffs leading down to the sea.", history: "Robin Hood's Bay was a notorious 18th-century smuggling hub with hidden tunnels connecting houses. Finish the trip by dropping your pebble in the North Sea.", veganLunch: "Falling Foss Tea Garden — a magical woodland cafe right on the trail.", veganDinner: "Brambles Bistro or Smugglers Bistro in Robin Hood's Bay to celebrate." },
  { day: 15, date: "22 Jun", label: "Departure", from: "Robin Hood's Bay", to: "Manchester / York", miles: null, hotel: "", hotelAddress: "", terrain: "", history: "", veganLunch: "", veganDinner: "", notes: "~9:00 AM departure. John and Glen transfer to York Station. Others transfer independently to Manchester Airport (MAN) or York Station for London. Esk Taxi: 01947 605705 · rogertreed@gmail.com" },
];

export default function CoastToCoast() {
  const [activeDay, setActiveDay] = useState(1);
  const active = days[activeDay - 1];

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans text-slate-900 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 text-center relative">
        <div className="flex justify-between items-start mb-4">
          <Link href="/infographics" className="text-[11px] font-black uppercase tracking-widest text-sky-500 hover:text-sky-700 transition-colors pt-4">← Back</Link>
          <div className="flex flex-col items-center">
            <span className="text-sky-600 font-bold tracking-[0.2em] text-xs uppercase mb-2">Northern England · 2026</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-sky-950 tracking-tight">Coast to Coast</h1>
          </div>
          <button onClick={() => window.print()} className="print:hidden p-3 bg-white border border-sky-100 rounded-full shadow-sm hover:shadow-md transition-shadow text-sky-700"><Printer size={20}/></button>
        </div>
        <p className="text-xl text-sky-800/70 font-serif italic mb-8">St. Bees to Robin Hood's Bay · June 8–22, 2026</p>
        <div className="flex flex-wrap justify-center gap-4">
          {([["Duration", "15 Days", Calendar], ["Walking Days", "12 Days + Rest", Navigation], ["Total Miles", "190.7 mi", Mountain], ["Luggage Limit", "20 kg (Sherpa Van)", Info]] as const).map(([label, val, Icon]) => (
            <div key={label} className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-sky-100 flex items-center gap-3">
              <Icon className="text-sky-600" size={20}/>
              <div className="text-left"><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">{label}</p><p className="font-bold text-slate-700">{val}</p></div>
            </div>
          ))}
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Day list */}
        <div className="lg:col-span-4 space-y-2">
          <h2 className="text-lg font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 px-2"><MapPin size={18} className="text-sky-600"/> Days</h2>
          {days.map((d) => (
            <button key={d.day} onClick={() => setActiveDay(d.day)} className={`w-full text-left p-3 rounded-2xl transition-all duration-300 border-2 ${activeDay === d.day ? "bg-sky-900 text-white shadow-xl border-sky-900 translate-x-2" : "bg-white hover:bg-sky-50 border-white hover:border-sky-100 text-slate-600"}`}>
              <div className="flex justify-between items-center mb-0.5">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeDay === d.day ? "bg-sky-700 text-sky-100" : "bg-slate-100 text-slate-500"}`}>{d.date}</span>
                <span className="text-[11px] font-mono opacity-60">{d.miles != null && d.miles > 0 ? `${d.miles} mi` : d.miles === 0 ? "Rest" : ""}</span>
              </div>
              <p className="font-bold leading-tight text-sm">{d.label !== "Arrival" && d.label !== "Departure" && d.label !== "Rest Day" ? `${d.from} → ${d.to}` : d.label}</p>
            </button>
          ))}
        </div>

        {/* Detail card */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-sky-900/5 border border-sky-100 min-h-[400px]">
            <div className="mb-6">
              <span className="text-sky-600 font-black text-xs uppercase tracking-[0.2em]">{active.date} · {active.label}</span>
              <h3 className="text-3xl md:text-4xl font-serif font-black text-sky-950 mt-1">
                {active.label === "Arrival" || active.label === "Departure" || active.label === "Rest Day" ? active.label === "Rest Day" ? `Rest Day — ${active.to}` : active.label : `${active.from} → ${active.to}`}
              </h3>
              {active.miles != null && active.miles > 0 && (
                <div className="mt-3 inline-flex items-center gap-2 bg-sky-50 text-sky-900 px-4 py-1.5 rounded-full text-xs font-black border border-sky-100">
                  <Mountain size={14} className="text-sky-600"/> {active.miles} miles
                </div>
              )}
            </div>

            {active.notes && (
              <div className="mb-6 p-4 bg-sky-50 border border-sky-100 rounded-2xl">
                <div className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest mb-2"><Info size={14}/> Notes</div>
                <p className="text-slate-700 text-sm leading-relaxed">{active.notes}</p>
              </div>
            )}

            {active.terrain && (
              <div className="mb-6 p-4 bg-[#f0f7ff] border border-sky-100 rounded-2xl">
                <div className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest mb-2"><Navigation size={14}/> Terrain</div>
                <p className="text-slate-700 text-sm leading-relaxed">{active.terrain}</p>
              </div>
            )}

            {active.history && (
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest mb-3"><Star size={14}/> Historical Significance</div>
                <p className="text-slate-600 leading-relaxed font-serif text-lg italic border-l-4 border-sky-200 pl-6 py-2">{active.history}</p>
              </div>
            )}

            {active.hotel && (
              <div className="mb-6 p-5 bg-sky-50 border-l-4 border-sky-400 rounded-2xl">
                <div className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest mb-2"><BedDouble size={14}/> Tonight's Stay</div>
                <p className="font-black text-sky-900 text-base">{active.hotel}</p>
                <p className="text-xs text-slate-500 mt-1">{active.hotelAddress}</p>
              </div>
            )}

            {(active.veganLunch || active.veganDinner) && (
              <div className="border-t border-sky-100 pt-5">
                <div className="flex items-center gap-2 text-sky-700 font-black uppercase text-xs tracking-widest mb-3"><Leaf size={14}/> Vegan Eats</div>
                <div className="grid md:grid-cols-2 gap-3">
                  {active.veganLunch && (
                    <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                      <div className="flex items-center gap-1.5 text-green-700 font-black text-xs uppercase tracking-wider mb-1"><Utensils size={12}/> Lunch</div>
                      <p className="text-sm text-slate-600 leading-relaxed">{active.veganLunch}</p>
                    </div>
                  )}
                  {active.veganDinner && (
                    <div className="p-4 bg-green-50 border border-green-100 rounded-2xl">
                      <div className="flex items-center gap-1.5 text-green-700 font-black text-xs uppercase tracking-wider mb-1"><Utensils size={12}/> Dinner</div>
                      <p className="text-sm text-slate-600 leading-relaxed">{active.veganDinner}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto border-t border-sky-100 pt-10 pb-16 print:hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-serif italic">Infographic designed by <span className="font-black text-sky-700">Kathy Dragon</span>, Whole Journeys</p>
          <div className="flex items-center gap-5">
            <a href="mailto:kathy.dragon@wholejourneys.com" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition-colors"><Mail size={13}/> kathy.dragon@wholejourneys.com</a>
            <a href="https://www.wholejourneys.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-sky-600 hover:text-sky-800 transition-colors"><Globe size={13}/> wholejourneys.com</a>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <ExternalLink size={12} className="text-sky-300 mr-1.5 mt-0.5"/>
          <span className="text-[11px] font-black uppercase tracking-widest text-sky-400">Luggage transfers by Sherpa Van · sherpavan.com</span>
        </div>
      </footer>
    </div>
  );
}
