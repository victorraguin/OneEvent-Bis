// Source unique des informations SEO du site : URL, zone d'intervention,
// métadonnées par page, FAQ et données structurées (JSON-LD).
// Utilisée à la fois par les composants (texte visible) et par le pré-rendu
// (balises <head>, sitemap.xml, llms.txt), pour que les deux ne divergent jamais.
// Les pages par prestation et par ville sont décrites dans ./pages.ts.
import { SERVICE_PAGES, ServicePageData } from "./pages";
import { OG_IMAGE } from "./og";
export { OG_IMAGE, OG_IMAGE_ALT } from "./og";

export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ||
  "https://marco-douka.fr"
).replace(/\/$/, "");

/**
 * Coordonnées publiées dans les données structurées.
 * Laisser `null` tant que la vraie valeur n'est pas connue : une coordonnée
 * fausse dans le JSON-LD est pire qu'une coordonnée absente (Google Business
 * Profile et les moteurs IA croisent ces informations).
 */
export const CONTACT = {
  phone: "+33643279320",
  email: "marcodouka9@gmail.com",
  // Liens vers les VRAIS profils publics (Facebook, Instagram, YouTube,
  // fiche Google Business…), à renseigner une fois vérifiés.
  sameAs: [] as string[],
};

/** Coordonnées affichées sur les pages (boutons « Appeler », formulaire…). */
export const DISPLAY_CONTACT = {
  phone: CONTACT.phone,
  wanEventsEmail: CONTACT.email,
};

/** « +33643279320 » → « 06 43 27 93 20 » (format français affiché). */
export const formatPhone = (e164: string) =>
  e164.replace(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, "0$1 $2 $3 $4 $5");

/**
 * Mentions légales (loi LCEN). Champs à `null` = à compléter avant la mise en
 * ligne : la page les affiche « à compléter » et le build émet un avertissement.
 */
export const LEGAL = {
  publisher: "Marco Douka",
  tradeName: "Wan'Events",
  status: null as string | null, // ex. « Entrepreneur individuel (micro-entreprise) »
  siret: null as string | null, // 14 chiffres
  address: null as string | null, // adresse professionnelle ou de domiciliation
  host: {
    name: "Vercel Inc.",
    address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
    url: "https://vercel.com",
  },
};

export const LEGAL_MISSING = (["status", "siret", "address"] as const).filter((k) => !LEGAL[k]);

/** Compte Instagram de Marco : navigation, bouton flottant et pied de page. */
export const SOCIAL = {
  marcoInstagram: "https://www.instagram.com/marco_anim",
  marcoInstagramHandle: "@marco_anim",
};

/**
 * Domicile de Marco : entre Nantes et Pornic, à égale distance de Nantes et
 * de Saint-Nazaire. Commune exacte à renseigner (adresse JSON-LD et
 * geo.placename) ; tant qu'elle vaut `null`, seuls le département et la
 * région sont publiés.
 */
export const HOME_BASE = {
  locality: null as string | null,
  postalCode: null as string | null,
  region: "Pays de la Loire",
  department: "Loire-Atlantique",
  country: "FR",
};

/**
 * Zone d'intervention. Cible SEO n° 1 : Nantes et Saint-Nazaire, là où sont
 * les entreprises (séminaires, soirées d'entreprise, team building).
 */
export const SERVICE_AREA = {
  core: ["Nantes", "Saint-Nazaire"],
  nantesArea: [
    "Saint-Herblain",
    "Rezé",
    "Orvault",
    "Carquefou",
    "Saint-Sébastien-sur-Loire",
    "Vertou",
    "Bouguenais",
    "Couëron",
    "La Chapelle-sur-Erdre",
  ],
  saintNazaireArea: [
    "Pornichet",
    "La Baule-Escoublac",
    "Guérande",
    "Montoir-de-Bretagne",
    "Trignac",
    "Donges",
  ],
  paysDeRetz: [
    "Pornic",
    "Saint-Brevin-les-Pins",
    "La Bernerie-en-Retz",
    "Les Moutiers-en-Retz",
    "Préfailles",
    "La Plaine-sur-Mer",
    "Saint-Michel-Chef-Chef",
    "Chaumes-en-Retz",
    "Saint-Père-en-Retz",
    "Paimbœuf",
    "Sainte-Pazanne",
    "Machecoul-Saint-Même",
    "Villeneuve-en-Retz",
  ],
};

