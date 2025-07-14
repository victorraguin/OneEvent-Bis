import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { supabase, Event } from '../../lib/supabase';

const Events: React.FC = () => {
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const loadEvents = async () => {
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('events')
          .select('*')
          .eq('site', 'wanevent')
          .order('date', { ascending: true });
        
        if (data) {
          setEvents(data);
        }
      } catch (error) {
        console.error('Error loading events:', error);
      }
    };

    loadEvents();
  }, []);

  // Fallback data if Supabase not configured
  const defaultEvents = [
    {
      id: '1',
      site: 'wanevent' as const,
      date: "2024-03-15",
      title: "Team Building Entreprise",
      location: "Tech Hub, Paris",
      description: "Atelier de rythme interactif pour équipes de startup",
      time: null,
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      site: 'wanevent' as const,
      date: "2024-03-22",
      title: "Soirée Quiz Années 90",
      location: "Le Petit Café, Lyon",
      description: "Testez vos connaissances des hits des années 90",
      time: null,
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const eventsToShow = events.length > 0 ? events : defaultEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Événements à Venir
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {eventsToShow.map((event, index) => (
            <div 
              key={event.id || index}
              className="bg-background rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="text-primary" size={24} />
                  <span className="text-lg font-medium">{formatDate(event.date)}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-text-secondary mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
                {event.description && (
                  <p className="text-text-secondary">{event.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;