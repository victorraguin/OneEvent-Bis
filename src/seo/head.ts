import { absoluteUrl, HOME_BASE, jsonLdFor, OG_IMAGE, OG_IMAGE_ALT, RouteMeta } from "./site";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Balises <head> propres à une page, injectées au pré-rendu. */
export function headTagsFor(route: RouteMeta): string {
  const url = absoluteUrl(route.path);
  const image = absoluteUrl(route.ogImage);
  const jsonLd = jsonLdFor(route);
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    route.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    route.noindex ? "" : `<link rel="canonical" href="${url}" />`,
    route.noindex ? "" : `<link rel="alternate" hreflang="fr-FR" href="${url}" />`,
    `<meta name="geo.region" content="FR-44" />`,
    HOME_BASE.locality ? `<meta name="geo.placename" content="${esc(HOME_BASE.locality)}" />` : "",
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Wan'Events – Marco Douka" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    ...(route.ogImage === OG_IMAGE
      ? [
          `<meta property="og:image:width" content="1200" />`,
          `<meta property="og:image:height" content="630" />`,
          `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
          `<meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
        ]
      : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    route.preloadImage
      ? `<link rel="preload" as="image" href="${route.preloadImage}" fetchpriority="high" />`
      : "",
    jsonLd
      ? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`
      : "",
  ];
  return tags.filter(Boolean).join("\n    ");
}
