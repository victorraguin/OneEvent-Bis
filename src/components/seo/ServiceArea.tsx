import React from "react";
import { SERVICE_AREA } from "../../seo/site";
import { PinIcon } from "../design/Icons";

interface ServiceAreaProps {
  brand: "Wan'Events" | "Wassa Percussion";
  intro: string;
}

const COAST = [
  "La Bernerie-en-Retz",
  "Les Moutiers-en-Retz",
  "Préfailles",
  "La Plaine-sur-Mer",
  "Saint-Michel-Chef-Chef",
];

/**
 * Zone d'intervention visible : les villes ciblées apparaissent en texte réel.
 * Couleurs et typo : variables CSS de la page parente (design-shared.css).
 */
const ServiceArea: React.FC<ServiceAreaProps> = ({ brand, intro }) => (
  <section id="zone" className="ds-section" aria-labelledby="zone-title">
    <div className="ds-wrap">
      <div className="ds-zone-head">
        <div className="ds-zone-title">
          <span className="ds-eyebrow">Où on joue</span>
          <h2 id="zone-title" className="ds-h2">
            Zone d'intervention
          </h2>
        </div>
        <p className="ds-lead">{intro}</p>
      </div>
      <div className="ds-zone-grid">
        <div className="ds-zone-card">
          <h3>
            <span className="ds-zone-pin">
              <PinIcon size={18} />
            </span>
            Côte de Jade
          </h3>
          <p>
            {brand} est basé à <strong>Pornic</strong> et se déplace sur toute
            la côte : <strong>Saint-Brevin-les-Pins</strong>,{" "}
            <strong>Saint-Nazaire</strong>, {COAST.join(", ")}.
          </p>
        </div>
        <div className="ds-zone-card">
          <h3>
            <span className="ds-zone-pin">
              <PinIcon size={18} />
            </span>
            Pays de Retz
          </h3>
          <p>
            Partout dans le <strong>Pays de Retz</strong> :{" "}
            {SERVICE_AREA.paysDeRetz.filter((c) => !COAST.includes(c)).join(", ")}.
          </p>
        </div>
        <div className="ds-zone-card">
          <h3>
            <span className="ds-zone-pin">
              <PinIcon size={18} />
            </span>
            Nantes et agglomération
          </h3>
          <p>
            Jusqu'à <strong>Nantes</strong>, {SERVICE_AREA.nantesArea.join(", ")}{" "}
            et toute la Loire-Atlantique, ainsi qu'en Vendée et en Bretagne.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ServiceArea;
