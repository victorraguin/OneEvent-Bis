import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/design-shared.css";
import "../styles/wanevents.css";
import "../styles/service.css";
import Faq from "../components/seo/Faq";
import ServiceArea from "../components/seo/ServiceArea";
import MobileMenu, { NavLink } from "../components/design/MobileMenu";
import PhotoReel from "../components/design/PhotoReel";
import { FloatingInstagram, NavInstagram } from "../components/design/InstagramFollow";
import { reelFor } from "../lib/galleries";
import { ArrowLeft, ArrowUpRight, MailIcon, PhoneIcon } from "../components/design/Icons";
import { DISPLAY_CONTACT, ROUTES, formatPhone } from "../seo/site";
import { SERVICE_PAGES, ServicePageData, servicePageByKey } from "../seo/pages";

const HOME = ROUTES.wanEvents.path;
const EMAIL = DISPLAY_CONTACT.wanEventsEmail;

const Logo: React.FC = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
    <circle cx="17" cy="17" r="16" fill="none" stroke="#e9724c" strokeWidth="2" />
    <circle cx="17" cy="17" r="10.5" fill="none" stroke="#ffa07a" strokeWidth="2" />
    <circle cx="17" cy="17" r="5" fill="#e9724c" />
  </svg>
);

/** Page de prestation ou de ville (contenu dans src/seo/pages.ts). */
const ServicePage: React.FC<{ page: ServicePageData }> = ({ page }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Flèche retour : vrai retour arrière si l'on vient d'une page du site
  // (la position de défilement est alors restaurée), sinon section des animations de l'accueil.
  const goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const idx = (window.history.state as { idx?: number } | null)?.idx ?? 0;
    if (idx > 0) {
      e.preventDefault();
      navigate(-1);
    }
  };
  const phone = DISPLAY_CONTACT.phone;
  const year = new Date().getFullYear();
  const related = page.related.map(servicePageByKey).filter((p): p is ServicePageData => !!p);

  const nav: NavLink[] = [
    { href: "#details", label: "En détail" },
    { href: "#zone", label: "Zone" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <div className="we sp">
      <header className="ds-wrap">
        <nav className="sp-nav" aria-label="Navigation principale">
          <Link to={HOME} className="sp-logo">
            <Logo />
            <span>Wan'Events</span>
          </Link>
          <ul className="sp-navlinks">
            {nav.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="ds-nav-end">
            <NavInstagram />
            <a className="sp-btn sp-btn-accent sp-nav-cta" href="#contact">
              Demander un devis
            </a>
            <MobileMenu
              open={menuOpen}
              onToggle={setMenuOpen}
              links={[...nav, { href: `${HOME}#services`, label: "Toutes les animations" }]}
              cta={{ href: "#contact", label: "Demander un devis" }}
            />
          </div>
        </nav>
      </header>

      <main>
        <section className="sp-hero" aria-labelledby="sp-title">
          <div className="ds-wrap">
            <nav className="sp-crumbs" aria-label="Fil d'Ariane">
              <Link
                to={`${HOME}#services`}
                onClick={goBack}
                className="sp-back"
                aria-label="Retour"
                title="Retour"
              >
                <ArrowLeft size={18} />
              </Link>
              <ol>
                <li>
                  <Link to={HOME}>Accueil</Link>
                </li>
                <li aria-current="page">{page.label}</li>
              </ol>
            </nav>
            <div className="sp-hero-grid">
              <div className="sp-hero-copy">
                <span className="ds-eyebrow">{page.eyebrow}</span>
                <h1 id="sp-title" className="sp-h1">
                  {page.h1}
                </h1>
                <p className="sp-lead">{page.lead}</p>
                <div className="sp-ctas">
                  <a className="sp-btn sp-btn-accent" href="#contact">
                    Demander un devis
                    <ArrowUpRight size={18} />
                  </a>
                  <a className="sp-btn sp-btn-line" href={`tel:${phone}`}>
                    <PhoneIcon size={18} />
                    {formatPhone(phone)}
                  </a>
                </div>
              </div>
              <div className="sp-hero-img">
                <img
                  src={page.image.src}
                  alt={page.image.alt}
                  width={520}
                  height={650}
                  style={page.image.pos ? { objectPosition: page.image.pos } : undefined}
                  {...{ fetchpriority: "high" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="details" className="sp-details" aria-label="En détail">
          <div className="ds-wrap">
            {page.sections.map((s) => (
              <div key={s.title} className="sp-block">
                <h2>{s.title}</h2>
                <div className="sp-block-body">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {s.bullets && (
                    <ul>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <PhotoReel photos={reelFor(page.photos)} />

        {related.length > 0 && (
          <section className="sp-related" aria-labelledby="sp-related-title">
            <div className="ds-wrap">
              <span className="ds-eyebrow">Voir aussi</span>
              <h2 id="sp-related-title" className="ds-h2 sp-related-title">
                Autres prestations
              </h2>
              <div className="sp-related-grid">
                {related.map((r) => (
                  <Link key={r.key} to={r.path} className="sp-related-card">
                    <strong>{r.label}</strong>
                    <span aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ServiceArea intro={page.zoneIntro} />
        <Faq items={page.faq} />

        <section id="contact" className="sp-contact" aria-labelledby="sp-contact-title">
          <div className="sp-contact-box">
            <div className="ds-wrap">
              <h2 id="sp-contact-title">Parlez-moi de votre événement.</h2>
              <p>Indiquez-moi la date, le lieu et le nombre de personnes. Je vous rappelle et je vous envoie un devis.</p>
              <div className="sp-ctas">
                <a className="sp-btn sp-btn-solid" href={`tel:${phone}`}>
                  <PhoneIcon size={18} />
                  Appeler · {formatPhone(phone)}
                </a>
                <a className="sp-btn sp-btn-soft" href={`mailto:${EMAIL}`}>
                  <MailIcon size={18} />
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="sp-footer">
        <div className="ds-wrap">
          <div className="sp-foot-grid">
            <div className="sp-foot-col">
              <strong>
                <Link to={HOME}>Wan'Events</Link>
              </strong>
              {SERVICE_PAGES.map((p) => (
                <Link key={p.key} to={p.path}>
                  {p.label}
                </Link>
              ))}
            </div>
            <div className="sp-foot-col">
              <strong>Contact</strong>
              <a href={`tel:${phone}`}>{formatPhone(phone)}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              <span>Entre Nantes et Pornic (44)</span>
            </div>
          </div>
          <div className="sp-foot-bottom">
            © <span suppressHydrationWarning>{year}</span> Marco Douka · Wan'Events ·{" "}
            <Link to={ROUTES.legal.path}>Mentions légales</Link>
          </div>
        </div>
      </footer>

      <FloatingInstagram />

      <div className="ds-actionbar">
        <a className="ds-ab-icon" href={`tel:${phone}`} aria-label="Appeler Marco">
          <PhoneIcon size={20} />
        </a>
        <a className="ds-ab-main" href="#contact">
          Demander un devis
        </a>
      </div>
    </div>
  );
};

export default ServicePage;
