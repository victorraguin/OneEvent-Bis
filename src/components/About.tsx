import React, { useEffect, useRef } from 'react';
import { supabase, EnsembleMember } from '../lib/supabase';
import { useInView } from '../hooks/useInView';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });
  const [ensembleMembers, setEnsembleMembers] = React.useState<EnsembleMember[]>([]);

  useEffect(() => {
    const loadEnsemble = async () => {
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('ensemble')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (data) {
          setEnsembleMembers(data);
        }
      } catch (error) {
        console.error('Error loading ensemble:', error);
      }
    };

    loadEnsemble();
  }, []);

  // Fallback data if Supabase not configured
  const defaultMembers = [
    { name: "Kofi Mensah", role: "Percussionniste Principal", image_url: "/WassaPercussion/Wassa_Percussion3.jpg" },
    { name: "Ama Diop", role: "Danseuse & Chanteuse", image_url: "/WassaPercussion/Wassa_Percussion4.jpg" },
    { name: "Kwame Osei", role: "Percussion", image_url: "/WassaPercussion/Wassa_Percussion5.jpg" },
    { name: "Fatima Kamara", role: "Danseuse", image_url: "/WassaPercussion/Wassa_Percussion1.jpg" },
  ];

  const membersToShow = ensembleMembers.length > 0 ? ensembleMembers : defaultMembers;

  return (
    <section id="about" ref={sectionRef} className="section bg-surface">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-primary mb-8 relative inline-block">
              Notre Histoire
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </h2>
            <p className="mb-6 text-text-secondary">
              Fondé en 2010, Wassa Percussion est un collectif dynamique de maîtres percussionnistes et danseurs, dédiés à la préservation et au partage des riches traditions de percussion d'Afrique de l'Ouest.
            </p>
            <p className="mb-6 text-text-secondary">
              Nos performances mêlent rythmes traditionnels et influences contemporaines, créant une expérience électrisante qui captive le public du monde entier. Chaque membre apporte son expertise unique des différentes régions d'Afrique, créant une riche tapisserie de sons et de mouvements.
            </p>
            <p className="text-text-secondary">
              À travers nos performances et nos ateliers, nous visons à célébrer l'héritage culturel de la percussion africaine et à créer des connexions qui transcendent les frontières et les langues.
            </p>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="image-zoom rounded-lg overflow-hidden">
              <img 
                src="/WassaPercussion/Wassa_Percussion1.jpg"
                alt="Wassa Percussion performers" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full overflow-hidden border-4 border-background hidden md:block">
              <img 
                src="/WassaPercussion/Wassa_Percussion2.jpg"
                alt="Close-up of drums" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Team members */}
        <div className={`mt-24 transition-all duration-700 delay-500 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-center mb-12">Notre Ensemble</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {membersToShow.map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 image-zoom">
                  <img 
                    src={member.image_url || "/WassaPercussion/Wassa_Percussion1.jpg"} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-medium">{member.name}</h4>
                <p className="text-text-secondary text-sm">{member.role}</p>
                {member.bio && (
                  <p className="text-text-secondary text-xs mt-1">{member.bio}</p>
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