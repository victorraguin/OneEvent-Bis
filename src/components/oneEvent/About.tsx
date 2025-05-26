import React from 'react';
import { Phone, Mail } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-background">
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
  );
};

export default About;