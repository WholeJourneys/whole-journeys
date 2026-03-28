import { useState, useMemo } from "react";
import { Search, Filter, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import TourModal from "@/components/TourModal";
import { useTours, type Tour } from "@/hooks/use-tours";
import { motion } from "framer-motion";

export default function Tours() {
  const { data: tours, isLoading } = useTours();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  
  // Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const regions = ["All", "Africa", "South America", "Asia", "Europe", "Arctic/Antarctic", "Oceania"];
  const tripTypes = ["All", "Wildlife", "Culture", "Adventure", "Wellness", "Family"];

  // Filter logic
  const filteredTours = useMemo(() => {
    if (!tours) return [];
    
    return tours.filter(tour => {
      const matchesSearch = 
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tour.destination.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRegion = regionFilter === "All" || tour.region === regionFilter;
      const matchesType = typeFilter === "All" || tour.type.includes(typeFilter);

      return matchesSearch && matchesRegion && matchesType;
    });
  }, [tours, searchQuery, regionFilter, typeFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">Explore Our Signature Tours</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto font-light">
            Discover our carefully curated sample itineraries. Use these as inspiration to build your perfect custom journey.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Filters Bar */}
        <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-12 shadow-sm flex flex-col md:flex-row gap-4">
          
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input 
              type="text"
              placeholder="Search destinations or tour names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative min-w-[160px]">
              <select 
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {regions.map(r => <option key={r} value={r}>{r === "All" ? "All Regions" : r}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            </div>

            <div className="relative min-w-[160px]">
              <select 
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                {tripTypes.map(t => <option key={t} value={t}>{t === "All" ? "All Trip Types" : t}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[500px] bg-muted/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
            <X className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">No tours found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setSearchQuery(""); setRegionFilter("All"); setTypeFilter("All"); }}
              className="mt-6 px-6 py-2 bg-secondary text-white rounded-md text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
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
