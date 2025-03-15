
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import AudioPlayer from './AudioPlayer';
import EmojiFloating from './EmojiFloating';

const HeroSection = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  
  const handleStartJourney = () => {
    setShowAudioPlayer(true);
    setShowEmojis(true);
  };
  
  const closeAudioPlayer = () => {
    setShowAudioPlayer(false);
  };
  
  return (
    <section className="relative min-h-[80vh] flex items-center hero-gradient text-white">
      <div className="container-custom text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your <span className="text-mindful">Inner Peace</span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10">
          Begin your journey to mindfulness and discover a calmer, more focused you. 
          Our guided practices help you develop awareness and live in the present moment.
        </p>
        
        <Button 
          className="bg-mindful hover:bg-mindful-dark text-white px-8 py-6 rounded-full text-lg"
          onClick={handleStartJourney}
        >
          Start Your Journey
        </Button>
      </div>
      
      {showEmojis && <EmojiFloating />}
      <AudioPlayer isVisible={showAudioPlayer} onClose={closeAudioPlayer} />
    </section>
  );
};

export default HeroSection;
