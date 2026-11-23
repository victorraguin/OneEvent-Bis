import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../seo/site";

const NotFound: React.FC = () => (
  <main className="min-h-screen flex items-center justify-center px-4">
    <div className="text-center max-w-xl">
      <h1 className="text-primary mb-6">Page introuvable</h1>
      <p className="text-text-secondary mb-8">
        Cette page n'existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to={ROUTES.wanEvents.path} className="btn btn-primary">
          Wan'Events – animations
        </Link>
        <Link to={ROUTES.wassa.path} className="btn btn-outline">
          Wassa Percussion
        </Link>
      </div>
      <p className="mt-8">
        <Link to="/" className="text-text-secondary hover:text-primary">
          Retour à l'accueil
        </Link>
      </p>
    </div>
  </main>
);

export default NotFound;
