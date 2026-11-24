import React from "react";
import { MapPin } from "lucide-react";
import { SERVICE_AREA } from "../../seo/site";

interface ServiceAreaProps {
  brand: "Wan'Events" | "Wassa Percussion";
  intro: string;
}

/** Zone d'intervention visible : les villes ciblées apparaissent en texte réel. */
const ServiceArea: React.FC<ServiceAreaProps> = ({ brand, intro }) => (
  <section id="zone" className="section bg-surface" aria-labelledby="zone-title">
    <div className="container-custom">
      <h2 id="zone-title" className="text-primary mb-8 relative inline-block">
        Zone d'intervention
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
      </h2>
      <p className="text-text-secondary max-w-3xl mb-10 text-lg">{intro}</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-lg bg-background p-6 border border-gray-800">
          <h3 className="text-xl mb-3 flex items-center gap-2">
            <MapPin size={20} className="text-primary" aria-hidden="true" />
            Côte de Jade
          </h3>
          <p className="text-text-secondary">
            {brand} est basé à <strong>Pornic</strong> et se déplace sur toute
            la côte : <strong>Saint-Brevin-les-Pins</strong>,{" "}
            <strong>Saint-Nazaire</strong>, La Bernerie-en-Retz, Les
            Moutiers-en-Retz, Préfailles, La Plaine-sur-Mer et
            Saint-Michel-Chef-Chef.
          </p>
        </div>
        <div className="rounded-lg bg-background p-6 border border-gray-800">
          <h3 className="text-xl mb-3 flex items-center gap-2">
            <MapPin size={20} className="text-primary" aria-hidden="true" />
            Pays de Retz
          </h3>
          <p className="text-text-secondary">
            Partout dans le <strong>Pays de Retz</strong> :{" "}
            {SERVICE_AREA.paysDeRetz
              .filter((c) => !["La Bernerie-en-Retz", "Les Moutiers-en-Retz", "Préfailles", "La Plaine-sur-Mer", "Saint-Michel-Chef-Chef"].includes(c))
              .join(", ")}
            .
          </p>
        </div>
        <div className="rounded-lg bg-background p-6 border border-gray-800">
          <h3 className="text-xl mb-3 flex items-center gap-2">
            <MapPin size={20} className="text-primary" aria-hidden="true" />
            Nantes et agglomération
          </h3>
          <p className="text-text-secondary">
            Jusqu'à <strong>Nantes</strong>, {SERVICE_AREA.nantesArea.join(", ")}{" "}
            et toute la Loire-Atlantique, ainsi qu'en Vendée et en Bretagne.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default ServiceArea;
