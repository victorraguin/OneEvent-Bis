// Utilitaires pour gérer les URLs de musique externes

export interface MusicSource {
  type: "audio" | "soundcloud" | "youtube";
  url: string;
  embedUrl?: string;
}

/**
 * Extrait l'ID d'une URL SoundCloud
 */
export function extractSoundCloudId(url: string): string | null {
  // Formats supportés :
  // https://soundcloud.com/user/track-name
  // https://soundcloud.com/track-name
  const match = url.match(/soundcloud\.com\/([^\/]+\/[^\/]+|[^\/]+)/);
  return match ? match[1] : null;
}

/**
 * Extrait l'ID d'une URL YouTube
 */
export function extractYouTubeId(url: string): string | null {
  // Formats supportés :
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://youtube.com/watch?v=VIDEO_ID
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Génère l'URL d'embed SoundCloud
 */
export function generateSoundCloudEmbedUrl(url: string): string {
  const trackId = extractSoundCloudId(url);
  if (!trackId) return url;

  return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
}

/**
 * Génère l'URL d'embed YouTube
 */
export function generateYouTubeEmbedUrl(url: string): string {
  const videoId = extractYouTubeId(url);
  if (!videoId) return url;

  return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
}

/**
 * Détecte automatiquement le type de source à partir d'une URL
 */
export function detectSourceType(
  url: string
): "audio" | "soundcloud" | "youtube" {
  if (url.includes("soundcloud.com")) {
    return "soundcloud";
  }
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  }
  return "audio";
}

/**
 * Traite une URL de musique et retourne les informations nécessaires
 */
export function processMusicUrl(url: string): MusicSource {
  const type = detectSourceType(url);

  switch (type) {
    case "soundcloud":
      return {
        type: "soundcloud",
        url,
        embedUrl: generateSoundCloudEmbedUrl(url),
      };
    case "youtube":
      return {
        type: "youtube",
        url,
        embedUrl: generateYouTubeEmbedUrl(url),
      };
    default:
      return {
        type: "audio",
        url,
      };
  }
}

/**
 * Exemples d'URLs pour tester
 */
export const exampleUrls = {
  soundcloud: [
    "https://soundcloud.com/artist/track-name",
    "https://soundcloud.com/track-name",
  ],
  youtube: [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "https://youtu.be/dQw4w9WgXcQ",
    "https://youtube.com/watch?v=dQw4w9WgXcQ",
  ],
  audio: ["https://example.com/audio.mp3", "/local-audio.mp3"],
};
