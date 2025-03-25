
import React from 'react';
import { Play, Pause, SkipForward, SkipBack, X } from 'lucide-react';

interface GuidedMeditationPlayerProps {
  guidedMeditations: {
    title: string;
    duration: string;
    url?: string;
  }[];
  currentAudioIndex: number;
  setCurrentAudioIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setShowAudioPlayer: (show: boolean) => void;
}

const GuidedMeditationPlayer: React.FC<GuidedMeditationPlayerProps> = ({
  guidedMeditations,
  currentAudioIndex,
  setCurrentAudioIndex,
  isPlaying,
  setIsPlaying,
  setShowAudioPlayer,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-40">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img 
            src="https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&w=100&q=80"
            alt="Current Meditation"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h4 className="font-medium text-mindful-dark nike-headline">
              {guidedMeditations[currentAudioIndex].title}
            </h4>
            <p className="text-sm text-mindful">Guided Meditation</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentAudioIndex(prev => Math.max(0, prev - 1))}
            className="p-2 hover:bg-mindful-lighter rounded-full"
          >
            <SkipBack className="w-5 h-5 text-mindful-dark" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-mindful text-white rounded-full hover:bg-mindful-dark transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setCurrentAudioIndex(prev => Math.min(guidedMeditations.length - 1, prev + 1))}
            className="p-2 hover:bg-mindful-lighter rounded-full"
          >
            <SkipForward className="w-5 h-5 text-mindful-dark" />
          </button>
        </div>
        <button 
          onClick={() => {
            setShowAudioPlayer(false);
            setIsPlaying(false);
          }}
          className="p-2 hover:bg-mindful-lighter rounded-full"
        >
          <X className="w-5 h-5 text-mindful-dark" />
        </button>
      </div>
    </div>
  );
};

export default GuidedMeditationPlayer;
