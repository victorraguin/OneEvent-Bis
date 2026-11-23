import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { headTagsFor } from "./seo/head";
import {
  ALL_CITIES,
  INDEXABLE_ROUTES,
  ROUTES,
  SITE_URL,
  WANEVENTS_FAQ,
  WASSA_FAQ,
} from "./seo/site";

/** Rendu HTML d'une URL, utilisé uniquement au build par scripts/prerender.mjs. */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>
  );
}

export { headTagsFor, INDEXABLE_ROUTES, ROUTES, SITE_URL, ALL_CITIES, WANEVENTS_FAQ, WASSA_FAQ };
