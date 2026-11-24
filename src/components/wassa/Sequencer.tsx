import React, { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "../design/Icons";
import { getAudioContext, loadKit, playStroke, prefetchKit } from "../../lib/drumKit";
import {
  INSTRUMENTS,
  RHYTHMS,
  gridFromRhythm,
  stepSeconds,
  type Grid,
  type Rhythm,
  type Stroke,
} from "../../lib/rhythms";

const DEFAULT = RHYTHMS[0];

const cx = (...c: (string | false)[]) => c.filter(Boolean).join(" ");

// Une touche par ligne : on lit « WASSA » de haut en bas. Une touche partagée
// (A, S) coupe ou rallume ses deux lignes ensemble.
const KEYS = ["w", "a", "s", "s", "a"] as const;

/**
 * Boîte à rythme : on écoute un rythme traditionnel (voir lib/rhythms.ts) et on
 * peut allumer / éteindre des frappes. Volontairement simple pour les visiteurs.
 */
const Sequencer: React.FC = () => {
  const [rhythm, setRhythm] = useState<Rhythm>(DEFAULT); // mesure et tempo
  const [edited, setEdited] = useState(false);
  const [grid, setGrid] = useState<Grid>(() => gridFromRhythm(DEFAULT));
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0); // relance l'ordonnanceur au changement de rythme
  const [muted, setMuted] = useState<boolean[]>(() => INSTRUMENTS.map(() => false));
  const gridRef = useRef(grid);
  const mutedRef = useRef(muted);
  const stepSecRef = useRef(stepSeconds(DEFAULT));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gridRef.current = grid;
  }, [grid]);
  useEffect(() => {
    stepSecRef.current = stepSeconds(rhythm);
  }, [rhythm]);
  useEffect(() => {
    mutedRef.current = muted;
  }, [muted]);

  // Clavier : W, A, S coupent / rallument les instruments quand la section est à l'écran.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      const rows = KEYS.flatMap((k, i) => (k === e.key.toLowerCase() ? [i] : []));
      const box = sectionRef.current?.getBoundingClientRect();
      if (!rows.length || !box || box.bottom < 0 || box.top > window.innerHeight) return;
      e.preventDefault();
      setMuted((m) => {
        const allMuted = rows.every((i) => m[i]);
        return m.map((v, i) => (rows.includes(i) ? !allMuted : v));
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Les sons (~250 Ko) ne sont téléchargés qu'à l'approche de la section.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        prefetchKit().catch(() => {});
        io.disconnect();
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Ordonnanceur « lookahead » : les frappes sont programmées un peu à l'avance
  // sur l'horloge audio ; l'affichage suit via requestAnimationFrame.
  // Chaque instrument boucle sur la longueur de sa propre partie.
  useEffect(() => {
    if (!playing) return;
    const c = getAudioContext();
    let next = c.currentTime + 0.06;
    let i = 0;
    const queue: { step: number; time: number }[] = [];
    const schedule = () => {
      while (next < c.currentTime + 0.12) {
        gridRef.current.forEach((row, r) => {
          const s = row[i % row.length];
          if (s && !mutedRef.current[r]) playStroke(INSTRUMENTS[r].id, s, next);
        });
        queue.push({ step: i, time: next });
        i++;
        next += stepSecRef.current;
      }
    };
    schedule();
    const timer = window.setInterval(schedule, 25);
    let raf = 0;
    const draw = () => {
      let s = -1;
      while (queue.length && queue[0].time <= c.currentTime) s = queue.shift()!.step;
      if (s >= 0) setStep(s);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const onHide = () => document.hidden && setPlaying(false);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      window.clearInterval(timer);
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [playing, run]);

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      setStep(0);
    } else {
      getAudioContext(); // à créer pendant le clic (politique d'autoplay)
      loadKit().then(
        () => setPlaying(true),
        () => {},
      );
    }
  };

  const selectRhythm = (r: Rhythm) => {
    setRhythm(r);
    setGrid(gridFromRhythm(r));
    setEdited(false);
    setStep(0);
    setRun((n) => n + 1);
  };

  // Toucher un cercle l'allume ou l'éteint. Une frappe rallumée reprend celle de
  // la partition d'origine (sinon la frappe principale de l'instrument).
  const toggle = (r: number, c: number) => {
    const inst = INSTRUMENTS[r];
    const original = gridFromRhythm(rhythm)[r][c];
    const nextStroke: Stroke = grid[r][c] ? "" : original || inst.strokes[0];
    if (nextStroke && !playing && !muted[r]) {
      getAudioContext();
      loadKit().then(
        () => playStroke(inst.id, nextStroke),
        () => {},
      );
    }
    setGrid((g) => g.map((row, ri) => (ri === r ? row.map((v, ci) => (ci === c ? nextStroke : v)) : row)));
    setEdited(true);
  };

  const toggleMute = (r: number) => setMuted((m) => m.map((v, i) => (i === r ? !v : v)));

  const vars = {
    "--steps": rhythm.steps,
    "--half": rhythm.steps / 2,
  } as React.CSSProperties;

  return (
    <section ref={sectionRef} id="rythme" className="wa-rythme" aria-labelledby="rythme-title">
      <div className="wa-rythme-box">
        <div className="wa-rythme-deco" aria-hidden="true" />
        <div className="wa-wrap wa-seq-grid">
          <div className="wa-seq-copy">
            <span className="wa-seq-tag">À vous de jouer</span>
            <h2 id="rythme-title" className="wa-h2">
              Chaque événement a <span className="wa-gold">son rythme.</span>
            </h2>
            <p>
              Écoutez un rythme traditionnel, puis touchez les cercles pour créer votre version. Sur scène, c'est la
              même magie, en vrai et en grand.
            </p>
            <div className="wa-seq-rhythms" role="group" aria-label="Rythmes traditionnels">
              {RHYTHMS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className="wa-seq-chip"
                  aria-pressed={!edited && rhythm.id === r.id}
                  onClick={() => selectRhythm(r)}
                >
                  {r.name}
                </button>
              ))}
            </div>
            <div className="wa-seq-btns">
              <button type="button" className="wa-btn wa-btn-gold" aria-pressed={playing} onClick={togglePlay}>
                {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
                {playing ? "Arrêter" : "Écouter"}
              </button>
            </div>
          </div>
          <div className={cx("wa-seq", rhythm.steps === 16 && "is-16")} style={vars}>
            {INSTRUMENTS.map((inst, r) => {
              const row = grid[r];
              const now = playing ? step % row.length : -1;
              return (
                <div key={inst.id} className={cx("wa-seq-row", muted[r] && "is-muted")}>
                  <button
                    type="button"
                    className="wa-seq-name"
                    aria-pressed={muted[r]}
                    aria-label={`Couper ${inst.name}`}
                    aria-keyshortcuts={KEYS[r].toUpperCase()}
                    title={`${muted[r] ? "Rallumer" : "Couper"} ${inst.name} (touche ${KEYS[r].toUpperCase()})`}
                    onClick={() => toggleMute(r)}
                  >
                    <kbd className="wa-seq-key">{KEYS[r].toUpperCase()}</kbd>
                    <span className="wa-seq-label">{inst.name}</span>
                  </button>
                  <div className="wa-seq-cells">
                    {row.map((s, c) => (
                      <button
                        key={c}
                        type="button"
                        className={cx(
                          "wa-cell",
                          c === now && "is-now",
                          Math.floor((c % rhythm.steps) / rhythm.beat) % 2 === 1 && "is-alt",
                        )}
                        aria-pressed={!!s}
                        aria-label={`${inst.name}, temps ${c + 1}`}
                        onClick={() => toggle(r, c)}
                        style={s ? { background: inst.color, borderColor: inst.color } : undefined}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="wa-seq-row wa-seq-tempo" aria-hidden="true">
              <span className="wa-seq-tempo-label">Tempo</span>
              <div className="wa-seq-track">
                <div
                  className={cx("wa-playhead", playing && "is-live")}
                  style={{
                    transform: `translateX(calc(${playing ? step % rhythm.steps : 0} * (var(--cell) + var(--gap))))`,
                  }}
                />
              </div>
            </div>
            <div className="wa-seq-info">
              <p>
                {edited ? (
                  <>
                    Votre version de <strong>{rhythm.name}</strong>
                  </>
                ) : (
                  <>
                    <strong>{rhythm.name}</strong> · {rhythm.origin}
                  </>
                )}
              </p>
              <p className="wa-seq-hint">
                <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> couper / rallumer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sequencer;
