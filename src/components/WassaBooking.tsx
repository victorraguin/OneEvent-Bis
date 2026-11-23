import React from "react";
import { Phone, Mail } from "lucide-react";

const WassaBooking: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-background relative overflow-hidden"
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Réservez Votre Événement
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Donnez un esprit Wassa Percussion à votre événement: énergie,
            partage et rythmes d'Afrique de l'Ouest.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visuel Wassa */}
          <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-6 rounded-2xl order-last lg:order-first">
            <img loading="lazy" decoding="async"
              src="/WassaPercussion/Wassa_Percussion4.webp"
              alt="Wassa Percussion - Réservez votre événement"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* CTA */}
          <div className="space-y-6">
            <a
              href="tel:+33123456789"
              className="w-full flex items-center justify-center gap-3 border border-primary bg-primary text-black hover:brightness-110 px-6 py-4 rounded-lg font-medium backdrop-blur-sm transition-all duration-300 shadow-lg"
            >
              <Phone size={18} />
              <span>Appeler maintenant</span>
              <span className="text-sm opacity-70">+33 1 23 45 67 89</span>
            </a>
            <a
              href="mailto:contact@wassa-percussion.com"
              className="w-full flex items-center justify-center gap-3 border border-gray-600/60 bg-gray-800/50 text-white hover:bg-primary/20 hover:border-primary/60 px-6 py-4 rounded-lg transition-all duration-300 shadow-md"
            >
              <Mail size={16} />
              <span>Envoyer un email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WassaBooking;
