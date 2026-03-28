import * as Dialog from "@radix-ui/react-dialog";
import { X, MapPin, Clock, Users, Check, Globe } from "lucide-react";

const CATEGORY_COLORS: Record<string, string> = {
  "Adventure":       "bg-orange-100 text-orange-700 border-orange-200",
  "Country Estates": "bg-amber-100 text-amber-800 border-amber-200",
  "Culture":         "bg-violet-100 text-violet-700 border-violet-200",
  "Family":          "bg-sky-100 text-sky-700 border-sky-200",
  "Self-Drive":      "bg-lime-100 text-lime-700 border-lime-200",
  "Self-Guided":     "bg-teal-100 text-teal-700 border-teal-200",
  "Ski & Snow":      "bg-blue-100 text-blue-700 border-blue-200",
  "Wellness":        "bg-rose-100 text-rose-700 border-rose-200",
  "Wildlife":        "bg-green-100 text-green-700 border-green-200",
  "Women's":         "bg-pink-100 text-pink-700 border-pink-200",
};
import { type Tour } from "@/hooks/use-tours";
import { formatPrice } from "@/lib/utils";

interface TourModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TourModal({ tour, isOpen, onClose }: TourModalProps) {
  if (!tour) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[110] grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-background shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
          
          {/* Header Image Area */}
          <div className="relative h-64 sm:h-80 w-full flex-shrink-0">
            <img 
              src={tour.imageUrl} 
              alt={tour.name} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <Dialog.Close className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors focus:outline-none">
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                <MapPin className="w-4 h-4" />
                {tour.destination}
              </div>
              <Dialog.Title className="text-3xl sm:text-4xl font-display font-semibold text-white">
                {tour.name}
              </Dialog.Title>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 space-y-8">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  {tour.categories.map((cat) => (
                    <span
                      key={cat}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${CATEGORY_COLORS[cat] ?? "bg-muted text-muted-foreground border-border"}`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-display font-medium text-foreground mb-4">About this Journey</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {tour.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-display font-medium text-foreground mb-4">Journey Highlights</h3>
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 bg-secondary/10 p-1 rounded-full text-secondary">
                          <Check className="w-4 h-4" />
                        </div>
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="bg-muted/30 p-6 rounded-xl border border-border/50 h-fit space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Starting from</div>
                  <div className="text-3xl font-display font-semibold text-primary">{formatPrice(tour.price)}</div>
                  <div className="text-xs text-muted-foreground mt-1">per person, double occupancy</div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Duration</div>
                      <div className="text-sm text-muted-foreground">{tour.duration} Days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Group Size</div>
                      <div className="text-sm text-muted-foreground">{tour.groupSize}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Region</div>
                      <div className="text-sm text-muted-foreground">{tour.region}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Countries</div>
                      <div className="text-sm text-muted-foreground">{tour.country.join(", ")}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => {
                      onClose();
                      window.location.href = "mailto:hello@wholejourneys.com?subject=Inquiry: " + tour.name;
                    }}
                    className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Inquire About This Trip
                  </button>
                  <p className="text-xs text-center text-muted-foreground mt-3 italic">
                    This is a sample itinerary. All trips can be customized.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
