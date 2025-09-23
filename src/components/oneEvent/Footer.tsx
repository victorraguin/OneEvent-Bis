import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 border-t border-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a
              href="#"
              className="text-3xl font-display text-primary tracking-wider mb-4 block"
            >
              Wan'Events
            </a>
            <p className="text-text-secondary max-w-md mb-6">
              Créateur d'expériences de divertissement inoubliables. Des
              ateliers de percussion aux quiz musicaux, nous transformons vos
              événements en moments mémorables.
            </p>
            <p className="text-text-secondary">
              Basé à Lyon, France et intervenant dans toute la France.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Ateliers de Percussion
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Quiz Musical
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Team Building
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Animation d'Événements
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <div className="space-y-2 text-text-secondary">
              <p>
                <a
                  href="tel:+33123456789"
                  className="hover:text-primary transition-colors"
                >
                  +33 1 23 45 67 89
                </a>
              </p>
              <p>
                <a
                  href="mailto:marco@wanevent.com"
                  className="hover:text-primary transition-colors"
                >
                  marco@wanevent.com
                </a>
              </p>
              <p>Lyon, France</p>
            </div>
            <div className="mt-6">
              <a
                href="/admin"
                className="text-text-secondary hover:text-primary transition-colors text-sm"
              >
                Administration
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            &copy; {currentYear} Wan'Events by Marco. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
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
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
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

              <a
                href="tel:+33123456789"
                className="phone-cta w-10 h-10 rounded-full bg-background hover:bg-primary flex items-center justify-center text-primary hover:text-background transition-all duration-300 border border-primary"
                aria-label="Téléphone"
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
                  className="transition-transform hover:scale-110"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
