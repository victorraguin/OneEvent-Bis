import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/design-shared.css";
import "../styles/wanevents.css";
import Faq from "../components/seo/Faq";
import ServiceArea from "../components/seo/ServiceArea";
import MobileMenu, { NavLink } from "../components/design/MobileMenu";
import {
  ArrowUpRight,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MicIcon,
  MusicIcon,
  PhoneIcon,
  PinIcon,
  PlusIcon,
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

const IMG = {
  djembe: "/OneEvent/Marco_OneEvent_Animation.webp",
  hero: "/OneEvent/WanEvents_Marco_Foot_Animation2.webp",
  quiz: "/OneEvent/OneEvent_Marco.webp",
  mc: "/OneEvent/WanEvents_Marco_Foot_Animation.webp",
  portrait: "/OneEvent/OneEvent_Marco_Microphone.webp",
  crowd: "/OneEvent/OneEvent_Marco_Animation.webp",
};

const NAV: NavLink[] = [
  { href: "#services", label: "Animations" },
  { href: "#about", label: "Marco" },
  { href: "#galerie", label: "Galerie" },
  { href: "#avis", label: "Avis" },
];

const MOBILE_NAV: NavLink[] = [...NAV, { href: "#zone", label: "Zone" }, { href: "#faq", label: "FAQ" }];

const MARQUEE_FRONT = ["Quiz", "Blind test", "Karaoké", "Percussions", "Team building", "Maître de cérémonie"];
const MARQUEE_BACK = ["Mariages", "Séminaires", "Festivals", "Anniversaires", "Soirées d'entreprise", "Fêtes de village"];

const EVENT_TYPES = [
  { id: "quiz", label: "Quiz / Blind test" },
  { id: "karaoke", label: "Karaoké" },
  { id: "percu", label: "Percussion" },
  { id: "team", label: "Team building" },
  { id: "mc", label: "Maître de cérémonie" },
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
      <label>
        Nom
        <input className="we-field" type="text" name="name" placeholder="Votre nom" autoComplete="name" required />
      </label>
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
            sister={{ to: ROUTES.wassa.path, label: "Découvrir Wassa Percussion →" }}
          />
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
                Animation &amp; percussion · Pornic, Pays de Retz, Nantes
              </p>
              <h1 className="we-h1">
                On fait{" "}
                <img className="we-h1-photo" src={IMG.djembe} alt="" width={170} height={78} />{" "}
                <span className="we-h1-word">
                  vibrer
                  <svg viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M2 14 C 30 2, 50 22, 78 12 S 128 2, 154 12 S 206 24, 232 12 S 282 2, 298 12"
                      fill="none"
                      stroke="#ffa07a"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                <br />
                vos{" "}
                <span className="we-h1-note" aria-hidden="true">
                  <MusicIcon size={36} />
                </span>{" "}
                événements.
              </h1>
              <p className="we-hero-lead">
                Quiz, blind tests, karaoké, percussions africaines et maître de cérémonie : Marco Douka transforme vos
                soirées, mariages et séminaires en moments dont on parle encore le lendemain, de Pornic à Nantes.
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
                  alt="Marco Douka au micro, bras tendu vers le public"
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
              <div className="we-sticker we-sticker-1" aria-hidden="true">
                Blind test
              </div>
              <div className="we-sticker we-sticker-2" aria-hidden="true">
                Djembé
              </div>
              <div className="we-sticker we-sticker-3" aria-hidden="true">
                <MicIcon size={18} strokeWidth={2.4} />
                Karaoké
              </div>
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
                <span className="we-eyebrow">Nos animations</span>
                <h2 id="services-title" className="we-h2">
                  Cinq façons de mettre
                  <br /> l'ambiance <span className="we-accent">à fond.</span>
                </h2>
                <p className="ds-hscroll-hint">
                  <SwipeIcon size={16} />
                  Faites glisser
                </p>
              </div>
              <p className="we-sec-lead">
                Chaque animation se compose sur mesure, de la petite soirée privée au festival en plein air.
              </p>
            </div>
          </div>
          <div className="we-wrap">
            <div className="we-bento">
              <a href="#contact" className="we-card we-b-a">
                <img src={IMG.quiz} alt="Marco anime un quiz sur scène devant le public" loading="lazy" />
                <div className="we-card-shade" aria-hidden="true" />
                <span className="we-card-num">01</span>
                <div className="we-card-body">
                  <div className="we-card-text">
                    <h3>Quiz &amp; Blind tests</h3>
                    <p>Quiz musicaux et blind tests survoltés, en équipes, avec buzzers et classement en direct.</p>
                  </div>
                  <span className="we-card-go" aria-hidden="true">
                    <ArrowUpRight size={26} />
                  </span>
                </div>
              </a>
              <a href="#contact" className="we-card we-card-solid we-b-b">
                <div className="we-ring-deco" aria-hidden="true" />
                <span className="we-icon-disc" aria-hidden="true">
                  <MicIcon size={28} />
                </span>
                <div className="we-card-text">
                  <span className="we-b-mobile-num">02</span>
                  <h3>Karaoké</h3>
                  <p>Soirées karaoké animées pour vos événements privés et pros.</p>
                </div>
              </a>
              <a href="#contact" className="we-card we-b-c">
                <img
                  src={IMG.djembe}
                  alt="Marco joue du djembé en plein air"
                  loading="lazy"
                  style={{ objectPosition: "center 30%" }}
                />
                <div className="we-card-shade" aria-hidden="true" />
                <span className="we-card-num we-b-mobile-num">03</span>
                <div className="we-card-body">
                  <div className="we-card-text">
                    <h3>Cours de percussion</h3>
                    <p>Ateliers djembé, tous niveaux.</p>
                  </div>
                </div>
              </a>
              <a href="#contact" className="we-card we-card-solid we-b-d">
                <div className="we-disc-deco" aria-hidden="true" />
                <div className="we-avatars" aria-hidden="true">
                  <span style={{ background: "#f5efe6" }} />
                  <span style={{ background: "#ffa07a" }} />
                  <span style={{ background: "#121212", color: "#f5efe6" }}>
                    <PlusIcon size={22} />
                  </span>
                </div>
                <div className="we-card-text">
                  <span className="we-b-mobile-num">04</span>
                  <h3>Team building percussion</h3>
                  <p>Un seul rythme pour souder toute l'équipe.</p>
                </div>
              </a>
              <a href="#contact" className="we-card we-b-e">
                <img src={IMG.mc} alt="Marco en maître de cérémonie, bras levés" loading="lazy" />
                <div className="we-card-shade" aria-hidden="true" />
                <div className="we-card-side">
                  <span className="we-tag">05</span>
                  <h3>Animation &amp; maître de cérémonie</h3>
                  <p>Mariages, festivals, événements d'entreprise : la bonne énergie au micro.</p>
                </div>
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
                Rencontrez
                <br /> <span className="we-accent">Marco Douka.</span>
              </h2>
              <p className="we-about-text">
                Avec plus de 15 ans d'expérience dans l'animation d'événements et l'éducation musicale, Marco apporte
                passion et expertise à chaque date. Spécialiste des expériences musicales interactives, du team building
                et des ateliers culturels, il crée des moments engageants pour tous les participants, à Pornic, dans le
                Pays de Retz et jusqu'à Nantes.
              </p>
              <ul className="we-chips">
                <li>Quiz &amp; blind test</li>
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
        <section id="galerie" className="we-gallery" aria-labelledby="gallery-title">
          <div className="we-wrap">
            <div className="we-gal-head">
              <span className="we-eyebrow">En images</span>
              <h2 id="gallery-title" className="we-h2">
                Ça se vit <span className="we-tilt">en vrai</span>
              </h2>
            </div>
            <div className="we-gal">
              <figure className="we-g1">
                <img src={IMG.crowd} alt="Marco chante au milieu du public, en noir et blanc" loading="lazy" />
              </figure>
              <figure className="we-g2">
                <img src={IMG.quiz} alt="Scène festive avec le public" loading="lazy" />
              </figure>
              <figure className="we-g3">
                <img src={IMG.djembe} alt="Djembé au soleil" loading="lazy" />
              </figure>
              <figure className="we-g4">
                <img src={IMG.hero} alt="Marco pointe la foule" loading="lazy" />
              </figure>
              <figure className="we-g5">
                <img src={IMG.mc} alt="Marco célèbre avec la mascotte" loading="lazy" />
              </figure>
            </div>
          </div>
        </section>

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

        <ServiceArea
          brand="Wan'Events"
          intro="Mariages, anniversaires, soirées d'entreprise, séminaires ou festivals : Marco Douka intervient dans tout le sud de la Loire-Atlantique, de Pornic à Nantes."
        />
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
                  Prêt à faire vibrer votre événement ?
                </h2>
                <p className="we-cta-lead">
                  Racontez-nous votre projet : Marco vous rappelle avec une proposition d'animation sur mesure.
                </p>
                <div className="we-cta-row">
                  <a className="we-btn we-btn-dark" href={`tel:${phone}`}>
                    <span className="we-btn-dot">
                      <PhoneIcon size={20} />
                    </span>
                    Appeler Marco
                  </a>
                  <span className="we-based">
                    <PinIcon size={18} />
                    Basé à Pornic (44)
                  </span>
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
                Animation d'événements, quiz musicaux, karaoké et percussions africaines à Pornic, dans le Pays de Retz,
                à Saint-Brevin, Saint-Nazaire et Nantes.
              </p>
              <div className="we-socials">
                <a href={SOCIAL.instagram} aria-label="Instagram" target="_blank" rel="noreferrer">
                  <InstagramIcon size={20} />
                </a>
                <a href={SOCIAL.facebook} aria-label="Facebook" target="_blank" rel="noreferrer">
                  <FacebookIcon size={20} />
                </a>
              </div>
            </div>
            <div className="we-foot-col">
              <strong>Animations</strong>
              <a href="#services">Quiz &amp; blind test</a>
              <a href="#services">Karaoké</a>
              <a href="#services">Percussions</a>
              <a href="#services">Team building</a>
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
              <span>Pornic (44)</span>
            </div>
          </div>
          <div className="we-wordmark" aria-hidden="true">
            Wan'<span>Events</span>
          </div>
          <div className="we-foot-bottom">
            <span>
              © <span suppressHydrationWarning>{year}</span> Wan'Events · Marco Douka
            </span>
            <span>
              Une activité sœur de{" "}
              <Link to={ROUTES.wassa.path}>
                Wassa Percussion
              </Link>
            </span>
          </div>
        </div>
      </footer>

      {/* ============ BARRE D'ACTION MOBILE ============ */}
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
