import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/design-shared.css";
import "../styles/wassa.css";
import Faq from "../components/seo/Faq";
import ServiceArea from "../components/seo/ServiceArea";
import MobileMenu, { NavLink } from "../components/design/MobileMenu";
import Sequencer from "../components/wassa/Sequencer";
import {
  ArrowUpRight,
  FacebookIcon,
  InstagramIcon,
  PauseIcon,
  PhoneIcon,
  PlayIcon,
  SwipeIcon,
} from "../components/design/Icons";
import { getWassaEmbedInfo, getWassaEmbedSrc } from "../lib/radioConfig";
import {
  DISPLAY_CONTACT,
  ROUTES,
  SOCIAL,
  WASSA_FAQ,
  formatPhone,
} from "../seo/site";

const IMG = {
  hero: "/WassaPercussion/Wassa_Percussion.webp",
  stage: "/WassaPercussion/Wassa_Percussion4.webp",
  initiation: "/WassaPercussion/Wassa_Percussion_Initiation.webp",
  parade: "/WassaPercussion/Wassa_Percussion_Moutier.webp",
  djembe: "/WassaPercussion/Wassa_Percussion_Djembe.webp",
  family: "/WassaPercussion/Wassa_Percussion_Initiation_2.webp",
  duo: "/WassaPercussion/Wassa_Percussion1.webp",
  concert: "/WassaPercussion/Wassa_Percussion_Groupe.webp",
  park: "/WassaPercussion/Wassa_Percussion3.webp",
  hands: "/WassaPercussion/Wassa_Percussion2.webp",
};

// Laçage du djembé : zigzag entre deux cercles (calcul déterministe → même
// rendu au pré-rendu et à l'hydratation).
const ROPE_POINTS = Array.from({ length: 72 }, (_, i) => {
  const a = (Math.PI * i) / 36;
  const r = i % 2 === 0 ? 290 : 238;
  return `${(300 + r * Math.cos(a)).toFixed(1)},${(300 + r * Math.sin(a)).toFixed(1)}`;
}).join(" ");

const PRESTATIONS = [
  { n: "01", title: "Show percussion", text: "Spectacles pour festivals, salles et événements culturels.", img: IMG.stage, alt: "Trois percussionnistes sur scène" },
  { n: "02", title: "Cours percussion", text: "Initiations au djembé et aux rythmes d'Afrique de l'Ouest, tous niveaux.", img: IMG.initiation, alt: "Initiation au djembé en plein air, enfants et adultes" },
  { n: "03", title: "Déambulation", text: "Animations percussives itinérantes pour vos événements et festivals.", img: IMG.parade, alt: "Déambulation festive sous les arbres" },
  { n: "04", title: "Réparation djembés", text: "Réparation et entretien de djembés et percussions africaines.", img: IMG.djembe, alt: "Djembé porté en main" },
];

const BAR_COLORS = ["#e3a02f", "#c4532d", "#e3a02f", "#fbf5ea", "#e3a02f", "#c4532d", "#e3a02f", "#fbf5ea", "#e3a02f", "#c4532d", "#e3a02f", "#fbf5ea"];
const BAR_DELAYS = [-0.2, -0.5, -0.1, -0.7, -0.35, -0.8, -0.15, -0.6, -0.45, -0.25, -0.9, -0.05];

const Logo: React.FC = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
    <circle cx="22" cy="22" r="21" fill="#2a1a12" />
    <polyline points="6,22 10,12 14,22 18,12 22,22 26,12 30,22 34,12 38,22" fill="none" stroke="#e3a02f" strokeWidth="2.4" strokeLinejoin="round" />
    <circle cx="22" cy="28" r="5" fill="#c4532d" />
  </svg>
);

