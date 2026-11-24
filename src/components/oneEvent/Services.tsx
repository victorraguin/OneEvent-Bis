import React from "react";
import { Music, Users, Brain, PartyPopper, Mic } from "lucide-react";
import { supabase, Service } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";

const Services: React.FC = () => {
  const [services, setServices] = React.useState<Service[]>([]);
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  React.useEffect(() => {
    const loadServices = async () => {
      if (!supabase) return;

      try {
        const { data } = await supabase
          .from("services")
          .select("*")
          .order("order_index", { ascending: true });

        if (data) {
          setServices(data);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      }
    };

    loadServices();
  }, []);

  // Fallback data if Supabase not configured
  const defaultServices = [
    {
      id: "1",
      title: "Quiz & Blind Tests",
      description:
        "Quiz musicaux, blind tests et karaoké pour animer vos soirées et événements en Loire Atlantique (44)",
      icon: "Brain",
      image: "/OneEvent/OneEvent_Marco_Microphone.webp",
      order_index: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Karaoké",
      description:
        "Soirées karaoké animées par Marco Douka pour tous vos événements privés et professionnels",
      icon: "Mic",
      image: "/OneEvent/OneEvent_Marco_Animation.webp",
      order_index: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Cours de Percussion",
      description:
        "Ateliers et cours de percussion en équipe pour le team building d'entreprise à Pornic et région",
      icon: "Music",
      image: "/OneEvent/OneEvent_Marco.webp",
      order_index: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Team Building Percussion",
      description:
        "Activités rythmiques pour renforcer la cohésion d'équipe dans vos entreprises (Bretagne, Vendée)",
      icon: "Users",
      image: "/OneEvent/Marco_OneEvent_Animation.webp",
      order_index: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Animation & Maître de Cérémonie",
      description:
        "Animation professionnelle et maître de cérémonie pour mariages, festivals et événements d'entreprise",
      icon: "PartyPopper",
      image: "/OneEvent/WanEvents_Marco_Foot_Animation.webp",
      order_index: 5,
      created_at: new Date().toISOString(),
    },
  ];

  const servicesToShow = services.length > 0 ? services : defaultServices;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Music":
        return Music;
      case "Brain":
        return Brain;
      case "Users":
        return Users;
      case "PartyPopper":
        return PartyPopper;
      case "Mic":
        return Mic;
      default:
        return Music;
    }
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Nos Services
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Animation d'événements, quiz musicaux, karaoké et team building
          percussion avec Marco Douka. Interventions en Loire Atlantique,
          Bretagne et Vendée.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesToShow.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <div
                key={service.id || index}
                className={`relative overflow-hidden rounded-lg group cursor-pointer optimized-transition transition-all duration-500 delay-${Math.min(
                  index * 100,
                  400
                )} ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {/* Image de fond */}
                <div className="relative h-80 overflow-hidden">
                  <img loading="lazy" decoding="async"
                    src={service.image || "/OneEvent/OneEvent_Marco.webp"}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                  {/* Contenu en bas */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Effet hover */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
