import React, { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import MusicPlayer from "./components/MusicPlayer";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingSelector from "./components/LandingSelector";
import OneEvent from "./components/oneEvent";
import SocialSidebar from "./components/SocialSidebar";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";

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
    return (
      <ThemeProvider>
        <LandingSelector onSelect={handleSiteSelection} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div
          className={`min-h-screen bg-background text-text-primary transition-opacity duration-500 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <Routes>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={
              <>
                <Navbar currentSite={selectedSite} onSiteChange={handleSiteSelection} />
                <SocialSidebar />
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
              </>
            } />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;