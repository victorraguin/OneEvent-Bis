import { useEffect } from "react";
import { absoluteUrl, RouteMeta } from "./site";

const setMeta = (selector: string, attr: string, value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Met à jour le <head> lors d'une navigation côté client. Le premier rendu est
 * déjà correct grâce au pré-rendu (scripts/prerender.mjs) ; ce hook garde le
 * titre, la description et l'URL canonique justes quand on passe d'une page à
 * l'autre sans recharger.
 */
export function useRouteMeta(route: RouteMeta) {
  useEffect(() => {
    document.title = route.title;
    setMeta('meta[name="description"]', "content", route.description);
    setMeta('link[rel="canonical"]', "href", absoluteUrl(route.path));
    setMeta('meta[property="og:url"]', "content", absoluteUrl(route.path));
    setMeta('meta[property="og:title"]', "content", route.title);
    setMeta('meta[property="og:description"]', "content", route.description);
    setMeta('meta[property="og:image"]', "content", absoluteUrl(route.ogImage));
    setMeta('meta[name="twitter:title"]', "content", route.title);
    setMeta('meta[name="twitter:description"]', "content", route.description);
    setMeta('meta[name="twitter:image"]', "content", absoluteUrl(route.ogImage));
    setMeta(
      'meta[name="robots"]',
      "content",
      route.noindex ? "noindex, follow" : "index, follow, max-image-preview:large, max-snippet:-1"
    );
  }, [route]);
}
