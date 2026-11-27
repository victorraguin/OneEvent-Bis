import React from "react";
import { SERVICE_AREA } from "../../seo/site";
import { PinIcon } from "../design/Icons";

interface ServiceAreaProps {
  intro: string;
}

const ZONES = [
  { title: "Nantes et agglomération", main: "Nantes", cities: SERVICE_AREA.nantesArea },
  { title: "Saint-Nazaire et presqu'île", main: "Saint-Nazaire", cities: SERVICE_AREA.saintNazaireArea },
  { title: "Pornic et Pays de Retz", main: "Pornic", cities: SERVICE_AREA.paysDeRetz.filter((c) => c !== "Pornic") },
];

/**
 * Zone d'intervention visible : les villes ciblées apparaissent en texte réel,
 * Nantes et Saint-Nazaire en premier (cible SEO prioritaire).
 * Couleurs et typo : variables CSS de la page parente (design-shared.css).
 */
const ServiceArea: React.FC<ServiceAreaProps> = ({ intro }) => (
  <section id="zone" className="ds-section" aria-labelledby="zone-title">
    <div className="ds-wrap">
      <div className="ds-zone-head">
        <div className="ds-zone-title">
          <span className="ds-eyebrow">Où je me déplace</span>
          <h2 id="zone-title" className="ds-h2">
            Zone d'intervention
          </h2>
        </div>
        <p className="ds-lead">{intro}</p>
      </div>
      <div className="ds-zone-grid">
        {ZONES.map((z) => (
          <div key={z.title} className="ds-zone-card">
            <h3>
              <span className="ds-zone-pin">
                <PinIcon size={18} />
              </span>
              {z.title}
            </h3>
            <p>
              <strong>{z.main}</strong>, {z.cities.join(", ")}.
            </p>
          </div>
        ))}
      </div>
      <p className="ds-lead">Je me déplace aussi dans le reste de la Loire-Atlantique, en Vendée et en Bretagne.</p>
    </div>
  </section>
);

export default ServiceArea;
