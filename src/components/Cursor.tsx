import React, { useEffect, useState } from 'react';
import { Drum } from 'lucide-react';

const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth > 768) {
      setHidden(false);
      
      const addEventListeners = () => {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
      };

      const removeEventListeners = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseenter', onMouseEnter);
        document.removeEventListener('mouseleave', onMouseLeave);
        document.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mouseup', onMouseUp);
      };

      const onMouseMove = (e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
      };

      const onMouseEnter = () => {
        setHidden(false);
      };

      const onMouseLeave = () => {
        setHidden(true);
      };

      const onMouseDown = () => {
        setClicked(true);
      };

      const onMouseUp = () => {
        setClicked(false);
      };

      // Track link and button hovers
      const handleLinkHoverEvents = () => {
        const links = document.querySelectorAll('a, button, input, .cursor-pointer');
        
        links.forEach(link => {
          link.addEventListener('mouseenter', () => setLinkHovered(true));
          link.addEventListener('mouseleave', () => setLinkHovered(false));
        });
      };

      addEventListeners();
      handleLinkHoverEvents();

      return () => {
        removeEventListeners();
      };
    }
  }, []);

  if (hidden) return null;

  return (
    <>
      <div 
        className={`fixed left-0 top-0 pointer-events-none z-[9999] mix-blend-difference ${
          clicked ? 'scale-90' : linkHovered ? 'scale-125' : 'scale-100'
        } transition-transform duration-200 transform -translate-x-1/2 -translate-y-1/2 text-white`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px` 
        }}
      >
        <Drum size={24} />
      </div>
      <div 
        className="fixed left-0 top-0 pointer-events-none z-[9998] w-10 h-10 rounded-full border border-white mix-blend-difference transition-transform duration-300"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : linkHovered ? 1.5 : 1})` 
        }}
      ></div>
    </>
  );
};

export default Cursor;