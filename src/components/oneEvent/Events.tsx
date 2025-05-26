import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

const upcomingEvents = [
  {
    date: "15 Mars 2024",
    title: "Team Building Entreprise",
    location: "Tech Hub, Paris",
    description: "Atelier de rythme interactif pour équipes de startup"
  },
  {
    date: "22 Mars 2024",
    title: "Soirée Quiz Années 90",
    location: "Le Petit Café, Lyon",
    description: "Testez vos connaissances des hits des années 90"
  }
];

const Events: React.FC = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Événements à Venir
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {upcomingEvents.map((event, index) => (
            <div 
              key={index}
              className="bg-background rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="text-primary" size={24} />
                  <span className="text-lg font-medium">{event.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-text-secondary mb-4">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
                <p className="text-text-secondary">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;