import { useState, useEffect, useCallback } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Helmet } from "react-helmet-async";
import { X, MapPin, Globe, Check, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { type Tour } from "@/hooks/use-tours";
import { CATEGORY_COLORS } from "./TourCard";

const CATEGORY_LIGHT: Record<string, string> = {
  "Adventure":           "bg-orange-100 text-orange-700 border-orange-200",
  "Biking":              "bg-lime-100 text-lime-700 border-lime-200",
  "Country Estates":     "bg-amber-100 text-amber-800 border-amber-200",
  "Cruise/Sail":         "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Culture":             "bg-violet-100 text-violet-700 border-violet-200",
  "Family":              "bg-sky-100 text-sky-700 border-sky-200",
  "Long Distance Walks": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Self-Drive":          "bg-slate-100 text-slate-700 border-slate-200",
  "Self-Guided":         "bg-teal-100 text-teal-700 border-teal-200",
  "Ski & Snow":          "bg-blue-100 text-blue-700 border-blue-200",
  "Walk/Hike":           "bg-green-100 text-green-700 border-green-200",
  "Wellness":            "bg-rose-100 text-rose-700 border-rose-200",
  "Wildlife":            "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Women's":             "bg-pink-100 text-pink-700 border-pink-200",
};

interface TourModalProps {
  tour: Tour | null;
  isOpen: boolean;
  onClose: () => void;
}

function ImageSlideshow({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)), [images.length]);

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [images.length, paused, next]);

  if (images.length === 0) return null;

  return (
    <div
      className="relative h-64 sm:h-80 w-full flex-shrink-0 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={`${alt} — photo ${idx + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors focus:outline-none"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors focus:outline-none"
            aria-label="Next photo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all focus:outline-none ${
                  idx === current ? "bg-white w-4" : "bg-white/50"
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function TourModal({ tour, isOpen, onClose }: TourModalProps) {
  if (!tour) return null;

  const allImages = [tour.imageUrl, ...(tour.galleryImages ?? [])].filter(Boolean);

  return (
    <>
      {isOpen && (
        <Helmet>
          <title>{tour.seoTitle ? `${tour.seoTitle} | Whole Journeys by Kathy Dragon` : `${tour.name} | Whole Journeys by Kathy Dragon`}</title>
          <meta name="description" content={tour.seoDescription ?? tour.description ?? `Explore the ${tour.name} journey with Whole Journeys.`} />
        </Helmet>
      )}
      <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-[110] grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border-none bg-background shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">

          {/* Header Slideshow */}
          <div className="relative flex-shrink-0">
            <ImageSlideshow images={allImages} alt={tour.name} />

            <Dialog.Close className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors focus:outline-none z-10">
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>

            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="flex items-center gap-2 text-white/90 text-sm font-medium mb-2">
                <MapPin className="w-4 h-4" />
                {tour.destination}
              </div>
              <Dialog.Title className="text-3xl sm:text-4xl font-display font-semibold text-white">
                {tour.name}
              </Dialog.Title>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2 space-y-8">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2">
                  {tour.categories.map((cat) => (
                    <span
                      key={cat}
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${CATEGORY_LIGHT[cat] ?? "bg-muted text-muted-foreground border-border"}`}
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div>
                  <h3 className="text-2xl font-display font-medium text-foreground mb-4">About this Journey</h3>
                  <p className="text-muted-foreground leading-relaxed">{tour.description}</p>
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

              {/* Sidebar */}
              <div className="bg-muted/30 p-6 rounded-xl border border-border/50 h-fit space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Destination</div>
                      <div className="text-sm text-muted-foreground">{tour.destination}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-secondary" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Countries</div>
                      <div className="text-sm text-muted-foreground">{tour.country.join(", ")}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 text-secondary text-center text-xs font-bold">✦</div>
                    <div>
                      <div className="text-sm font-medium text-foreground">Group Style</div>
                      <div className="text-sm text-muted-foreground">{tour.groupSize}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-3">
                  <a
                    href={tour.travefyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    View Full Itinerary <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-xs text-center text-muted-foreground italic">
                    All itineraries are sample tours — fully customizable for your group.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
