// Source unique des informations SEO du site : URL, zone d'intervention,
// métadonnées par page, FAQ et données structurées (JSON-LD).
// Utilisée à la fois par les composants (texte visible) et par le pré-rendu
// (balises <head>, sitemap.xml, llms.txt), pour que les deux ne divergent jamais.

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
  phone: null as string | null, // ex. "+33612345678"
  email: null as string | null, // ex. "contact@marco-douka.fr"
  // Liens vers les VRAIS profils publics (Facebook, Instagram, YouTube,
  // fiche Google Business…), à renseigner une fois vérifiés.
  sameAs: [] as string[],
};

/**
 * Coordonnées AFFICHÉES sur les pages (boutons « Appeler », formulaire…).
 * Elles reprennent `CONTACT` dès qu'il est renseigné ; en attendant, ce sont
 * les valeurs historiques du site, à remplacer par les vraies.
 */
export const DISPLAY_CONTACT = {
  phone: CONTACT.phone ?? "+33123456789",
  wanEventsEmail: CONTACT.email ?? "marco@oneevent.com",
  wassaEmail: CONTACT.email ?? "contact@wassa-percussion.com",
};

/** « +33612345678 » → « +33 6 12 34 56 78 ». */
export const formatPhone = (e164: string) =>
  e164.replace(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, "+33 $1 $2 $3 $4 $5");

/** Profils sociaux affichés dans les pieds de page (à vérifier). */
export const SOCIAL = {
  instagram: "https://www.instagram.com/wassapercussion",
  instagramHandle: "@wassapercussion",
  facebook: "https://www.facebook.com/wassapercussion",
};

export const HOME_BASE = {
  locality: "Pornic",
  postalCode: "44210",
  region: "Pays de la Loire",
  department: "Loire-Atlantique",
  country: "FR",
};

/** Zone d'intervention, du plus proche au plus lointain. */
export const SERVICE_AREA = {
  core: [
    "Pornic",
    "Saint-Brevin-les-Pins",
    "Saint-Nazaire",
    "Nantes",
  ],
  paysDeRetz: [
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
  nantesArea: ["Rezé", "Bouguenais", "Saint-Herblain"],
};

export const ALL_CITIES = [
  ...SERVICE_AREA.core,
  ...SERVICE_AREA.paysDeRetz,
  ...SERVICE_AREA.nantesArea,
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const WANEVENTS_FAQ: FaqItem[] = [
  {
    question: "Quelles animations propose Wan'Events ?",
    answer:
      "Marco Douka anime vos événements avec des quiz musicaux, des blind tests, des soirées karaoké, du team building autour de la percussion et de l'animation de cérémonie (maître de cérémonie pour mariages, festivals et événements d'entreprise).",
  },
  {
    question: "Dans quelles villes intervenez-vous ?",
    answer:
      "Wan'Events est basé à Pornic (44) et intervient dans tout le Pays de Retz (La Bernerie-en-Retz, Les Moutiers-en-Retz, Préfailles, Saint-Michel-Chef-Chef, Machecoul…), à Saint-Brevin-les-Pins, Saint-Nazaire, et jusqu'à Nantes et son agglomération. Interventions également en Vendée et en Bretagne.",
  },
  {
    question: "Pour quels types d'événements faire appel à Wan'Events ?",
    answer:
      "Événements privés et professionnels : mariages, soirées, événements d'entreprise et team building, festivals.",
  },
  {
    question: "Comment réserver une animation ?",
    answer:
      "Contactez Marco Douka par téléphone ou par e-mail depuis la section Contact, en précisant la date, le lieu et le type d'événement.",
  },
];

export const WASSA_FAQ: FaqItem[] = [
  {
    question: "Où ont lieu les cours de djembé de Wassa Percussion ?",
    answer:
      "Les cours et initiations au djembé et aux rythmes d'Afrique de l'Ouest ont lieu à Pornic (44), dans le Pays de Retz. Ils sont ouverts à tous les niveaux, débutants compris.",
  },
  {
    question: "Wassa Percussion peut-il jouer pour mon festival ou mon événement ?",
    answer:
      "Oui : spectacles de percussions africaines sur scène et déambulations pour festivals, salles, manifestations et événements culturels à Pornic, Saint-Brevin-les-Pins, Saint-Nazaire, Nantes, dans tout le Pays de Retz et la Loire-Atlantique, ainsi qu'en Vendée et en Bretagne.",
  },
  {
    question: "Proposez-vous la réparation de djembés ?",
    answer:
      "Oui, Wassa Percussion assure la réparation et l'entretien des djembés et des instruments de percussion africaine.",
  },
  {
    question: "Comment réserver Wassa Percussion ?",
    answer:
      "Depuis la section « Réservez votre événement », par téléphone ou par e-mail, en indiquant la date, le lieu et le format souhaité (spectacle, déambulation, initiation ou atelier).",
  },
];

export type RouteKey = "home" | "wanEvents" | "wassa" | "notFound";

export interface RouteMeta {
  key: RouteKey;
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
  home: {
    key: "home",
    path: "/",
    title:
      "Marco Douka – Animation d'événements & percussions africaines à Pornic, Pays de Retz, Nantes",
    description:
      "Animateur et percussionniste basé à Pornic (44) : Wan'Events (quiz, blind test, karaoké, team building, maître de cérémonie) et Wassa Percussion (spectacles, cours de djembé). Pays de Retz, Saint-Brevin, Saint-Nazaire, Nantes.",
    ogImage: "/OneEvent/WanEvents_Marco_Foot_Animation.jpg",
    preloadImage: "/OneEvent/OneEvent_Marco.webp",
    changefreq: "monthly",
    priority: 1,
  },
  wanEvents: {
    key: "wanEvents",
    path: "/wan-events",
    title:
      "Wan'Events – Animateur de soirée, quiz, blind test & karaoké à Pornic, Saint-Nazaire, Nantes",
    description:
      "Animation de mariages, soirées d'entreprise et festivals par Marco Douka : quiz musical, blind test, karaoké, team building percussion, maître de cérémonie. Basé à Pornic, intervient dans le Pays de Retz, à Saint-Brevin, Saint-Nazaire et Nantes.",
    ogImage: "/OneEvent/WanEvents_Marco_Foot_Animation.jpg",
    preloadImage: "/OneEvent/WanEvents_Marco_Foot_Animation2.webp",
    changefreq: "monthly",
    priority: 0.9,
  },
  wassa: {
    key: "wassa",
    path: "/wassa-percussion",
    title:
      "Wassa Percussion – Percussions africaines & cours de djembé à Pornic, Pays de Retz, Nantes",
    description:
      "Spectacles et déambulations de percussions africaines, cours de djembé tous niveaux à Pornic et réparation de djembés. Wassa Percussion joue dans le Pays de Retz, à Saint-Brevin, Saint-Nazaire, Nantes et en Loire-Atlantique.",
    ogImage: "/WassaPercussion/Wassa_Percussion_Groupe.jpg",
    preloadImage: "/WassaPercussion/Wassa_Percussion.webp",
    changefreq: "monthly",
    priority: 0.9,
  },
  notFound: {
    key: "notFound",
    path: "/404",
    title: "Page introuvable – Marco Douka",
    description: "Cette page n'existe pas.",
    ogImage: "/OneEvent/WanEvents_Marco_Foot_Animation.jpg",
    noindex: true,
  },
};

export const INDEXABLE_ROUTES: RouteMeta[] = [
  ROUTES.home,
  ROUTES.wanEvents,
  ROUTES.wassa,
];

export function routeForPath(pathname: string): RouteMeta {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return (
    INDEXABLE_ROUTES.find((r) => r.path === clean) ?? ROUTES.notFound
  );
}

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

// ---------------------------------------------------------------------------
// Données structurées (schema.org)
// ---------------------------------------------------------------------------

const ID = {
  website: `${SITE_URL}/#website`,
  marco: `${SITE_URL}/#marco-douka`,
  wanEvents: `${SITE_URL}/wan-events#business`,
  wassa: `${SITE_URL}/wassa-percussion#group`,
};

const address = {
  "@type": "PostalAddress",
  addressLocality: HOME_BASE.locality,
  postalCode: HOME_BASE.postalCode,
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
  jobTitle: "Animateur événementiel et percussionniste",
  url: SITE_URL,
  image: absoluteUrl("/OneEvent/OneEvent_Marco.jpg"),
  homeLocation: { "@type": "Place", address },
  knowsAbout: [
    "Animation d'événements",
    "Quiz musical",
    "Blind test",
    "Karaoké",
    "Team building",
    "Percussions africaines",
    "Djembé",
  ],
  worksFor: [{ "@id": ID.wanEvents }],
  memberOf: [{ "@id": ID.wassa }],
  ...(CONTACT.sameAs.length ? { sameAs: CONTACT.sameAs } : {}),
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
      offer("Quiz musical et blind test", "Quiz et blind tests pour soirées privées, mariages et événements d'entreprise."),
      offer("Soirée karaoké", "Soirées karaoké animées par Marco Douka."),
      offer("Team building percussion", "Ateliers de percussion en équipe pour la cohésion des entreprises."),
      offer("Maître de cérémonie", "Animation de mariages, festivals et événements d'entreprise."),
    ],
  },
};

