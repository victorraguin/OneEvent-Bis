import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/seo/NotFound";
import WanEventsPage from "./pages/WanEventsPage";
import ServicePage from "./pages/ServicePage";
import LegalPage from "./pages/LegalPage";
import { SERVICE_PAGES } from "./seo/pages";
import { ROUTES, routeForPath } from "./seo/site";
import { useRouteMeta } from "./seo/useRouteMeta";
import { useScrollRestoration } from "./hooks/useScrollRestoration";

/**
 * Anciennes adresses renvoyées vers l'accueil (redirection côté Vercel aussi,
 * voir vercel.json). Les pages Wassa Percussion vivent désormais dans un autre dépôt.
 */
const OLD_PATHS = [
  "/wan-events",
  "/wanevents",
  "/wassa",
  "/wassa-percussion",
  "/spectacle-percussions-africaines",
  "/cours-djembe",
  "/reparation-djembe",
];

export function AppRoutes() {
  const location = useLocation();

  useRouteMeta(routeForPath(location.pathname));

  // Haut de page sur un nouveau lien, ancre si demandée, position d'origine au retour.
  useScrollRestoration();

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Routes>
        <Route path={ROUTES.wanEvents.path} element={<WanEventsPage />} />
        {SERVICE_PAGES.map((p) => (
          <Route key={p.key} path={p.path} element={<ServicePage page={p} />} />
        ))}
        <Route path={ROUTES.legal.path} element={<LegalPage />} />
        {OLD_PATHS.map((path) => (
          <Route key={path} path={path} element={<Navigate to={ROUTES.wanEvents.path} replace />} />
        ))}
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
