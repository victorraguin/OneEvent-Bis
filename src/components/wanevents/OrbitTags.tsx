import React, { useEffect, useRef } from "react";

type Tone = "peach" | "green" | "cream" | "accent";

/** Textes affichés à tour de rôle (choisis par Marco). */
const LABELS: { label: string; tone: Tone }[] = [
  { label: "Team building", tone: "green" },
  { label: "Karaoké", tone: "cream" },
  { label: "Quizz", tone: "accent" },
  { label: "Blind Tests", tone: "peach" },
  { label: "Speaker", tone: "cream" },
  { label: "Animateur", tone: "green" },
];

/**
 * Étiquettes en orbite autour de la photo du haut (Wan'Events) : 4 au plus,
 * sur 2 anneaux à plat qui tournent lentement. Sur l'arrière, une étiquette
 * repasse derrière la photo (plus petite, plus sombre) ; au point le plus
 * reculé, cachée par la photo, elle prend l'animation suivante de LABELS.
 * `y` = hauteur de l'anneau en fraction de la photo ; `period` en secondes.
 */
const ORBITS: { y: number; period: number; dir: 1 | -1; count: number }[] = [
  { y: 0.1, period: 46, dir: 1, count: 2 },
  { y: 0.62, period: 54, dir: -1, count: 2 },
];

const TILT = [-6, 5, 4, -5];
const BACK = -Math.PI / 2; // angle du point le plus reculé (sin = -1)
const TURN = Math.PI * 2;

// Dimensions de départ (ordinateur), identiques au serveur et au navigateur
// pour que le premier rendu corresponde au HTML pré-rendu.
const DEFAULT = { cx: 320, archTop: 0, archH: 600, rx: 270, ry: 36 };
type Dims = typeof DEFAULT;

const SLOTS = ORBITS.flatMap((orbit, o) =>
  Array.from({ length: orbit.count }, (_, t) => ({
    orbit,
    // Décalage de départ : les étiquettes ne démarrent pas toutes au même endroit.
    start: (t / orbit.count) * TURN + o * 1.3 + 0.4,
  }))
);

const styleFor = (angle: number, y: number, tilt: number, d: Dims) => {
  const depth = (Math.sin(angle) + 1) / 2; // 0 = tout au fond, 1 = tout devant
  const px = d.rx * Math.cos(angle);
  const py = d.archTop + d.archH * y + d.ry * Math.sin(angle);
  return {
    transform: `translate(calc(${px.toFixed(1)}px - 50%), calc(${py.toFixed(1)}px - 50%)) scale(${(0.74 + 0.26 * depth).toFixed(3)}) rotate(${tilt}deg)`,
    zIndex: Math.sin(angle) > 0 ? 3 : 1,
    opacity: Number((0.45 + 0.55 * depth).toFixed(2)),
  };
};

/** Nombre de passages par le point le plus reculé : il change quand l'étiquette est cachée. */
const lapsBehind = (angle: number, dir: 1 | -1) => Math.floor((dir * (angle - BACK)) / TURN);

const OrbitTags: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    const visual = root?.parentElement;
    if (!root || !visual) return;
    const arch = visual.querySelector<HTMLElement>(".we-arch");

    let dims: Dims = DEFAULT;
    let elapsed = 0;
    let next = SLOTS.length; // prochaine animation de LABELS à afficher
    const laps = SLOTS.map((s) => lapsBehind(s.start, s.orbit.dir));

    const measure = () => {
      const w = visual.clientWidth;
      const archW = arch?.offsetWidth ?? 400;
      dims = {
        cx: w / 2,
        archTop: arch?.offsetTop ?? 0,
        archH: arch?.offsetHeight ?? 600,
        // Assez large pour dépasser de la photo, sans sortir de l'écran sur mobile.
        rx: Math.min(archW / 2 + 70, w / 2 - 40),
        ry: archW > 300 ? 36 : 24,
      };
      root.style.left = `${dims.cx}px`;
    };

    const draw = (seconds: number) => {
      SLOTS.forEach((slot, i) => {
        const el = tagRefs.current[i];
        if (!el) return;
        const { orbit, start } = slot;
        const angle = start + orbit.dir * ((seconds * TURN) / orbit.period);
        const lap = lapsBehind(angle, orbit.dir);
        if (lap !== laps[i]) {
          // Cachée derrière la photo : on passe à l'animation suivante.
          laps[i] = lap;
          // Jamais deux fois le même texte à l'écran : on saute ceux déjà affichés.
          const shown = new Set(tagRefs.current.map((t) => t?.textContent));
          let pick = LABELS[next % LABELS.length];
          for (let k = 0; k < LABELS.length && shown.has(pick.label); k++) {
            next++;
            pick = LABELS[next % LABELS.length];
          }
          next++;
          const { label, tone } = pick;
          el.textContent = label;
          el.className = `we-orbit-tag we-ot-${tone}`;
        }
        const s = styleFor(angle, orbit.y, TILT[i % TILT.length], dims);
        el.style.transform = s.transform;
        el.style.zIndex = String(s.zIndex);
        el.style.opacity = String(s.opacity);
      });
    };

    measure();
    draw(0);
    const onResize = () => {
      measure();
      draw(elapsed);
    };
    window.addEventListener("resize", onResize);

    // Sans animation demandée par le visiteur : étiquettes fixes autour de la photo.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let last = 0;
    let visible = true;
    const tick = (now: number) => {
      if (last) elapsed += Math.min(now - last, 100) / 1000;
      last = now;
      draw(elapsed);
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (reduced || frame || !visible) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    // Pause quand le haut de page n'est plus à l'écran.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(visual);
    start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={rootRef} className="we-orbit" style={{ left: DEFAULT.cx }} aria-hidden="true">
      {SLOTS.map((slot, i) => {
        const { label, tone } = LABELS[i];
        return (
          <span
            key={i}
            ref={(el) => {
              tagRefs.current[i] = el;
            }}
            className={`we-orbit-tag we-ot-${tone}`}
            style={styleFor(slot.start, slot.orbit.y, TILT[i % TILT.length], DEFAULT)}
          >
            {label}
          </span>
        );
      })}
    </div>
  );
};

export default OrbitTags;
