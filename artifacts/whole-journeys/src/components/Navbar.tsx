import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if we are on the homepage where the navbar should start transparent
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore Tours", path: "/tours" },
    { name: "Kathy's Picks", path: "/picks" },
    { name: "Our Philosophy", path: "/about" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4",
          isScrolled || !isHome
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50 py-3"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Compass 
                className={cn(
                  "w-8 h-8 transition-colors duration-300 group-hover:text-secondary",
                  (!isScrolled && isHome) ? "text-white" : "text-primary"
                )} 
              />
              <span 
                className={cn(
                  "font-display font-semibold text-2xl tracking-wide",
                  (!isScrolled && isHome) ? "text-white" : "text-foreground"
                )}
              >
                Whole Journeys
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase transition-colors duration-200 hover:text-secondary",
                    location === link.path 
                      ? "text-secondary" 
                      : (!isScrolled && isHome) ? "text-white/90 hover:text-white" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              
              <Link
                href="/hotels"
                className={cn(
                  "px-6 py-2.5 rounded-sm text-sm font-medium tracking-wide uppercase transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5",
                  location === "/hotels"
                    ? "bg-secondary text-white"
                    : (!isScrolled && isHome)
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-primary text-white hover:bg-primary/90"
                )}
              >
                Browse &amp; Book Hotels
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu 
                className={cn(
                  "w-6 h-6",
                  (!isScrolled && isHome) ? "text-white" : "text-foreground"
                )} 
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-border">
              <span className="font-display font-semibold text-2xl text-primary">Whole Journeys</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-foreground hover:text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 p-8 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={cn(
                    "text-2xl font-display",
                    location === link.path ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="w-full h-px bg-border my-4" />
              <Link
                href="/hotels"
                className="w-full text-center px-6 py-4 bg-primary text-white rounded-md text-lg font-medium shadow-md"
              >
                Browse & Book Hotels
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
