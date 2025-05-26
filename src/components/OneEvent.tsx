import React, { useRef } from 'react';
import { Calendar, MapPin, Phone, Mail, Music, Users, Brain, PartyPopper } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const OneEvent: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const services = [
    {
      icon: Music,
      title: "Ateliers de Percussion",
      description: "Cercles de tambours interactifs et ateliers de rythme pour tous niveaux"
    },
    {
      icon: Brain,
      title: "Quiz Musical & Blind Tests",
      description: "Défis musicaux captivants et compétitions thématiques"
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Activités rythmiques pour événements d'entreprise et cohésion d'équipe"
    },
    {
      icon: PartyPopper,
      title: "Animation d'Événements",
      description: "Divertissement professionnel pour fêtes privées et événements d'entreprise"
    }
  ];

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("/OneEvent/OneEvent_Marco_Animation.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-display mb-6">
            ONE EVENT
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Créateur d'Expériences de Divertissement Inoubliables
          </p>
          <a href="#contact" className="btn btn-primary">
            Réserver un Événement
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section ref={sectionRef} className="py-20 bg-surface">
        <div className="container-custom">
          <h2 className="text-primary mb-4 relative inline-block">
            Nos Services
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
          </h2>
          <p className="text-text-secondary mb-12 max-w-2xl">
            Des ateliers interactifs aux animations engageantes, nous créons des expériences mémorables pour toutes les occasions.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`bg-background p-6 rounded-lg transition-all duration-700 delay-${index * 100} ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <service.icon className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-text-secondary">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Marco Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/OneEvent/OneEvent_Marco_Microphone.jpg"
                alt="Marco" 
                className="rounded-lg w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-primary mb-4 relative inline-block">
                Rencontrez Marco
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
              </h2>
              <p className="text-text-secondary mb-6">
                Avec plus de 15 ans d'expérience dans l'animation d'événements et l'éducation musicale, Marco apporte passion et expertise à chaque événement. Spécialisé dans les expériences musicales interactives, le team building et les ateliers culturels, il crée des moments engageants et mémorables pour tous les participants.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="text-primary" size={20} />
                  <a href="tel:+33123456789" className="text-text-secondary hover:text-primary transition-colors">
                    +33 1 23 45 67 89
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-primary" size={20} />
                  <a href="mailto:marco@oneevent.com" className="text-text-secondary hover:text-primary transition-colors">
                    marco@oneevent.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container-custom">
          <h2 className="text-primary mb-4 relative inline-block">
            Réserver un Événement
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-text-secondary mb-2">Votre Nom</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-text-secondary mb-2">Adresse Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="event-type" className="block text-text-secondary mb-2">Type d'Événement</label>
                  <select
                    id="event-type"
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Sélectionnez un type d'événement</option>
                    <option value="workshop">Atelier de Percussion</option>
                    <option value="quiz">Quiz Musical</option>
                    <option value="team-building">Team Building</option>
                    <option value="private">Événement Privé</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-text-secondary mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Envoyer le Message
                </button>
              </form>
            </div>
            <div>
              <div className="bg-surface p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Informations de Contact</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Téléphone</div>
                      <a href="tel:+33123456789" className="text-text-secondary hover:text-primary transition-colors">
                        +33 1 23 45 67 89
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Email</div>
                      <a href="mailto:marco@oneevent.com" className="text-text-secondary hover:text-primary transition-colors">
                        marco@oneevent.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-primary mr-4 flex-shrink-0" size={20} />
                    <div>
                      <div className="font-medium">Localisation</div>
                      <div className="text-text-secondary">
                        Basé à Lyon, France<br />
                        Disponible pour des événements dans toute la France
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OneEvent;