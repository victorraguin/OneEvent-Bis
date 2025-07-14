import React, { useState, useRef } from 'react';
import { Play, X } from 'lucide-react';
import { supabase, GalleryItem } from '../lib/supabase';
import { useInView } from '../hooks/useInView';

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  React.useEffect(() => {
    const loadGallery = async () => {
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('gallery')
          .select('*')
          .eq('site', 'wassa')
          .order('order_index', { ascending: true });
        
        if (data) {
          setGalleryItems(data);
        }
      } catch (error) {
        console.error('Error loading gallery:', error);
      }
    };

    loadGallery();
  }, []);

  // Fallback data if Supabase not configured
  const defaultGalleryItems: GalleryItem[] = [
    {
      id: '1',
      site: 'wassa',
      type: 'image',
      src: '/WassaPercussion/Wassa_Percussion.jpg',
      caption: 'Wassa Percussion Live au Festival Global Rhythms',
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      site: 'wassa',
      type: 'video',
      src: 'https://player.vimeo.com/video/367752291',
      thumbnail: '/WassaPercussion/Wassa_Percussion1.jpg',
      caption: 'Performance Traditionnelle de Djembé',
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      site: 'wassa',
      type: 'image',
      src: '/WassaPercussion/Wassa_Percussion2.jpg',
      caption: 'Atelier Communautaire à Dakar',
      order_index: 3,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      site: 'wassa',
      type: 'image',
      src: '/WassaPercussion/Wassa_Percussion3.jpg',
      caption: 'Programme d\'Échange Culturel',
      order_index: 4,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      site: 'wassa',
      type: 'video',
      src: 'https://player.vimeo.com/video/222732815',
      thumbnail: '/WassaPercussion/Wassa_Percussion4.jpg',
      caption: 'Rythmes d\'Afrique de l\'Ouest',
      order_index: 5,
      created_at: new Date().toISOString()
    },
    {
      id: '6',
      site: 'wassa',
      type: 'image',
      src: '/WassaPercussion/Wassa_Percussion5.jpg',
      caption: 'Performance Festival',
      order_index: 6,
      created_at: new Date().toISOString()
    },
  ];

  const itemsToShow = galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

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
          Galerie
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Découvrez l'énergie et la passion de Wassa Percussion à travers nos performances et ateliers dans le monde entier.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {itemsToShow.map((item, index) => (
            <div 
              key={item.id || index} 
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
            aria-label="Fermer"
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