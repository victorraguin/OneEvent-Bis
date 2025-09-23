import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  currentSite: "wassa" | "oneEvent";
  onSiteChange: (site: "wassa" | "oneEvent") => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentSite, onSiteChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSiteSwitch = () => {
    onSiteChange(currentSite === "wassa" ? "oneEvent" : "wassa");
  };

  const navLinks =
    currentSite === "wassa"
      ? [
          { href: "#about", label: "À Propos" },
          { href: "#gallery", label: "Galerie" },
          { href: "#prestations", label: "Prestations" },
          { href: "#music", label: "Musique" },
          { href: "#contact", label: "Contact" },
        ]
      : [
          { href: "#services", label: "Services" },
          { href: "#about", label: "À Propos de Marco" },
          { href: "#gallery", label: "Galerie" },
          { href: "#testimonials", label: "Témoignages" },
          { href: "#contact", label: "Contact" },
        ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 optimized-transition transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-surface/95 backdrop-blur-md py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <a
          href="#"
          className="text-2xl font-display text-primary tracking-wider"
        >
          {currentSite === "wassa" ? "WASSA" : "Wan'Events"}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={handleSiteSwitch}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Voir {currentSite === "wassa" ? "Wan'Events" : "Wassa"}
              </button>
            </li>
          </ul>
          <div className="flex items-center gap-4 border-l border-gray-600 pl-6">
            <a
              href="tel:+33123456789"
              className="phone-cta w-10 h-10 rounded-full bg-background hover:bg-primary flex items-center justify-center text-primary hover:text-background transition-all duration-300 group border border-primary"
              aria-label="Appeler"
              title="Appeler +33 1 23 45 67 89"
            >
              <Phone
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Phone Icon & Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <a
            href="tel:+33123456789"
            className="phone-cta w-10 h-10 rounded-full bg-background hover:bg-primary flex items-center justify-center text-primary hover:text-background transition-all duration-300 border border-primary"
            aria-label="Appeler"
            title="Appeler +33 1 23 45 67 89"
          >
            <Phone size={16} />
          </a>
          <button
            onClick={handleSiteSwitch}
            className="px-3 h-10 rounded-full bg-background hover:bg-primary text-primary hover:text-background transition-all duration-300 border border-primary text-xs"
            aria-label={`Voir ${
              currentSite === "wassa" ? "Wan'Events" : "Wassa"
            }`}
            title={`Voir ${currentSite === "wassa" ? "Wan'Events" : "Wassa"}`}
          >
            {currentSite === "wassa" ? "Wan'Events" : "Wassa"}
          </button>
          <button
            className="text-text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background/98 backdrop-blur-lg z-40 pt-20 transition-transform duration-300 md:hidden border-l border-primary/20 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="container-custom flex flex-col h-full">
          <ul className="flex flex-col gap-6 text-xl">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-3 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  handleSiteSwitch();
                  setIsMenuOpen(false);
                }}
                className="block py-3 text-primary hover:text-primary/80 transition-colors text-left w-full"
              >
                Voir {currentSite === "wassa" ? "Wan'Events" : "Wassa"}
              </button>
            </li>
          </ul>
          <div className="flex justify-center mt-8 pt-6 border-t border-gray-600">
            <div className="flex items-center gap-4">
              <span className="text-text-secondary">Thème:</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
