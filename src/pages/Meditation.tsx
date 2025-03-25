
import React, { useState } from 'react';
import MeditationHeader from './meditation/components/MeditationHeader';
import MeditationOptions from './meditation/components/MeditationOptions';
import MeditationStats from './meditation/components/MeditationStats';
import GuidedMeditationPlayer from './meditation/components/GuidedMeditationPlayer';

function Meditation() {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [showTechniques, setShowTechniques] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mindful-lighter to-white relative pb-40"> {/* Added extra padding bottom */}
      <MeditationHeader />

      <section className="container mx-auto px-4 py-16 mb-24"> {/* Increased bottom margin */}
        <h2 className="text-4xl font-bold text-mindful mb-12 text-center nike-headline">Begin Your Journey</h2>
        
        <MeditationOptions 
          showAudioPlayer={showAudioPlayer}
          setShowAudioPlayer={setShowAudioPlayer}
          showTracker={showTracker}
          setShowTracker={setShowTracker}
          showTechniques={showTechniques}
          setShowTechniques={setShowTechniques}
          currentAudioIndex={currentAudioIndex}
          setCurrentAudioIndex={setCurrentAudioIndex}
        />

        <MeditationStats />
      </section>

      {showAudioPlayer && (
        <GuidedMeditationPlayer
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setShowAudioPlayer={setShowAudioPlayer}
          currentAudioIndex={currentAudioIndex}
          setCurrentAudioIndex={setCurrentAudioIndex}
        />
      )}
    </div>
  );
}

export default Meditation;
