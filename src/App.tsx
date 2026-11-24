import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LandingSelector from "./components/LandingSelector";
import NotFound from "./components/seo/NotFound";
import WanEventsPage from "./pages/WanEventsPage";
import WassaPage from "./pages/WassaPage";
import { ROUTES, routeForPath } from "./seo/site";
import { useRouteMeta } from "./seo/useRouteMeta";

type Site = "wassa" | "oneEvent";

const pathFor = (site: Site) =>
  site === "wassa" ? ROUTES.wassa.path : ROUTES.wanEvents.path;

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useRouteMeta(routeForPath(location.pathname));

  // Changement de page : on repart du haut, ou de l'ancre (#contact…) demandée.
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
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
          element={<WassaPage />}
        />
        <Route
          path={ROUTES.wanEvents.path}
          element={<WanEventsPage />}
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
