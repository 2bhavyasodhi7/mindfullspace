
import React, { useState, useEffect } from 'react';
import { Headphones, BarChart3, BookOpen } from 'lucide-react';
import ReactPlayer from 'react-player';
import { weeklyStats } from './audioData1';
import useSound from 'use-sound';

import MeditationHeader from './meditation/components/MeditationHeader';
import GuidedMeditationList from './meditation/components/GuidedMeditationList';
import MeditationTimer from './meditation/components/MeditationTimer';
import MeditationTechniquesSection from './meditation/components/MeditationTechniquesSection';
import MeditationStats from './meditation/components/MeditationStats';
import GuidedMeditationPlayer from './meditation/components/GuidedMeditationPlayer';
import FeatureButton from './meditation/components/FeatureButton';
import { useTimer } from './meditation/hooks/useTimer';
import { 
  guidedMeditations, 
  meditationTechniques, 
  articles, 
  featureHoverContent 
} from './meditation/data/meditationData';

function Meditation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [showTechniques, setShowTechniques] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [meditationStats, setMeditationStats] = useState(weeklyStats);

  const timer = useTimer();

  useEffect(() => {
    setMeditationStats(weeklyStats);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mindful-lighter to-white relative">
      <MeditationHeader />

      <section className="container mx-auto px-4 py-16 mb-32">
        <h2 className="text-4xl font-bold text-mindful mb-12 text-center nike-headline">Begin Your Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div>
            <FeatureButton 
              icon={<Headphones className="w-6 h-6 text-mindful" />}
              title="Guided Meditation"
              isActive={showAudioPlayer}
              onClick={() => setShowAudioPlayer(!showAudioPlayer)}
              hoverContent={featureHoverContent.guidedMeditation}
            />
            
            {showAudioPlayer && (
              <GuidedMeditationList 
                guidedMeditations={guidedMeditations}
                currentAudioIndex={currentAudioIndex}
                setCurrentAudioIndex={setCurrentAudioIndex}
              />
            )}
          </div>

          <div>
            <FeatureButton 
              icon={<BarChart3 className="w-6 h-6 text-mindful" />}
              title="Meditation Tracker"
              isActive={showTracker}
              onClick={() => setShowTracker(!showTracker)}
              hoverContent={featureHoverContent.meditationTracker}
            />

            {showTracker && (
              <MeditationTimer 
                currentTime={timer.currentTime}
                isTimerRunning={timer.isTimerRunning}
                setIsTimerRunning={timer.setIsTimerRunning}
                currentClockTime={timer.currentClockTime}
                selectedTimer={timer.selectedTimer}
                setSelectedTimer={timer.setSelectedTimer}
                setCurrentTime={timer.setCurrentTime}
                formatTime={timer.formatTime}
              />
            )}
          </div>

          <div>
            <FeatureButton 
              icon={<BookOpen className="w-6 h-6 text-mindful" />}
              title="Meditation Techniques"
              isActive={showTechniques}
              onClick={() => setShowTechniques(!showTechniques)}
              hoverContent={featureHoverContent.meditationTechniques}
            />

            {showTechniques && (
              <MeditationTechniquesSection 
                meditationTechniques={meditationTechniques}
                articles={articles}
              />
            )}
          </div>
        </div>

        <MeditationStats meditationStats={meditationStats} />
      </section>

      {showAudioPlayer && (
        <GuidedMeditationPlayer 
          guidedMeditations={guidedMeditations}
          currentAudioIndex={currentAudioIndex}
          setCurrentAudioIndex={setCurrentAudioIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setShowAudioPlayer={setShowAudioPlayer}
        />
      )}
    </div>
  );
}

export default Meditation;