const Radio: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const info = getWassaEmbedInfo();
  // Lecture lancée par un clic : on peut démarrer avec le son.
  const src = useMemo(() => getWassaEmbedSrc()?.replace("mute=1", "mute=0") ?? null, []);
  if (!info || !src) return null;

  return (
    <section id="radio" className="wa-radio" aria-labelledby="radio-title">
      <div className="wa-wrap">
        <div className="wa-radio-bar">
          <div className="wa-disc" aria-hidden="true">
            <div className="wa-disc-img">
              <img src={IMG.hands} alt="" loading="lazy" />
            </div>
            <span className="wa-disc-hole" />
          </div>
          <div className="wa-radio-info">
            <span className="wa-onair">
              <span className="wa-beat" aria-hidden="true" />
              En direct
            </span>
            <h2 id="radio-title">Radio Wassa Percussion</h2>
            <div className="wa-bars" aria-hidden="true">
              {BAR_COLORS.map((color, i) => (
                <span key={i} style={{ background: color, animationDelay: `${BAR_DELAYS[i]}s` }} />
              ))}
            </div>
          </div>
          <div className="wa-radio-ctrl">
            <button
              type="button"
              className="wa-play"
              aria-label={playing ? "Arrêter la radio" : "Lancer la radio"}
              aria-pressed={playing}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <PauseIcon size={30} /> : <PlayIcon size={30} />}
            </button>
            <a className="wa-yt" href={info.pageUrl} target="_blank" rel="noreferrer" aria-label="Ouvrir sur YouTube">
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
        {playing && (
          <div className="wa-player">
            <iframe
              title="Radio Wassa Percussion"
              src={src}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
};

const WassaPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const phone = DISPLAY_CONTACT.phone;
  const email = DISPLAY_CONTACT.wassaEmail;
  const year = new Date().getFullYear();
  const hasRadio = !!getWassaEmbedInfo();

  const nav: NavLink[] = [
    { href: "#prestations", label: "Prestations" },
    { href: "#rythme", label: "Le rythme" },
    { href: "#cours", label: "Cours" },
    { href: "#galerie-w", label: "Galerie" },
    ...(hasRadio ? [{ href: "#radio", label: "Radio" }] : []),
  ];
  const mobileNav: NavLink[] = [...nav, { href: "#zone", label: "Zone" }, { href: "#faq", label: "FAQ" }];

  return (
    <div className="wa">
      {/* ============ NAV ============ */}
      <header className="wa-wrap wa-navbar">
        <nav className="wa-nav" aria-label="Navigation principale">
          <a href="#top-w" className="wa-logo">
            <Logo />
            <span className="wa-logo-text">
              <strong>Wassa</strong>
              <small>PERCUSSION</small>
            </span>
          </a>
          <ul className="wa-navlinks">
            {nav.map((l) => (
              <li key={l.href}>
                <a className="wa-nl" href={l.href}>
                  {l.href === "#radio" && <span className="wa-beat" aria-hidden="true" />}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="wa-btn wa-nav-cta" href="#booking">
            Réserver
          </a>
          <MobileMenu
            open={menuOpen}
            onToggle={setMenuOpen}
            links={mobileNav}
            cta={{ href: "#booking", label: "Réserver Wassa" }}
            sister={{ to: ROUTES.wanEvents.path, label: "Découvrir Wan'Events →" }}
          />
        </nav>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section id="top-w" className="wa-hero">
          <div className="wa-wrap wa-hero-grid">
            <div className="wa-hero-copy">
              <p className="wa-badge">
                <span className="wa-badge-dot" aria-hidden="true" />
                Percussions d'Afrique de l'Ouest · Pornic (44)
              </p>
              <h1 className="wa-h1">
                Le rythme
                <br /> qui <span className="wa-italic">ras&shy;semble.</span>
              </h1>
              <p className="wa-hero-lead">
                Shows, déambulations, cours de djembé et réparation d'instruments : la puissance et l'énergie des
                percussions d'Afrique de l'Ouest à Pornic, dans le Pays de Retz, à Saint-Nazaire et Nantes.
              </p>
              <div className="wa-hero-ctas">
                <a className="wa-btn wa-btn-indigo" href="#booking">
                  Réserver un show
                  <span className="wa-btn-dot">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
                {hasRadio && (
                  <a className="wa-btn wa-btn-line" href="#radio">
                    <span className="wa-btn-dot">
                      <PlayIcon size={16} />
                    </span>
                    Écouter Radio Wassa
                  </a>
                )}
              </div>
            </div>

            <div className="wa-hero-visual">
              <div className="wa-sun" aria-hidden="true" />
              <div className="wa-moon" aria-hidden="true" />
              <svg className="wa-rope" viewBox="0 0 600 600" aria-hidden="true">
                <polygon points={ROPE_POINTS} fill="none" stroke="#2a1a12" strokeWidth="3" strokeLinejoin="round" />
                <circle cx="300" cy="300" r="290" fill="none" stroke="#2a1a12" strokeWidth="2" />
                <circle cx="300" cy="300" r="238" fill="none" stroke="#2a1a12" strokeWidth="2" />
              </svg>
              <div className="wa-skin">
                <img
                  src={IMG.hero}
                  alt="Rangée de djembés dans l'herbe, au soleil"
                  width={452}
                  height={452}
                  {...{ fetchpriority: "high" }}
                />
              </div>
              <div className="wa-live-badge wa-sway" aria-hidden="true">
                Live
                <br />
                &amp; vivant
              </div>
            </div>
          </div>
        </section>

        {/* ============ BANDEAU TEXTILE ============ */}
        <div className="wa-textile" aria-hidden="true">
          <svg width="100%" height="64">
            <defs>
              <pattern id="wa-tex" width="96" height="64" patternUnits="userSpaceOnUse">
                <rect width="96" height="64" fill="#2a1a12" />
                <polyline points="0,40 12,24 24,40 36,24 48,40" fill="none" stroke="#e3a02f" strokeWidth="4" strokeLinejoin="round" />
                <circle cx="72" cy="32" r="9" fill="none" stroke="#fbf5ea" strokeWidth="3" />
                <circle cx="72" cy="32" r="3" fill="#c4532d" />
                <rect x="0" y="6" width="96" height="3" fill="#c4532d" />
                <rect x="0" y="55" width="96" height="3" fill="#c4532d" />
              </pattern>
            </defs>
            <rect width="100%" height="64" fill="url(#wa-tex)" />
          </svg>
        </div>

        {/* ============ PRESTATIONS ============ */}
        <section id="prestations" className="wa-presta-sec" aria-labelledby="presta-title">
          <div className="wa-wrap">
            <div className="wa-sec-head">
              <h2 id="presta-title" className="wa-h2">
                Nos
                <br /> <span className="wa-clay">prestations</span>
              </h2>
              <p className="wa-sec-lead">
                De la scène au cœur du public, en passant par vos instruments : Wassa fait battre chaque moment.
              </p>
              <p className="ds-hscroll-hint">
                <SwipeIcon size={16} />
                Faites glisser
              </p>
            </div>
          </div>
          <div className="wa-wrap">
            <div className="wa-presta">
              {PRESTATIONS.map((p, i) => (
                <a key={p.n} href="#booking" className={`wa-pcard wa-pc-${i + 1}`}>
                  <div className="wa-pcard-photo">
                    <img src={p.img} alt={p.alt} loading="lazy" />
                  </div>
                  <div className="wa-pcard-body">
                    <span className="wa-pcard-num">{p.n}</span>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Sequencer />

        {/* ============ COURS ============ */}
        <section id="cours" className="wa-cours" aria-labelledby="cours-title">
          <div className="wa-wrap wa-cours-grid">
            <div className="wa-cours-visual">
              <div className="wa-cours-a">
                <img src={IMG.family} alt="Initiation djembé en famille" loading="lazy" />
              </div>
              <div className="wa-cours-b">
                <img src={IMG.duo} alt="Deux percussionnistes complices" loading="lazy" />
              </div>
              <div className="wa-levels wa-sway" aria-hidden="true">
                Tous niveaux
              </div>
            </div>
            <div className="wa-cours-copy">
              <h2 id="cours-title" className="wa-h2">
                Tout le monde
                <br /> peut <span className="wa-italic">jouer.</span>
              </h2>
              <p>
                Cours et initiations au djembé à Pornic (44) : on apprend les rythmes traditionnels d'Afrique de
                l'Ouest, on joue ensemble, et on repart avec le sourire.
              </p>
              <ul className="wa-steps">
                <li>
                  <span style={{ background: "#1f3157", color: "#fbf5ea" }}>1</span>
                  Initiations découverte, enfants et adultes
                </li>
                <li>
                  <span style={{ background: "#c4532d", color: "#fbf5ea" }}>2</span>
                  Cours réguliers de djembé
                </li>
                <li>
                  <span style={{ background: "#e3a02f", color: "#2a1a12" }}>3</span>
                  Ateliers pour écoles, associations et entreprises
                </li>
              </ul>
              <a className="wa-btn wa-btn-dark" href="#booking">
                Demander un cours
              </a>
            </div>
          </div>
        </section>

        {/* ============ GALERIE ============ */}
        <section id="galerie-w" className="wa-gallery" aria-labelledby="galerie-title">
          <div className="wa-wrap">
            <div className="wa-gal-head">
              <h2 id="galerie-title" className="wa-h2">
                Sur le terrain
              </h2>
              <div className="wa-gal-line" aria-hidden="true" />
              <span className="wa-gal-dot" aria-hidden="true" />
            </div>
            <div className="wa-gal">
              <figure className="wa-g-wide">
                <img src={IMG.concert} alt="Concert de percussions en plein air devant le public" loading="lazy" />
              </figure>
              <figure className="wa-g-tall">
                <img src={IMG.park} alt="Percussionniste au djembé dans un parc" loading="lazy" />
              </figure>
              <figure className="wa-g-round">
                <img src={IMG.hands} alt="Mains sur la peau d'un djembé" loading="lazy" />
              </figure>
              <figure className="wa-g-arch">
                <img src={IMG.initiation} alt="Initiation collective" loading="lazy" />
              </figure>
              <figure className="wa-g-drop">
                <img src={IMG.duo} alt="Duo de djembés" loading="lazy" />
              </figure>
              <div className="wa-g-insta">
                <InstagramIcon size={44} strokeWidth={2} />
                <a href={SOCIAL.instagram} target="_blank" rel="noreferrer">
                  Suivez-nous
                  <br />
                  {SOCIAL.instagramHandle}
                </a>
              </div>
            </div>
          </div>
        </section>

        <Radio />

        <ServiceArea
          brand="Wassa Percussion"
          intro="Spectacles, déambulations et initiations aux percussions africaines dans le sud de la Loire-Atlantique : Wassa Percussion joue de Pornic à Nantes, en passant par Saint-Brevin-les-Pins, Saint-Nazaire et tout le Pays de Retz."
        />
        <Faq items={WASSA_FAQ} />

        {/* ============ RÉSERVATION ============ */}
        <section id="booking" className="wa-booking" aria-labelledby="booking-title">
          <div className="wa-booking-box">
            <div className="wa-dots" aria-hidden="true">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="wa-dots" width="36" height="36" patternUnits="userSpaceOnUse">
                    <circle cx="18" cy="18" r="4" fill="#2a1a12" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#wa-dots)" />
              </svg>
            </div>
            <div className="wa-wrap wa-book-grid">
              <div className="wa-book-copy">
                <h2 id="booking-title" className="wa-book-h2">
                  Faites
                  <br /> battre votre
                  <br /> <span style={{ color: "#2a1a12" }}>événement.</span>
                </h2>
                <p>
                  Festival, mariage, fête de village, séminaire : donnez un esprit Wassa à votre date, avec énergie,
                  partage et rythmes d'Afrique de l'Ouest.
                </p>
                <div className="wa-book-btns">
                  <a className="wa-btn wa-btn-call" href={`tel:${phone}`}>
                    <span className="wa-btn-dot">
                      <PhoneIcon size={20} />
                    </span>
                    Appeler · {formatPhone(phone)}
                  </a>
                  <a className="wa-btn wa-btn-mail" href={`mailto:${email}`}>
                    Envoyer un email
                  </a>
                </div>
              </div>
              <div className="wa-book-visual">
                <div className="wa-book-photo">
                  <img src={IMG.stage} alt="Wassa Percussion sur scène" loading="lazy" />
                </div>
                <div className="wa-quote-badge wa-sway" aria-hidden="true">
                  Devis
                  <br />
                  gratuit
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="wa-footer">
        <div className="wa-wrap">
          <div className="wa-foot-grid">
            <div className="wa-foot-about">
              <p>
                Les rythmes d'Afrique de l'Ouest à Pornic, dans le Pays de Retz, à Saint-Nazaire et Nantes, à travers
                des shows énergiques et des ateliers immersifs.
              </p>
              <div className="wa-socials">
                <a href={SOCIAL.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                  <InstagramIcon size={20} />
                </a>
                <a href={SOCIAL.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                  <FacebookIcon size={20} />
                </a>
              </div>
            </div>
            <div className="wa-foot-col">
              <strong>Prestations</strong>
              <a href="#prestations">Shows</a>
              <a href="#cours">Cours</a>
              <a href="#prestations">Déambulation</a>
              <a href="#prestations">Réparation</a>
              <a href="#faq">Questions fréquentes</a>
            </div>
            <div className="wa-foot-col">
              <strong>Contact</strong>
              <a href={`tel:${phone}`}>{formatPhone(phone)}</a>
              <a href={`mailto:${email}`}>{email}</a>
              <span>Pornic (44)</span>
            </div>
          </div>
          <div className="wa-wordmark" aria-hidden="true">
            Wassa
          </div>
          <div className="wa-foot-bottom">
            <span>
              © <span suppressHydrationWarning>{year}</span> Wassa Percussion · Marco Douka
            </span>
            <span>
              Activité sœur de{" "}
              <Link to={ROUTES.wanEvents.path}>
                Wan'Events
              </Link>
            </span>
          </div>
        </div>
      </footer>

      {/* ============ BARRE D'ACTION MOBILE ============ */}
      <div className="ds-actionbar">
        <a className="ds-ab-icon" href={`tel:${phone}`} aria-label="Appeler Wassa Percussion">
          <PhoneIcon size={20} />
        </a>
        <a className="ds-ab-main" href="#booking">
          Réserver Wassa
        </a>
        {hasRadio && (
          <a className="ds-ab-icon ds-ab-radio" href="#radio" aria-label="Écouter Radio Wassa">
            <PlayIcon size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export default WassaPage;