export const ALL_CITIES = [
  ...SERVICE_AREA.core,
  ...SERVICE_AREA.nantesArea,
  ...SERVICE_AREA.saintNazaireArea,
  ...SERVICE_AREA.paysDeRetz,
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const WANEVENTS_FAQ: FaqItem[] = [
  {
    question: "Quelles animations proposez-vous aux entreprises à Nantes et Saint-Nazaire ?",
    answer:
      "Pour les entreprises, j'anime des séminaires, des soirées d'entreprise et des fêtes de fin d'année : quiz musical, blind test, karaoké, et des jeux comme le défi piment ou les tournois Mario Kart et FIFA. Je propose aussi du team building autour du djembé, et je peux tenir le micro comme speaker ou maître de cérémonie. J'interviens à Nantes, à Saint-Nazaire et dans toute la Loire-Atlantique.",
  },
  {
    question: "Pouvez-vous créer une animation sur mesure ?",
    answer:
      "Oui. Les animations du site sont des exemples. Si vous avez un jeu, un thème ou un format en tête, dites-le-moi : je m'adapte et on le construit ensemble pour votre événement.",
  },
  {
    question: "Dans quelles villes intervenez-vous ?",
    answer:
      "Je me déplace facilement sur toute la zone : Nantes et son agglomération (Saint-Herblain, Rezé, Orvault, Carquefou…), Saint-Nazaire et la presqu'île (Pornichet, La Baule, Guérande…), Pornic et le Pays de Retz. Je vais aussi en Vendée et en Bretagne.",
  },
  {
    question: "Pour quels types d'événements faire appel à Wan'Events ?",
    answer:
      "Surtout pour les événements d'entreprise : séminaires, soirées d'entreprise, team building, fêtes de fin d'année. J'anime aussi des mariages, des anniversaires et des festivals.",
  },
  {
    question: "Comment réserver une animation ?",
    answer:
      "Appelez-moi ou écrivez-moi depuis la section Contact, en indiquant la date, le lieu et le type d'événement. Je vous rappelle et je vous envoie un devis.",
  },
];

export type RouteKey = "wanEvents" | "legal" | "notFound";

export interface RouteMeta {
  /** Clé d'une page principale (RouteKey) ou d'une page de prestation (pages.ts). */
  key: string;
  path: string;
  title: string;
  description: string;
  ogImage: string;
  /** Image principale de la page, préchargée pour le LCP. */
  preloadImage?: string;
  noindex?: boolean;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: number;
}

export const ROUTES: Record<RouteKey, RouteMeta> = {
  // Page d'accueil = Wan'Events (Wassa Percussion vit désormais dans un autre dépôt).
  wanEvents: {
    key: "wanEvents",
    path: "/",
    title: "Wan'Events – Marco Douka, animateur à Nantes et Saint-Nazaire",
    description:
      "Animateur et speaker à Nantes et Saint-Nazaire : séminaires, soirées d'entreprise, team building, quiz, karaoké, jeux et défis. Mariages et fêtes aussi.",
    ogImage: OG_IMAGE,
    preloadImage: "/OneEvent/OneEvent_Marco_Animation.webp",
    changefreq: "monthly",
    priority: 1,
  },
  legal: {
    key: "legal",
    path: "/mentions-legales",
    title: "Mentions légales – Wan'Events",
    description: "Mentions légales et données personnelles du site Wan'Events de Marco Douka.",
    ogImage: OG_IMAGE,
    noindex: true,
  },
  notFound: {
    key: "notFound",
    path: "/404",
    title: "Page introuvable – Marco Douka",
    description: "Cette page n'existe pas.",
    ogImage: OG_IMAGE,
    noindex: true,
  },
};

export const INDEXABLE_ROUTES: RouteMeta[] = [ROUTES.wanEvents, ...SERVICE_PAGES];

export function routeForPath(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return [...INDEXABLE_ROUTES, ROUTES.legal].find((r) => r.path === clean) ?? ROUTES.notFound;
}

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// ---------------------------------------------------------------------------
// Données structurées (schema.org)
// ---------------------------------------------------------------------------

const ID = {
  website: `${SITE_URL}/#website`,
  marco: `${SITE_URL}/#marco-douka`,
  wanEvents: `${SITE_URL}/#business`,
};

const address = {
  "@type": "PostalAddress",
  ...(HOME_BASE.locality ? { addressLocality: HOME_BASE.locality } : {}),
  ...(HOME_BASE.postalCode ? { postalCode: HOME_BASE.postalCode } : {}),
  addressRegion: HOME_BASE.region,
  addressCountry: HOME_BASE.country,
};

const areaServed = [
  ...ALL_CITIES.map((name) => ({ "@type": "City", name })),
  { "@type": "AdministrativeArea", name: "Pays de Retz" },
  { "@type": "AdministrativeArea", name: "Loire-Atlantique" },
];

const contactFields = () => ({
  ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
  ...(CONTACT.email ? { email: CONTACT.email } : {}),
});

const offer = (name: string, description: string) => ({
  "@type": "Offer",
  itemOffered: { "@type": "Service", name, description, areaServed },
});

const marco = {
  "@type": "Person",
  "@id": ID.marco,
  name: "Marco Douka",
  jobTitle: "Animateur événementiel, speaker et percussionniste",
  url: SITE_URL,
  image: absoluteUrl("/OneEvent/OneEvent_Marco.jpg"),
  homeLocation: { "@type": "Place", address },
  knowsAbout: [
    "Animation d'événements",
    "Animation de séminaires et soirées d'entreprise",
    "Speaker événementiel",
    "Quiz musical",
    "Blind test",
    "Karaoké",
    "Team building",
    "Djembé",
  ],
  worksFor: [{ "@id": ID.wanEvents }],
  sameAs: [SOCIAL.marcoInstagram, ...CONTACT.sameAs],
};

const wanEvents = {
  "@type": "EntertainmentBusiness",
  "@id": ID.wanEvents,
  name: "Wan'Events",
  alternateName: "Wan'Events by Marco Douka",
  description: ROUTES.wanEvents.description,
  url: absoluteUrl(ROUTES.wanEvents.path),
  image: absoluteUrl("/OneEvent/WanEvents_Marco_Foot_Animation.jpg"),
  founder: { "@id": ID.marco },
  address,
  areaServed,
  ...contactFields(),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Animations Wan'Events",
    itemListElement: [
      offer("Animation de séminaire et soirée d'entreprise", "Animation de séminaires, soirées d'entreprise et fêtes de fin d'année à Nantes et Saint-Nazaire."),
      offer("Quiz musical et blind test", "Quiz et blind tests pour soirées privées, mariages et événements d'entreprise."),
      offer("Jeux et défis", "Défi piment, tournois Mario Kart et FIFA, doublage de film et soirées « Adopte mon ou ma pote » animés au micro."),
      offer("Soirée karaoké", "Soirées karaoké animées par Marco Douka."),
      offer("Team building percussion", "Ateliers de percussion en équipe pour la cohésion des entreprises."),
      offer("Speaker et maître de cérémonie", "Animation micro d'événements d'entreprise, d'événements sportifs, de festivals et de mariages."),
    ],
  },
};

