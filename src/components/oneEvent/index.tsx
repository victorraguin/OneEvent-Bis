import React from "react";
import Hero from "./Hero";
import Services from "./Services";
import Partners from "./Partners";
import Testimonials from "./Testimonials";
import About from "./About";
import Gallery from "./Gallery";
// import Events from "./Events";
import Contact from "./Contact";
import Footer from "./Footer";
import Faq from "../seo/Faq";
import ServiceArea from "../seo/ServiceArea";
import { WANEVENTS_FAQ } from "../../seo/site";

const OneEvent: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Partners />
      <Testimonials />
      <ServiceArea
        brand="Wan'Events"
        intro="Mariages, anniversaires, soirées d'entreprise, séminaires ou festivals : Marco Douka se déplace avec son matériel d'animation dans tout le sud de la Loire-Atlantique, de Pornic à Nantes."
      />
      <Faq items={WANEVENTS_FAQ} />
      <Contact />
      <Footer />
    </main>
  );
};

export default OneEvent;
