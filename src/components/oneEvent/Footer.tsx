import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background py-12 border-t border-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-display text-primary tracking-wider mb-4 block">
              WAN'EVENT
            </a>
            <p className="text-text-secondary max-w-md mb-6">
              Créateur d'expériences de divertissement inoubliables. Des ateliers de percussion aux quiz musicaux, nous transformons vos événements en moments mémorables.
            </p>
            <p className="text-text-secondary">
              Basé à Lyon, France et intervenant dans toute la France.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-text-secondary hover:text-primary transition-colors">Ateliers de Percussion</a></li>
              <li><a href="#services" className="text-text-secondary hover:text-primary transition-colors">Quiz Musical</a></li>
              <li><a href="#services" className="text-text-secondary hover:text-primary transition-colors">Team Building</a></li>
              <li><a href="#services" className="text-text-secondary hover:text-primary transition-colors">Animation d'Événements</a></li>
              <li><a href="#contact" className="text-text-secondary hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <div className="space-y-2 text-text-secondary">
              <p>
                <a href="tel:+33123456789" className="hover:text-primary transition-colors">
                  +33 1 23 45 67 89
                </a>
              </p>
              <p>
                <a href="mailto:marco@wanevent.com" className="hover:text-primary transition-colors">
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
            &copy; {currentYear} Wan'Event by Marco. Tous droits réservés.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-surface flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;