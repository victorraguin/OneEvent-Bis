// Boîte à rythme Wassa : lecture d'échantillons réels.
// Les fichiers sont téléchargés quand la section approche de l'écran ; le
// contexte audio n'est créé qu'au premier geste de l'utilisateur.

import type { InstrumentId, Stroke } from "./rhythms";

// Deux jeux de sons interchangeables :
//  - "mandingue" : vrais djembé et dunduns (frappes ouvertes ET étouffées).
//    ⚠ Origine et licence à confirmer avant la mise en ligne.
//  - "cc0"       : domaine public (voir audio/CREDITS.txt), dunduns approchés
//    par des tambours d'orchestre.
type KitName = "mandingue" | "cc0";
const KIT: KitName = "mandingue";

interface Sound {
  files: readonly string[];
  level: number;
  /** Étouffer artificiellement (pas d'enregistrement de frappe étouffée). */
  damp?: boolean;
}
type Key = `${InstrumentId}:${Exclude<Stroke, "">}`;

const KITS: Record<KitName, { base: string; sounds: Partial<Record<Key, Sound>> }> = {
  mandingue: {
    base: "/WassaPercussion/audio/mandingue/",
    sounds: {
      "djembe:B": { files: ["djembe-bass.mp3"], level: 0.85 },
      "djembe:T": { files: ["djembe-tone.mp3"], level: 0.7 },
      "djembe:S": { files: ["djembe-slap.mp3"], level: 0.7 },
      "kenkeni:O": { files: ["kenkeni-o.mp3"], level: 0.6 },
      "kenkeni:X": { files: ["kenkeni-c.mp3"], level: 0.6 },
      "sangban:O": { files: ["sangba-o.mp3"], level: 0.7 },
      "sangban:X": { files: ["sangba-c.mp3"], level: 0.7 },
      "dundunba:O": { files: ["dounba-o.mp3"], level: 0.9 },
      "dundunba:X": { files: ["dounba-o.mp3"], level: 0.9, damp: true },
      "cloche:x": { files: ["bell.mp3"], level: 0.45 },
    },
  },
  cc0: {
    base: "/WassaPercussion/audio/",
    sounds: {
      "djembe:B": { files: ["djembe-bass.wav"], level: 0.9 },
      "djembe:T": { files: ["djembe-tone-1.wav", "djembe-tone-2.wav"], level: 0.75 },
      "djembe:S": { files: ["djembe-slap-1.wav", "djembe-slap-2.wav"], level: 0.75 },
      "kenkeni:O": { files: ["kenkeni.wav"], level: 0.55 },
      "kenkeni:X": { files: ["kenkeni.wav"], level: 0.55, damp: true },
      "sangban:O": { files: ["sangban.wav"], level: 0.75 },
      "sangban:X": { files: ["sangban.wav"], level: 0.75, damp: true },
      "dundunba:O": { files: ["dundun.wav"], level: 1 },
      "dundunba:X": { files: ["dundun.wav"], level: 1, damp: true },
      "cloche:x": { files: ["cloche.wav"], level: 0.35 },
    },
  },
};
const { base: BASE, sounds: SOUNDS } = KITS[KIT];

let ctx: AudioContext | null = null;
let bus: AudioNode | null = null;
let raw: Promise<Record<string, ArrayBuffer>> | null = null;
let kit: Promise<Record<string, AudioBuffer>> | null = null;
let ready: Record<string, AudioBuffer> | null = null;

type AudioContextCtor = typeof AudioContext;

export function getAudioContext(): AudioContext {
  if (!ctx) {
    const AC: AudioContextCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: AudioContextCtor }).webkitAudioContext;
    ctx = new AC();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -10;
    comp.ratio.value = 3;
    const gain = ctx.createGain();
    gain.gain.value = 0.9;
    gain.connect(comp).connect(ctx.destination);
    bus = gain;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

/** Télécharge les fichiers (sans les décoder) : appelable avant tout geste. */
export function prefetchKit() {
  if (!raw) {
    const files = [...new Set(Object.values(SOUNDS).flatMap((snd) => snd.files))];
    raw = Promise.all(
      files.map((f) => fetch(BASE + f).then((r) => (r.ok ? r.arrayBuffer() : Promise.reject(new Error(f))))),
    ).then((bufs) => Object.fromEntries(files.map((f, i) => [f, bufs[i]])));
    raw.catch(() => (raw = null)); // nouvel essai au prochain appel
  }
  return raw;
}

/** Décode le kit (nécessite le contexte audio, donc un geste utilisateur). */
export function loadKit(): Promise<unknown> {
  if (!kit) {
    const c = getAudioContext();
    kit = prefetchKit()
      .then(async (files) => {
        const entries = await Promise.all(
          Object.entries(files).map(async ([f, b]) => [f, await c.decodeAudioData(b.slice(0))] as const),
        );
        ready = Object.fromEntries(entries);
        return ready;
      })
      .catch((e) => {
        kit = null;
        throw e;
      });
  }
  return kit;
}

const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Joue une frappe : B/T/S au djembé, O (ouvert) ou X (étouffé) aux dunduns, x à la cloche. */
export function playStroke(instrument: InstrumentId, stroke: Stroke, when?: number) {
  if (!stroke || !ready || !ctx || !bus) return;
  const sound = SOUNDS[`${instrument}:${stroke}`];
  const buffer = sound && ready[pick(sound.files)];
  if (!buffer) return;

  // Petites variations de force, de timing et de hauteur : un jeu vivant.
  const jitter = when === undefined ? 0 : (Math.random() - 0.5) * 0.008;
  const t = Math.max((when ?? 0) + jitter, ctx.currentTime);
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.value = 1 + (Math.random() - 0.5) * 0.02;
  const g = ctx.createGain();
  g.gain.setValueAtTime(sound.level * (0.88 + Math.random() * 0.12), t);
  src.connect(g).connect(bus);
  src.start(t);
  if (sound.damp) {
    // Frappe étouffée : la main ou la baguette reste sur la peau.
    g.gain.setTargetAtTime(0, t + 0.04, 0.025);
    src.stop(t + 0.3);
  }
}
