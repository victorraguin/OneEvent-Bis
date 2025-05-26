import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
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
  );
};

export default Contact;