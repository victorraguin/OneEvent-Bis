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
      <div className="flex justify-center">
        <Link to={ROUTES.wanEvents.path} className="btn btn-primary">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  </main>
);

export default NotFound;
