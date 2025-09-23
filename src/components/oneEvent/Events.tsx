import React, { useRef } from "react";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase, Event } from "../../lib/supabase";
import { useInView } from "../../hooks/useInView";

const Events: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const loadEvents = async () => {
      if (!supabase) return;

      try {
        const { data } = await supabase
          .from("events")
          .select("*")
          .eq("site", "wanevent")
          .order("date", { ascending: true });

        if (data) {
          setEvents(data);
        }
      } catch (error) {
        console.error("Error loading events:", error);
      }
    };

    loadEvents();
  }, []);

  // Fallback data if Supabase not configured
  const defaultEvents = [
    {
      id: "1",
      site: "wanevent" as const,
      date: "2024-03-15",
      title: "Team Building Entreprise",
      location: "Tech Hub, Paris",
      description: "Atelier de rythme interactif pour équipes de startup",
      time: null,
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      site: "wanevent" as const,
      date: "2024-03-22",
      title: "Soirée Quiz Années 90",
      location: "Le Petit Café, Lyon",
      description: "Testez vos connaissances des hits des années 90",
      time: null,
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  const eventsToShow = events.length > 0 ? events : defaultEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const gap = 24; // 6 * 4px (gap-6)
      const scrollAmount = itemWidth + gap;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const gap = 24; // 6 * 4px (gap-6)
      const scrollAmount = itemWidth + gap;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Événements à Venir
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Découvrez nos prochains événements et réservez votre place pour des
          expériences musicales inoubliables.
        </p>

        {/* Carrousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary/80 hover:bg-primary text-background flex items-center justify-center transition-all duration-300 shadow-lg"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-primary/80 hover:bg-primary text-background flex items-center justify-center transition-all duration-300 shadow-lg"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable Events */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide flex gap-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {eventsToShow.map((event, index) => (
              <div
                key={event.id || index}
                className={`bg-background rounded-lg overflow-hidden optimized-transition transition-all duration-500 flex-shrink-0 w-80 sm:w-96 delay-${Math.min(
                  index * 100,
                  400
                )} ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                {/* Header avec date */}
                <div className="bg-primary text-background p-4 flex items-center justify-center">
                  <Calendar className="mr-3" size={20} />
                  <div className="text-lg font-medium">
                    {formatDate(event.date)}
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
                  <div className="flex items-center text-text-secondary mb-3">
                    <MapPin size={16} className="mr-2 flex-shrink-0" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  {event.description && (
                    <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                  )}
                  <div className="flex justify-center">
                    <a
                      href="#contact"
                      className="btn btn-outline text-sm px-4 py-2"
                    >
                      Réserver
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
