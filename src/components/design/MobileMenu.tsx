import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CloseIcon, MenuIcon } from "./Icons";

export interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  open: boolean;
  onToggle: (open: boolean) => void;
  links: NavLink[];
  cta: NavLink;
  sister?: { to: string; label: string };
}

/**
 * Bouton « menu » + panneau plein écran, visibles sous 980 px.
 * Thème : variables CSS de la page parente (design-shared.css).
 */
const MobileMenu: React.FC<MobileMenuProps> = ({ open, onToggle, links, cta, sister }) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onToggle(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onToggle]);

  const close = () => onToggle(false);

  return (
    <>
      <button
        type="button"
        className="ds-menu-btn"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="ds-mobile-menu"
        onClick={() => onToggle(!open)}
      >
        {open ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
      </button>
      <div
        id="ds-mobile-menu"
        className={`ds-menu-panel${open ? " is-open" : ""}`}
        hidden={!open}
      >
        <nav aria-label="Menu mobile">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="ds-menu-cta" href={cta.href} onClick={close}>
            {cta.label}
          </a>
          {sister && (
            <Link className="ds-menu-sister" to={sister.to} onClick={close}>
              {sister.label}
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
