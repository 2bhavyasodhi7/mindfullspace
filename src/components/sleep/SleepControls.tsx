
import React from 'react';
import { Volume2, VolumeX, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SleepControlsProps {
  isPlaying: boolean;
  volume: number;
  togglePlay: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  handleVolumeChange: (newVolume: number) => void;
}

const SleepControls = ({
  isPlaying,
  volume,
  togglePlay,
  skipForward,
  skipBackward,
  handleVolumeChange,
}: SleepControlsProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 my-3">
      <Button variant="ghost" size="sm" onClick={skipBackward}>
        <SkipBack className="h-5 w-5" />
      </Button>
      
      <Button variant="default" size="lg" className="rounded-full" onClick={togglePlay}>
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6 ml-0.5" />
        )}
      </Button>
      
      <Button variant="ghost" size="sm" onClick={skipForward}>
        <SkipForward className="h-5 w-5" />
      </Button>

      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleVolumeChange(volume === 0 ? 0.5 : 0)}
        >
          {volume === 0 ? (
            <VolumeX className="h-5 w-5 text-gray-500" />
          ) : (
            <Volume2 className="h-5 w-5 text-mindful" />
          )}
        </Button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-20 accent-mindful"
        />
      </div>
    </div>
  );
};

export default SleepControls;
