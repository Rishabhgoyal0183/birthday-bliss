import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, Music } from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
  title?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioSrc, 
  title = "Happy Birthday My Love" 
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`relative p-6 rounded-2xl border border-primary/30 bg-gradient-to-br from-card/50 to-primary/5 backdrop-blur-sm overflow-hidden transition-all duration-500 ${isPlaying ? 'shadow-[0_0_40px_rgba(255,105,180,0.3)]' : 'shadow-lg'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating hearts when playing */}
        {isPlaying && (
          <>
            <Heart className="absolute text-primary/20 animate-pulse" style={{ top: '10%', left: '5%', animationDelay: '0s' }} size={20} fill="currentColor" />
            <Heart className="absolute text-primary/15 animate-pulse" style={{ top: '60%', right: '8%', animationDelay: '0.5s' }} size={16} fill="currentColor" />
            <Heart className="absolute text-primary/20 animate-pulse" style={{ bottom: '15%', left: '15%', animationDelay: '1s' }} size={14} fill="currentColor" />
            <Heart className="absolute text-primary/10 animate-pulse" style={{ top: '30%', right: '20%', animationDelay: '1.5s' }} size={18} fill="currentColor" />
          </>
        )}
        
        {/* Animated gradient orbs */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl transition-opacity duration-1000 ${isPlaying ? 'opacity-100 animate-pulse' : 'opacity-30'}`} />
        <div className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl transition-opacity duration-1000 ${isPlaying ? 'opacity-100 animate-pulse' : 'opacity-30'}`} style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} src={audioSrc} preload="metadata" />

      {/* Player content */}
      <div className="relative z-10">
        {/* Title section with music icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-3 rounded-full bg-primary/20 transition-all duration-300 ${isPlaying ? 'animate-pulse shadow-[0_0_20px_rgba(255,105,180,0.4)]' : ''}`}>
            <Music className="text-primary" size={24} />
          </div>
          <div>
            <h4 className="font-display text-lg text-foreground">{title}</h4>
            <p className="text-muted-foreground text-sm">Your Special Birthday Song 💕</p>
          </div>
        </div>

        {/* Visualizer bars */}
        <div className="flex items-end justify-center gap-1 h-12 mb-6">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded-full bg-gradient-to-t from-primary to-accent transition-all duration-150 ${isPlaying ? 'animate-pulse' : ''}`}
              style={{
                height: isPlaying 
                  ? `${Math.random() * 80 + 20}%` 
                  : '20%',
                animationDelay: `${i * 0.05}s`,
                animationDuration: isPlaying ? '0.3s' : '0s',
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div 
          className="h-2 bg-muted/30 rounded-full cursor-pointer mb-4 overflow-hidden group"
          onClick={handleProgressClick}
        >
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative transition-all duration-100"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing end point */}
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,105,180,0.8)] transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-70'}`} />
          </div>
        </div>

        {/* Time display */}
        <div className="flex justify-between text-xs text-muted-foreground mb-6 font-body">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Volume control */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-muted/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(255,105,180,0.6)]"
            />
          </div>

          {/* Play/Pause button */}
          <button
            onClick={togglePlay}
            className={`p-5 rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${isPlaying ? 'shadow-[0_0_30px_rgba(255,105,180,0.5)] animate-pulse' : 'hover:shadow-[0_0_20px_rgba(255,105,180,0.4)]'}`}
          >
            {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
          </button>

          {/* Heart decoration */}
          <div className={`p-2 transition-all duration-300 ${isPlaying ? 'animate-bounce' : ''}`}>
            <Heart className="text-primary" size={24} fill="currentColor" />
          </div>
        </div>

        {/* Instruction text */}
        <p className="text-center text-muted-foreground/60 text-xs mt-6 italic font-body">
          Press play to hear your special song ❤️
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
