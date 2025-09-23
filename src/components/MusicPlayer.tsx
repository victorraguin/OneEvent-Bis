import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ExternalLink,
} from "lucide-react";
import { supabase, MusicTrack } from "../lib/supabase";
import { useInView } from "../hooks/useInView";
import { processMusicUrl, detectSourceType } from "../lib/musicUtils";

// Types étendus pour supporter différents types de sources
interface ExtendedMusicTrack extends MusicTrack {
  sourceType?: "audio" | "soundcloud" | "youtube";
  externalUrl?: string;
  embedUrl?: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [tracks, setTracks] = useState<ExtendedMusicTrack[]>([]);
  const [showEmbed, setShowEmbed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  React.useEffect(() => {
    const loadMusic = async () => {
      if (!supabase) return;

      try {
        const { data } = await supabase
          .from("music")
          .select("*")
          .order("order_index", { ascending: true });

        if (data) {
          // Traiter chaque piste pour détecter automatiquement le type de source
          const processedTracks = data.map((track) => {
            const sourceType = detectSourceType(track.src);
            const processed = processMusicUrl(track.src);

            return {
              ...track,
              sourceType,
              externalUrl: track.src,
              embedUrl: processed.embedUrl,
            };
          });

          setTracks(processedTracks);
        }
      } catch (error) {
        console.error("Error loading music:", error);
      }
    };

    loadMusic();
  }, []);

  // Fallback data avec support pour SoundCloud et YouTube
  const defaultTracks: ExtendedMusicTrack[] = [
    {
      id: "1",
      title: "Rhythm of Senegal",
      artist: "Wassa Percussion",
      src: "https://cdn.pixabay.com/download/audio/2023/04/21/audio_0624cb19aa.mp3?filename=african-percussion-141912.mp3",
      image:
        "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600",
      order_index: 1,
      created_at: new Date().toISOString(),
      sourceType: "audio",
    },
    {
      id: "2",
      title: "Djembe Fusion",
      artist: "Wassa Percussion",
      src: "https://soundcloud.com/example-artist/djembe-fusion",
      image:
        "https://images.pexels.com/photos/6884636/pexels-photo-6884636.jpeg?auto=compress&cs=tinysrgb&w=600",
      order_index: 2,
      created_at: new Date().toISOString(),
      sourceType: "soundcloud",
      externalUrl: "https://soundcloud.com/example-artist/djembe-fusion",
      embedUrl:
        "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/example&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    },
    {
      id: "3",
      title: "Ancestral Beats",
      artist: "Wassa Percussion",
      src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      image:
        "https://images.pexels.com/photos/2797369/pexels-photo-2797369.jpeg?auto=compress&cs=tinysrgb&w=600",
      order_index: 3,
      created_at: new Date().toISOString(),
      sourceType: "youtube",
      externalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      embedUrl:
        "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1",
    },
  ];

  const tracksToShow = tracks.length > 0 ? tracks : defaultTracks;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      nextTrack();
    };

    // Add event listeners
    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioProgress);
    audio.addEventListener("ended", handleEnded);

    // Set volume
    audio.volume = volume;

