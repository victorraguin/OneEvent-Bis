// Photos des galeries défilantes « Ça se vit en vrai » (composant PhotoReel).
export interface Photo {
  src: string;
  alt: string;
  /** Cadrage dans la vignette (CSS object-position). */
  pos?: string;
}

export const WE_GALLERY: Photo[] = [
  { src: "/OneEvent/marco-douka-speaker-gala-boxe.webp", alt: "Marco Douka, speaker, présente un boxeur sur le ring d'un gala de boxe" },
  { src: "/OneEvent/marco-douka-pool-party-1.webp", alt: "Pool party animée : le public dans la piscine porte une bouée géante" },
  { src: "/OneEvent/marco-douka-speaker-fan-zone.webp", alt: "Marco Douka au micro devant la foule d'une fan zone", pos: "45% 40%" },
  { src: "/OneEvent/marco-douka-speaker-show-acrobatique.webp", alt: "Marco Douka au micro pendant un show de basket acrobatique", pos: "center 60%" },
  { src: "/OneEvent/marco-douka-animation-festival.webp", alt: "Marco Douka au micro face au public d'un festival en plein air", pos: "60% center" },
  { src: "/OneEvent/marco-douka-speaker-sport-2.webp", alt: "Marco Douka, speaker, au micro pendant une compétition en salle" },
  { src: "/OneEvent/marco-douka-pool-party-4.webp", alt: "Animateurs sur la passerelle d'une pool party, face au public", pos: "center 70%" },
  { src: "/OneEvent/marco-douka-micro-terrasse.webp", alt: "Marco Douka au micro sur une terrasse au soleil", pos: "center 55%" },
  { src: "/OneEvent/OneEvent_Marco_Animation.webp", alt: "Marco chante au milieu du public, en noir et blanc" },
  { src: "/OneEvent/marco-douka-pool-party-3.webp", alt: "Pool party : bouées géantes et public dans la piscine", pos: "center 60%" },
  { src: "/OneEvent/WanEvents_Marco_Foot_Animation.webp", alt: "Marco Douka au micro sur un événement sportif, bras levés" },
];

/** Photos propres à une page d'abord, complétées par la galerie de la marque. */
export const reelFor = (own: Photo[] | undefined, max = 10): Photo[] => {
  const seen = new Set<string>();
  return [...(own ?? []), ...WE_GALLERY].filter((p) => !seen.has(p.src) && seen.add(p.src)).slice(0, max);
};
