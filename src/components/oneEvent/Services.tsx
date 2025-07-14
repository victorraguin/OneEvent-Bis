import React from 'react';
import { Music, Users, Brain, PartyPopper } from 'lucide-react';
import { supabase, Service } from '../../lib/supabase';
import { useInView } from '../../hooks/useInView';

const Services: React.FC = () => {
  const [services, setServices] = React.useState<Service[]>([]);
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  React.useEffect(() => {
    const loadServices = async () => {
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('services')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (data) {
          setServices(data);
        }
      } catch (error) {
        console.error('Error loading services:', error);
      }
    };

    loadServices();
  }, []);

  // Fallback data if Supabase not configured
  const defaultServices = [
    {
      id: '1',
      title: "Ateliers de Percussion",
      description: "Cercles de tambours interactifs et ateliers de rythme pour tous niveaux",
      icon: "Music",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: "Quiz Musical & Blind Tests",
      description: "Défis musicaux captivants et compétitions thématiques",
      icon: "Brain",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: "Team Building",
      description: "Activités rythmiques pour événements d'entreprise et cohésion d'équipe",
      icon: "Users",
      order_index: 3,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      title: "Animation d'Événements",
      description: "Divertissement professionnel pour fêtes privées et événements d'entreprise",
      icon: "PartyPopper",
      order_index: 4,
      created_at: new Date().toISOString()
    }
  ];

  const servicesToShow = services.length > 0 ? services : defaultServices;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Music': return Music;
      case 'Brain': return Brain;
      case 'Users': return Users;
      case 'PartyPopper': return PartyPopper;
      default: return Music;
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
          Des ateliers interactifs aux animations engageantes, nous créons des expériences mémorables pour toutes les occasions.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesToShow.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
            <div 
              key={service.id || index}
              className={`bg-background p-6 rounded-lg optimized-transition transition-all duration-500 delay-${Math.min(index * 100, 400)} ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <IconComponent className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-text-secondary">{service.description}</p>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;