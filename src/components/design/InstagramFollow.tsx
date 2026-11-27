import React, { useEffect, useState } from "react";
import { InstagramIcon } from "./Icons";
import { SOCIAL } from "../../seo/site";

/** Bouton Instagram de la barre de navigation (compte de Marco). Texte court sur mobile. */
export const NavInstagram: React.FC = () => (
  <a
    className="ds-nav-insta"
    href={SOCIAL.marcoInstagram}
    target="_blank"
    rel="noreferrer"
    aria-label={`Suivre Marco sur Instagram (${SOCIAL.marcoInstagramHandle})`}
    title={SOCIAL.marcoInstagramHandle}
  >
    <InstagramIcon size={18} />
    <span className="ds-nav-insta-full">Suis-moi sur Insta</span>
    <span className="ds-nav-insta-short">Suis-moi</span>
  </a>
);

/**
 * Bouton flottant « Suis-moi sur Insta », en bas à droite, qui apparaît une
 * fois la page défilée (sur mobile, il se place au-dessus de la barre d'action).
 */
export const FloatingInstagram: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={`ds-follow${visible ? " is-visible" : ""}`}
      href={SOCIAL.marcoInstagram}
      target="_blank"
      rel="noreferrer"
      aria-label={`Suivre Marco sur Instagram (${SOCIAL.marcoInstagramHandle})`}
      aria-hidden={!visible || undefined}
      tabIndex={visible ? 0 : -1}
    >
      <InstagramIcon size={20} />
      <span>Suis-moi sur Insta</span>
    </a>
  );
};
