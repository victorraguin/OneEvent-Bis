import React, { useState, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { useInView } from '../hooks/useInView';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  caption: string;
}

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  const galleryItems: GalleryItem[] = [
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/7096086/pexels-photo-7096086.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Wassa Percussion Live at Global Rhythms Festival',
    },
    {
      type: 'video',
      src: 'https://player.vimeo.com/video/367752291',
      thumbnail: 'https://images.pexels.com/photos/8412432/pexels-photo-8412432.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Traditional Djembe Performance',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/6173815/pexels-photo-6173815.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Community Workshop in Dakar',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/6173990/pexels-photo-6173990.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Cultural Exchange Program',
    },
    {
      type: 'video',
      src: 'https://player.vimeo.com/video/222732815',
      thumbnail: 'https://images.pexels.com/photos/5965705/pexels-photo-5965705.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Rhythms of West Africa',
    },
    {
      type: 'image',
      src: 'https://images.pexels.com/photos/8412423/pexels-photo-8412423.jpeg?auto=compress&cs=tinysrgb&w=1200',
      caption: 'Festival Performance',
    },
  ];

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" ref={sectionRef} className="section bg-background">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Gallery
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Experience the energy and passion of Wassa Percussion through our performances and workshops around the world.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div 
              key={index} 
              className={`cursor-pointer overflow-hidden rounded-lg transition-all duration-700 delay-${index * 100} ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              onClick={() => openModal(item)}
            >
              <div className="relative group image-zoom">
                <img 
                  src={item.type === 'video' ? item.thumbnail : item.src} 
                  alt={item.caption} 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {item.type === 'video' && (
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play size={24} className="text-background" />
                    </div>
                  )}
                </div>
              </div>
              <div className="p-4 bg-surface">
                <p className="text-text-primary font-medium">{item.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button 
            className="absolute top-4 right-4 text-white hover:text-primary z-10"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <X size={32} />
          </button>
          
          <div className="max-w-5xl w-full max-h-screen overflow-auto">
            {selectedItem.type === 'image' ? (
              <img 
                src={selectedItem.src} 
                alt={selectedItem.caption} 
                className="w-full h-auto"
              />
            ) : (
              <div className="relative pt-[56.25%]">
                <iframe 
                  src={`${selectedItem.src}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={selectedItem.caption}
                ></iframe>
              </div>
            )}
            <p className="text-white text-center mt-4">{selectedItem.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;