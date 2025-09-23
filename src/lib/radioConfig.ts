// Configuration de la Radio Wassa Percussion (YouTube: playlist ou vidéo)
// Vous pouvez fournir:
// 1) un ID de playlist via VITE_WASSA_YT_PLAYLIST_ID (ex: PLxxxxxxxxxxxxxxxx)
// 2) une URL de playlist via VITE_WASSA_YT_PLAYLIST_URL (ex: https://www.youtube.com/playlist?list=PLxxxxxxxxxxxxxxxx)
// 3) une URL de vidéo via VITE_WASSA_YT_PLAYLIST_URL (ex: https://www.youtube.com/watch?v=VIDEO_ID ou https://youtu.be/VIDEO_ID)

const ENV_ID: string =
  (import.meta as any).env?.VITE_WASSA_YT_PLAYLIST_ID || "";
const ENV_URL: string =
  (import.meta as any).env?.VITE_WASSA_YT_PLAYLIST_URL || "";

function safeParseUrl(raw: string): URL | null {
  if (!raw) return null;
  try {
    const withScheme = /^(https?:)?\/\//i.test(raw) ? raw : `https://${raw}`;
    return new URL(withScheme);
  } catch {
    return null;
  }
}

function extractPlaylistIdFromUrl(url: string): string | null {
  const parsed = safeParseUrl(url);
  if (!parsed) return null;
  const listParam = parsed.searchParams.get("list");
  return listParam || null;
}

function extractVideoIdFromUrl(url: string): string | null {
  const parsed = safeParseUrl(url);
  if (!parsed) return null;
  const hostname = parsed.hostname.replace(/^www\./i, "").toLowerCase();
  if (hostname === "youtu.be") {
    const segs = parsed.pathname.split("/").filter(Boolean);
    return segs[0] || null;
  }
  if (hostname.endsWith("youtube.com")) {
    if (parsed.pathname.startsWith("/watch")) {
      const v = parsed.searchParams.get("v");
      if (v) return v;
    }
    if (parsed.pathname.startsWith("/embed/")) {
      const segs = parsed.pathname.split("/").filter(Boolean);
      return segs[1] || null;
    }
  }
  return null;
}

export type WassaEmbedType = "playlist" | "video";

export interface WassaEmbedInfo {
  type: WassaEmbedType;
  id: string;
  pageUrl: string;
}

export function getWassaEmbedInfo(): WassaEmbedInfo | null {
  if (ENV_ID) {
    return {
      type: "playlist",
      id: ENV_ID,
      pageUrl: `https://www.youtube.com/playlist?list=${ENV_ID}`,
    };
  }
  if (!ENV_URL) return null;
  const listId = extractPlaylistIdFromUrl(ENV_URL);
  if (listId) {
    return {
      type: "playlist",
      id: listId,
      pageUrl: `https://www.youtube.com/playlist?list=${listId}`,
    };
  }
  const videoId = extractVideoIdFromUrl(ENV_URL);
  if (videoId) {
    return {
      type: "video",
      id: videoId,
      pageUrl: `https://www.youtube.com/watch?v=${videoId}`,
    };
  }
  return null;
}

export function getWassaEmbedSrc(): string | null {
  const info = getWassaEmbedInfo();
  if (!info) return null;
  if (info.type === "playlist") {
    return `https://www.youtube.com/embed?listType=playlist&list=${encodeURIComponent(
      info.id
    )}&autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1`;
  }
  return `https://www.youtube.com/embed/${encodeURIComponent(
    info.id
  )}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1`;
}

// Exports legacy pour compat
const RESOLVED_ID: string = ENV_ID || extractPlaylistIdFromUrl(ENV_URL) || "";
export const WASSA_YT_PLAYLIST_ID: string = RESOLVED_ID;
export function getWassaPlaylistUrl(): string | null {
  if (ENV_URL && extractPlaylistIdFromUrl(ENV_URL)) return ENV_URL;
  if (WASSA_YT_PLAYLIST_ID) {
    return `https://www.youtube.com/playlist?list=${WASSA_YT_PLAYLIST_ID}`;
  }
  return null;
}
