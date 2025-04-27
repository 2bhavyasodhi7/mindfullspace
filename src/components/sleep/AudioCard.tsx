
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Create audio element
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.volume = volume;
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        setAudioDuration(audioRef.current?.duration || 0);
      });
      
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadedmetadata', () => {});
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('ended', () => {});
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
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
