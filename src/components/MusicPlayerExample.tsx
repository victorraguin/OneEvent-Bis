import React from "react";

/**
 * Composant d'exemple pour montrer comment configurer le MusicPlayer
 * avec des URLs SoundCloud et YouTube réelles
 */
const MusicPlayerExample: React.FC = () => {
  return (
    <div className="p-6 bg-surface rounded-lg">
      <h3 className="text-lg font-semibold mb-4">
        Comment configurer votre MusicPlayer
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-primary mb-2">1. URLs SoundCloud</h4>
          <p className="text-sm text-text-secondary mb-2">
            Formats supportés :
          </p>
          <ul className="text-sm text-text-secondary space-y-1 ml-4">
            <li>• https://soundcloud.com/artist/track-name</li>
            <li>• https://soundcloud.com/track-name</li>
          </ul>
          <div className="mt-2 p-3 bg-background/50 rounded text-xs">
            <strong>Exemple :</strong>{" "}
            https://soundcloud.com/wassa-percussion/djembe-rhythm
          </div>
        </div>

        <div>
          <h4 className="font-medium text-primary mb-2">2. URLs YouTube</h4>
          <p className="text-sm text-text-secondary mb-2">
            Formats supportés :
          </p>
          <ul className="text-sm text-text-secondary space-y-1 ml-4">
            <li>• https://www.youtube.com/watch?v=VIDEO_ID</li>
            <li>• https://youtu.be/VIDEO_ID</li>
            <li>• https://youtube.com/watch?v=VIDEO_ID</li>
          </ul>
          <div className="mt-2 p-3 bg-background/50 rounded text-xs">
            <strong>Exemple :</strong>{" "}
            https://www.youtube.com/watch?v=dQw4w9WgXcQ
          </div>
        </div>

        <div>
          <h4 className="font-medium text-primary mb-2">
            3. Configuration dans Supabase
          </h4>
          <p className="text-sm text-text-secondary mb-2">
            Ajoutez vos pistes dans la table <code>music</code> avec ces champs
            :
          </p>
          <div className="mt-2 p-3 bg-background/50 rounded text-xs font-mono">
            {`{
  "title": "Nom de la piste",
  "artist": "Nom de l'artiste", 
  "src": "URL_SOUNDCLOUD_OU_YOUTUBE",
  "image": "URL_IMAGE",
  "order_index": 1
}`}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-primary mb-2">4. Fonctionnalités</h4>
          <ul className="text-sm text-text-secondary space-y-1 ml-4">
            <li>
              • <strong>Détection automatique</strong> du type de source
            </li>
            <li>
              • <strong>Lecteur intégré</strong> pour SoundCloud et YouTube
            </li>
            <li>
              • <strong>Ouverture externe</strong> dans un nouvel onglet
            </li>
            <li>
              • <strong>Contrôles adaptés</strong> selon le type de source
            </li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg">
          <h4 className="font-medium text-primary mb-2">
            ⚠️ Limitations YouTube
          </h4>
          <p className="text-sm text-text-secondary">
            YouTube a des restrictions strictes sur l'utilisation de son
            contenu. Assurez-vous d'avoir les droits ou utilisez du contenu sous
            licence libre.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayerExample;
