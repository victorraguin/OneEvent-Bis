// Pages SEO par prestation et par ville. Chaque entrée produit une page
// pré-rendue (texte, FAQ visible, JSON-LD Service + FAQPage + fil d'Ariane),
// une entrée du sitemap et une section de llms.txt.
//
// Cible n° 1 : les entreprises de Nantes et de Saint-Nazaire.
// Règle de rédaction : on n'invente aucun fait (tarif, durée, matériel,
// nombre de musiciens). Les réponses restent prudentes (« sur devis »,
// « on en parle ensemble ») tant que Marco n'a pas validé les détails.
import type { FaqItem, RouteMeta } from "./site";
import { OG_IMAGE } from "./og";

export interface PageSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ServicePageData extends RouteMeta {
  /** Nom court, utilisé dans les liens internes et le fil d'Ariane. */
  label: string;
  /** Nom du service pour le JSON-LD (schema.org/Service). */
  serviceName: string;
  eyebrow: string;
  h1: string;
  lead: string;
  image: { src: string; alt: string; pos?: string };
  /** Photos supplémentaires, affichées dans le bloc « En images ». */
  photos?: { src: string; alt: string; pos?: string }[];
  sections: PageSection[];
  faq: FaqItem[];
  related: string[];
  zoneIntro: string;
}

const IMG = {
  quiz: "/OneEvent/OneEvent_Marco.webp",
  mic: "/OneEvent/OneEvent_Marco_Microphone.webp",
  crowd: "/OneEvent/OneEvent_Marco_Animation.webp",
  podium: "/OneEvent/WanEvents_Marco_Foot_Animation.webp",
  point: "/OneEvent/WanEvents_Marco_Foot_Animation2.webp",
  djembeSun: "/OneEvent/Marco_OneEvent_Animation.webp",
  teamBuilding: "/OneEvent/team-building-percussion-guinguette.webp",
  pool1: "/OneEvent/marco-douka-pool-party-1.webp",
  pool3: "/OneEvent/marco-douka-pool-party-3.webp",
  pool4: "/OneEvent/marco-douka-pool-party-4.webp",
  sport1: "/OneEvent/marco-douka-speaker-sport-1.webp",
  sport2: "/OneEvent/marco-douka-speaker-sport-2.webp",
  sport3: "/OneEvent/marco-douka-speaker-sport-3.webp",
  fanZone: "/OneEvent/marco-douka-speaker-fan-zone.webp",
  festival: "/OneEvent/marco-douka-animation-festival.webp",
  terrasse: "/OneEvent/marco-douka-micro-terrasse.webp",
  showAcro: "/OneEvent/marco-douka-speaker-show-acrobatique.webp",
  boxe: "/OneEvent/marco-douka-speaker-gala-boxe.webp",
  djembeGroupe: "/OneEvent/atelier-djembe-groupe.webp",
  djembeScene: "/OneEvent/djembe-scene-dj.webp",
  soiree: "/OneEvent/marco-douka-animation-soiree.webp",
  speakerMc: "/OneEvent/marco-douka-speaker-maitre-de-ceremonie.webp",
};

const PHOTO = {
  pool1: { src: IMG.pool1, alt: "Pool party animée : le public dans la piscine porte une bouée géante" },
  pool3: { src: IMG.pool3, alt: "Pool party : bouées géantes et public dans la piscine" },
  pool4: { src: IMG.pool4, alt: "Animateurs sur la passerelle d'une pool party, face au public" },
  sport1: { src: IMG.sport1, alt: "Marco Douka, speaker, au micro dans une salle de sport" },
  sport3: { src: IMG.sport3, alt: "Marco Douka au micro, bras levé, pendant une compétition en salle" },
  fanZone: { src: IMG.fanZone, alt: "Marco Douka au micro devant la foule d'une fan zone" },
  festival: { src: IMG.festival, alt: "Marco Douka au micro face au public d'un festival en plein air" },
  terrasse: { src: IMG.terrasse, alt: "Marco Douka au micro sur une terrasse au soleil" },
  showAcro: { src: IMG.showAcro, alt: "Marco Douka au micro pendant un show de basket acrobatique devant le public" },
  boxe: { src: IMG.boxe, alt: "Marco Douka, speaker, présente un boxeur sur le ring d'un gala de boxe" },
  djembeGroupe: { src: IMG.djembeGroupe, alt: "Groupe de participants avec djembés après un atelier en plein air" },
  djembeScene: { src: IMG.djembeScene, alt: "Djembé sur scène aux côtés d'un DJ, en festival" },
  soiree: { src: IMG.soiree, alt: "Marco Douka anime une soirée en salle, sous une boule à facettes", pos: "60% 30%" },
};


