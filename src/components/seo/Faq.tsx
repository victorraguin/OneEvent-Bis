import React from "react";
import { FaqItem } from "../../seo/site";

interface FaqProps {
  title?: string;
  items: FaqItem[];
}

/**
 * FAQ visible, rendue en <details> natifs : le texte des réponses est dans le
 * HTML pré-rendu (lisible par Google et les moteurs IA) et le composant
 * fonctionne sans JavaScript. Les mêmes questions alimentent le JSON-LD
 * FAQPage (src/seo/site.ts) : le texte balisé et le texte visible sont identiques.
 */
const Faq: React.FC<FaqProps> = ({ title = "Questions fréquentes", items }) => (
  <section id="faq" className="section bg-background" aria-labelledby="faq-title">
    <div className="container-custom max-w-4xl">
      <h2 id="faq-title" className="text-primary mb-10 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-lg bg-surface border border-gray-800 p-5 open:border-primary/50"
          >
            <summary className="cursor-pointer list-none flex justify-between items-center gap-4 font-semibold text-lg">
              <h3 className="text-lg font-semibold font-body">{item.question}</h3>
              <span
                aria-hidden="true"
                className="text-primary text-2xl transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-text-secondary leading-relaxed">{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

export default Faq;
