import React from "react";
import { Link } from "react-router-dom";
import "../styles/design-shared.css";
import "../styles/wanevents.css";
import "../styles/service.css";
import { CONTACT, LEGAL, ROUTES, SOCIAL, formatPhone } from "../seo/site";

/** Valeur à fournir par Marco : affichée bien visiblement tant qu'elle manque. */
const Field: React.FC<{ value: string | null }> = ({ value }) =>
  value ? <>{value}</> : <mark className="sp-todo">à compléter</mark>;

const Logo: React.FC = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
    <circle cx="17" cy="17" r="16" fill="none" stroke="#e9724c" strokeWidth="2" />
    <circle cx="17" cy="17" r="10.5" fill="none" stroke="#ffa07a" strokeWidth="2" />
    <circle cx="17" cy="17" r="5" fill="#e9724c" />
  </svg>
);

/** Mentions légales (loi LCEN) et données personnelles. Données dans src/seo/site.ts (LEGAL). */
const LegalPage: React.FC = () => (
  <div className="we sp">
    <header className="ds-wrap">
      <nav className="sp-nav" aria-label="Navigation principale">
        <Link to={ROUTES.wanEvents.path} className="sp-logo">
          <Logo />
          <span>Wan'Events</span>
        </Link>
      </nav>
    </header>

    <main className="ds-wrap sp-legal">
      <nav className="sp-crumbs" aria-label="Fil d'Ariane">
        <ol>
          <li>
            <Link to={ROUTES.wanEvents.path}>Accueil</Link>
          </li>
          <li aria-current="page">Mentions légales</li>
        </ol>
      </nav>
      <h1 className="sp-h1">Mentions légales</h1>

      <section className="sp-block">
        <h2>Éditeur du site</h2>
        <div className="sp-block-body">
          <p>
            {LEGAL.publisher}, {LEGAL.tradeName}
            <br />
            Statut : <Field value={LEGAL.status} />
            <br />
            SIRET : <Field value={LEGAL.siret} />
            <br />
            Adresse : <Field value={LEGAL.address} />
            <br />
            Téléphone : <a href={`tel:${CONTACT.phone}`}>{formatPhone(CONTACT.phone)}</a>
            <br />
            E-mail : <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p>Directeur de la publication : {LEGAL.publisher}.</p>
        </div>
      </section>

      <section className="sp-block">
        <h2>Hébergement</h2>
        <div className="sp-block-body">
          <p>
            {LEGAL.host.name}
            <br />
            {LEGAL.host.address}
            <br />
            <a href={LEGAL.host.url} target="_blank" rel="noreferrer">
              {LEGAL.host.url.replace("https://", "")}
            </a>
          </p>
        </div>
      </section>

      <section className="sp-block">
        <h2>Données personnelles</h2>
        <div className="sp-block-body">
          <p>
            Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure d'audience ni de publicité. Les polices
            de caractères sont hébergées sur le site : aucune donnée n'est transmise à un service tiers lors de votre
            visite.
          </p>
          <p>
            Le formulaire de contact n'envoie rien au site : il ouvre votre logiciel de messagerie avec un e-mail
            pré-rempli, que vous choisissez d'envoyer ou non. Les informations que vous me transmettez par e-mail ou par
            téléphone servent uniquement à répondre à votre demande et à établir un devis. Elles ne sont ni vendues, ni
            cédées.
          </p>
          <p>
            Vous pouvez demander l'accès, la rectification ou la suppression de vos données en écrivant à{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Vous pouvez aussi adresser une réclamation à la
            CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
              cnil.fr
            </a>
            ).
          </p>
        </div>
      </section>

      <section className="sp-block">
        <h2>Propriété intellectuelle</h2>
        <div className="sp-block-body">
          <p>
            Les textes, photos et éléments graphiques de ce site appartiennent à {LEGAL.publisher} ou sont utilisés avec
            l'autorisation de leurs auteurs. Toute reproduction sans accord préalable est interdite.
          </p>
          <p>
            Photo du gala de boxe : Philippe Jouand (Celtic Fighters Boxing). Retrouvez Marco sur Instagram :{" "}
            <a href={SOCIAL.marcoInstagram} target="_blank" rel="noreferrer">
              {SOCIAL.marcoInstagramHandle}
            </a>
            .
          </p>
        </div>
      </section>
    </main>

    <footer className="sp-footer">
      <div className="ds-wrap sp-foot-bottom">
        <Link to={ROUTES.wanEvents.path}>← Retour à l'accueil</Link>
      </div>
    </footer>
  </div>
);

export default LegalPage;
