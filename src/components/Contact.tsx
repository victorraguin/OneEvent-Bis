import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { useInView } from "../hooks/useInView";

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="section bg-surface">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Nous contacter
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Intéressé par une réservation de Wassa Percussion pour votre événement
          ou atelier ? Contactez-nous.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className={`transition-all duration-700 ${
              isInView ? "opacity-100" : "opacity-0 translate-y-10"
            }`}
          >
            <div
              className={`optimized-transition transition-all duration-500 ${
                isInView ? "opacity-100" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">
                  Entrer en contact
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-text-secondary mb-2"
                    >
                      Votre nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-text-secondary mb-2"
                    >
                      Adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-text-secondary mb-2"
                    >
                      Sujet
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Sélectionnez une option</option>
                      <option value="booking">
                        Réservation de performance
                      </option>
                      <option value="workshop">Demande d'atelier</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-text-secondary mb-2"
                    >
                      Votre message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="btn btn-primary w-full"
                  >
                    {formStatus === "submitting"
                      ? "Envoi en cours..."
                      : "Envoyer le message"}
                  </button>

                  {formStatus === "success" && (
                    <div className="mt-4 p-3 bg-success/20 border border-success text-text-primary rounded-lg">
                      Merci pour votre message. Nous vous répondrons bientôt !
                    </div>
                  )}

                  {formStatus === "error" && (
                    <div className="mt-4 p-3 bg-error/20 border border-error text-text-primary rounded-lg">
                      Une erreur s'est produite lors de l'envoi de votre
                      message. Veuillez réessayer.
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          <div
            className={`optimized-transition transition-all duration-500 delay-150 ${
              isInView ? "opacity-100" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="h-full flex flex-col">
              <div className="bg-background p-8 rounded-lg mb-6 flex-1">
                <h3 className="text-xl font-semibold mb-6">
                  Informations de contact
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail
                      className="text-primary mr-4 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <div className="font-medium">Email</div>
                      <a
                        href="mailto:info@wassapercussion.com"
                        className="text-text-secondary hover:text-primary transition-colors"
                      >
                        info@wassapercussion.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone
                      className="text-primary mr-4 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <div className="font-medium">Téléphone</div>
                      <a
                        href="tel:+1234567890"
                        className="text-text-secondary hover:text-primary transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin
                      className="text-primary mr-4 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <div className="font-medium">Localisation</div>
                      <div className="text-text-secondary">
                        Dakar, Sénégal et tournées dans le monde entier
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Calendar
                      className="text-primary mr-4 flex-shrink-0"
                      size={20}
                    />
                    <div>
                      <div className="font-medium">Disponibilité</div>
                      <div className="text-text-secondary">
                        Disponible pour des réservations tout au long de 2025
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-6">Suivez-nous</h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Instagram"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                    aria-label="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
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
