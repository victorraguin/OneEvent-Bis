// Rythmes traditionnels de la boîte à rythme Wassa.
//
// Pour ajouter un rythme : une entrée dans RHYTHMS, une chaîne par instrument.
// Chaque caractère = un temps (une double-croche en 4/4, une croche en 12/8).
// Une partie peut être plus longue que la mesure (ex. dundunba sur 2 mesures) :
// chaque instrument boucle sur sa propre longueur, comme dans l'ensemble réel.
//
//   Djembé            B basse · T tone · S slap · . silence
//   Kenkeni, sangban,
//   dundunba          O ouvert · X étouffé · . silence
//   Cloche            x frappe · . silence

export const INSTRUMENTS = [
  { id: "djembe", name: "Djembé", color: "#e3a02f", strokes: ["T", "S", "B"] },
  { id: "kenkeni", name: "Kenkeni", color: "#f2cf86", strokes: ["O", "X"] },
  { id: "sangban", name: "Sangban", color: "#fbf5ea", strokes: ["O", "X"] },
  { id: "dundunba", name: "Dundunba", color: "#c4532d", strokes: ["O", "X"] },
  { id: "cloche", name: "Cloche", color: "#9fb0d6", strokes: ["x"] },
] as const;

export type InstrumentId = (typeof INSTRUMENTS)[number]["id"];
export type Stroke = "" | "B" | "T" | "S" | "O" | "X" | "x";

export interface Rhythm {
  id: string;
  name: string;
  /** Origine et source de la transcription, affichées sous la grille. */
  origin: string;
  /** Temps par mesure : 16 (4/4) ou 12 (12/8). */
  steps: 12 | 16;
  /** Temps regroupés par pulsation : 4 en 4/4, 3 en 12/8. */
  beat: 3 | 4;
  bpm: number;
  parts: Record<InstrumentId, string>;
}

export const RHYTHMS: Rhythm[] = [
  {
    // Transcription Malcolm Smith d'après l'enseignement de Mamady Keïta :
    // https://www.thesmith.org.uk/music/projects/vitae/rhythms/djansa.html
    // Cloche : celle du kenkeni (les trois dunduns ont chacun la leur).
    id: "djansa",
    name: "Djansa",
    origin: "rythme malinké (Mali, Guinée)",
    steps: 16,
    beat: 4,
    bpm: 110,
    parts: {
      djembe: "SS.SS.TTS.B.SBTT",
      kenkeni: "O....OO.O....OO.",
      sangban: "O..O..O...X...O.",
      dundunba: "X.......X.O.....X.....OO.OO.....",
      cloche: "x.xx.xx.x.xx.xx.",
    },
  },
];

export type Grid = Stroke[][];

export const gridFromRhythm = (r: Rhythm): Grid =>
  INSTRUMENTS.map((inst) => [...r.parts[inst.id]].map((ch) => (ch === "." ? "" : (ch as Stroke))));

/** Durée d'un temps en secondes (noire = `beat` temps). */
export const stepSeconds = (r: Pick<Rhythm, "bpm" | "beat">) => 60 / r.bpm / r.beat;
