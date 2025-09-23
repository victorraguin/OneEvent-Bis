import React, { useState, useRef, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase, GalleryItem } from "../lib/supabase";
import { useInView } from "../hooks/useInView";

const Gallery: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  React.useEffect(() => {
    const loadGallery = async () => {
      if (!supabase) return;

      try {
        const { data } = await supabase
          .from("gallery")
          .select("*")
          .eq("site", "wassa")
          .order("order_index", { ascending: true });

        if (data) {
          setGalleryItems(data);
        }
      } catch (error) {
        console.error("Error loading gallery:", error);
      }
    };

    loadGallery();
  }, []);

  // Fallback data if Supabase not configured
  const defaultGalleryItems: GalleryItem[] = [
    {
      id: "1",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion.jpg",
      caption: "Wassa Percussion – performance en live",
      order_index: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      site: "wassa",
      type: "video",
      src: "https://player.vimeo.com/video/367752291",
      thumbnail: "/WassaPercussion/Wassa_Percussion1.jpg",
      caption: "Performance traditionnelle de djembé",
      order_index: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion2.jpg",
      caption: "Atelier communautaire",
      order_index: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion3.jpg",
      caption: "Programme d'échange culturel",
      order_index: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      site: "wassa",
      type: "video",
      src: "https://player.vimeo.com/video/222732815",
      thumbnail: "/WassaPercussion/Wassa_Percussion4.jpg",
      caption: "Rythmes d'Afrique de l'Ouest",
      order_index: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion5.jpg",
      caption: "Performance en festival",
      order_index: 6,
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion_Djembe.jpg",
      caption: "Solo de djembé",
      order_index: 7,
      created_at: new Date().toISOString(),
    },
    {
      id: "8",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion_Groupe.jpg",
      caption: "Le groupe Wassa Percussion",
      order_index: 8,
      created_at: new Date().toISOString(),
    },
    {
      id: "9",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion_Initiation.jpg",
      caption: "Initiation percussions",
      order_index: 9,
      created_at: new Date().toISOString(),
    },
    {
      id: "10",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion_Initiation_2.jpg",
      caption: "Atelier d'initiation",
      order_index: 10,
      created_at: new Date().toISOString(),
    },
    {
      id: "11",
      site: "wassa",
      type: "image",
      src: "/WassaPercussion/Wassa_Percussion_Moutier.jpg",
      caption: "Concert à Moutier",
      order_index: 11,
      created_at: new Date().toISOString(),
    },
  ];

  const itemsToShow =
    galleryItems.length > 0 ? galleryItems : defaultGalleryItems;

  const openModal = (item: GalleryItem, index?: number) => {
    setSelectedItem(item);
    const itemIndex =
      index ??
      itemsToShow.findIndex(
        (i) =>
          i.id === item.id ||
          itemsToShow.indexOf(i) === itemsToShow.indexOf(item)
      );
    setSelectedItemIndex(itemIndex);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    const newIndex =
      selectedItemIndex > 0 ? selectedItemIndex - 1 : itemsToShow.length - 1;
    setSelectedItemIndex(newIndex);
    setSelectedItem(itemsToShow[newIndex]);
  };

  const goToNext = () => {
    const newIndex =
      selectedItemIndex < itemsToShow.length - 1 ? selectedItemIndex + 1 : 0;
    setSelectedItemIndex(newIndex);
    setSelectedItem(itemsToShow[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedItem) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNext();
      } else if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
      }
    };

    if (selectedItem) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [selectedItem, selectedItemIndex, itemsToShow]);

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < maxScroll - 1);
    }
  };

  const getCurrentGapPx = (container: HTMLDivElement) => {
    const style = window.getComputedStyle(container);
    const raw = (style as any).gap || style.columnGap || "0";
    const parsed = parseFloat(raw as string);
    return isNaN(parsed) ? 24 : parsed;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const gap = getCurrentGapPx(container);
      const scrollAmount = itemWidth + gap;
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300); // Update after scroll animation
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.children[0]?.clientWidth || 0;
      const gap = getCurrentGapPx(container);
      const scrollAmount = itemWidth + gap;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300); // Update after scroll animation
    }
  };

  // Initialize scroll buttons and add scroll listener
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      updateScrollButtons();

      const handleScroll = () => {
        updateScrollButtons();
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [itemsToShow]);

  // Auto-scroll effect
  React.useEffect(() => {
    if (!isHovered && scrollContainerRef.current) {
      const interval = setInterval(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const itemWidth = container.children[0]?.clientWidth || 0;
        const gap = getCurrentGapPx(container);
        const scrollAmount = itemWidth + gap;
        const maxScroll = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScroll - 10) {
          // Reset to beginning when reaching the end
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 2000); // Scroll every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <section id="gallery" ref={sectionRef} className="section bg-background">
      <div className="container-custom">
        <h2 className="text-primary mb-4 relative inline-block">
          Galerie
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Découvrez l'énergie et la passion de Wassa Percussion à travers nos
          performances et ateliers dans le monde entier.
        </p>

        {/* Carrousel Container */}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Buttons */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Précédent"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 shadow-xl opacity-0 group-hover:opacity-100 hover:scale-110"
              aria-label="Suivant"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Grid Gallery on mobile, carousel on md+ */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {itemsToShow.map((item, index) => (
              <button
                key={item.id || index}
                className={`cursor-pointer overflow-hidden rounded-lg optimized-transition transition-all duration-500 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                onClick={() => openModal(item, index)}
              >
                <div className="relative group image-zoom">
                  <img
                    src={item.type === "video" ? item.thumbnail : item.src}
                    alt={item.caption}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {item.type === "video" && (
                      <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                        <Play size={18} className="text-background" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div
            ref={scrollContainerRef}
            className="hidden md:flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {itemsToShow.map((item, index) => (
              <div
                key={item.id || index}
                className={`cursor-pointer overflow-hidden rounded-lg optimized-transition transition-all duration-500 flex-shrink-0 w-72 md:w-80 delay-${Math.min(
                  index * 75,
                  400
                )} ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                onClick={() => openModal(item, index)}
              >
                <div className="relative group image-zoom">
                  <img
                    src={item.type === "video" ? item.thumbnail : item.src}
                    alt={item.caption}
                    className="w-full h-64 md:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {item.type === "video" && (
                      <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                        <Play size={24} className="text-background" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4 bg-surface">
                  <p className="text-text-primary font-medium text-sm">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

          {/* Navigation buttons */}
          {itemsToShow.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                onClick={goToPrevious}
                aria-label="Image précédente"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                onClick={goToNext}
                aria-label="Image suivante"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full max-h-screen overflow-auto">
            {selectedItem.type === "image" ? (
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
            <div className="text-center mt-4">
              <p className="text-white mb-2">{selectedItem.caption}</p>
              <p className="text-gray-400 text-sm">
                {selectedItemIndex + 1} / {itemsToShow.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
