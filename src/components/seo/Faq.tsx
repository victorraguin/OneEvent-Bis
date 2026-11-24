import React from "react";
import { FaqItem } from "../../seo/site";
import { PlusIcon } from "../design/Icons";

interface FaqProps {
  title?: string;
  items: FaqItem[];
}

/**
 * FAQ visible, rendue en <details> natifs : le texte des réponses est dans le
 * HTML pré-rendu (lisible par Google et les moteurs IA) et le composant
 * fonctionne sans JavaScript. Les mêmes questions alimentent le JSON-LD
 * FAQPage (src/seo/site.ts) : le texte balisé et le texte visible sont identiques.
 * Couleurs et typo : variables CSS de la page parente (design-shared.css).
 */
const Faq: React.FC<FaqProps> = ({ title = "Questions fréquentes", items }) => (
  <section id="faq" className="ds-section" aria-labelledby="faq-title">
    <div className="ds-wrap ds-faq">
      <div className="ds-faq-head">
        <span className="ds-eyebrow">FAQ</span>
        <h2 id="faq-title" className="ds-h2">
          {title}
        </h2>
      </div>
      <div className="ds-faq-list">
        {items.map((item) => (
          <details key={item.question} className="ds-faq-item">
            <summary>
              <h3>{item.question}</h3>
              <span className="ds-faq-toggle" aria-hidden="true">
                <PlusIcon size={18} />
              </span>
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
