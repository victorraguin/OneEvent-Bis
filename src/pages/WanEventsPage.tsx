import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/design-shared.css";
import "../styles/wanevents.css";
import Faq from "../components/seo/Faq";
import ServiceArea from "../components/seo/ServiceArea";
import MobileMenu, { NavLink } from "../components/design/MobileMenu";
import PhotoReel from "../components/design/PhotoReel";
import OrbitTags from "../components/wanevents/OrbitTags";
import { FloatingInstagram, NavInstagram } from "../components/design/InstagramFollow";
import { WE_GALLERY } from "../lib/galleries";
import {
  ArrowUpRight,
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  StarIcon,
  SwipeIcon,
} from "../components/design/Icons";
import {
  DISPLAY_CONTACT,
  ROUTES,
  SOCIAL,
  WANEVENTS_FAQ,
  formatPhone,
} from "../seo/site";
import { SERVICE_PAGES, servicePageByKey } from "../seo/pages";

const pageHref = (key: string) => servicePageByKey(key)?.path ?? "#contact";

const IMG = {
  djembe: "/OneEvent/Marco_OneEvent_Animation.webp",
  hero: "/OneEvent/OneEvent_Marco_Animation.webp",
  quiz: "/OneEvent/OneEvent_Marco.webp",
  mc: "/OneEvent/WanEvents_Marco_Foot_Animation.webp",
  portrait: "/OneEvent/OneEvent_Marco_Microphone.webp",
  crowd: "/OneEvent/OneEvent_Marco_Animation.webp",
  karaoke: "/OneEvent/marco-douka-animation-soiree.webp",
  teamBuilding: "/OneEvent/team-building-percussion-guinguette.webp",
  speaker: "/OneEvent/marco-douka-speaker-maitre-de-ceremonie.webp",
};

const NAV: NavLink[] = [
  { href: "#services", label: "Animations" },
  { href: "#about", label: "Marco" },
  { href: "#galerie", label: "Galerie" },
  { href: "#avis", label: "Avis" },
];

const MOBILE_NAV: NavLink[] = [...NAV, { href: "#zone", label: "Zone" }, { href: "#faq", label: "FAQ" }];

const MARQUEE_FRONT = ["Quiz", "Blind test", "Défi piment", "Karaoké", "Tournoi Mario Kart", "Team building", "Percussions", "Maître de cérémonie"];
const MARQUEE_BACK = ["Séminaires", "Soirées d'entreprise", "Team building", "Fêtes de fin d'année", "Festivals", "Mariages"];

const EVENT_TYPES = [
  { id: "quiz", label: "Quiz, jeux & défis" },
  { id: "karaoke", label: "Karaoké" },
  { id: "percu", label: "Percussion" },
  { id: "team", label: "Team building" },
  { id: "mc", label: "Maître de cérémonie" },
  { id: "autre", label: "Autre idée" },
];

const TESTIMONIALS = [
  {
    quote: "Une expérience incroyable pour notre équipe ! Marco a su créer une ambiance unique et fédératrice.",
    name: "Sophie Martin",
    company: "Tech Solutions",
    dot: "#5b8e4f",
  },
  {
    quote: "Le blind test organisé par Marco était parfaitement adapté à notre soirée d'entreprise. Un vrai succès !",
    name: "Jean Dupont",
    company: "Startup Innovation",
    dot: "#121212",
  },
  {
    quote: "Les ateliers de percussion ont apporté une nouvelle dimension à notre team building. Merci Marco !",
    name: "Marie Lambert",
    company: "Creative Agency",
    dot: "#ffa07a",
  },
];

const Logo: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 34 34" aria-hidden="true">
    <circle cx="17" cy="17" r="16" fill="none" stroke="#e9724c" strokeWidth="2" />
    <circle cx="17" cy="17" r="10.5" fill="none" stroke="#ffa07a" strokeWidth="2" />
    <circle cx="17" cy="17" r="5" fill="#e9724c" />
  </svg>
);

const Marquee: React.FC<{ items: string[]; sep: string }> = ({ items, sep }) => (
  <div className="we-mq">
    {[0, 1].map((copy) =>
      items.flatMap((item) => [
        <span key={`${copy}-${item}`}>{item}</span>,
        <span key={`${copy}-${item}-sep`}>{sep}</span>,
      ])
    )}
  </div>
);

