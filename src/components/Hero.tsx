import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section 
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.pexels.com/photos/6173860/pexels-photo-6173860.jpeg?auto=compress&cs=tinysrgb&w=1920)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      <div className={`container-custom relative z-10 text-center ${isLoaded ? 'fade-in' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display mb-6 text-white">
          <span className="block">WASSA</span>
          <span className="text-primary text-3xl md:text-4xl lg:text-5xl mt-2 block">PERCUSSION</span>
        </h1>
        <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          Découvrez la puissance des rythmes et l'énergie vibrante des percussions d'Afrique de l'Ouest
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#gallery" className="btn btn-primary">
            Découvrir nos Performances
          </a>
          <a href="#contact" className="btn btn-outline">
            Nous Contacter
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <a href="#about" aria-label="Défiler vers le bas">
          <ArrowDown size={28} />
        </a>
      </div>
      
      <div className="absolute -bottom-8 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;