const page = (p: Omit<ServicePageData, "ogImage" | "preloadImage" | "changefreq" | "priority">): ServicePageData => ({
  ...p,
  ogImage: OG_IMAGE,
  preloadImage: p.image.src,
  changefreq: "monthly",
  priority: 0.8,
});

export const SERVICE_PAGES: ServicePageData[] = [
  page({
    key: "karaoke",
    path: "/soiree-karaoke",
    label: "Karaoké",
    serviceName: "Soirée karaoké animée",
    title: "Soirée karaoké animée – Nantes, Saint-Nazaire",
    description:
      "Soirée karaoké animée au micro pour vos soirées d'entreprise, séminaires, anniversaires et mariages à Nantes, Saint-Nazaire et en Loire-Atlantique.",
    eyebrow: "Wan'Events · Karaoké",
    h1: "Soirée karaoké à Nantes et Saint-Nazaire",
    lead:
      "J'anime vos soirées karaoké au micro, pour les entreprises comme pour les particuliers. Je lance les chansons, je fais monter les volontaires et je garde le rythme de la soirée.",
    image: { src: IMG.soiree, alt: "Marco Douka anime une soirée karaoké en salle, sous une boule à facettes", pos: "60% center" },
    photos: [
      { src: IMG.crowd, alt: "Marco Douka chante au micro au milieu du public, en noir et blanc" },
      PHOTO.terrasse,
      PHOTO.festival,
    ],
    sections: [
      {
        title: "Comment se passe la soirée",
        paragraphs: [
          "Les invités choisissent leurs chansons et passent au micro, seuls ou à plusieurs. Entre deux passages, j'anime, je présente le suivant et je fais chanter la salle.",
        ],
      },
      {
        title: "Pour les entreprises",
        paragraphs: [
          "Pour une soirée d'entreprise, un séminaire ou une fête de fin d'année, le karaoké se place bien en fin de soirée, après le repas ou après un quiz.",
        ],
      },
      {
        title: "Pour les particuliers",
        paragraphs: [
          "Anniversaires, mariages, fêtes de famille : le karaoké peut occuper toute la soirée ou seulement une partie.",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il savoir chanter ?",
        answer: "Non. Le karaoké, c'est pour s'amuser : chacun passe s'il en a envie, seul ou à plusieurs.",
      },
      {
        question: "Peut-on combiner le karaoké avec d'autres animations ?",
        answer:
          "Oui, par exemple un blind test en début de soirée puis un karaoké. On construit le déroulé ensemble.",
      },
      {
        question: "Intervenez-vous dans les locaux de l'entreprise ?",
        answer:
          "Oui. J'interviens dans vos locaux, dans une salle de séminaire, un restaurant ou une salle louée pour l'occasion, à Nantes, à Saint-Nazaire et dans toute la Loire-Atlantique.",
      },
      {
        question: "Combien coûte une soirée karaoké ?",
        answer: "Le prix dépend de la durée, du lieu et du nombre d'invités. Je vous envoie un devis gratuit.",
      },
    ],
    related: ["quizJeux", "teamBuilding", "mariage", "nantes"],
    zoneIntro:
      "Je me déplace dans vos locaux ou dans la salle que vous avez réservée.",
  }),

  page({
    key: "teamBuilding",
    path: "/team-building-percussion",
    label: "Team building percussion",
    serviceName: "Team building percussion (djembé)",
    title: "Team building percussion et djembé – Nantes, Saint-Nazaire",
    description:
      "Team building autour du djembé à Nantes et Saint-Nazaire : un instrument par participant, un rythme d'Afrique de l'Ouest appris ensemble. Aucun niveau requis.",
    eyebrow: "Wan'Events · Team building",
    h1: "Team building percussion à Nantes et Saint-Nazaire",
    lead:
      "Un djembé par participant et un rythme d'Afrique de l'Ouest à apprendre ensemble. Je suis percussionniste et j'anime ces ateliers avec des enfants comme avec des équipes d'entreprise.",
    image: { src: IMG.teamBuilding, alt: "Trois percussionnistes au djembé sous une tente, devant le public d'une guinguette", pos: "40% center" },
    photos: [PHOTO.soiree, PHOTO.djembeGroupe, PHOTO.djembeScene],
    sections: [
      {
        title: "Comment se passe l'atelier",
        paragraphs: [
          "Je commence par les bases : comment tenir le djembé et les trois sons principaux, la basse, la tonique et le claqué.",
          "Ensuite, je répartis le groupe en plusieurs parties qui jouent chacune un rythme différent. À la fin de l'atelier, toutes les parties jouent ensemble.",
        ],
      },
      {
        title: "Pourquoi le djembé",
        paragraphs: [
          "Personne n'a besoin de savoir jouer d'un instrument. Chacun a sa partie, et le rythme ne tient que si tout le monde écoute les autres.",
          "Le format marche avec des équipes qui se découvrent comme avec des équipes qui travaillent ensemble depuis longtemps.",
        ],
      },
      {
        title: "Cours et initiations",
        paragraphs: [
          "En dehors des entreprises, je donne aussi des cours et des initiations au djembé, pour les enfants comme pour les adultes, débutants compris.",
        ],
      },
    ],
    faq: [
      {
        question: "Faut-il savoir jouer de la musique ?",
        answer: "Non. L'atelier est fait pour des débutants. Je montre chaque geste et on avance au rythme du groupe.",
      },
      {
        question: "Combien de temps dure un atelier ?",
        answer:
          "La durée s'adapte à votre programme, d'un atelier court pendant un séminaire à une séance plus longue. On la fixe ensemble.",
      },
      {
        question: "Peut-on organiser l'atelier dans nos locaux ?",
        answer:
          "Oui, dans vos locaux, dans une salle de séminaire ou en extérieur. Les djembés font du bruit : mieux vaut une salle où le son ne dérange pas les bureaux voisins.",
      },
      {
        question: "Comment se passe la question des instruments ?",
        answer:
          "Indiquez-moi le nombre de participants quand vous me contactez : on voit ensemble le matériel nécessaire pour que chacun ait un instrument.",
      },
      {
        question: "Combien coûte un team building percussion ?",
        answer: "Le tarif dépend du nombre de participants, de la durée et du lieu. Je vous envoie un devis gratuit.",
      },
    ],
    related: ["karaoke", "quizJeux", "speaker", "saintNazaire"],
    zoneIntro:
      "J'anime les ateliers dans vos locaux, en salle de séminaire ou en extérieur.",
  }),

  page({
    key: "quizJeux",
    path: "/quiz-jeux-soiree-entreprise",
    label: "Quiz, jeux & défis",
    serviceName: "Quiz, blind test, jeux et défis pour soirées",
    title: "Quiz, jeux et défis en entreprise – Nantes, Saint-Nazaire",
    description:
      "Quiz, blind test, défi piment, tournois Mario Kart et FIFA, doublage, Adopte mon pote : des jeux animés au micro pour vos soirées à Nantes et Saint-Nazaire.",
    eyebrow: "Wan'Events · Quiz, jeux & défis",
    h1: "Quiz, jeux et défis pour vos soirées à Nantes et Saint-Nazaire",
    lead:
      "Blind test, défi piment, tournoi de jeux vidéo, doublage de film, Adopte mon ou ma pote : les participants jouent, et j'anime au micro du début à la fin.",
    image: { src: IMG.quiz, alt: "Marco Douka anime un jeu sur scène devant le public" },
    photos: [PHOTO.pool1, PHOTO.pool3, PHOTO.pool4],
    sections: [
      {
        title: "Quiz et blind test",
        paragraphs: [
          "Les participants sont répartis en équipes. J'enchaîne les manches : extraits musicaux à reconnaître, questions, manches spéciales. Le classement évolue en direct.",
          "Je choisis les musiques et les questions selon votre public. Si vous voulez des questions sur votre entreprise ou votre métier, envoyez-les-moi avant la date.",
        ],
      },
      {
        title: "Défi piment",
        paragraphs: [
          "Vous voulez tester votre résistance au piment ? Les volontaires goûtent des sauces de plus en plus fortes, préparées par des partenaires locaux. Chacun va aussi loin qu'il peut, la salle encourage.",
        ],
      },
      {
        title: "Tournois Mario Kart et FIFA",
        paragraphs: [
          "Un tournoi de jeux vidéo sur écran, avec des matchs à élimination et une finale commentée au micro. Mario Kart pour que tout le monde puisse jouer, FIFA (EA Sports FC) pour les amateurs de foot.",
        ],
      },
      {
        title: "Doublage de film",
        paragraphs: [
          "Les participants prennent le micro et doublent en direct une scène de film, en solo, en duo, à trois ou plus.",
        ],
      },
      {
        title: "Soirée « Adopte mon ou ma pote »",
        paragraphs: [
          "Vous présentez un ou une célibataire de votre entourage (un ami, quelqu'un de la famille, un collègue) avec un diaporama, devant la salle. Un moment fun et convivial : soit la personne repart accompagnée, soit elle repart avec une bonne soirée en souvenir.",
        ],
      },
      {
        title: "Et votre idée ?",
        paragraphs: [
          "Cette liste n'est pas fermée. Si vous avez un jeu, un thème ou un format en tête, dites-le-moi : je l'adapte à votre soirée et on le construit ensemble.",
        ],
      },
    ],
    faq: [
      {
        question: "Quels jeux choisir pour une soirée d'entreprise ?",
        answer:
          "Le quiz et le blind test marchent avec tous les publics. Le défi piment et les tournois Mario Kart ou FIFA conviennent aux équipes qui aiment la compétition. On choisit ensemble selon votre groupe et votre salle.",
      },
      {
        question: "Combien de personnes peuvent participer ?",
        answer:
          "Le quiz se joue par équipes, du petit groupe à la grande salle. Pour les défis et les tournois, une partie des invités joue pendant que les autres suivent et encouragent. Donnez-moi le nombre de participants, j'adapte le format.",
      },
      {
        question: "De quoi avez-vous besoin sur place ?",
        answer:
          "Ça dépend du jeu : un écran pour un tournoi ou un doublage, de la place pour les équipes pour un quiz. On fait le point ensemble sur la salle et le matériel avant la date.",
      },
      {
        question: "Le défi piment, c'est pour tout le monde ?",
        answer:
          "Seuls les volontaires y participent, et chacun peut s'arrêter à tout moment.",
      },
      {
        question: "Peut-on enchaîner plusieurs jeux dans la même soirée ?",
        answer:
          "Oui, par exemple un blind test en début de soirée puis un tournoi Mario Kart. On construit le déroulé ensemble.",
      },
      {
        question: "Faites-vous aussi ces soirées pour les particuliers ?",
        answer: "Oui, pour les anniversaires, les mariages et les fêtes privées, partout en Loire-Atlantique.",
      },
    ],
    related: ["karaoke", "teamBuilding", "mariage", "nantes"],
    zoneIntro:
      "J'anime les jeux dans vos locaux, au restaurant, dans un bar ou en salle.",
  }),

  page({
    key: "speaker",
    path: "/speaker-maitre-de-ceremonie",
    label: "Speaker & maître de cérémonie",
    serviceName: "Speaker événementiel et maître de cérémonie",
    title: "Speaker et maître de cérémonie – Nantes, Saint-Nazaire",
    description:
      "Speaker et maître de cérémonie à Nantes et Saint-Nazaire : événements d'entreprise et sportifs, podiums, festivals, mariages. Animateur micro depuis 15 ans.",
    eyebrow: "Wan'Events · Speaker",
    h1: "Speaker et maître de cérémonie à Nantes et Saint-Nazaire",
    lead:
      "Je tiens le micro sur des événements d'entreprise, des événements sportifs, des festivals et des mariages. J'annonce, je présente, je relance le public et je tiens le timing.",
    image: { src: IMG.speakerMc, alt: "Marco Douka, speaker et maître de cérémonie, micro et fiches en main, en veste de costume", pos: "57% center" },
    photos: [
      { src: IMG.sport2, alt: "Marco Douka, speaker, au micro pendant une compétition en salle" },
      PHOTO.boxe,
      PHOTO.showAcro,
      PHOTO.fanZone,
    ],
    sections: [
      {
        title: "Événements d'entreprise",
        paragraphs: [
          "Accueil des invités, présentation des intervenants, enchaînement des discours, remise de prix, annonces pendant la soirée.",
          "Je cale le déroulé avec vous avant l'événement, pour que chaque prise de parole arrive au bon moment.",
        ],
      },
      {
        title: "Événements sportifs",
        paragraphs: [
          "Je présente les participants, j'annonce les résultats et j'anime les podiums. Entre deux épreuves, je fais patienter le public et je garde l'ambiance.",
        ],
      },
      {
        title: "Festivals et mariages",
        paragraphs: [
          "En festival, j'annonce les artistes et j'anime les changements de plateau.",
          "Pour un mariage, je présente les moments clés et je laisse la place aux proches qui veulent prendre la parole.",
        ],
      },
    ],
    faq: [
      {
        question: "Quelle différence entre un speaker et un animateur ?",
        answer:
          "Le speaker tient le micro pour annoncer, présenter et rythmer l'événement. L'animateur propose en plus des animations : quiz, blind test, karaoké, team building. Je fais les deux, séparément ou sur le même événement.",
      },
      {
        question: "Préparez-vous le déroulé avec nous ?",
        answer:
          "Oui. Avant l'événement, on fait le point sur le programme, les noms à annoncer, les intervenants et les moments importants.",
      },
      {
        question: "Faut-il prévoir une sonorisation ?",
        answer:
          "Dites-moi ce qui est déjà prévu sur place : sono, micros, scène. On voit ensemble ce qu'il faut compléter.",
      },
      {
        question: "Faites-vous l'animation micro de courses et de tournois ?",
        answer:
          "Oui : présentation, annonces, résultats et podiums. Envoyez-moi le format de l'épreuve et la date.",
      },
    ],
    related: ["karaoke", "mariage", "quizJeux", "saintNazaire"],
    zoneIntro:
      "Je me déplace facilement sur toute la Loire-Atlantique.",
  }),

  page({
    key: "mariage",
    path: "/animation-mariage",
    label: "Animation de mariage",
    serviceName: "Animation de mariage et maître de cérémonie",
    title: "Animateur de mariage – Nantes, Saint-Nazaire, Pornic",
    description:
      "Animation de mariage en Loire-Atlantique : maître de cérémonie, quiz des mariés, blind test, karaoké, jeux. Nantes, Saint-Nazaire, Pornic, Pays de Retz.",
    eyebrow: "Wan'Events · Mariage",
    h1: "Animateur de mariage à Nantes, Saint-Nazaire et Pornic",
    lead:
      "Je peux tenir le micro pendant votre mariage, animer un quiz ou un blind test, ou lancer un karaoké.",
    image: { src: IMG.mic, alt: "Marco Douka au micro, en extérieur" },
    sections: [
      {
        title: "Maître de cérémonie",
        paragraphs: [
          "Je présente les moments clés : l'arrivée des mariés, les discours, le gâteau, l'ouverture du bal.",
          "Je peux faire le lien avec le traiteur et avec les proches qui préparent une surprise, pour que tout s'enchaîne.",
        ],
      },
      {
        title: "Animations pour les invités",
        paragraphs: ["Quelques idées, à piocher selon votre journée :"],
        bullets: [
          "Un quiz sur les mariés, préparé avec vos témoins",
          "Un blind test entre les tables",
          "Un karaoké en fin de soirée",
        ],
      },
      {
        title: "Avant le mariage",
        paragraphs: [
          "On se parle avant la date pour caler le déroulé, les prénoms à connaître et ce que vous ne voulez surtout pas.",
        ],
      },
    ],
    faq: [
      {
        question: "Êtes-vous DJ ?",
        answer:
          "Je suis animateur et speaker. Si vous avez déjà un DJ, je travaille avec lui sur le déroulé. Sinon, dites-le-moi et on regarde ensemble la partie musique de la soirée.",
      },
      {
        question: "Pouvez-vous animer seulement une partie de la journée ?",
        answer: "Oui, par exemple le vin d'honneur ou le début de soirée. On fixe les horaires ensemble.",
      },
      {
        question: "Vous déplacez-vous hors de Loire-Atlantique ?",
        answer:
          "Oui, en Vendée et en Bretagne aussi. En Loire-Atlantique, je me déplace facilement : Nantes, Saint-Nazaire, Pornic, Pays de Retz.",
      },
      {
        question: "Comment réserver pour un mariage ?",
        answer:
          "Appelez-moi ou écrivez-moi avec la date, le lieu et le nombre d'invités. Je vous rappelle et je vous envoie un devis.",
      },
    ],
    related: ["speaker", "quizJeux", "teamBuilding", "karaoke"],
    zoneIntro:
      "Je me déplace sur votre lieu de réception, partout en Loire-Atlantique.",
  }),

  page({
    key: "nantes",
    path: "/animateur-evenementiel-nantes",
    label: "Animateur à Nantes",
    serviceName: "Animation d'événements à Nantes",
    title: "Animateur événementiel à Nantes – séminaire, soirée, team building",
    description:
      "Animateur et speaker à Nantes pour vos séminaires, soirées d'entreprise, team building et fêtes : quiz, blind test, karaoké, djembé. Toute la métropole.",
    eyebrow: "Nantes et agglomération",
    h1: "Animateur événementiel à Nantes",
    lead:
      "Je me déplace facilement dans toute la métropole nantaise pour des séminaires, des soirées d'entreprise, du team building et des fêtes privées.",
    image: { src: IMG.point, alt: "Marco Douka au micro, le bras tendu vers le public" },
    photos: [PHOTO.sport1, PHOTO.terrasse, PHOTO.showAcro],
    sections: [
      {
        title: "Pour les entreprises nantaises",
        paragraphs: [
          "Séminaire, soirée d'entreprise, fête de fin d'année, team building : je vous propose une animation adaptée à votre équipe et à votre lieu, à Nantes ou dans les communes autour.",
          "Quiz et blind test par équipes, défi piment, tournoi Mario Kart, atelier djembé, karaoké, ou animation micro pour rythmer la journée.",
        ],
      },
      {
        title: "Où j'interviens autour de Nantes",
        paragraphs: [
          "Nantes, Saint-Herblain, Rezé, Orvault, Carquefou, Saint-Sébastien-sur-Loire, Vertou, Bouguenais, Couëron, La Chapelle-sur-Erdre et le reste de la métropole.",
          "Dans vos locaux, une salle de séminaire, un restaurant ou une salle des fêtes.",
        ],
      },
      {
        title: "Pour les particuliers",
        paragraphs: [
          "J'anime aussi des mariages, des anniversaires et des fêtes privées à Nantes : maître de cérémonie, quiz, blind test, karaoké.",
        ],
      },
    ],
    faq: [
      {
        question: "Intervenez-vous dans toute la métropole nantaise ?",
        answer:
          "Oui : Nantes, Saint-Herblain, Rezé, Orvault, Carquefou, Vertou et les autres communes de la métropole.",
      },
      {
        question: "Les frais de déplacement sont-ils compris ?",
        answer:
          "Le déplacement est indiqué dans le devis. Donnez-moi l'adresse de l'événement, je vous fais une proposition complète.",
      },
      {
        question: "Quelle animation pour un séminaire à Nantes ?",
        answer:
          "Un quiz ou un blind test par équipes, un team building autour du djembé, ou une animation micro pour rythmer la journée. On choisit selon votre programme.",
      },
      {
        question: "Comment vous contacter ?",
        answer: "Par téléphone ou par e-mail, depuis cette page. Indiquez la date, le lieu et le nombre de participants.",
      },
    ],
    related: ["karaoke", "teamBuilding", "quizJeux", "speaker"],
    zoneIntro:
      "Je me déplace dans toute la métropole nantaise, dans vos locaux ou dans la salle de votre choix.",
  }),

  page({
    key: "saintNazaire",
    path: "/animateur-evenementiel-saint-nazaire",
    label: "Animateur à Saint-Nazaire",
    serviceName: "Animation d'événements à Saint-Nazaire",
    title: "Animateur événementiel à Saint-Nazaire – séminaire, soirée",
    description:
      "Animateur et speaker à Saint-Nazaire et sur la presqu'île : séminaires, soirées d'entreprise, team building, quiz. La Baule, Pornichet, Guérande.",
    eyebrow: "Saint-Nazaire et presqu'île",
    h1: "Animateur événementiel à Saint-Nazaire",
    lead:
      "Je me déplace facilement à Saint-Nazaire et sur la presqu'île pour vos événements d'entreprise et vos fêtes.",
    image: { src: IMG.festival, alt: "Marco Douka au micro face au public d'un festival en plein air" },
    photos: [PHOTO.fanZone, PHOTO.boxe, PHOTO.pool1],
    sections: [
      {
        title: "Pour les entreprises du bassin nazairien",
        paragraphs: [
          "Pour un séminaire, une soirée d'équipe, une fête de fin d'année ou un événement sur site, je vous propose une animation adaptée : quiz, blind test, team building djembé, ou animation micro.",
        ],
      },
      {
        title: "Où j'interviens",
        paragraphs: [
          "Saint-Nazaire, Pornichet, La Baule-Escoublac, Guérande, Montoir-de-Bretagne, Trignac, Donges, et de l'autre côté du pont, Saint-Brevin-les-Pins et le Pays de Retz.",
        ],
      },
      {
        title: "Les événements d'été",
        paragraphs: [
          "Sur la côte, l'été amène des fêtes, des festivals et des événements en plein air. J'y interviens comme speaker ou avec un quiz.",
        ],
      },
    ],
    faq: [
      {
        question: "Vous déplacez-vous à La Baule et Pornichet ?",
        answer:
          "Oui, sur toute la presqu'île : Pornichet, La Baule, Guérande, et de l'autre côté du pont jusqu'à Saint-Brevin et Pornic.",
      },
      {
        question: "Quelle animation pour une soirée d'entreprise à Saint-Nazaire ?",
        answer:
          "Un quiz ou un blind test par équipes pour la soirée. Pour un séminaire, un atelier djembé pour lancer la journée. Je peux aussi tenir le micro pendant tout l'événement.",
      },
      {
        question: "Animez-vous des événements sportifs ?",
        answer: "Oui, je fais l'animation micro d'événements sportifs : présentation, annonces, résultats et podiums.",
      },
      {
        question: "Comment réserver ?",
        answer:
          "Appelez-moi ou écrivez-moi avec la date, le lieu et le nombre de participants. Je vous rappelle et je vous envoie un devis.",
      },
    ],
    related: ["karaoke", "teamBuilding", "speaker", "quizJeux"],
    zoneIntro:
      "Je me déplace à Saint-Nazaire, sur toute la presqu'île et de l'autre côté du pont, jusqu'au Pays de Retz.",
  }),
];

export const servicePageByKey = (key: string) => SERVICE_PAGES.find((p) => p.key === key);
