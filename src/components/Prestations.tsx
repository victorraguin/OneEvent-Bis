import React, { useRef } from "react";
import { useInView } from "../hooks/useInView";

const Prestations: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const prestations = [
    {
      title: "Performances Scéniques",
      description:
        "Shows percussifs énergétiques pour festivals, salles et événements culturels.",
      image: "/WassaPercussion/Wassa_Percussion3.jpg",
    },
    {
      title: "Ateliers et Initiations",
      description:
        "Découverte du djembé et des rythmes d’Afrique de l’Ouest pour tous publics.",
      image: "/WassaPercussion/Wassa_Percussion5.jpg",
    },
    {
      title: "Animations d’Événements",
      description:
        "Interventions sur-mesure pour mariages, entreprises et collectivités.",
      image: "/WassaPercussion/Wassa_Percussion1.jpg",
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
          <div className="grid md:grid-cols-2 gap-8">
            {prestations.map((p, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
              >
                <div className="relative h-72 overflow-hidden">
                  <img
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
