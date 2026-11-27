import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const STORAGE_KEY = "scroll-positions";

const readSaved = (): Record<string, number> => {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

/**
 * Gestion du défilement entre les pages (BrowserRouter n'en fournit pas) :
 * - retour / avance du navigateur : on revient là où l'on était sur la page ;
 * - nouveau lien avec ancre (#contact…) : on va à l'ancre ;
 * - nouveau lien sans ancre : on repart du haut.
 * Les positions sont mémorisées par entrée d'historique (location.key) et
 * survivent à un rechargement grâce au sessionStorage.
 */
export function useScrollRestoration() {
  const location = useLocation();
  const navType = useNavigationType();
  // La première page ouverte et les ancres natives (#contact) n'ont pas de clé
  // propre (« default ») : on les distingue par leur adresse.
  const entryKey =
    location.key === "default" ? `default:${location.pathname}${location.hash}` : location.key;
  const keyRef = useRef(entryKey);
  const positions = useRef<Record<string, number>>({});

  // La clé courante change au moment du rendu de la nouvelle page, avant tout
  // événement « scroll » : la position de la page quittée n'est pas écrasée.
  useLayoutEffect(() => {
    keyRef.current = entryKey;
  }, [entryKey]);

  useEffect(() => {
    positions.current = readSaved();
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        positions.current[keyRef.current] = window.scrollY;
      });
    };
    const persist = () => {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions.current));
      } catch {
        /* stockage indisponible : la restauration marche quand même sans rechargement */
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", persist);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", persist);
      persist();
    };
  }, []);

  useEffect(() => {
    const saved = positions.current[entryKey];
    if (navType === "POP" && saved != null) {
      // « instant » : le CSS du site impose un défilement doux (scroll-behavior).
      // La page peut ne pas avoir encore sa hauteur finale : on réessaie quelques images.
      let tries = 0;
      let frame = requestAnimationFrame(function restore() {
        window.scrollTo({ top: saved, behavior: "instant" });
        if (Math.abs(window.scrollY - saved) > 2 && tries++ < 30) frame = requestAnimationFrame(restore);
      });
      return () => cancelAnimationFrame(frame);
    }
    if (location.hash) {
      document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      return;
    }
    if (navType !== "POP") {
      // Seconde remise à zéro à l'image suivante : la mise en page de la
      // nouvelle page peut encore décaler le défilement de quelques pixels.
      window.scrollTo({ top: 0, behavior: "instant" });
      const frame = requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
      return () => cancelAnimationFrame(frame);
    }
  }, [entryKey, location.hash, navType]);
}