const wassa = {
  "@type": ["MusicGroup", "LocalBusiness"],
  "@id": ID.wassa,
  name: "Wassa Percussion",
  genre: ["Percussions africaines", "Musique d'Afrique de l'Ouest"],
  description: ROUTES.wassa.description,
  url: absoluteUrl(ROUTES.wassa.path),
  image: absoluteUrl("/WassaPercussion/Wassa_Percussion_Groupe.jpg"),
  member: [{ "@id": ID.marco }],
  address,
  areaServed,
  ...contactFields(),
  ...(CONTACT.sameAs.length ? { sameAs: CONTACT.sameAs } : {}),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations Wassa Percussion",
    itemListElement: [
      offer("Spectacle de percussions africaines", "Shows pour festivals, salles et événements culturels."),
      offer("Déambulation percussive", "Animation itinérante pour fêtes, festivals et manifestations."),
      offer("Cours de djembé", "Cours et initiations tous niveaux à Pornic."),
      offer("Réparation de djembés", "Réparation et entretien de djembés et percussions africaines."),
    ],
  },
};

const website = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: "Marco Douka – Wan'Events & Wassa Percussion",
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

const breadcrumb = (name: string, path: string) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL + "/" },
    { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
  ],
});

export function jsonLdFor(route: RouteMeta): object | null {
  switch (route.key) {
    case "home":
      return { "@context": "https://schema.org", "@graph": [website, marco, wanEvents, wassa] };
    case "wanEvents":
      return {
        "@context": "https://schema.org",
        "@graph": [
          wanEvents,
          marco,
          faqPage(WANEVENTS_FAQ, route.path),
          breadcrumb("Wan'Events", route.path),
        ],
      };
    case "wassa":
      return {
        "@context": "https://schema.org",
        "@graph": [
          wassa,
          marco,
          faqPage(WASSA_FAQ, route.path),
          breadcrumb("Wassa Percussion", route.path),
        ],
      };
    default:
      return null;
  }
}
