import React, { useEffect, useMemo, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { getWassaEmbedInfo, getWassaEmbedSrc } from "../lib/radioConfig";

// Mini lecteur YouTube (playlist) en autoplay muet
// Utilise un iframe embed YouTube avec playlist et autoplay.

interface WassaRadioProps {
  className?: string;
  title?: string;
}

const WassaRadio: React.FC<WassaRadioProps> = ({ className = "", title }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem("wassaRadioCollapsed") === "1";
    } catch {
      return false;
    }
  });
  const [isMuted, setIsMuted] = useState(true);
  const embedInfo = getWassaEmbedInfo();
  const embedSrc = getWassaEmbedSrc();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const embedSrcWithApi = useMemo(() => {
    if (!embedSrc) return null;
    const hasQuery = embedSrc.includes("?");
    const join = hasQuery ? "&" : "?";
    return `${embedSrc}${join}enablejsapi=1`;
  }, [embedSrc]);

  // Assure le mute au chargement (certains navigateurs ignorent le paramètre URL)
  useEffect(() => {
    if (!iframeRef.current) return;
    const timer = setTimeout(() => {
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: [] }),
          "*"
        );
      } catch {}
    }, 400);
    return () => clearTimeout(timer);
  }, [embedSrcWithApi]);

  const toggleMute = () => {
    if (!iframeRef.current) return;
    try {
      if (isMuted) {
        // Unmute et relance la lecture au besoin
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "unMute", args: [] }),
          "*"
        );
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
        setIsMuted(false);
      } else {
        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: [] }),
          "*"
        );
        setIsMuted(true);
      }
    } catch {}
  };

  // Persist collapsed state
  useEffect(() => {
    try {
      if (isCollapsed) localStorage.setItem("wassaRadioCollapsed", "1");
      else localStorage.removeItem("wassaRadioCollapsed");
    } catch {}
  }, [isCollapsed]);

  if (!embedSrcWithApi) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-40 bg-surface/90 backdrop-blur rounded-md border border-white/10 shadow-lg ${className}`}
      style={{ width: 320 }}
      aria-label={title || "Radio Wassa Percussion"}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <div className="text-sm font-medium">
          {title || "Radio Wassa Percussion"}
        </div>
        <div className="flex items-center gap-3">
          {embedInfo?.pageUrl ? (
            <a
              href={embedInfo.pageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary hover:underline"
              aria-label="Ouvrir sur YouTube"
            >
              Ouvrir
            </a>
          ) : null}
          <button
            type="button"
            onClick={() => setIsCollapsed((v) => !v)}
            aria-expanded={!isCollapsed}
            className="text-xs text-text-secondary hover:text-primary transition-colors"
          >
            {isCollapsed ? "Agrandir" : "Réduire"}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="p-1 rounded hover:bg-white/5 text-text-secondary hover:text-primary transition-colors"
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
            title={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="w-full aspect-video">
          <iframe
            title="Radio Wassa Percussion"
            className="w-full h-full rounded-b-md"
            ref={iframeRef}
            src={embedSrcWithApi || undefined}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default WassaRadio;
