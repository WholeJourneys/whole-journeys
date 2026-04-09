import { useState, useMemo } from "react";
import SEO from "@/components/SEO";
import { Search, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import { useTours, ALL_CATEGORIES, ALL_REGIONS, type Tour } from "@/hooks/use-tours";
import { motion } from "framer-motion";

export default function Tours() {
  const { data: tours, isLoading } = useTours();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeRegions, setActiveRegions] = useState<string[]>([]);
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  function selectCategory(cat: string) {
    setActiveCategory((prev) => (prev === cat ? null : cat));
  }

  function toggleRegion(region: string) {
    setActiveRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  }

  function clearAll() {
    setSearchQuery("");
    setActiveCategory(null);
    setActiveRegions([]);
    setActiveCountry(null);
  }

  const hasFilters = searchQuery || activeCategory !== null || activeRegions.length > 0 || activeCountry !== null;

  // Only show region/category chips that have at least one tour
  const usedRegions = useMemo(() => {
    if (!tours) return [] as string[];
    const set = new Set(tours.map((t) => t.region));
    return ALL_REGIONS.filter((r) => set.has(r));
  }, [tours]);

  const usedCategories = useMemo(() => {
    if (!tours) return [] as string[];
    const set = new Set(tours.flatMap((t) => t.categories));
    return ALL_CATEGORIES.filter((c) => set.has(c));
  }, [tours]);

  const usedCountries = useMemo(() => {
    if (!tours) return [] as string[];
    const set = new Set(tours.flatMap((t) => t.country));
    return Array.from(set).sort();
  }, [tours]);

  type FilterResult = {
    filteredTours: Tour[];
    fallbackMode: null | "style-only" | "region-only" | "all";
  };

  const { filteredTours, fallbackMode } = useMemo((): FilterResult => {
    if (!tours) return { filteredTours: [], fallbackMode: null };

    const matchesSearch = (tour: Tour) =>
      !searchQuery ||
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.country.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = (tour: Tour) =>
      activeCategory === null || tour.categories.includes(activeCategory);

    const matchesRegion = (tour: Tour) =>
      activeRegions.length === 0 || activeRegions.includes(tour.region);

    const matchesCountry = (tour: Tour) =>
      activeCountry === null || tour.country.includes(activeCountry);

    // Full match: all active filters
    const full = tours.filter((t) => matchesSearch(t) && matchesCategory(t) && matchesRegion(t) && matchesCountry(t));
    if (full.length > 0) return { filteredTours: full, fallbackMode: null };

    // If no results and both style+region are active, try falling back gracefully
    if (activeCategory !== null && activeRegions.length > 0) {
      const styleOnly = tours.filter((t) => matchesSearch(t) && matchesCategory(t) && matchesCountry(t));
      if (styleOnly.length > 0) return { filteredTours: styleOnly, fallbackMode: "style-only" };

      const regionOnly = tours.filter((t) => matchesSearch(t) && matchesRegion(t) && matchesCountry(t));
      if (regionOnly.length > 0) return { filteredTours: regionOnly, fallbackMode: "region-only" };
    }

    // Last resort: show all
    if (hasFilters) return { filteredTours: tours, fallbackMode: "all" };

    return { filteredTours: tours, fallbackMode: null };
  }, [tours, searchQuery, activeCategory, activeRegions, activeCountry, hasFilters]);

  const CATEGORY_COLORS: Record<string, { base: string; active: string }> = {
    "Adventure":           { base: "border-amber-300 text-amber-800 hover:bg-amber-50",         active: "bg-amber-800 text-white border-amber-800" },
    "Biking":              { base: "border-lime-300 text-lime-800 hover:bg-lime-50",             active: "bg-lime-700 text-white border-lime-700" },
    "Villas/Farms":        { base: "border-stone-300 text-stone-700 hover:bg-stone-50",         active: "bg-stone-700 text-white border-stone-700" },
    "Cruise/Sail":         { base: "border-cyan-200 text-cyan-800 hover:bg-cyan-50",            active: "bg-cyan-800 text-white border-cyan-800" },
    "Culinary":            { base: "border-red-200 text-red-800 hover:bg-red-50",               active: "bg-red-800 text-white border-red-800" },
    "Culture":             { base: "border-indigo-200 text-indigo-800 hover:bg-indigo-50",      active: "bg-indigo-800 text-white border-indigo-800" },
    "Family":              { base: "border-sky-200 text-sky-800 hover:bg-sky-50",               active: "bg-sky-800 text-white border-sky-800" },
    "Long Distance Walks": { base: "border-yellow-300 text-yellow-800 hover:bg-yellow-50",      active: "bg-yellow-700 text-white border-yellow-700" },
    "Self-Drive":          { base: "border-slate-300 text-slate-700 hover:bg-slate-50",         active: "bg-slate-700 text-white border-slate-700" },
    "Self-Guided":         { base: "border-teal-200 text-teal-800 hover:bg-teal-50",            active: "bg-teal-800 text-white border-teal-800" },
    "Ski & Snow":          { base: "border-blue-200 text-blue-900 hover:bg-blue-50",            active: "bg-blue-900 text-white border-blue-900" },
    "Walk/Hike":           { base: "border-green-200 text-green-800 hover:bg-green-50",         active: "bg-green-800 text-white border-green-800" },
    "Wellness":            { base: "border-rose-200 text-rose-900 hover:bg-rose-50",            active: "bg-rose-900 text-white border-rose-900" },
    "Wildlife":            { base: "border-emerald-200 text-emerald-900 hover:bg-emerald-50",   active: "bg-emerald-900 text-white border-emerald-900" },
    "Women's":             { base: "border-pink-200 text-pink-900 hover:bg-pink-50",            active: "bg-pink-900 text-white border-pink-900" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Explore Signature Tours"
        description="Browse signature walking and cultural tours through France, Italy, Croatia, Spain, and beyond. Small groups and private departures, personally designed by Kathy Dragon."
        path="/tours"
      />
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Explore Our Signature Tours
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto font-light">
            Discover our carefully curated sample itineraries. Use these as inspiration to build your perfect custom journey.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search by destination, country, or tour name…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="mb-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
            Trip Style
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                activeCategory === null
                  ? "bg-primary text-white border-primary"
                  : "border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              Any
            </button>
            {usedCategories.map((cat) => {
              const colors = CATEGORY_COLORS[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => selectCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                    isActive ? colors.active : colors.base
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
            Region
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveRegions([])}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                activeRegions.length === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              Any
            </button>
            {usedRegions.map((region) => {
              const isActive = activeRegions.includes(region);
              return (
                <button
                  key={region}
                  onClick={() => toggleRegion(region)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {region}
                </button>
              );
            })}
          </div>
        </div>

        {/* Country Filter Chips */}
        {usedCountries.length > 1 && (
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5">
              Country
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCountry(null)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                  activeCountry === null
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                }`}
              >
                Any
              </button>
              {usedCountries.map((country) => (
                <button
                  key={country}
                  onClick={() => setActiveCountry((prev) => (prev === country ? null : country))}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                    activeCountry === country
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter status bar */}
        {hasFilters && (
          <div className="flex items-center justify-between mb-6">
            {fallbackMode ? (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
                <span>
                  {fallbackMode === "style-only" && `No ${activeCategory} tours in that region — showing all ${activeCategory} tours instead.`}
                  {fallbackMode === "region-only" && `No tours in that region with that style — showing all ${activeRegions.join(", ")} tours instead.`}
                  {fallbackMode === "all" && "No tours match those filters — showing all tours instead."}
                </span>
                <button onClick={clearAll} className="font-semibold underline ml-1">Clear filters</button>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredTours.length}</span> of {tours?.length ?? 0} tours
              </span>
            )}
            {!fallbackMode && (
              <button
                onClick={clearAll}
                className="text-primary hover:underline font-medium flex items-center gap-1 text-sm"
              >
                <X className="w-3.5 h-3.5" /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-[500px] bg-muted/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <TourCard tour={tour} onClick={setSelectedTour} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      <TourModal
        tour={selectedTour}
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
      />
    </div>
  );
}