const website = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: "Wan'Events – Marco Douka",
  inLanguage: "fr-FR",
  publisher: { "@id": ID.marco },
};

const faqPage = (items: FaqItem[], path: string) => ({
  "@type": "FAQPage",
  "@id": `${absoluteUrl(path)}#faq`,
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.question,
    acceptedAnswer: { "@type": "Answer", text: i.answer },
  })),
});

const breadcrumb = (...items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

const servicePageGraph = (p: ServicePageData) => {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${absoluteUrl(p.path)}#service`,
        name: p.serviceName,
        serviceType: p.serviceName,
        description: p.description,
        url: absoluteUrl(p.path),
        image: absoluteUrl(p.ogImage),
        provider: { "@id": ID.wanEvents },
        areaServed,
      },
      wanEvents,
      marco,
      faqPage(p.faq, p.path),
      breadcrumb({ name: p.label, path: p.path }),
    ],
  };
};

export function jsonLdFor(route: RouteMeta): object | null {
  if (route.key === "wanEvents") {
    return {
      "@context": "https://schema.org",
      "@graph": [website, wanEvents, marco, faqPage(WANEVENTS_FAQ, route.path)],
    };
  }
  const page = SERVICE_PAGES.find((p) => p.key === route.key);
  return page ? servicePageGraph(page) : null;
}
