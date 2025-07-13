import React from 'react';
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const SocialSidebar: React.FC = () => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-4 bg-surface/80 backdrop-blur-sm p-3 rounded-full border border-gray-700">
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-300 group"
          aria-label="Instagram"
        >
          <Instagram size={18} className="group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-300 group"
          aria-label="Facebook"
        >
          <Facebook size={18} className="group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-300 group"
          aria-label="YouTube"
        >
          <Youtube size={18} className="group-hover:scale-110 transition-transform" />
        </a>
        <a
          href="#"
          className="w-10 h-10 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-background transition-all duration-300 group"
          aria-label="Twitter"
        >
          <Twitter size={18} className="group-hover:scale-110 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default SocialSidebar;