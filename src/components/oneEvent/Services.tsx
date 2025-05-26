import React from 'react';
import { Music, Users, Brain, PartyPopper } from 'lucide-react';
import { useInView } from '../../hooks/useInView';

const Services: React.FC = () => {
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

  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-surface">
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
  );
};

export default Services;