
import React from 'react';
import { Play, Pause, SkipForward, SkipBack, X } from 'lucide-react';

interface GuidedMeditationPlayerProps {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAudioPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  currentAudioIndex: number;
  setCurrentAudioIndex: React.Dispatch<React.SetStateAction<number>>;
}

const GuidedMeditationPlayer: React.FC<GuidedMeditationPlayerProps> = ({
  isPlaying,
  setIsPlaying,
  setShowAudioPlayer,
  currentAudioIndex,
  setCurrentAudioIndex
}) => {
  const guidedMeditations = [
    { title: "Morning Meditation", duration: "10:00", url: "/music/guided meditaion/4-Minute Guided Mindfulness Meditation [TubeRipper.com].mp3"},
    { title: "Stress Relief", duration: "15:00" },
    { title: "Deep Sleep", duration: "20:00" },
    { title: "Anxiety Relief", duration: "12:00" },
    { title: "Focus Enhancement", duration: "8:00" },
    { title: "Gratitude Practice", duration: "10:00" }
  ];

  const handlePreviousTrack = () => {
    setCurrentAudioIndex((prev) => {
      const newIndex = Math.max(0, prev - 1);
      return newIndex;
    });
  };

  const handleNextTrack = () => {
    setCurrentAudioIndex((prev) => {
      const newIndex = Math.min(guidedMeditations.length - 1, prev + 1);
      return newIndex;
    });
  };

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
            onClick={handlePreviousTrack}
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
            onClick={handleNextTrack}
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
