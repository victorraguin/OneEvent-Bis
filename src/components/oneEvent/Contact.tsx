import React from "react";
import { Phone, Mail, MapPin, Star } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-32 translate-x-32 blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full translate-y-24 -translate-x-24 blur-lg"></div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Réservez Votre Événement
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Transformons votre événement en une expérience mémorable avec des
            animations personnalisées et des moments de partage uniques.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Service selection and contact */}
          <div className="space-y-8">
            {/* Contact methods */}
            <div className="relative bg-gradient-to-br from-primary/20 via-gray-900 to-black p-6 sm:p-8 rounded-xl border border-primary/30 overflow-hidden">
              {/* Subtle decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-12 -translate-x-12 blur-xl"></div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/40 px-3 py-1.5 rounded-full mb-4">
                    <div className="relative">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-green-400 font-medium text-xs">
                      Disponible
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-light text-white mb-2 tracking-wide">
                    Contactez Marco Douka
                  </h3>
                </div>

                {/* Phone CTA - Primary */}
                <div className="mb-6">
                  <a
                    href="tel:+33123456789"
                    aria-label="Appeler Marco Douka maintenant"
                    className="phone-cta-contact w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 border border-primary bg-primary text-black hover:brightness-110 hover:border-primary px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-300 group shadow-lg shadow-black/30 hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 active:scale-95"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-primary/30 group-hover:bg-black/20 rounded-full transition-colors duration-300">
                        <Phone
                          size={18}
                          className="text-primary group-hover:text-black transition-colors duration-300"
                        />
                      </div>
                      <span className="font-medium">Appeler maintenant</span>
                    </div>
                    <span className="text-xs text-gray-300 group-hover:text-black/70 font-normal">
                      +33 1 23 45 67 89
                    </span>
                  </a>
                </div>

                {/* Email - Secondary */}
                <div className="mb-6">
                  <a
                    href="mailto:marco@oneevent.com"
                    aria-label="Envoyer un email à Marco Douka"
                    className="w-full flex items-center justify-center gap-2 border border-gray-600/60 bg-gray-800/50 text-white hover:bg-primary/20 hover:border-primary/60 px-4 py-3 sm:px-6 sm:py-4 rounded-lg font-normal text-sm backdrop-blur-sm transition-all duration-300 group shadow-md shadow-black/20 hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 active:scale-95"
                  >
                    <div className="p-1.5 bg-gray-600/30 group-hover:bg-primary/20 rounded-full transition-colors duration-300">
                      <Mail
                        size={16}
                        className="text-gray-300 group-hover:text-primary transition-colors duration-300"
                      />
                    </div>
                    <span className="font-medium">Envoyer un email</span>
                  </a>
                </div>

                {/* Location info */}
                <div className="flex items-center justify-center gap-3 text-gray-400 bg-gray-700/30 backdrop-blur-sm p-3 rounded-lg border border-gray-600/30">
                  <div className="p-1.5 bg-gray-600/40 rounded-full">
                    <MapPin size={16} className="text-gray-300" />
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-200 text-xs">
                      Basé à Pornic (44), Loire-Atlantique
                    </div>
                    <div className="text-xs text-gray-400 font-light">
                      Pays de Retz, Saint-Nazaire, Nantes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Visual element */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 p-8 rounded-2xl">
              <img loading="lazy" decoding="async"
                src="/OneEvent/OneEvent_Marco.webp"
                alt="Marco Douka - Animateur OneEvent"
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-background p-4 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm">Années d'expérience</div>
                </div>
              </div>
            </div>

            {/* Floating testimonial */}
            <div className="absolute -top-6 -left-6 bg-background p-4 rounded-lg shadow-xl max-w-xs">
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className="text-yellow-500 fill-current"
                  />
                ))}
              </div>
              <p className="text-sm text-text-secondary italic">
                "Marco Douka a transformé notre événement d'entreprise en moment
                magique !"
              </p>
              <div className="text-xs text-text-secondary mt-1">
                - Client satisfait
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
