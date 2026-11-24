import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { ROUTES } from "../seo/site";

interface LandingSelectorProps {
  onSelect: (site: "wassa" | "oneEvent") => void;
}

/**
 * Accueil. Les deux panneaux sont de vrais liens <a href> : sans eux, les
 * robots (Google, moteurs IA) ne découvrent pas les pages Wan'Events et Wassa
 * Percussion. Le clic garde la transition animée (navigation côté client).
 */
const LandingSelector: React.FC<LandingSelectorProps> = ({ onSelect }) => {
  const [hoveredSite, setHoveredSite] = useState<"wassa" | "oneEvent" | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect =
    (site: "wassa" | "oneEvent") => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      setIsTransitioning(true);
      onSelect(site);
    };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="absolute top-0 left-0 w-full z-20 px-4 pt-6 text-center pointer-events-none">
        <h1 className="text-base md:text-xl font-body font-medium text-white/90 drop-shadow">
          Marco Douka – animation d'événements &amp; percussions africaines à
          Pornic, dans le Pays de Retz et jusqu'à Nantes
        </h1>
      </header>

      <main className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Wan'Events - Premier en responsive */}
        <a
          href={ROUTES.wanEvents.path}
          className={`relative block w-full md:w-1/2 h-[50vh] md:h-screen cursor-pointer group optimized-transition transition-all duration-500 order-1 md:order-2 ${
            hoveredSite === "wassa"
              ? "md:w-1/3 opacity-50"
              : hoveredSite === "oneEvent"
              ? "md:w-2/3"
              : ""
          } ${isTransitioning ? "scale-98 opacity-0" : ""}`}
          onClick={handleSelect("oneEvent")}
          onMouseEnter={() => setHoveredSite("oneEvent")}
          onMouseLeave={() => setHoveredSite(null)}
        >
          <img
            src="/OneEvent/OneEvent_Marco.webp"
            alt="Marco Douka, animateur Wan'Events, en pleine animation"
            {...{ fetchpriority: "high" }}
            className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 transform transition-transform duration-500 group-hover:scale-110">
              <h2 className="text-4xl md:text-6xl font-display text-white mb-4">
                Wan'Events
              </h2>
              <p className="text-white/80 text-base md:text-lg">
                Quiz, blind test, karaoké, team building &amp; maître de cérémonie
              </p>
            </div>
          </div>
        </a>

        {/* Wassa Percussion - Second en responsive */}
        <a
          href={ROUTES.wassa.path}
          className={`relative block w-full md:w-1/2 h-[50vh] md:h-screen cursor-pointer group optimized-transition transition-all duration-500 order-2 md:order-1 ${
            hoveredSite === "oneEvent"
              ? "md:w-1/3 opacity-50"
              : hoveredSite === "wassa"
              ? "md:w-2/3"
              : ""
          } ${isTransitioning ? "scale-98 opacity-0" : ""}`}
          onClick={handleSelect("wassa")}
          onMouseEnter={() => setHoveredSite("wassa")}
          onMouseLeave={() => setHoveredSite(null)}
        >
          <img
            src="/WassaPercussion/Wassa_Percussion.webp"
            alt="Le groupe Wassa Percussion en concert de djembés"
            {...{ fetchpriority: "high" }}
            className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 transform transition-transform duration-500 group-hover:scale-110">
              <h2 className="text-4xl md:text-6xl font-display text-white mb-4">
                WASSA PERCUSSION
              </h2>
              <p className="text-white/80 text-base md:text-lg">
                Spectacles, déambulations &amp; cours de djembé
              </p>
            </div>
          </div>
        </a>
      </div>

      <section className="section bg-surface" aria-labelledby="intro-title">
        <div className="container-custom max-w-4xl text-center">
          <h2 id="intro-title" className="text-primary mb-6">
            Un animateur, deux univers
          </h2>
          <p className="text-text-secondary text-lg mb-4">
            Basé à <strong>Pornic</strong>, Marco Douka anime vos mariages,
            soirées d'entreprise et festivals avec{" "}
            <a href={ROUTES.wanEvents.path} onClick={handleSelect("oneEvent")} className="text-primary underline underline-offset-4">
              Wan'Events
            </a>{" "}
            (quiz musical, blind test, karaoké, team building, maître de
            cérémonie), et fait vibrer vos événements aux rythmes d'Afrique de
            l'Ouest avec{" "}
            <a href={ROUTES.wassa.path} onClick={handleSelect("wassa")} className="text-primary underline underline-offset-4">
              Wassa Percussion
            </a>{" "}
            (spectacles, déambulations, cours de djembé, réparation de djembés).
          </p>
          <p className="text-text-secondary flex items-start justify-center gap-2">
            <MapPin size={20} className="text-primary shrink-0 mt-1" aria-hidden="true" />
            <span>
              Intervention à Pornic, Saint-Brevin-les-Pins, Saint-Nazaire, dans
              tout le Pays de Retz et jusqu'à Nantes.
            </span>
          </p>
        </div>
      </section>
      </main>
    </div>
  );
};

export default LandingSelector;
