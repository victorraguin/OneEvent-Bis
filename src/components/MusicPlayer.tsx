import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { supabase, MusicTrack } from '../lib/supabase';
import { useInView } from '../hooks/useInView';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.2 });

  React.useEffect(() => {
    const loadMusic = async () => {
      if (!supabase) return;
      
      try {
        const { data } = await supabase
          .from('music')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (data) {
          setTracks(data);
        }
      } catch (error) {
        console.error('Error loading music:', error);
      }
    };

    loadMusic();
  }, []);

  // Fallback data if Supabase not configured
  const defaultTracks: MusicTrack[] = [
    {
      id: '1',
      title: "Rhythm of Senegal",
      artist: "Wassa Percussion",
      src: "https://cdn.pixabay.com/download/audio/2023/04/21/audio_0624cb19aa.mp3?filename=african-percussion-141912.mp3",
      image: "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600",
      order_index: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      title: "Djembe Fusion",
      artist: "Wassa Percussion",
      src: "https://cdn.pixabay.com/download/audio/2022/11/17/audio_89ef77c9a3.mp3?filename=moroccan-desert-145307.mp3",
      image: "https://images.pexels.com/photos/6884636/pexels-photo-6884636.jpeg?auto=compress&cs=tinysrgb&w=600",
      order_index: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      title: "Ancestral Beats",
      artist: "Wassa Percussion",
      src: "https://cdn.pixabay.com/download/audio/2022/09/29/audio_1d3fc408d2.mp3?filename=arabic-139726.mp3",
      image: "https://images.pexels.com/photos/2797369/pexels-photo-2797369.jpeg?auto=compress&cs=tinysrgb&w=600",
      order_index: 3,
      created_at: new Date().toISOString()
    }
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
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioProgress);
    audio.addEventListener('ended', handleEnded);

    // Set volume
    audio.volume = volume;
    
    // Clean up
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioProgress);
      audio.removeEventListener('ended', handleEnded);
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
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((currentTrack + 1) % tracks.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((currentTrack - 1 + tracks.length) % tracks.length);
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
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const track = tracksToShow[currentTrack] || tracksToShow[0];
  if (!track) return null;

  return (
    <section id="music" ref={sectionRef} className="section bg-background relative overflow-hidden">
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
          Listen to some of our recordings and experience the rhythms of Wassa Percussion.
        </p>
        
        <div 
          className={`bg-surface rounded-lg overflow-hidden optimized-transition transition-all duration-300 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
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
              <h3 className="text-2xl font-semibold mb-2">{track.title}</h3>
              <p className="text-text-secondary mb-6">{track.artist}</p>
              
              <audio ref={audioRef} src={track.src} preload="metadata" />
              
              {/* Progress bar */}
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
                    className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center hover:bg-primary/90 transition-colors"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button 
                    onClick={nextTrack}
                    className="text-text-secondary hover:text-primary transition-colors"
                    aria-label="Next track"
                  >
                    <SkipForward size={24} />
                  </button>
                </div>
                
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
              </div>
            </div>
          </div>
          
          {/* Playlist */}
          <div className="border-t border-background/20">
            <div className="p-6">
              <h4 className="text-lg font-medium mb-4">More Tracks</h4>
              <div className="space-y-3">
                {tracksToShow.map((t, index) => (
                  <div 
                    key={t.id || index}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-background/30 transition-colors ${
                      currentTrack === index ? 'bg-background/30' : ''
                    }`}
                    onClick={() => {
                      setCurrentTrack(index);
                      setIsPlaying(true);
                    }}
                  >
                    <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={t.image || "https://images.pexels.com/photos/2531728/pexels-photo-2531728.jpeg?auto=compress&cs=tinysrgb&w=600"} 
                        alt={t.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{t.title}</div>
                      <div className="text-text-secondary text-sm">{t.artist}</div>
                    </div>
                    {currentTrack === index && isPlaying && (
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