const Stars: React.FC = () => (
  <div className="we-stars" role="img" aria-label="5 étoiles sur 5">
    {[0, 1, 2, 3, 4].map((i) => (
      <StarIcon key={i} size={20} />
    ))}
  </div>
);

const ContactForm: React.FC = () => {
  const [picked, setPicked] = useState<Record<string, boolean>>({ quiz: true });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const types = EVENT_TYPES.filter((t) => picked[t.id]).map((t) => t.label);
    const date = String(data.get("date") || "");
    const subject = `Demande Wan'Events${date ? ` – ${date}` : ""}`;
    const body = [
      `Nom : ${data.get("name") || ""}`,
      `Entreprise : ${data.get("company") || "-"}`,
      `Email : ${data.get("email") || ""}`,
      `Date : ${date}`,
      `Animations : ${types.join(", ") || "à définir"}`,
      "",
      String(data.get("message") || ""),
    ].join("\n");
    window.location.href = `mailto:${DISPLAY_CONTACT.wanEventsEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="we-form" onSubmit={onSubmit}>
      <h3>Votre événement</h3>
      <fieldset>
        <legend>Animations souhaitées</legend>
        <div className="we-form-chips">
          {EVENT_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              className="we-chip"
              aria-pressed={!!picked[t.id]}
              onClick={() => setPicked((p) => ({ ...p, [t.id]: !p[t.id] }))}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="we-form-2col">
        <label>
          Nom
          <input className="we-field" type="text" name="name" placeholder="Votre nom" autoComplete="name" required />
        </label>
        <label>
          Entreprise
          <input className="we-field" type="text" name="company" placeholder="Facultatif" autoComplete="organization" />
        </label>
      </div>
      <div className="we-form-2col">
        <label>
          Email
          <input className="we-field" type="email" name="email" placeholder="vous@exemple.fr" autoComplete="email" required />
        </label>
        <label>
          Date
          <input className="we-field" type="date" name="date" />
        </label>
      </div>
      <label>
        Message
        <textarea className="we-field" name="message" rows={3} placeholder="Lieu, nombre d'invités, ambiance souhaitée…" />
      </label>
      <button type="submit" className="we-btn we-submit">
        Envoyer la demande
        <span className="we-btn-dot">
          <ArrowUpRight size={18} />
        </span>
      </button>
      <p className="we-form-note">Votre logiciel de messagerie s'ouvre avec la demande pré-remplie.</p>
    </form>
  );
};

const WanEventsPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const phone = DISPLAY_CONTACT.phone;
  const email = DISPLAY_CONTACT.wanEventsEmail;
  const year = new Date().getFullYear();

  return (
    <div className="we">
      {/* ============ NAV ============ */}
      <header className="we-wrap we-navbar">
        <nav className="we-nav" aria-label="Navigation principale">
          <a href="#top" className="we-logo">
            <Logo />
            <span>Wan'Events</span>
          </a>
          <ul className="we-navlinks">
            {NAV.map((l) => (
              <li key={l.href}>
                <a className="we-pill" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="ds-nav-end">
            <NavInstagram />
            <a className="we-btn we-nav-cta" href="#contact">
              Réserver
              <span className="we-btn-dot">
                <ArrowUpRight size={16} />
              </span>
            </a>
            <MobileMenu
              open={menuOpen}
              onToggle={setMenuOpen}
              links={MOBILE_NAV}
              cta={{ href: "#contact", label: "Réserver un événement" }}
            />
          </div>
        </nav>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section id="top" className="we-hero">
          <div className="we-glow we-glow-1" aria-hidden="true" />
          <div className="we-glow we-glow-2" aria-hidden="true" />
          <div className="we-wrap we-hero-grid">
            <div className="we-hero-copy">
              <p className="we-badge">
                <span className="we-live" aria-hidden="true" />
                Animateur &amp; speaker · Nantes et Saint-Nazaire
              </p>
              <h1 className="we-h1">
                Votre événement, mon{" "}
                <span className="we-nowrap">
                  <span className="we-h1-word">
                    énergie
                    <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                      <path
                        d="M2 14 C 30 2, 50 22, 78 12 S 128 2, 154 12 S 206 24, 232 12 S 282 2, 298 12"
                        fill="none"
                        stroke="#ffa07a"
                        strokeWidth="5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  ,
                </span>{" "}
                nos souvenirs
              </h1>
              <p className="we-hero-lead">
                Animateur et speaker depuis plus de 15 ans, j'anime vos séminaires, soirées d'entreprise et team
                building à Nantes et Saint-Nazaire. J'anime aussi des mariages, des festivals et des événements
                sportifs.
              </p>
              <div className="we-hero-ctas">
                <a className="we-btn we-btn-primary" href="#contact">
                  Réserver un événement
                  <span className="we-btn-dot">
                    <ArrowUpRight size={18} />
                  </span>
                </a>
                <a className="we-btn we-btn-ghost" href="#services">
                  Voir les animations
                </a>
              </div>
            </div>

            <div className="we-hero-visual">
              <div className="we-rings" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="we-arch">
                <img
                  src={IMG.hero}
                  alt="Marco Douka chante au micro au milieu du public, en noir et blanc"
                  width={400}
                  height={600}
                  {...{ fetchpriority: "high" }}
                />
              </div>
              <a href="#contact" className="we-spin-badge" aria-label="Réserver Wan'Events">
                <svg className="we-spin-text" viewBox="0 0 200 200" aria-hidden="true">
                  <defs>
                    <path id="we-circ" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
                  </defs>
                  <text fill="#121212">
                    <textPath href="#we-circ">RÉSERVER · WAN'EVENTS · RÉSERVER · WAN'EVENTS ·</textPath>
                  </text>
                </svg>
                <span className="we-spin-core">
                  <ArrowUpRight size={24} />
                </span>
              </a>
              <OrbitTags />
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div className="we-marquee" aria-hidden="true">
          <div className="we-band we-band-back">
            <Marquee items={MARQUEE_BACK} sep="✶" />
          </div>
          <div className="we-band we-band-front">
            <Marquee items={MARQUEE_FRONT} sep="●" />
          </div>
        </div>

        {/* ============ ANIMATIONS ============ */}
        <section id="services" className="we-services" aria-labelledby="services-title">
          <div className="we-wrap">
            <div className="we-sec-head">
              <div className="we-sec-title">
                <span className="we-eyebrow">Mes animations</span>
                <h2 id="services-title" className="we-h2">
                  Ce que
                  <br /> <span className="we-accent">je propose.</span>
                </h2>
                <p className="ds-hscroll-hint">
                  <SwipeIcon size={16} />
                  Faites glisser
                </p>
              </div>
              <p className="we-sec-lead">
                Pour un séminaire, une soirée d'entreprise ou une fête privée, vous pouvez choisir une animation ou en
                combiner plusieurs. On en parle ensemble avant la date.
              </p>
            </div>
          </div>
          <div className="we-wrap">
            <div className="we-bento">
              <Link to={pageHref("quizJeux")} className="we-card we-b-a">
                <img src={IMG.quiz} alt="Marco anime un jeu sur scène devant le public" loading="lazy" />
                <div className="we-card-shade" aria-hidden="true" />
                <span className="we-card-num">01</span>
                <div className="we-card-body">
                  <div className="we-card-text">
                    <h3>Quiz, jeux &amp; défis</h3>
                    <p>Blind test, défi piment, tournois Mario Kart et FIFA, doublage de film, Adopte mon ou ma pote, et vos idées.</p>
                  </div>
                  <span className="we-card-go" aria-hidden="true">
                    <ArrowUpRight size={26} />
                  </span>
                </div>
              </Link>
              <Link to={pageHref("karaoke")} className="we-card we-b-b">
                <img
                  src={IMG.karaoke}
                  alt="Marco anime une soirée karaoké en salle, sous une boule à facettes"
                  loading="lazy"
                  style={{ objectPosition: "60% center" }}
                />
                <div className="we-card-shade" aria-hidden="true" />
                <span className="we-card-num">02</span>
                <div className="we-card-body">
                  <div className="we-card-text">
                    <h3>Karaoké</h3>
                    <p>J'anime la soirée au micro entre les chansons, pour les particuliers comme pour les entreprises.</p>
                  </div>
                </div>
              </Link>
              <Link to={pageHref("teamBuilding")} className="we-card we-b-d">
                <img
                  src={IMG.teamBuilding}
                  alt="Trois percussionnistes au djembé sous une tente, devant le public d'une guinguette"
                  loading="lazy"
                  style={{ objectPosition: "40% center" }}
                />
                <div className="we-card-shade" aria-hidden="true" />
                <span className="we-card-num">03</span>
                <div className="we-card-body">
                  <div className="we-card-text">
                    <h3>Team building percussion</h3>
                    <p>Un djembé par participant et un rythme à apprendre ensemble. Cours et initiations aussi, tous niveaux.</p>
                  </div>
                </div>
              </Link>
              <Link to={pageHref("speaker")} className="we-card we-b-e">
                <img
                  src={IMG.speaker}
                  alt="Marco, speaker et maître de cérémonie, micro et fiches en main"
                  loading="lazy"
                  style={{ objectPosition: "57% 30%" }}
                />
                <div className="we-card-shade" aria-hidden="true" />
                <div className="we-card-side">
                  <span className="we-tag">04</span>
                  <h3>Speaker &amp; maître de cérémonie</h3>
                  <p>Mariages, festivals, podiums et événements sportifs.</p>
                </div>
              </Link>
            </div>
            <div className="we-custom">
              <div>
                <h3>Et votre idée ?</h3>
                <p>
                  Ces animations sont des exemples. Vous avez un jeu, un thème ou un format en tête ? Dites-le-moi, je
                  m'adapte et on le construit ensemble.
                </p>
              </div>
              <a className="we-btn we-btn-primary" href="#contact">
                Proposer une idée
                <span className="we-btn-dot">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ============ À PROPOS ============ */}
        <section id="about" className="we-about" aria-labelledby="about-title">
          <div className="we-wrap we-about-grid">
            <div className="we-about-visual">
              <div className="we-about-dash" aria-hidden="true" />
              <div className="we-about-dots" aria-hidden="true" />
              <div className="we-about-photo">
                <img src={IMG.portrait} alt="Portrait de Marco Douka au micro" loading="lazy" />
              </div>
              <div className="we-xp">
                <strong>15+</strong>
                <span>
                  ans
                  <br />
                  d'expérience
                </span>
              </div>
            </div>
            <div className="we-about-copy">
              <span className="we-eyebrow">Derrière le micro</span>
              <h2 id="about-title" className="we-h2">
                Moi, c'est
                <br /> <span className="we-accent">Marco Douka.</span>
              </h2>
              <p className="we-about-text">
                Animateur et speaker depuis plus de 15 ans, je suis aussi percussionniste. J'anime des
                événements d'entreprise, des soirées, des mariages et des événements sportifs, et je donne aussi des
                cours de djembé.
              </p>
              <ul className="we-chips">
                <li>Speaker</li>
                <li>Quiz, jeux &amp; défis</li>
                <li>Percussions africaines</li>
                <li>Maître de cérémonie</li>
                <li>Team building</li>
              </ul>
              <div className="we-contact-btns">
                <a className="we-btn we-btn-light" href={`tel:${phone}`}>
                  <span className="we-btn-dot">
                    <PhoneIcon size={18} />
                  </span>
                  {formatPhone(phone)}
                </a>
                <a className="we-btn we-btn-outline" href={`mailto:${email}`}>
                  <span className="we-btn-dot">
                    <MailIcon size={18} />
                  </span>
                  {email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============ GALERIE ============ */}
        <PhotoReel photos={WE_GALLERY} />

        {/* ============ AVIS ============ */}
        <section id="avis" className="we-testimonials" aria-labelledby="avis-title">
          <div className="we-wrap">
            <h2 id="avis-title" className="we-h2">
              Ce qu'ils <span className="we-accent">en disent</span>
            </h2>
            <div className="we-testi">
              {TESTIMONIALS.map((t, i) => (
                <figure key={t.name} className={`we-quote we-quote-${i + 1}`}>
                  {i === 1 ? (
                    <svg width="44" height="34" viewBox="0 0 44 34" aria-hidden="true">
                      <path
                        d="M0 34V20C0 8 6 1.5 18 0v7c-5 1.2-8 4.5-8 10h8v17zm26 0V20c0-12 6-18.5 18-20v7c-5 1.2-8 4.5-8 10h8v17z"
                        fill="#121212"
                      />
                    </svg>
                  ) : (
                    <Stars />
                  )}
                  <blockquote>« {t.quote} »</blockquote>
                  <figcaption>
                    <span style={{ background: t.dot }} aria-hidden="true" />
                    <span>
                      <strong>{t.name}</strong>
                      <small>{t.company}</small>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <ServiceArea intro="Je me déplace facilement chez vous, dans vos locaux ou dans la salle que vous avez réservée." />
        <Faq items={WANEVENTS_FAQ} />

        {/* ============ CONTACT ============ */}
        <section id="contact" className="we-contact" aria-labelledby="contact-title">
          <div className="we-contact-box">
            <div className="we-cta-deco we-cta-deco-1" aria-hidden="true" />
            <div className="we-cta-deco we-cta-deco-2" aria-hidden="true" />
            <div className="we-cta-deco we-cta-deco-3" aria-hidden="true" />
            <div className="we-wrap we-cta-grid">
              <div className="we-cta-copy">
                <p className="we-cta-badge">
                  <span className="we-live" aria-hidden="true" />
                  Disponible pour vos dates
                </p>
                <h2 id="contact-title" className="we-cta-h2">
                  Parlez-moi de votre événement.
                </h2>
                <p className="we-cta-lead">
                  Indiquez-moi la date, le lieu et le nombre de personnes. Je vous rappelle et je vous envoie un devis.
                </p>
                <div className="we-cta-row">
                  <a className="we-btn we-btn-dark" href={`tel:${phone}`}>
                    <span className="we-btn-dot">
                      <PhoneIcon size={20} />
                    </span>
                    Appeler Marco
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="we-footer">
        <div className="we-wrap">
          <div className="we-foot-grid">
            <div className="we-foot-about">
              <p>
                Animation de séminaires, soirées d'entreprise et team building à Nantes et Saint-Nazaire. Quiz, jeux
                et défis, karaoké et percussions africaines.
              </p>
              <div className="we-socials">
                <a
                  href={SOCIAL.marcoInstagram}
                  aria-label={`Instagram de Marco (${SOCIAL.marcoInstagramHandle})`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>
            <div className="we-foot-col">
              <strong>Animations</strong>
              {SERVICE_PAGES.map((p) => (
                <Link key={p.key} to={p.path}>
                  {p.label}
                </Link>
              ))}
            </div>
            <div className="we-foot-col">
              <strong>Wan'Events</strong>
              <a href="#about">Marco Douka</a>
              <a href="#galerie">Galerie</a>
              <a href="#avis">Avis</a>
              <a href="#faq">Questions fréquentes</a>
            </div>
            <div className="we-foot-col">
              <strong>Contact</strong>
              <a href={`tel:${phone}`}>{formatPhone(phone)}</a>
              <a href={`mailto:${email}`}>{email}</a>
              <span>Entre Nantes et Pornic (44)</span>
            </div>
          </div>
          <div className="we-wordmark" aria-hidden="true">
            Wan'<span>Events</span>
          </div>
          <div className="we-foot-bottom">
            <span>
              © <span suppressHydrationWarning>{year}</span> Wan'Events · Marco Douka
            </span>
            <Link to={ROUTES.legal.path}>Mentions légales</Link>
          </div>
        </div>
      </footer>

      {/* ============ BARRE D'ACTION MOBILE ============ */}
      <FloatingInstagram />

      <div className="ds-actionbar">
        <a className="ds-ab-icon" href={`tel:${phone}`} aria-label="Appeler Marco">
          <PhoneIcon size={20} />
        </a>
        <a className="ds-ab-main" href="#contact">
          Réserver un événement
        </a>
      </div>
    </div>
  );
};

export default WanEventsPage;
