import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";

function AppContent() {
  const location = useLocation();
  const [selectedSite, setSelectedSite] = useState<"wassa" | "oneEvent" | null>(
    null
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Si on est sur une route admin, ne pas afficher le sélecteur
  const isAdminRoute = location.pathname.startsWith("/admin");

  const handleSiteSelection = (site: "wassa" | "oneEvent") => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedSite(site);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  // Afficher le sélecteur seulement si pas de site sélectionné ET pas sur route admin
  if (!selectedSite && !isAdminRoute) {
    return <LandingSelector onSelect={handleSiteSelection} />;
  }

  return (
    <div
      className={`min-h-screen bg-background text-text-primary transition-opacity duration-1000 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <Routes>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/"
          element={
            <>
              {selectedSite && (
                <>
                  <Navbar
                    currentSite={selectedSite}
                    onSiteChange={handleSiteSelection}
                  />
                  <SocialSidebar />
                  {selectedSite === "wassa" ? (
                    <>
                      <main>
                        <Hero />
                        <About />
                        <Prestations />
                        <Gallery />
                        {/* Bloc Réservez côté Wassa avec photo Wassa */}
                        <WassaBooking />
                      </main>
                      <Footer />
                      {/* Mini lecteur Radio Wassa */}
                      <WassaRadio />
                    </>
                  ) : (
                    <OneEvent />
                  )}
                </>
              )}
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