    // Clean up
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrack, volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  const togglePlay = () => {
    const currentTrackData = tracksToShow[currentTrack];

    if (
      currentTrackData?.sourceType === "soundcloud" ||
      currentTrackData?.sourceType === "youtube"
    ) {
      // Pour les sources externes, ouvrir dans un nouvel onglet ou afficher l'embed
      if (currentTrackData.externalUrl) {
        window.open(currentTrackData.externalUrl, "_blank");
      }
      return;
    }

    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((currentTrack + 1) % tracksToShow.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack(
      (currentTrack - 1 + tracksToShow.length) % tracksToShow.length
    );
    setIsPlaying(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    if (!progressBar || !audio) return;

    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pos * audio.duration;
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const track = tracksToShow[currentTrack] || tracksToShow[0];
  if (!track) return null;

  const isExternalSource =
    track.sourceType === "soundcloud" || track.sourceType === "youtube";

  return (
    <section
      id="music"
      ref={sectionRef}
      className="section bg-background relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-secondary -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container-custom relative">
        <h2 className="text-primary mb-4 relative inline-block">
          Our Music
          <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
        </h2>
        <p className="text-text-secondary mb-12 max-w-2xl">
          Listen to some of our recordings and experience the rhythms of Wassa
          Percussion.
        </p>

        <div
          className={`bg-surface rounded-lg overflow-hidden optimized-transition transition-all duration-600 ${
            isInView ? "opacity-100 scale-100" : "opacity-0 scale-98"
          }`}
        >
          <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden image-zoom">
              <img
                src={track.image}
                alt={track.title}
                className="w-full h-auto aspect-square object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-semibold">{track.title}</h3>
                {isExternalSource && (
                  <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                    {track.sourceType === "soundcloud"
                      ? "SoundCloud"
                      : "YouTube"}
                  </span>
                )}
              </div>
              <p className="text-text-secondary mb-6">{track.artist}</p>

              {/* Audio element seulement pour les sources audio locales */}
              {track.sourceType === "audio" && (
                <audio ref={audioRef} src={track.src} preload="metadata" />
              )}

              {/* Progress bar seulement pour les sources audio locales */}
              {track.sourceType === "audio" && (
                <>
                  <div
                    className="h-2 bg-background rounded-full mb-3 cursor-pointer"
                    ref={progressBarRef}
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>

                  {/* Time */}
                  <div className="flex justify-between text-text-secondary text-sm mb-6">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={prevTrack}
                    className="text-text-secondary hover:text-primary transition-colors"
                    aria-label="Previous track"
                  >
                    <SkipBack size={24} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isExternalSource
                        ? "bg-secondary text-background hover:bg-secondary/90"
                        : "bg-primary text-background hover:bg-primary/90"
                    }`}
                    aria-label={
                      isExternalSource
                        ? "Listen on external platform"
                        : isPlaying
                        ? "Pause"
                        : "Play"
                    }
                  >
                    {isExternalSource ? (
                      <ExternalLink size={24} />
                    ) : isPlaying ? (
                      <Pause size={24} />
                    ) : (
                      <Play size={24} />
                    )}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="text-text-secondary hover:text-primary transition-colors"
                    aria-label="Next track"
                  >
                    <SkipForward size={24} />
                  </button>
                </div>

                {/* Volume controls seulement pour les sources audio locales */}
                {track.sourceType === "audio" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-text-secondary hover:text-primary transition-colors"
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 md:w-32 accent-primary"
                      aria-label="Volume"
                    />
                  </div>
                )}
              </div>

              {/* Bouton pour afficher l'embed pour les sources externes */}
              {isExternalSource && track.embedUrl && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowEmbed(!showEmbed)}
                    className="text-primary hover:text-primary/80 transition-colors text-sm"
                  >
                    {showEmbed
                      ? "Masquer le lecteur"
                      : "Afficher le lecteur intégré"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Embed pour les sources externes */}
          {isExternalSource && showEmbed && track.embedUrl && (
            <div className="border-t border-background/20 p-6">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                {track.sourceType === "soundcloud" ? (
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={track.embedUrl}
                  ></iframe>
                ) : track.sourceType === "youtube" ? (
                  <iframe
                    width="100%"
                    height="315"
                    src={track.embedUrl}
                    title={track.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : null}
              </div>
            </div>
          )}

          {/* Playlist */}
          <div className="border-t border-background/20">
            <div className="p-6">
              <h4 className="text-lg font-medium mb-4">More Tracks</h4>
              <div className="space-y-3">
                {tracksToShow.map((t, index) => (
                  <div
                    key={t.id || index}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-background/30 transition-colors ${
                      currentTrack === index ? "bg-background/30" : ""
                    }`}
                    onClick={() => {
                      setCurrentTrack(index);
                      if (t.sourceType === "audio") {
                        setIsPlaying(true);
                      }
                      setShowEmbed(false);
                    }}
                  >
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={
                          t.image ||
                          "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600"
                        }
                        alt={t.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-2">
                        {t.title}
                        {(t.sourceType === "soundcloud" ||
                          t.sourceType === "youtube") && (
                          <span className="px-1 py-0.5 text-xs bg-primary/20 text-primary rounded">
                            {t.sourceType === "soundcloud" ? "SC" : "YT"}
                          </span>
                        )}
                      </div>
                      <div className="text-text-secondary text-sm">
                        {t.artist}
                      </div>
                    </div>
                    {currentTrack === index &&
                      isPlaying &&
                      t.sourceType === "audio" && (
                        <div className="flex-shrink-0 w-4 h-4">
                          <div className="flex h-full items-end gap-[2px]">
                            <div className="w-1 bg-primary animate-pulse-slow h-2"></div>
                            <div className="w-1 bg-primary animate-pulse-slow h-3"></div>
                            <div className="w-1 bg-primary animate-pulse-slow h-4"></div>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicPlayer;
