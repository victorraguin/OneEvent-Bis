import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-12 border-t border-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-display text-primary tracking-wider mb-4 block">
              WASSA
            </a>
            <p className="text-text-secondary max-w-md mb-6">
              Apportant les rythmes authentiques de l'Afrique de l'Ouest à un public mondial à travers des performances énergiques et des ateliers immersifs.
            </p>
            <p className="text-text-secondary">
              Basé à Dakar, Sénégal et se produisant dans le monde entier.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-text-secondary hover:text-primary transition-colors">À Propos</a></li>
              <li><a href="#gallery" className="text-text-secondary hover:text-primary transition-colors">Galerie</a></li>
              <li><a href="#events" className="text-text-secondary hover:text-primary transition-colors">Événements</a></li>
              <li><a href="#music" className="text-text-secondary hover:text-primary transition-colors">Musique</a></li>
              <li><a href="#contact" className="text-text-secondary hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Newsletter</h4>
            <p className="text-text-secondary mb-4">
              Abonnez-vous à notre newsletter pour suivre nos performances et ateliers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 bg-surface border border-gray-700 rounded-l-lg px-4 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-background px-4 py-2 rounded-r-lg hover:bg-primary/90 transition-colors"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            &copy; {currentYear} Wassa Percussion. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex gap-6 text-sm">
              <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="text-text-secondary hover:text-primary transition-colors">Conditions d'Utilisation</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;