// Pré-rendu statique : après `vite build` (client) et `vite build --ssr`,
// écrit une page HTML complète par route (texte, <head> et JSON-LD propres),
// puis sitemap.xml, robots.txt et llms.txt. Les robots — Google comme les
// moteurs IA (GPTBot, ClaudeBot, PerplexityBot…) qui n'exécutent pas le
// JavaScript — reçoivent ainsi le contenu réel de chaque page.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const ssrEntry = fs
  .readdirSync(ssrDir)
  .find((f) => /^entry-server\.(m?js)$/.test(f));
if (!ssrEntry) throw new Error("dist-ssr/entry-server.js introuvable");

const {
  render,
  headTagsFor,
  INDEXABLE_ROUTES,
  ROUTES,
  SITE_URL,
  ALL_CITIES,
  WANEVENTS_FAQ,
  WASSA_FAQ,
} = await import(pathToFileURL(path.join(ssrDir, ssrEntry)).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-head-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("index.html : marqueurs <!--app-head--> ou #root absents");
}

const page = (route, url) => {
  const html = render(url);
  if (!html || html.length < 200) throw new Error(`Rendu vide pour ${url}`);
  return template
    .replace("<!--app-head-->", headTagsFor(route))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
};

const write = (rel, content) => {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log(`  ✓ ${rel} (${(Buffer.byteLength(content) / 1024).toFixed(1)} kB)`);
};

console.log("Pré-rendu :");
for (const route of INDEXABLE_ROUTES) {
  // "/" → index.html ; "/wan-events" → wan-events.html (servi en /wan-events
  // grâce à "cleanUrls" dans vercel.json).
  const file = route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`;
  write(file, page(route, route.path));
}
write("404.html", page(ROUTES.notFound, "/404"));

const today = new Date().toISOString().slice(0, 10);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${INDEXABLE_ROUTES.map(
  (r) => `  <url>
    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq ?? "monthly"}</changefreq>
    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>
    <image:image><image:loc>${SITE_URL}${r.ogImage}</image:loc></image:image>
  </url>`
).join("\n")}
</urlset>
`
);

const aiBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "meta-externalagent",
  "MistralAI-User",
];
write(
  "robots.txt",
  `# Robots des moteurs de recherche et des assistants IA : bienvenus.
User-agent: *
Allow: /
Disallow: /admin

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`
);

const faq = (items) =>
  items.map((i) => `### ${i.question}\n\n${i.answer}`).join("\n\n");

write(
  "llms.txt",
  `# Marco Douka – Wan'Events & Wassa Percussion

> Marco Douka est animateur d'événements et percussionniste, basé à Pornic (44210, Loire-Atlantique). Il propose deux activités : Wan'Events (quiz musical, blind test, karaoké, team building, maître de cérémonie pour mariages, soirées d'entreprise et festivals) et Wassa Percussion (spectacles et déambulations de percussions africaines, cours de djembé tous niveaux à Pornic, réparation de djembés). Zone d'intervention : Pornic, Pays de Retz, Saint-Brevin-les-Pins, Saint-Nazaire, Nantes et agglomération.

## Pages

- [Accueil](${SITE_URL}/): présentation des deux activités de Marco Douka.
- [Wan'Events](${SITE_URL}${ROUTES.wanEvents.path}): ${ROUTES.wanEvents.description}
- [Wassa Percussion](${SITE_URL}${ROUTES.wassa.path}): ${ROUTES.wassa.description}

## Zone d'intervention

Basé à Pornic. Se déplace à : ${ALL_CITIES.join(", ")}, dans tout le Pays de Retz et la Loire-Atlantique. Vendée et sud de la Bretagne sur demande.

## Wan'Events – questions fréquentes

${faq(WANEVENTS_FAQ)}

## Wassa Percussion – questions fréquentes

${faq(WASSA_FAQ)}
`
);
