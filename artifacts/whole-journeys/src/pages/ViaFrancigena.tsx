import { useState } from "react";
import { Link } from "wouter";
import {
  Map as MapIcon, Mountain, History, Calendar, ChevronRight, Info, Compass,
  Wine, Castle, Church, ExternalLink, Printer, Navigation, Download,
  MapPin, Star, BedDouble, Utensils, Sparkles, Mail, Globe, HelpCircle
} from "lucide-react";
import type { ReactElement } from "react";
import React from "react";
import Navbar from "../components/Navbar";

const ROUTE_MAP = "https://www.google.com/maps/d/u/0/edit?mid=1m6MgV0QVg7yebyXiaJOplp3osHuKP0M&usp=sharing";

interface Hotel { name: string; address: string; link: string; description: string; }
interface Experience { title: string; description: string; }
interface Restaurant { name: string; description: string; link: string; }
interface Landmark { name: string; note: string; primary: boolean; link: string; }
interface Day {
  day: number; label: string; route: string; city: string; cityLink: string;
  cityDesc: string; dist: string; gain: string; loss: string; description: string;
  history: string; hotel: Hotel | null; experiences: Experience[];
  restaurants: Restaurant[]; icon: ReactElement; landmarks: Landmark[];
}

export default function ViaFrancigena() {
  const [activeDay, setActiveDay] = useState(1);

  const itinerary: Day[] = [
    {
      day: 1, label: "Arrival", route: "Arrival in San Miniato Alto", city: "San Miniato Alto",
      cityLink: "https://www.google.com/maps/search/?api=1&query=San+Miniato+Alto+Tuscany",
      cityDesc: "A spectacular hilltop town 50 km from Florence. Famous for its November white truffle fair, sweeping views over the Arno valley, and role as seat of the Holy Roman Emperor.",
      dist: "0 km", gain: "0m", loss: "0m",
      description: "Your travel will start from San Miniato, a jewel of Via Francigena. The Seminary, from which the main square takes its name, will surprise you with its particular façade: don't miss it illuminated, maybe after having enjoyed a risotto powdered with the typical white truffle, a local gastronomic pride.",
      history: "Known as the 'jewel' of the Via Francigena, this hilltop town is famous for its medieval Seminary and its prestigious white truffles.",
      hotel: { name: "Hotel San Miniato", address: "San Miniato, Tuscany", link: "https://www.google.com/maps/search/?api=1&query=Hotel+San+Miniato", description: "Your base for the first night in the hilltop jewel of the Via Francigena, within easy reach of the illuminated Seminary square and the town's famous truffle restaurants." },
      experiences: [
        { title: "White Truffle Evening", description: "See the Seminary square illuminated at dusk — if visiting in November, don't miss the International White Truffle Fair, one of Italy's most celebrated food events." },
        { title: "Rocca Tower Sunset", description: "Climb to the restored Rocca di Federico II for sweeping 360° views over the Arno valley and the Apennines — magical at golden hour." }
      ],
      restaurants: [{ name: "Pepenero", description: "Michelin-selected modern Tuscan cuisine by Chef Gilberto Rossi. The white truffle menu (Oct–Dec) is unmissable. Piazza Duomo 4 — reserve ahead.", link: "https://www.pepenerocucina.it" }],
      icon: <Church className="w-6 h-6" />,
      landmarks: [
        { name: "Piazza del Seminario", note: "Primary Sigeric stage · Key landmark", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Piazza+del+Seminario+San+Miniato" },
        { name: "Rocca di Federico II", note: "Tower rebuilt by Napoleon — panoramic views", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Rocca+Federico+II+San+Miniato" },
        { name: "Cattedrale di San Miniato", note: "Romanesque cathedral with stellar façade", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Cattedrale+San+Miniato+Tuscany" }
      ]
    },
    {
      day: 2, label: "Stage 1", route: "San Miniato to Gambassi Terme", city: "Gambassi Terme",
      cityLink: "https://www.google.com/maps/search/?api=1&query=Gambassi+Terme+Tuscany",
      cityDesc: "A spa town in the Val d'Elsa known for its therapeutic sulphurous waters. The public thermal baths are a perfect reward after 24 km of walking.",
      dist: "24 km", gain: "400m", loss: "220m",
      description: "From San Miniato, a paved road brings you to a spectacular route crossing the typical countryside of the Val d'Elsa. Following Sigeric's diary you meet two Submansiones: Pieve di Coiano and Pieve a Chianni, then you arrive at your accommodation.",
      history: "A significant trek through the Val d'Elsa. You'll pass Pieve di Coiano and Pieve a Chianni, both recorded by Sigeric in 990 AD.",
      hotel: { name: "Agriturismo Sant'Ilario — Superior Room", address: "Gambassi Terme, Tuscany", link: "https://www.google.com/maps/search/?api=1&query=Agriturismo+Sant'Ilario+Gambassi+Terme", description: "A rural farmhouse agriturismo in the Gambassi Terme countryside. Superior rooms offer comfort after a long day's walk, with locally produced food and a genuinely Tuscan atmosphere." },
      experiences: [{ title: "Thermal Baths at Terme di Gambassi", description: "After 24 km on your feet, a soak in the therapeutic sulphurous waters of the Gambassi Terme spa is the perfect recovery. Book ahead as access can be limited." }],
      restaurants: [],
      icon: <Wine className="w-6 h-6" />,
      landmarks: [
        { name: "Pieve di Coiano", note: "Sigeric stage XXXI · Recorded 990 AD", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Pieve+di+Coiano+Castelfiorentino" },
        { name: "Pieve a Chianni", note: "Sigeric stage XXXII · Ancient Lombard church", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Pieve+a+Chianni+Gambassi+Terme" },
        { name: "Terme di Gambassi", note: "Thermal spa — book ahead for tired legs", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Terme+Gambassi+Terme+Tuscany" }
      ]
    },
    {
      day: 3, label: "Stage 2", route: "Gambassi Terme to San Gimignano", city: "San Gimignano",
      cityLink: "https://www.google.com/maps/search/?api=1&query=San+Gimignano+Tuscany",
      cityDesc: "UNESCO World Heritage Site since 1990. Once had 72 towers — today 13 survive. Also celebrated for its Vernaccia di San Gimignano white wine, Italy's first DOC wine.",
      dist: "13.5 km", gain: "350m", loss: "350m",
      description: "Today you enjoy the wonderful surroundings of the Via Francigena. Before walking up to the peculiar villages of Collemuccioli and Pieve di Cellole, stop for a visit at the Sanctuary in Pancole. If you arrive early, take some time to visit the famous town of San Gimignano and enjoy its charming medieval atmosphere.",
      history: "Approaching the 'Manhattan of the Middle Ages'. This UNESCO site is world-renowned for its surviving 13 stone towers.",
      hotel: { name: "Hotel La Cisterna — Comfort Room", address: "Piazza della Cisterna 24, 53037 San Gimignano SI", link: "https://www.hotelcisterna.it", description: "A classic San Gimignano hotel right on the medieval Piazza della Cisterna, with stone-vaulted ceilings and views over the rooftops." },
      experiences: [
        { title: "Climb Torre Grossa", description: "The tallest surviving tower in San Gimignano (54 m) offers extraordinary views over the medieval rooftops and rolling Tuscan hills." },
        { title: "Vernaccia Wine Tasting", description: "San Gimignano's Vernaccia was Italy's first DOC wine (1966). Visit one of the local cantinas for a tasting of this crisp, golden white wine paired with local pecorino." }
      ],
      restaurants: [
        { name: "Gelateria Dondoli", description: "World Gelato Champion Sergio Dondoli's shop on Piazza della Cisterna. Try the signature Crema di Santa Fina or Vernaccia Risotto flavour.", link: "https://www.gelateriasangimignano.com" },
        { name: "Cum Quibus", description: "Refined modern Tuscan cuisine in a stone-vaulted dining room. Local seasonal produce, excellent wine list. Reservations essential.", link: "https://www.google.com/maps/search/?api=1&query=Cum+Quibus+San+Gimignano" }
      ],
      icon: <Castle className="w-6 h-6" />,
      landmarks: [
        { name: "Santuario della Madonna di Pancole", note: "Sigeric waypoint · Pilgrimage chapel en route", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Santuario+Madonna+Pancole+San+Gimignano" },
        { name: "Le 13 Torri di San Gimignano", note: "UNESCO icon — climb Torre Grossa for views", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Torre+Grossa+San+Gimignano" },
        { name: "Collegiata di Santa Maria Assunta", note: "Romanesque church with Ghirlandaio frescoes", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Collegiata+Santa+Maria+Assunta+San+Gimignano" }
      ]
    },
    {
      day: 4, label: "Stage 3", route: "San Gimignano to Colle Val d'Elsa", city: "Colle di Val d'Elsa",
      cityLink: "https://www.google.com/maps/search/?api=1&query=Colle+di+Val+d'Elsa+Siena",
      cityDesc: "A medieval upper town (Colle Alta) perched on a ridge, birthplace of Arnolfo di Cambio. The lower town is world-renowned for its crystal glasswork — over 15% of world crystal production.",
      dist: "12 km", gain: "270m", loss: "380m",
      description: "Today you walk a gorgeous path of the Via Francigena. Going up and down the Tuscan hills, crossing vineyards, olive groves, fields and woods, you finally reach your accommodation in Colle di Val d'Elsa. Along the way, make a detour to the Abbey of Santa Maria a Conero of the XI century.",
      history: "A stunning path through classic Tuscan landscapes: vineyards, olive groves, and the XI-century Abbey of Santa Maria a Conero.",
      hotel: { name: "Hotel Palazzo San Lorenzo", address: "Colle di Val d'Elsa, Tuscany", link: "https://www.google.com/maps/search/?api=1&query=Hotel+Palazzo+San+Lorenzo+Colle+Val+d'Elsa", description: "An elegant palazzo hotel in the historic centre of Colle di Val d'Elsa, close to the medieval upper town." },
      experiences: [
        { title: "Museo del Cristallo", description: "Colle Val d'Elsa produces over 15% of the world's crystal. This museum traces the history of crystal-making from ancient Venice to the present." },
        { title: "Walk Colle Alta", description: "The upper medieval town is linked to the lower town by a funicular. Stroll the Via del Castello — birthplace of Arnolfo di Cambio, who designed Florence Cathedral." }
      ],
      restaurants: [],
      icon: <Compass className="w-6 h-6" />,
      landmarks: [
        { name: "Abbazia di Santa Maria a Conero", note: "XI-century abbey · Key waypoint on the route", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Abbazia+Santa+Maria+Coneo+Colle+Val+Elsa" },
        { name: "Colle Alta — Medieval Upper Town", note: "Birthplace of Arnolfo di Cambio (designer of Florence Cathedral)", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Colle+Alta+Colle+di+Val+d'Elsa" },
        { name: "Museo del Cristallo", note: "Crystal glass museum in the lower town", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Museo+Cristallo+Colle+Val+Elsa" }
      ]
    },
    {
      day: 5, label: "Stage 4", route: "Colle Val d'Elsa to Monteriggioni", city: "Monteriggioni",
      cityLink: "https://www.google.com/maps/search/?api=1&query=Monteriggioni+Siena",
      cityDesc: "One of Tuscany's best-preserved medieval villages. Built by Siena in 1213, its perfectly circular walls with 14 towers inspired Dante's vision of Hell's giants in the Inferno.",
      dist: "11–15 km", gain: "175–250m", loss: "110–190m",
      description: "From Colle, cross Pieve a Elsa and meet the ancient Etruscan Thermae of Caldane. After reaching Strove and its beautiful Romanesque Church, continue along the complex of Abbadia a Isola till you reach the medieval town of Monteriggioni, surrounded by its peculiar crown of towers.",
      history: "The route leads to the iconic circular fortress of Monteriggioni, whose 'crown' of towers was mentioned in Dante's Inferno.",
      hotel: { name: "Hotel Monteriggioni", address: "Via 1 Maggio 4, 53035 Monteriggioni SI", link: "https://www.hotelmonteriggioni.net", description: "Peaceful 4-star hotel in a restored villa just outside the fortress walls, with gardens, pool, and easy walking distance into the medieval village." },
      experiences: [
        { title: "Walk the Fortress Walls at Sunset", description: "The 570-metre circuit of walls with 14 towers takes under an hour to walk. At dusk, the surrounding Tuscan countryside glows golden." },
        { title: "Abbadia a Isola", description: "An 11th-century Benedictine monastery en route, now partially inhabited. The Romanesque church retains original frescoes and a remarkable carved stone tabernacle." }
      ],
      restaurants: [],
      icon: <Castle className="w-6 h-6" />,
      landmarks: [
        { name: "Mura di Monteriggioni", note: "Dante's Inferno, Canto XXXI — 'Di torre fortissime cimata'", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Mura+Monteriggioni+fortress+walls" },
        { name: "Chiesa di Santa Maria Assunta", note: "Romanesque church inside the fortress walls", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Chiesa+Santa+Maria+Assunta+Monteriggioni" }
      ]
    },
    {
      day: 6, label: "Stage 5", route: "Monteriggioni to Siena", city: "Siena",
      cityLink: "https://www.google.com/maps/search/?api=1&query=Siena+city+centre+Italy",
      cityDesc: "A UNESCO World Heritage city. Home to the Palio horse race, an astounding Gothic Duomo, and the Monte dei Paschi — the world's oldest bank.",
      dist: "20 km", gain: "300m", loss: "250m",
      description: "Leaving Monteriggioni, walk on dirt roads along the Montagnola Senese. You pass the medieval suburb of Cerbaia, cross the Renai forest, and enter the beautiful town of Siena through the ancient pilgrim's gate of Porta Camollia.",
      history: "Entering Siena through the traditional Porta Camollia. The trek concludes in the magnificent Piazza del Campo.",
      hotel: { name: "Hotel Athena — Deluxe Room", address: "Via Paolo Mascagni 55, 53100 Siena SI", link: "https://www.hotelathena.com", description: "A refined Sienese hotel within walking distance of the Piazza del Campo, with views over the rooftops and the Duomo." },
      experiences: [
        { title: "Piazza del Campo", description: "One of Europe's greatest medieval squares. Arrive in the early evening when the terracotta brickwork glows amber — and sit where the Palio horse race has run since 1656." },
        { title: "Duomo di Siena", description: "An extraordinary Gothic cathedral with a Pisano pulpit, Duccio's Maestà, and a floor of 56 inlaid marble panels. Allow at least 2 hours." }
      ],
      restaurants: [
        { name: "Osteria Le Logge", description: "Siena's most beloved traditional osteria. Beautifully preserved Art Nouveau interior, exceptional local wine list, and classic Sienese dishes.", link: "https://www.google.com/maps/search/?api=1&query=Osteria+Le+Logge+Siena" }
      ],
      icon: <MapIcon className="w-6 h-6" />,
      landmarks: [
        { name: "Porta Camollia", note: "Traditional pilgrim entrance to Siena", primary: true, link: "https://www.google.com/maps/search/?api=1&query=Porta+Camollia+Siena" },
        { name: "Duomo di Siena", note: "Extraordinary Gothic cathedral with Pisano pulpit", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Duomo+Siena+Cathedral" },
        { name: "Palazzo Pubblico & Torre del Mangia", note: "Gothic civic palace — climb the tower for panoramic views", primary: false, link: "https://www.google.com/maps/search/?api=1&query=Palazzo+Pubblico+Torre+Mangia+Siena" }
      ]
    }
  ];

  const handleKmlDownload = async () => {
    const response = await fetch("/via-francigena-route.kml");
    const text = await response.text();
    const blob = new Blob([text], { type: "application/vnd.google-earth.kml+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "via-francigena-route.kml";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const active = itinerary[activeDay - 1];

  return (
    <div className="min-h-screen bg-[#fcfaf7] font-sans text-slate-900">
      <Navbar />
      <nav className="print:hidden bg-white border-b border-amber-100 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs font-semibold text-stone-400">
          <Link href="/" className="hover:text-amber-700 transition-colors">Whole Journeys</Link>
          <span>/</span>
          <Link href="/infographics" className="hover:text-amber-700 transition-colors">Infographics</Link>
          <span>/</span>
          <span className="text-amber-700">Via Francigena</span>
        </div>
      </nav>
      <div className="p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-10 text-center relative">
        <div className="flex justify-between items-start mb-4">
          <div className="pt-4 w-8" />
          <div className="flex flex-col items-center">
            <span className="text-amber-600 font-bold tracking-[0.2em] text-xs uppercase mb-2">Tuscany 2026</span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-amber-950 tracking-tight">Via Francigena</h1>
          </div>
          <button onClick={() => window.print()} className="print:hidden p-3 bg-white border border-amber-100 rounded-full shadow-sm hover:shadow-md transition-shadow text-amber-700" title="Save as PDF">
            <Printer size={20} />
          </button>
        </div>
        <p className="text-xl text-amber-800/80 font-serif italic mb-8">The Heart of the Pilgrim's Way: San Miniato to Siena</p>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-amber-100 flex items-center gap-3">
            <Calendar className="text-amber-600" size={20} />
            <div className="text-left"><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Duration</p><p className="font-bold text-slate-700">6 Days</p></div>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-amber-100 flex items-center gap-3">
            <Compass className="text-amber-600" size={20} />
            <div className="text-left"><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Distance</p><p className="font-bold text-slate-700">84.5 km</p></div>
          </div>
          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-amber-100 flex items-center gap-3">
            <Mountain className="text-amber-600" size={20} />
            <div className="text-left"><p className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Total Ascent</p><p className="font-bold text-slate-700">1,495 m</p></div>
          </div>
          <a href={ROUTE_MAP} target="_blank" rel="noopener noreferrer" className="print:hidden bg-amber-600 text-white px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-amber-700 transition-colors">
            <Navigation className="text-amber-100" size={20} />
            <div className="text-left"><p className="text-[10px] text-amber-100 uppercase font-black tracking-widest leading-none mb-1">Full Route</p><p className="font-bold text-white">Route on Google Maps</p></div>
          </a>
          <button onClick={handleKmlDownload} className="print:hidden bg-amber-950 text-amber-50 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3 hover:bg-amber-900 transition-colors">
            <Download className="text-amber-300" size={20} />
            <div className="text-left"><p className="text-[10px] text-amber-300 uppercase font-black tracking-widest leading-none mb-1">Google Earth / Maps</p><p className="font-bold text-amber-50">Download KML</p></div>
          </button>
        </div>
      </header>

      <div className="print:hidden bg-white border-b border-amber-100 px-6 py-3 mb-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/infographics" className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors">← Back to Infographics</Link>
        </div>
      </div>

      {/* Route Visualization */}
      <div className="max-w-6xl mx-auto mb-10 print:hidden">
        <div className="bg-amber-950 rounded-[2.5rem] p-1 shadow-2xl shadow-amber-950/20 relative overflow-hidden">
          <div className="bg-[#fdf9f0] rounded-[calc(2.5rem-4px)] px-10 pt-8 pb-12 relative">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-serif italic text-2xl text-amber-900">Path through the Heart of Tuscany</h3>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-700/50">San Miniato ➔ Siena</div>
            </div>
            <div className="relative flex justify-between items-center px-12 h-28">
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 200" preserveAspectRatio="none">
                <path d="M 50,100 C 150,40 250,160 350,100 S 550,40 750,100" fill="none" stroke="#b45309" strokeWidth="3" strokeDasharray="10 10" strokeLinecap="round" className="opacity-40"/>
              </svg>
              {itinerary.map((d) => (
                <div key={d.day} className={`relative z-10 p-3 rounded-full border-4 transition-all duration-500 cursor-pointer group ${activeDay === d.day ? "bg-amber-600 border-amber-950 scale-125 shadow-xl" : "bg-white border-amber-200 hover:border-amber-400"}`} onClick={() => setActiveDay(d.day)}>
                  {React.cloneElement(d.icon as React.ReactElement<{ className?: string }>, { className: `w-6 h-6 ${activeDay === d.day ? "text-white" : "text-amber-800"}` })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 print:hidden">
        {/* Stage list */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-lg font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4 px-2"><MapIcon size={18} className="text-amber-600"/> Stages</h2>
          {itinerary.map((step) => (
            <button key={step.day} onClick={() => setActiveDay(step.day)} className={`w-full text-left p-4 rounded-2xl transition-all duration-300 border-2 ${activeDay === step.day ? "bg-amber-900 text-white shadow-xl border-amber-900 translate-x-2" : "bg-white hover:bg-amber-50 border-white hover:border-amber-100 text-slate-600"}`}>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${activeDay === step.day ? "bg-amber-700 text-amber-100" : "bg-slate-100 text-slate-500"}`}>{step.label.toUpperCase()}</span>
                <span className="text-[11px] font-mono opacity-60">{step.dist}</span>
              </div>
              <p className="font-bold leading-tight">{step.route}</p>
            </button>
          ))}
        </div>

        {/* Detail card */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-amber-900/5 border border-amber-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-[0.03] text-amber-900 pointer-events-none rotate-12">
              {React.cloneElement(active.icon as React.ReactElement<{ size?: number }>, { size: 300 })}
            </div>
            <div className="relative z-10">
              <div className="mb-6">
                <span className="text-amber-600 font-black text-xs uppercase tracking-[0.2em]">{active.label}</span>
                <h3 className="text-3xl md:text-4xl font-serif font-black text-amber-950 mt-1">{active.route}</h3>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="bg-amber-50 text-amber-900 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 border border-amber-100"><Mountain size={14} className="text-amber-600"/> CLIMB: +{active.gain}</div>
                <div className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 border border-slate-200"><ChevronRight size={14} className="text-slate-400"/> DISTANCE: {active.dist}</div>
              </div>
              <div className="mb-8 p-5 bg-[#fdf9f0] border border-amber-100 rounded-2xl">
                <div className="flex items-center gap-2 text-amber-700 font-black uppercase text-xs tracking-widest mb-3"><Navigation size={15}/> Today's Walk</div>
                <p className="text-slate-700 leading-relaxed text-base">{active.description}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-700 font-black uppercase text-xs tracking-widest"><History size={16}/> Historical Significance</div>
                  <p className="text-slate-600 leading-relaxed font-serif text-lg italic border-l-4 border-amber-200 pl-6 py-2">{active.history}</p>
                  <a href={active.cityLink} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl hover:border-amber-400 hover:bg-amber-100 transition-all group">
                    <MapPin size={16} className="text-amber-600 mt-0.5 shrink-0"/>
                    <div><p className="font-black text-amber-700 text-base group-hover:text-amber-900 transition-colors underline underline-offset-2">{active.city}</p><p className="text-sm text-slate-600 leading-relaxed mt-0.5">{active.cityDesc}</p></div>
                    <ExternalLink size={12} className="text-amber-500 shrink-0 mt-0.5"/>
                  </a>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-amber-700 font-black uppercase text-xs tracking-widest"><Info size={16}/> Landmarks & Points of Interest</div>
                  {active.landmarks.map((lm, i) => (
                    <a key={i} href={lm.link} target="_blank" rel="noopener noreferrer" className={`flex items-start gap-3 p-4 rounded-2xl border transition-all group ${lm.primary ? "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400 hover:shadow-md" : "bg-white border-slate-100 hover:border-amber-100 hover:bg-amber-50"}`}>
                      {lm.primary ? <Star size={14} className="text-amber-500 mt-0.5 shrink-0"/> : <MapPin size={14} className="text-amber-400 mt-0.5 shrink-0"/>}
                      <div className="flex-1 min-w-0"><p className="font-black text-base leading-tight text-amber-600 underline underline-offset-2 group-hover:text-amber-800 transition-colors">{lm.name}</p><p className="text-sm text-slate-500 mt-0.5 leading-snug">{lm.note}</p></div>
                      <ExternalLink size={11} className="text-amber-400 shrink-0 mt-0.5"/>
                    </a>
                  ))}
                </div>
              </div>

              {/* Hotel */}
              <div className="mt-8 -mx-8 px-8 py-6 bg-amber-50 border-t-4 border-amber-400">
                <div className="flex items-center gap-2 text-amber-700 font-black uppercase text-xs tracking-widest mb-3"><BedDouble size={15}/> Tonight's Stay</div>
                {active.hotel ? (
                  <a href={active.hotel.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 bg-white border-2 border-amber-200 rounded-2xl hover:border-amber-400 hover:shadow-md transition-all group">
                    <BedDouble size={20} className="text-amber-500 mt-0.5 shrink-0"/>
                    <div className="flex-1"><p className="font-black text-amber-700 underline underline-offset-2 group-hover:text-amber-900 transition-colors">{active.hotel.name}</p><p className="text-xs text-slate-500 mt-0.5 mb-1">{active.hotel.address}</p><p className="text-sm text-slate-600 leading-relaxed">{active.hotel.description}</p></div>
                    <ExternalLink size={12} className="text-amber-400 shrink-0 mt-0.5"/>
                  </a>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-white border border-dashed border-amber-300 rounded-2xl">
                    <HelpCircle size={18} className="text-amber-500 shrink-0"/>
                    <div><p className="font-black text-amber-700 text-sm">Ask Kathy!</p><p className="text-sm text-slate-500">Hotel recommendation coming — contact <a href="mailto:kathy.dragon@wholejourneys.com" className="text-amber-600 underline">kathy.dragon@wholejourneys.com</a></p></div>
                  </div>
                )}
              </div>

              {/* Experiences */}
              <div className="mt-6 border-t border-amber-100 pt-6">
                <div className="flex items-center gap-2 text-amber-700 font-black uppercase text-xs tracking-widest mb-3"><Sparkles size={15}/> Suggested Experiences</div>
                {active.experiences.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-3">
                    {active.experiences.map((exp, i) => (
                      <div key={i} className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-amber-100 rounded-2xl">
                        <p className="font-black text-amber-900 text-base mb-1 flex items-center gap-1.5"><Sparkles size={13} className="text-amber-500"/>{exp.title}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-amber-50 border border-dashed border-amber-300 rounded-2xl">
                    <HelpCircle size={18} className="text-amber-500 shrink-0"/>
                    <div><p className="font-black text-amber-700 text-sm">Ask Kathy!</p><p className="text-sm text-slate-500">Experience suggestions coming — contact <a href="mailto:kathy.dragon@wholejourneys.com" className="text-amber-600 underline">kathy.dragon@wholejourneys.com</a></p></div>
                  </div>
                )}
              </div>

              {/* Restaurants */}
              <div className="mt-6 border-t border-amber-100 pt-6">
                <div className="flex items-center gap-2 text-amber-700 font-black uppercase text-xs tracking-widest mb-3"><Utensils size={15}/> Restaurants & Local Tastes</div>
                {active.restaurants.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-3">
                    {active.restaurants.map((r, i) => (
                      <a key={i} href={r.link} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-2xl hover:border-amber-200 hover:bg-amber-50 transition-all group">
                        <Utensils size={14} className="text-amber-400 mt-0.5 shrink-0"/>
                        <div className="flex-1"><p className="font-black text-amber-600 underline underline-offset-2 group-hover:text-amber-800 text-base transition-colors">{r.name}</p><p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{r.description}</p></div>
                        <ExternalLink size={11} className="text-amber-400 shrink-0 mt-0.5"/>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-amber-50 border border-dashed border-amber-300 rounded-2xl">
                    <HelpCircle size={18} className="text-amber-500 shrink-0"/>
                    <div><p className="font-black text-amber-700 text-sm">Ask Kathy!</p><p className="text-sm text-slate-500">Restaurant picks coming — contact <a href="mailto:kathy.dragon@wholejourneys.com" className="text-amber-600 underline">kathy.dragon@wholejourneys.com</a></p></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto border-t border-amber-100 pt-10 pb-16 print:hidden">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 rounded-2xl"><History size={20} className="text-amber-600"/></div>
            <div><p className="text-xs font-black uppercase tracking-widest text-slate-500">Historical Reference</p><p className="text-sm font-serif italic text-slate-400">Archbishop Sigeric of Canterbury, AD 994</p></div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={handleKmlDownload} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-700/80 hover:text-amber-700 transition-colors"><Download size={14}/> KML for Google Maps</button>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-700/60">UNESCO Heritage Protected</span>
          </div>
        </div>
        <div className="border-t border-amber-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-serif italic">Infographic designed by <span className="font-black text-amber-700">Kathy Dragon</span>, Whole Journeys</p>
          <div className="flex items-center gap-5">
            <a href="mailto:kathy.dragon@wholejourneys.com" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors"><Mail size={13}/> kathy.dragon@wholejourneys.com</a>
            <a href="https://www.wholejourneys.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-600 hover:text-amber-800 transition-colors"><Globe size={13}/> wholejourneys.com</a>
          </div>
        </div>
      </footer>
      </div>{/* end p-4 md:p-8 */}
    </div>
  );
}
