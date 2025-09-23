import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
// import Events from "./components/Events";
import Prestations from "./components/Prestations";
import MusicPlayer from "./components/MusicPlayer";
import Contact from "./components/Contact";
import OneEventContact from "./components/oneEvent/Contact";
import WassaBooking from "./components/WassaBooking";
import Footer from "./components/Footer";
import WassaRadio from "./components/WassaRadio";
import LandingSelector from "./components/LandingSelector";
import OneEvent from "./components/oneEvent";
import SocialSidebar from "./components/SocialSidebar";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<"wassa" | "oneEvent" | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSiteSelection = (site: "wassa" | "oneEvent") => {
    setIsTransitioning(true);
    const targetPath = site === "wassa" ? "/wassa-percussion" : "/wan-events";

    // Scroll vers le haut
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setTimeout(() => {
      navigate(targetPath);
      setIsTransitioning(false);
    }, 200);
  };

  // Pour les routes spécifiques, on passera la fonction de navigation via les props
  const handleSiteChange = (site: "wassa" | "oneEvent") => {
    const targetPath = site === "wassa" ? "/wassa-percussion" : "/wan-events";

    // Scroll vers le haut avant de naviguer
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Navigation avec un petit délai pour que le scroll commence
    setTimeout(() => {
      navigate(targetPath);
    }, 100);
  };

  return (
    <div
      className={`min-h-screen bg-background text-text-primary transition-opacity duration-1000 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <Routes>
        {/* Route principale avec sélecteur */}
        <Route
          path="/"
          element={<LandingSelector onSelect={handleSiteSelection} />}
        />

        {/* Routes pour Wassa Percussion */}
        <Route
          path="/wassa"
          element={
            <>
              <Navbar currentSite="wassa" onSiteChange={handleSiteChange} />
              <SocialSidebar />
              <main>
                <Hero />
                <About />
                <Prestations />
                <Gallery />
                <WassaBooking />
              </main>
              <Footer />
              <WassaRadio />
            </>
          }
        />
        <Route
          path="/wassa-percussion"
          element={
            <>
              <Navbar currentSite="wassa" onSiteChange={handleSiteChange} />
              <SocialSidebar />
              <main>
                <Hero />
                <About />
                <Prestations />
                <Gallery />
                <WassaBooking />
              </main>
              <Footer />
              <WassaRadio />
            </>
          }
        />

        {/* Routes pour Wan'Events */}
        <Route
          path="/wanevents"
          element={
            <>
              <Navbar currentSite="oneEvent" onSiteChange={handleSiteChange} />
              <SocialSidebar />
              <OneEvent />
            </>
          }
        />
        <Route
          path="/wan-events"
          element={
            <>
              <Navbar currentSite="oneEvent" onSiteChange={handleSiteChange} />
              <SocialSidebar />
              <OneEvent />
            </>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
