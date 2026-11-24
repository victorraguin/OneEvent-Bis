import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Prestations from "./components/Prestations";
import WassaBooking from "./components/WassaBooking";
import Footer from "./components/Footer";
import WassaRadio from "./components/WassaRadio";
import LandingSelector from "./components/LandingSelector";
import OneEvent from "./components/oneEvent";
import SocialSidebar from "./components/SocialSidebar";
import Faq from "./components/seo/Faq";
import ServiceArea from "./components/seo/ServiceArea";
import NotFound from "./components/seo/NotFound";
import { ROUTES, WASSA_FAQ, routeForPath } from "./seo/site";
import { useRouteMeta } from "./seo/useRouteMeta";

type Site = "wassa" | "oneEvent";

const pathFor = (site: Site) =>
  site === "wassa" ? ROUTES.wassa.path : ROUTES.wanEvents.path;

const WassaPage: React.FC<{ onSiteChange: (s: Site) => void }> = ({
  onSiteChange,
}) => (
  <>
    <Navbar currentSite="wassa" onSiteChange={onSiteChange} />
    <SocialSidebar />
    <main>
      <Hero />
      <About />
      <Prestations />
      <Gallery />
      <ServiceArea
        brand="Wassa Percussion"
        intro="Spectacles, déambulations et initiations aux percussions africaines dans le sud de la Loire-Atlantique : Wassa Percussion joue de Pornic à Nantes, en passant par Saint-Brevin-les-Pins, Saint-Nazaire et tout le Pays de Retz."
      />
      <Faq items={WASSA_FAQ} />
      <WassaBooking />
    </main>
    <Footer />
    <WassaRadio />
  </>
);

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useRouteMeta(routeForPath(location.pathname));

  // Arrivée sur une ancre (#contact…) depuis une autre page.
  useEffect(() => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    el?.scrollIntoView();
  }, [location.pathname, location.hash]);

  const handleSiteSelection = (site: Site) => {
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      navigate(pathFor(site));
      setIsTransitioning(false);
    }, 200);
  };

  const handleSiteChange = (site: Site) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => navigate(pathFor(site)), 100);
  };

  return (
    <div
      className={`min-h-screen bg-background text-text-primary transition-opacity duration-1000 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={<LandingSelector onSelect={handleSiteSelection} />}
        />
        <Route
          path={ROUTES.wassa.path}
          element={<WassaPage onSiteChange={handleSiteChange} />}
        />
        <Route
          path={ROUTES.wanEvents.path}
          element={
            <>
              <Navbar currentSite="oneEvent" onSiteChange={handleSiteChange} />
              <SocialSidebar />
              <OneEvent />
            </>
          }
        />
        {/* Anciennes adresses : redirigées (redirection permanente côté Vercel, voir vercel.json). */}
        <Route path="/wassa" element={<Navigate to={ROUTES.wassa.path} replace />} />
        <Route path="/wanevents" element={<Navigate to={ROUTES.wanEvents.path} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
