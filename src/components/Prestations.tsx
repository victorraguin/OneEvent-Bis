import React, { useRef } from "react";
import { useInView } from "../hooks/useInView";

const Prestations: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const prestations = [
    {
      title: "Show Percussion",
      description:
        "Spectacles de percussions africaines pour festivals, salles et événements culturels en Loire Atlantique, Bretagne et Vendée.",
      image: "/WassaPercussion/Wassa_Percussion3.webp",
    },
    {
      title: "Cours Percussion",
      description:
        "Cours et initiations au djembé et aux rythmes d'Afrique de l'Ouest pour tous niveaux à Pornic (44).",
      image: "/WassaPercussion/Wassa_Percussion5.webp",
    },
    {
      title: "Déambulation",
      description:
        "Animations percussives itinérantes pour vos événements, festivals et manifestations culturelles.",
      image: "/WassaPercussion/Wassa_Percussion_Groupe.webp",
    },
    {
      title: "Réparation Djembés",
      description:
        "Service professionnel de réparation et maintenance de djembés et instruments de percussion africaine.",
      image: "/WassaPercussion/Wassa_Percussion_Djembe.webp",
    },
  ];

  return (
    <section id="prestations" ref={sectionRef} className="section bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-8 relative inline-block">
          Nos prestations
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>

        <div
          className={`optimized-transition transition-all duration-500 ${
            isInView ? "opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {prestations.map((p, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {p.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Prestations;
