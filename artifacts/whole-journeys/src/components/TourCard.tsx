import { MapPin, Clock } from "lucide-react";
import { type Tour } from "@/hooks/use-tours";
import { formatPrice } from "@/lib/utils";

interface TourCardProps {
  tour: Tour;
  onClick: (tour: Tour) => void;
}

export default function TourCard({ tour, onClick }: TourCardProps) {
  return (
    <div 
      className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-full"
      onClick={() => onClick(tour)}
    >
      <div className="relative h-64 overflow-hidden">
        {/* Image Zoom Effect on Hover */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          style={{ backgroundImage: `url(${tour.imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
        
        {/* Tags */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tour.type.slice(0, 1).map(t => (
            <span key={t} className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-white/90 text-primary backdrop-blur-sm rounded-full">
              {t}
            </span>
          ))}
        </div>

        {/* Location Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 text-white/90">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-medium truncate">{tour.destination}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display text-2xl font-medium text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {tour.name}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
          {tour.description}
        </p>

        <div className="pt-4 border-t border-border mt-auto flex items-end justify-between">
          <div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">From</div>
            <div className="font-display text-xl font-semibold text-primary">{formatPrice(tour.price)}</div>
          </div>
          
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-lg">
            <Clock className="w-4 h-4" />
            {tour.duration} Days
          </div>
        </div>
      </div>
    </div>
  );
}
