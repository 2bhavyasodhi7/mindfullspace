
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SleepControls from './SleepControls';

interface AudioCardProps {
  title: string;
  duration: string;
  audioUrl: string;
  isSelected: boolean;
  onSelect: () => void;
}

const AudioCard = ({ title, duration, audioUrl, isSelected, onSelect }: AudioCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);
  
  // Fallback audio URL for when the main URL fails
  const fallbackAudioUrl = "/music/Forest Canopy Dreams.mp3";

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      const url = audioUrl || fallbackAudioUrl;
      audioRef.current = new Audio(url);
      audioRef.current.volume = volume;
      // Set autoplay to false explicitly
      audioRef.current.autoplay = false;
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setAudioDuration(audioRef.current?.duration || 0);
        console.log("Audio loaded successfully:", url);
        setAudioError(false);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error("Audio loading error:", e);
        setAudioError(true);
        
        // Try fallback if main URL fails and it's not already the fallback
        if (audioUrl !== fallbackAudioUrl && audioRef.current) {
          console.log("Trying fallback audio:", fallbackAudioUrl);
          audioRef.current.src = fallbackAudioUrl;
          audioRef.current.load();
          // Don't auto-play the fallback either
        }
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('ended', () => {});
        audioRef.current.removeEventListener('error', () => {});
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioUrl, fallbackAudioUrl]);

  // Update audio element when URL changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl || fallbackAudioUrl;
      audioRef.current.load();
      setAudioError(false);
      // Don't automatically play when URL changes
      // Only play if user has explicitly clicked play
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.error("Failed to play:", err);
          setAudioError(true);
          setIsPlaying(false);
          
          // Try fallback if main URL fails
          if (audioUrl !== fallbackAudioUrl) {
            console.log("Trying fallback audio after play failure:", fallbackAudioUrl);
            audioRef.current!.src = fallbackAudioUrl;
            audioRef.current!.load();
            // Don't auto-play the fallback
          }
        });
      }
    }
  }, [audioUrl, fallbackAudioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(err => {
        console.error("Failed to play:", err);
        setAudioError(true);
        setIsPlaying(false);
      });
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!isSelected) {
      onSelect();
    }
    setIsPlaying(!isPlaying);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Card 
      className={`transform transition-all duration-300 hover:scale-[1.02] cursor-pointer
        ${isSelected 
          ? 'border-2 border-mindful shadow-xl bg-gradient-to-br from-mindful-lighter to-white' 
          : 'border border-mindful/20 shadow-md hover:shadow-xl bg-white/80 backdrop-blur-sm'
        }`}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="text-mindful-dark font-semibold">{title}</span>
          <span className="text-sm text-gray-500">{duration}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-mindful/5 rounded-xl p-3">
          {audioError && (
            <div className="mb-2 text-xs text-red-500 text-center">
              Error loading audio. Please check the URL or try another track.
            </div>
          )}
          <div className="mb-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-mindful rounded-full"
              style={{width: `${(currentTime / audioDuration) * 100 || 0}%`}}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(audioDuration)}</span>
          </div>
          
          <SleepControls 
            isPlaying={isPlaying}
            volume={volume}
            togglePlay={togglePlay}
            skipForward={skipForward}
            skipBackward={skipBackward}
            handleVolumeChange={handleVolumeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AudioCard;
