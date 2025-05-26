import React, { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  return (
    <section id="about" ref={sectionRef} className="section bg-surface">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-primary mb-8 relative inline-block">
              Our Story
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
            </h2>
            <p className="mb-6 text-text-secondary">
              Founded in 2010, Wassa Percussion is a dynamic collective of master drummers and dancers, dedicated to preserving and sharing the rich percussion traditions of West Africa.
            </p>
            <p className="mb-6 text-text-secondary">
              Our performances blend traditional rhythms with contemporary influences, creating an electrifying experience that captivates audiences worldwide. Each member brings unique expertise from different regions of Africa, creating a rich tapestry of sound and movement.
            </p>
            <p className="text-text-secondary">
              Through our performances and workshops, we aim to celebrate the cultural heritage of African percussion and create connections that transcend borders and languages.
            </p>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="image-zoom rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8412414/pexels-photo-8412414.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Wassa Percussion performers" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full overflow-hidden border-4 border-background hidden md:block">
              <img 
                src="https://images.pexels.com/photos/7957655/pexels-photo-7957655.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Close-up of drums" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Team members */}
        <div className={`mt-24 transition-all duration-700 delay-500 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-center mb-12">Our Ensemble</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Kofi Mensah", role: "Lead Drummer", image: "https://images.pexels.com/photos/7096069/pexels-photo-7096069.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Ama Diop", role: "Dancer & Vocalist", image: "https://images.pexels.com/photos/3810756/pexels-photo-3810756.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Kwame Osei", role: "Percussion", image: "https://images.pexels.com/photos/8102152/pexels-photo-8102152.jpeg?auto=compress&cs=tinysrgb&w=600" },
              { name: "Fatima Kamara", role: "Dancer", image: "https://images.pexels.com/photos/6389849/pexels-photo-6389849.jpeg?auto=compress&cs=tinysrgb&w=600" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4 image-zoom">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-medium">{member.name}</h4>
                <p className="text-text-secondary text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;