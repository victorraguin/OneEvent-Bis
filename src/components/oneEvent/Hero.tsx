import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url("/OneEvent/OneEvent_Marco_Animation.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-display mb-6">
          WAN'EVENT
        </h1>
        <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-2xl mx-auto">
          Créateur d'Expériences de Divertissement Inoubliables
        </p>
        <a href="#contact" className="btn btn-primary">
          Réserver un Événement
        </a>
      </div>
    </section>
  );
};

export default Hero;