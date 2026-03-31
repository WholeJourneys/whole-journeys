import { Link } from "wouter";
import { Compass, Instagram, Facebook, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group inline-block">
              <Compass className="w-8 h-8 text-secondary" />
              <span className="font-display font-semibold text-3xl tracking-wide text-white">
                Whole Journeys
              </span>
            </Link>
            <p className="text-white/70 leading-relaxed max-w-sm font-light">
              Curating exceptional, immersive travel experiences for the modern explorer. 
              Proud Virtuoso member and Coastline travel partner.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xl font-medium mb-6 text-white">Explore</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-white/70 hover:text-secondary transition-colors font-light">Home</Link>
              </li>
              <li>
                <Link href="/tours" className="text-white/70 hover:text-secondary transition-colors font-light">Signature Tours</Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-secondary transition-colors font-light">Our Philosophy</Link>
              </li>
              <li>
                <a href="https://trips.wholejourneys.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-secondary transition-colors font-light">
                  Our Travefy Gallery
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xl font-medium mb-6 text-white">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:travel@wholejourneys.com" className="flex items-center gap-3 text-white/70 hover:text-secondary transition-colors font-light">
                  <Mail className="w-4 h-4" />
                  travel@wholejourneys.com
                </a>
              </li>
              <li>
                <a href="https://book.wholejourneys.com" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-sm font-medium tracking-wider uppercase border-b border-secondary text-secondary hover:text-white hover:border-white transition-colors pb-1">
                  Access Hotel Booking Platform
                </a>
              </li>
            </ul>
            
            <div className="flex gap-4 mt-8">
              <a href="https://www.instagram.com/kathydragon" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/kathydragon" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/kathydragon" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50 font-light">
          <p>&copy; {new Date().getFullYear()} Whole Journeys. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
