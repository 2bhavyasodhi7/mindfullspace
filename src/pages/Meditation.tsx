
import React from 'react';
import ReactPlayer from 'react-player';
import MeditationHeader from './meditation/components/MeditationHeader';
import MeditationOptions from './meditation/components/MeditationOptions';

function Meditation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mindful-lighter to-white relative">
      <MeditationHeader />
      <MeditationOptions />
    </div>
  );
}

export default Meditation;
