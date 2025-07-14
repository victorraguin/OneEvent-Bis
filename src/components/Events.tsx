import React, { useRef } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { supabase, Event } from '../lib/supabase';
import { useInView } from '../hooks/useInView';

const Events: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  const [events, setEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    const loadEvents = async () => {
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('events')
          .select('*')
          .eq('site', 'wassa')
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
  const defaultEvents: Event[] = [
    {
      id: '1',
      site: 'wassa',
      date: "Jun 15, 2025",
      title: "Global Rhythms Festival",
      location: "Central Park, New York",
      time: "7:00 PM",
      description: "Join us for an evening of pulsating rhythms and dance at the annual Global Rhythms Festival.",
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      site: 'wassa',
      date: "Jul 22, 2025",
      title: "Cultural Exchange Workshop",
      location: "World Music Center, London",
      time: "2:00 PM",
      description: "An interactive workshop exploring the diverse percussion traditions of West Africa.",
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      site: 'wassa',
      date: "Aug 10, 2025",
      title: "Summer Beats Concert",
      location: "Waterfront Stage, Barcelona",
      time: "8:30 PM",
      description: "A special summer performance featuring collaborations with local musicians.",
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      site: 'wassa',
      date: "Sep 5, 2025",
      title: "University Workshop Series",
      location: "Arts Department, UCLA",
      time: "1:00 PM",
      description: "A three-day workshop series for music students exploring rhythm, movement and cultural context.",
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
  ];

  const eventsToShow = events.length > 0 ? events : defaultEvents;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <section id="events" ref={sectionRef} className="section bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Upcoming Events
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Experience the energy of Wassa Percussion live at one of our upcoming performances or workshops.
        </p>
        
        <div className="space-y-8">
          {eventsToShow.map((event, index) => (
            <div 
              key={event.id || index} 
              className={`bg-background rounded-lg overflow-hidden optimized-transition transition-all duration-300 delay-${Math.min(index * 50, 200)} ${
                isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                <div className="bg-primary text-background p-6 flex flex-col justify-center items-center md:w-48">
                  <Calendar className="mb-2" size={24} />
                  <div className="text-xl font-medium text-center">{formatDate(event.date)}</div>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-text-secondary mb-1">
                    <MapPin size={16} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  {event.time && (
                    <div className="flex items-center text-text-secondary mb-4">
                      <Clock size={16} className="mr-2" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  {event.description && (
                    <p className="text-text-secondary">{event.description}</p>
                  )}
                </div>
                <div className="p-6 flex items-center justify-center md:w-48 border-t md:border-t-0 md:border-l border-gray-700">
                  <a href="#contact" className="btn btn-outline">Book Tickets</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;