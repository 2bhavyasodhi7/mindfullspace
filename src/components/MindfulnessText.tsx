
import React, { useState, useEffect } from 'react';

interface TextPhrase {
  id: number;
  text: string;
  style: {
    top: string;
    left: string;
    animationDuration: string;
    animationDelay: string;
    opacity: string;
    fontSize: string;
  };
}

const MindfulnessText = () => {
  const [phrases, setPhrases] = useState<TextPhrase[]>([]);
  
  const mindfulnessPhrases = [
    "Stay Calm", 
    "Be Humble", 
    "Live Present", 
    "Practice Gratitude", 
    "Breathe Deeply"
  ];
  
  useEffect(() => {
    const newPhrases: TextPhrase[] = [];
    
    mindfulnessPhrases.forEach((phrase, index) => {
      // Create specific positioning for each phrase to create a nice flow
      const topPositions = ['15%', '25%', '40%', '65%', '80%'];
      const leftPositions = ['20%', '65%', '45%', '75%', '15%'];
      
      newPhrases.push({
        id: index,
        text: phrase,
        style: {
          top: topPositions[index],
          left: leftPositions[index],
          animationDuration: `${12 + Math.random() * 8}s`,
          animationDelay: `${index * 0.7}s`,
          opacity: (0.7 + Math.random() * 0.3).toString(),
          fontSize: `${1.2 + Math.random() * 0.6}rem`
        }
      });
    });
    
    setPhrases(newPhrases);
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {phrases.map((phrase) => (
        <div
          key={phrase.id}
          className="absolute text-phrase"
          style={{
            ...phrase.style,
            position: 'absolute',
            transform: 'translateX(-50%)',
            color: 'rgba(115, 165, 128, 0.6)',
            fontFamily: '"Stay Calm", sans-serif',
            fontWeight: 'lighter',
            textShadow: '0 0 15px rgba(115, 165, 128, 0.8), 0 0 10px rgba(255, 215, 0, 0.4)',
            animation: `float ${phrase.style.animationDuration} infinite alternate ease-in-out`,
            zIndex: 1
          }}
        >
          {phrase.text}
        </div>
      ))}
    </div>
  );
};

export default MindfulnessText;
