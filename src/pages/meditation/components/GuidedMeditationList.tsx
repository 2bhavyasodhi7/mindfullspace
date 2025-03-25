
import React from 'react';
import { Play } from 'lucide-react';

interface GuidedMeditationListProps {
  guidedMeditations: {
    title: string;
    duration: string;
    url?: string;
  }[];
  currentAudioIndex: number;
  setCurrentAudioIndex: (index: number) => void;
}

const GuidedMeditationList: React.FC<GuidedMeditationListProps> = ({
  guidedMeditations,
  currentAudioIndex,
  setCurrentAudioIndex,
}) => {
  return (
    <div className="grid gap-4 bg-white p-8 rounded-2xl shadow-lg">
      {guidedMeditations.map((meditation, index) => (
        <button
          key={index}
          onClick={() => setCurrentAudioIndex(index)}
          className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
            currentAudioIndex === index 
              ? 'bg-mindful-light text-mindful-dark' 
              : 'bg-mindful-lighter hover:bg-mindful-light'
          }`}
        >
          <div className="flex items-center gap-4">
            <Play className="w-5 h-5" />
            <span className="font-medium">{meditation.title}</span>
          </div>
          <span className="text-sm text-mindful-dark">{meditation.duration}</span>
        </button>
      ))}
    </div>
  );
};

export default GuidedMeditationList;
