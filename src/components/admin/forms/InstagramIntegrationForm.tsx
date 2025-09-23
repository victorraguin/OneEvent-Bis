import React, { useState, useEffect } from "react";
import {
  Instagram,
  RefreshCw,
  Check,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { supabase, GalleryItem } from "../../../lib/supabase";
import {
  instagramGraphService,
  InstagramMedia,
} from "../../../lib/instagramGraphApi";

interface InstagramIntegrationFormProps {
  site: "wassa" | "wanevent";
  onSuccess?: () => void;
}

const InstagramIntegrationForm: React.FC<InstagramIntegrationFormProps> = ({
  site,
  onSuccess,
}) => {
  const [accessToken, setAccessToken] = useState("");
  const [instagramBusinessAccountId, setInstagramBusinessAccountId] =
    useState("");
  const [availableAccounts, setAvailableAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [instagramMedia, setInstagramMedia] = useState<InstagramMedia[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<Set<string>>(new Set());
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [accountInfo, setAccountInfo] = useState<any>(null);

  // Vérifier si Instagram est déjà configuré
  useEffect(() => {
    checkInstagramConnection();
  }, []);

  const checkInstagramConnection = async () => {
    // Vérifier dans les variables d'environnement ou base de données
    const token = localStorage.getItem(`instagram_token_${site}`);
    const user = localStorage.getItem(`instagram_user_${site}`);

    if (token && user) {
      const isValid = await instagramService.validateToken(token);
      if (isValid) {
        setAccessToken(token);
        setUserId(user);
        setIsConnected(true);
        loadInstagramMedia(token, user);
      } else {
        // Token expiré, nettoyer
        localStorage.removeItem(`instagram_token_${site}`);
        localStorage.removeItem(`instagram_user_${site}`);
      }
    }
  };

  const loadInstagramMedia = async (token: string, user: string) => {
    try {
      setIsLoading(true);
      const media = await instagramService.getUserMedia(
        { accessToken: token, userId: user },
        20
      );
      setInstagramMedia(media);
    } catch (error) {
      console.error("Erreur chargement médias Instagram:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    if (!accessToken || !userId) return;

    try {
      setIsLoading(true);
      const isValid = await instagramService.validateToken(accessToken);

      if (!isValid) {
        alert("Token d'accès invalide. Vérifiez vos informations.");
        return;
      }

      // Sauvegarder la configuration
      localStorage.setItem(`instagram_token_${site}`, accessToken);
      localStorage.setItem(`instagram_user_${site}`, userId);

      setIsConnected(true);
      await loadInstagramMedia(accessToken, userId);

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erreur connexion Instagram:", error);
      alert("Erreur lors de la connexion à Instagram");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem(`instagram_token_${site}`);
    localStorage.removeItem(`instagram_user_${site}`);
    setAccessToken("");
    setUserId("");
    setIsConnected(false);
    setInstagramMedia([]);
    setSelectedMedia(new Set());
  };

  const syncSelectedMedia = async () => {
    if (!supabase || selectedMedia.size === 0) return;

    try {
      setSyncInProgress(true);
      const mediaToSync = instagramMedia.filter((media) =>
        selectedMedia.has(media.id)
      );

      for (const media of mediaToSync) {
        // Vérifier si le média existe déjà
        const { data: existing } = await supabase
          .from("gallery")
          .select("id")
          .eq("external_id", media.id)
          .eq("site", site)
          .single();

        if (!existing) {
          const galleryItem: Omit<GalleryItem, "id" | "created_at"> = {
            site,
            type: media.media_type === "VIDEO" ? "video" : "image",
            src: media.media_url,
            thumbnail: media.thumbnail_url,
            caption: media.caption || "Photo Instagram",
            order_index: Date.now(), // Utiliser timestamp pour l'ordre
            source: "instagram",
            external_id: media.id,
            permalink: media.permalink,
          };

          await supabase.from("gallery").insert(galleryItem);
        }
      }

      alert(`${selectedMedia.size} médias synchronisés avec succès !`);
      setSelectedMedia(new Set());
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erreur synchronisation:", error);
      alert("Erreur lors de la synchronisation");
    } finally {
      setSyncInProgress(false);
    }
  };

  const toggleMediaSelection = (mediaId: string) => {
    const newSelected = new Set(selectedMedia);
    if (newSelected.has(mediaId)) {
      newSelected.delete(mediaId);
    } else {
      newSelected.add(mediaId);
    }
    setSelectedMedia(newSelected);
  };

  if (!isConnected) {
    return (
      <div className="bg-surface p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Instagram className="text-pink-500" size={24} />
          <h3 className="text-lg font-semibold text-text-primary">
            Intégration Instagram
          </h3>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Configuration requise :
            </h4>
            <ol className="list-decimal list-inside text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>Créer une app Facebook Developer</li>
              <li>Configurer Instagram Basic Display</li>
              <li>Obtenir un token d'accès utilisateur</li>
              <li>Récupérer votre User ID Instagram</li>
            </ol>
            <a
              href="https://developers.facebook.com/docs/instagram-basic-display-api/getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2 text-sm"
            >
              Guide officiel <ExternalLink size={14} />
            </a>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Token d'accès Instagram
            </label>
            <input
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre token d'accès Instagram"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              User ID Instagram
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Votre User ID Instagram"
            />
          </div>

          <button
            onClick={handleConnect}
            disabled={!accessToken || !userId || isLoading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <RefreshCw className="animate-spin" size={16} />
            ) : (
              <Instagram size={16} />
            )}
            {isLoading ? "Connexion..." : "Connecter Instagram"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Instagram className="text-pink-500" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Instagram connecté
            </h3>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Check size={14} />
              Compte lié avec succès
            </div>
          </div>
        </div>
        <button
          onClick={handleDisconnect}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Déconnecter
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <RefreshCw className="animate-spin" size={24} />
          <span className="ml-2">Chargement des médias...</span>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-text-primary">
                Médias Instagram ({instagramMedia.length})
              </h4>
              <button
                onClick={() => loadInstagramMedia(accessToken, userId)}
                className="flex items-center gap-1 text-primary hover:text-primary-hover text-sm"
              >
                <RefreshCw size={14} />
                Actualiser
              </button>
            </div>

            {selectedMedia.size > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-text-secondary">
                  {selectedMedia.size} média(s) sélectionné(s)
                </span>
                <button
                  onClick={syncSelectedMedia}
                  disabled={syncInProgress}
                  className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-hover disabled:opacity-50 flex items-center gap-1"
                >
                  {syncInProgress ? (
                    <RefreshCw className="animate-spin" size={12} />
                  ) : null}
                  Synchroniser
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {instagramMedia.map((media) => (
              <div key={media.id} className="relative group">
                <div
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedMedia.has(media.id)
                      ? "border-primary"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => toggleMediaSelection(media.id)}
                >
                  <img
                    src={
                      media.media_type === "VIDEO"
                        ? media.thumbnail_url
                        : media.media_url
                    }
                    alt={media.caption || "Instagram media"}
                    className="w-full h-24 object-cover"
                  />
                  {media.media_type === "VIDEO" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-1">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 5v10l7-5-7-5z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {selectedMedia.has(media.id) && (
                    <div className="absolute top-1 right-1">
                      <Check
                        className="text-primary bg-white rounded-full p-1"
                        size={16}
                      />
                    </div>
                  )}
                </div>
                {media.caption && (
                  <p
                    className="text-xs text-text-secondary mt-1 truncate"
                    title={media.caption}
                  >
                    {media.caption}
                  </p>
                )}
              </div>
            ))}
          </div>

          {instagramMedia.length === 0 && (
            <div className="text-center py-8 text-text-secondary">
              <AlertCircle size={48} className="mx-auto mb-2 opacity-50" />
              <p>Aucun média trouvé sur ce compte Instagram</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InstagramIntegrationForm;
