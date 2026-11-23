import React, { useEffect, useRef } from "react";
import { supabase, EnsembleMember } from "../lib/supabase";
import { useInView } from "../hooks/useInView";

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  const [ensembleMembers, setEnsembleMembers] = React.useState<
    EnsembleMember[]
  >([]);

  useEffect(() => {
    const loadEnsemble = async () => {
      if (!supabase) return;

      try {
        const { data } = await supabase
          .from("ensemble")
          .select("*")
          .order("order_index", { ascending: true });

        if (data) {
          setEnsembleMembers(data);
        }
      } catch (error) {
        console.error("Error loading ensemble:", error);
      }
    };

    loadEnsemble();
  }, []);

  // Fallback data if Supabase not configured
  const defaultMembers = [
    {
      name: "Kofi Mensah",
      role: "Percussionniste Principal",
      image_url: "/WassaPercussion/Wassa_Percussion3.webp",
    },
    {
      name: "Ama Diop",
      role: "Danseuse & Chanteuse",
      image_url: "/WassaPercussion/Wassa_Percussion4.webp",
    },
    {
      name: "Kwame Osei",
      role: "Percussion",
      image_url: "/WassaPercussion/Wassa_Percussion5.webp",
    },
    {
      name: "Fatima Kamara",
      role: "Danseuse",
      image_url: "/WassaPercussion/Wassa_Percussion1.webp",
    },
  ];

  const membersToShow =
    ensembleMembers.length > 0 ? ensembleMembers : defaultMembers;

  return (
    <section id="about" ref={sectionRef} className="section bg-surface">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`optimized-transition transition-all duration-300 ${
              isInView ? "opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            <h2 className="text-primary mb-8 relative inline-block">
              Notre Histoire
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </h2>
            <p className="mb-6 text-text-secondary">
              Fondé en 2010, Wassa Percussion est un collectif dynamique de
              maîtres percussionnistes et danseurs, dédiés à la préservation et
              au partage des riches traditions de percussion d'Afrique de
              l'Ouest.
            </p>
            <p className="mb-6 text-text-secondary">
              Nos performances mêlent rythmes traditionnels et influences
              contemporaines, créant une expérience électrisante qui captive le
              public du monde entier. Chaque membre apporte son expertise unique
              des différentes régions d'Afrique, créant une riche tapisserie de
              sons et de mouvements.
            </p>
            <p className="text-text-secondary">
              À travers nos performances et nos ateliers, nous visons à célébrer
              l'héritage culturel de la percussion africaine et à créer des
              connexions qui transcendent les frontières et les langues.
            </p>
          </div>

          <div
            className={`relative optimized-transition transition-all duration-300 delay-150 ${
              isInView ? "opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="image-zoom rounded-lg overflow-hidden">
              <img loading="lazy" decoding="async"
                src="/WassaPercussion/Wassa_Percussion1.webp"
                alt="Les percussionnistes de Wassa Percussion sur scène"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Team members */}
        <div
          className={`mt-24 optimized-transition transition-all duration-500 delay-200 ${
            isInView ? "opacity-100" : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="text-primary mb-4 relative inline-block text-center w-full">
            <span className="relative">
              Notre Ensemble
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-primary"></span>
            </span>
          </h3>
          <p className="text-text-secondary mb-12 text-center max-w-2xl mx-auto">
            Découvrez les talentueux artistes qui donnent vie aux rythmes de
            Wassa Percussion
          </p>
          <div className="grid grid-cols-2 gap-6">
            {membersToShow.map((member, index) => (
              <div
                key={index}
                className="group relative bg-surface rounded-2xl p-4 text-center hover:bg-surface/80 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-800/50 hover:border-primary/30"
              >
                <div className="relative mb-6">
                  <div className="rounded-full overflow-hidden w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 image-zoom border-4 border-primary/20 group-hover:border-primary/60 transition-all duration-300">
                    <img loading="lazy" decoding="async"
                      src={
                        member.image_url ||
                        "/WassaPercussion/Wassa_Percussion1.webp"
                      }
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-background text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-primary transition-colors">
                  {member.name}
                </h4>
                <div className="inline-block px-3 py-1 bg-primary/20 rounded-full mb-3 group-hover:bg-primary/30 transition-colors duration-300">
                  <p className="text-primary text-sm font-semibold">
                    {member.role}
                  </p>
                </div>
                {member.bio && (
                  <p className="text-text-secondary text-xs leading-relaxed">
                    {member.bio}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
