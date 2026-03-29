import { useState, useMemo } from "react";
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
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeRegions, setActiveRegions] = useState<string[]>([]);

  function toggleCategory(cat: string) {
    setActiveCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function toggleRegion(region: string) {
    setActiveRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  }

  function clearAll() {
    setSearchQuery("");
    setActiveCategories([]);
    setActiveRegions([]);
  }

  const hasFilters = searchQuery || activeCategories.length > 0 || activeRegions.length > 0;

  const { filteredTours, filtersCleared } = useMemo(() => {
    if (!tours) return { filteredTours: [], filtersCleared: false };

    const filtered = tours.filter((tour) => {
      const matchesSearch =
        !searchQuery ||
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.country.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        activeCategories.length === 0 ||
        activeCategories.every((cat) => tour.categories.includes(cat));

      const matchesRegion =
        activeRegions.length === 0 || activeRegions.includes(tour.region);

      return matchesSearch && matchesCategory && matchesRegion;
    });

    if (filtered.length === 0 && hasFilters) {
      return { filteredTours: tours, filtersCleared: true };
    }

    return { filteredTours: filtered, filtersCleared: false };
  }, [tours, searchQuery, activeCategories, activeRegions, hasFilters]);

  const CATEGORY_COLORS: Record<string, { base: string; active: string }> = {
    "Adventure":       { base: "border-orange-400 text-orange-600 hover:bg-orange-50",       active: "bg-orange-500 text-white border-orange-500" },
    "Country Estates": { base: "border-amber-600 text-amber-700 hover:bg-amber-50",           active: "bg-amber-700 text-white border-amber-700" },
    "Culture":         { base: "border-violet-400 text-violet-600 hover:bg-violet-50",        active: "bg-violet-600 text-white border-violet-600" },
    "Family":          { base: "border-sky-400 text-sky-600 hover:bg-sky-50",                 active: "bg-sky-500 text-white border-sky-500" },
    "Self-Drive":      { base: "border-lime-500 text-lime-700 hover:bg-lime-50",              active: "bg-lime-600 text-white border-lime-600" },
    "Self-Guided":     { base: "border-teal-400 text-teal-600 hover:bg-teal-50",              active: "bg-teal-600 text-white border-teal-600" },
    "Ski & Snow":      { base: "border-blue-400 text-blue-600 hover:bg-blue-50",              active: "bg-blue-500 text-white border-blue-500" },
    "Wellness":        { base: "border-rose-400 text-rose-600 hover:bg-rose-50",              active: "bg-rose-500 text-white border-rose-500" },
    "Wildlife":        { base: "border-green-500 text-green-700 hover:bg-green-50",           active: "bg-green-600 text-white border-green-600" },
    "Women's":         { base: "border-pink-400 text-pink-600 hover:bg-pink-50",              active: "bg-pink-500 text-white border-pink-500" },
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
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
            {ALL_CATEGORIES.map((cat) => {
              const colors = CATEGORY_COLORS[cat];
              const isActive = activeCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
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
            {ALL_REGIONS.map((region) => {
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

        {/* Filter status bar */}
        {hasFilters && (
          <div className="flex items-center justify-between mb-6">
            {filtersCleared ? (
              <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg">
                <span>No tours match those filters — showing all tours instead.</span>
                <button onClick={clearAll} className="font-semibold underline ml-1">Clear filters</button>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredTours.length}</span> of {tours?.length ?? 0} tours
              </span>
            )}
            {!filtersCleared && (
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
