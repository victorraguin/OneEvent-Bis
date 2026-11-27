import React from "react";
import type { Photo } from "../../lib/galleries";

interface PhotoReelProps {
  photos: Photo[];
  id?: string;
  /** Lien affiché sous la bande (ex. Instagram). */
  footer?: React.ReactNode;
}

/**
 * Section « Ça se vit en vrai » : bande de photos qui défile en continu,
 * identique sur toutes les pages. La liste est dupliquée pour boucler sans
 * à-coup ; la copie est masquée aux lecteurs d'écran. Pause au survol ;
 * sans animation (prefers-reduced-motion), la bande se fait glisser à la main.
 * Couleurs : variables --ds-* de la page parente (design-shared.css).
 */
const PhotoReel: React.FC<PhotoReelProps> = ({ photos, id = "galerie", footer }) => {
  if (photos.length === 0) return null;
  const style = { "--reel-duration": `${photos.length * 7}s` } as React.CSSProperties;

  return (
    <section id={id} className="ds-reel" aria-labelledby={`${id}-title`}>
      <div className="ds-wrap ds-reel-head">
        <span className="ds-eyebrow">En images</span>
        <h2 id={`${id}-title`} className="ds-h2">
          Ça se vit <span className="ds-reel-tilt">en vrai</span>
        </h2>
      </div>
      <div className="ds-reel-viewport">
        <div className="ds-reel-track" style={style}>
          {[0, 1].map((copy) =>
            photos.map((p) => (
              <figure key={`${copy}-${p.src}`} className="ds-reel-item" aria-hidden={copy === 1 || undefined}>
                <img
                  src={p.src}
                  alt={copy === 0 ? p.alt : ""}
                  loading="lazy"
                  style={p.pos ? { objectPosition: p.pos } : undefined}
                />
              </figure>
            ))
          )}
        </div>
      </div>
      {footer && <div className="ds-wrap ds-reel-foot">{footer}</div>}
    </section>
  );
};

export default PhotoReel;
