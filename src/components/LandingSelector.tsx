import React, { useState } from "react";
import { ThemeProvider } from "../contexts/ThemeContext";

interface LandingSelectorProps {
  onSelect: (site: "wassa" | "oneEvent") => void;
}

const LandingSelector: React.FC<LandingSelectorProps> = ({ onSelect }) => {
  const [hoveredSite, setHoveredSite] = useState<"wassa" | "oneEvent" | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (site: "wassa" | "oneEvent") => {
    setIsTransitioning(true);
    onSelect(site);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Wan'Events - Premier en responsive */}
          <div
            className={`relative w-full md:w-1/2 h-[50vh] md:h-screen cursor-pointer group optimized-transition transition-all duration-500 order-1 md:order-2 ${
              hoveredSite === "wassa"
                ? "md:w-1/3 opacity-50"
                : hoveredSite === "oneEvent"
                ? "md:w-2/3"
                : ""
            } ${isTransitioning ? "scale-98 opacity-0" : ""}`}
            onClick={() => handleSelect("oneEvent")}
            onMouseEnter={() => setHoveredSite("oneEvent")}
            onMouseLeave={() => setHoveredSite(null)}
          >
            <img
              src="/OneEvent/OneEvent_Marco.jpg"
              alt="Wan'Events"
              className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                <h1 className="text-4xl md:text-6xl font-display text-white mb-4">
                  Wan'Events
                </h1>
              </div>
            </div>
          </div>

          {/* Wassa Percussion - Second en responsive */}
          <div
            className={`relative w-full md:w-1/2 h-[50vh] md:h-screen cursor-pointer group optimized-transition transition-all duration-500 order-2 md:order-1 ${
              hoveredSite === "oneEvent"
                ? "md:w-1/3 opacity-50"
                : hoveredSite === "wassa"
                ? "md:w-2/3"
                : ""
            } ${isTransitioning ? "scale-98 opacity-0" : ""}`}
            onClick={() => handleSelect("wassa")}
            onMouseEnter={() => setHoveredSite("wassa")}
            onMouseLeave={() => setHoveredSite(null)}
          >
            <img
              src="/WassaPercussion/Wassa_Percussion.jpg"
              alt="Wassa Percussion"
              className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
                <h1 className="text-4xl md:text-6xl font-display text-white mb-4">
                  WASSA PERCUSSION
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default LandingSelector;
