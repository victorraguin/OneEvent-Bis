import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import MusicPlayer from "./components/MusicPlayer";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingSelector from "./components/LandingSelector";
import OneEvent from "./components/OneEvent";

function App() {
  const [selectedSite, setSelectedSite] = useState<"wassa" | "oneEvent" | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSiteSelection = (site: "wassa" | "oneEvent") => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedSite(site);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 500);
  };

  if (!selectedSite) {
    return <LandingSelector onSelect={handleSiteSelection} />;
  }

  return (
    <div
      className={`min-h-screen bg-background text-text-primary transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <Navbar currentSite={selectedSite} onSiteChange={handleSiteSelection} />
      {selectedSite === "wassa" ? (
        <>
          <main>
            <Hero />
            <About />
            <Gallery />
            <Events />
            <MusicPlayer />
            <Contact />
          </main>
          <Footer />
        </>
      ) : (
        <OneEvent />
      )}
    </div>
  );
}

export default App;
