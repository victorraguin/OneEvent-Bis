import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Partners from './Partners';
import Testimonials from './Testimonials';
import About from './About';
import Events from './Events';
import Contact from './Contact';

const OneEvent: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <Events />
      <Partners />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default OneEvent;