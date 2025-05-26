import React, { useState } from 'react';

interface LandingSelectorProps {
  onSelect: (site: 'wassa' | 'oneEvent') => void;
}

const LandingSelector: React.FC<LandingSelectorProps> = ({ onSelect }) => {
  const [hoveredSite, setHoveredSite] = useState<'wassa' | 'oneEvent' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (site: 'wassa' | 'oneEvent') => {
    setIsTransitioning(true);
    onSelect(site);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Wassa Percussion */}
        <div 
          className={`relative w-full md:w-1/2 h-[50vh] md:h-screen cursor-pointer group transition-all duration-700 ${
            hoveredSite === 'oneEvent' ? 'md:w-1/3 opacity-50' : hoveredSite === 'wassa' ? 'md:w-2/3' : ''
          } ${isTransitioning ? 'scale-95 opacity-0' : ''}`}
          onClick={() => handleSelect('wassa')}
          onMouseEnter={() => setHoveredSite('wassa')}
          onMouseLeave={() => setHoveredSite(null)}
        >
          <img 
            src="https://images.pexels.com/photos/6173860/pexels-photo-6173860.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Wassa Percussion" 
            className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
              <h1 className="text-4xl md:text-6xl font-display text-white mb-4">
                WASSA PERCUSSION
              </h1>
              <p className="text-lg text-text-secondary">
                Découvrez les Rythmes Africains
              </p>
            </div>
          </div>
        </div>

        {/* One Event */}
        <div 
          className={`relative w-full md:w-1/2 h-[50vh] md:h-screen cursor-pointer group transition-all duration-700 ${
            hoveredSite === 'wassa' ? 'md:w-1/3 opacity-50' : hoveredSite === 'oneEvent' ? 'md:w-2/3' : ''
          } ${isTransitioning ? 'scale-95 opacity-0' : ''}`}
          onClick={() => handleSelect('oneEvent')}
          onMouseEnter={() => setHoveredSite('oneEvent')}
          onMouseLeave={() => setHoveredSite(null)}
        >
          <img 
            src="https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="One Event" 
            className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center transform transition-transform duration-500 group-hover:scale-110">
              <h1 className="text-4xl md:text-6xl font-display text-white mb-4">
                ONE EVENT
              </h1>
              <p className="text-lg text-text-secondary">
                Expériences Événementielles Uniques
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSelector;