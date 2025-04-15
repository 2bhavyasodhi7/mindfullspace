
import React, { useState, useEffect } from 'react';

interface Emoji {
  id: number;
  symbol: string;
  style: {
    left: string;
    top?: string;
    animationDuration: string;
    animationDelay: string;
    fontSize: string;
    opacity: string;
  };
}

const EmojiFloating = ({ contained = false, duration = 15000 }: { contained?: boolean; duration?: number }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  
  const meditationEmojis = [
    "🧘", "✨", "🌿", "💭", "🌸", "🕊️", "☮️", "🌈", "🌙", "💆", 
    "🔮", "🌺", "🙏", "🌱", "🌊", "🌄", "💫", "🍃", "🌓", "🧠",
    "💗", "🌼", "🧿", "🔆", "🦋", "🌻", "⭐", "🌴", "🏵️", "🌟"
  ];
  
  useEffect(() => {
    const newEmojis: Emoji[] = [];
    
    for (let i = 0; i < 20; i++) {
      const randomEmoji = meditationEmojis[Math.floor(Math.random() * meditationEmojis.length)];
      const randomLeft = `${Math.random() * 100}%`;
      const randomTop = contained ? `${Math.random() * 100}%` : undefined;
      const randomDuration = `${7 + Math.random() * 15}s`;
      const randomDelay = `${Math.random() * 5}s`;
      const randomSize = `${1 + Math.random() * 1.5}rem`;
      const randomOpacity = `${0.6 + Math.random() * 0.4}`;
      
      newEmojis.push({
        id: i,
        symbol: randomEmoji,
        style: {
          left: randomLeft,
          top: randomTop,
          animationDuration: randomDuration,
          animationDelay: randomDelay,
          fontSize: randomSize,
          opacity: randomOpacity
        }
      });
    }
    
    setEmojis(newEmojis);
    
    const timeout = setTimeout(() => {
      setEmojis([]);
    }, duration);
    
    return () => clearTimeout(timeout);
  }, [contained, duration]);
  
  return (
    <div className={`${contained ? "absolute" : "fixed"} inset-0 pointer-events-none z-40 overflow-hidden`}>
      {emojis.map((emoji) => (
        <div
          key={emoji.id}
          className={`absolute ${!emoji.style.top ? "bottom-0" : ""} text-2xl animate-emoji-float`}
          style={{
            ...emoji.style,
            filter: "drop-shadow(0 0 8px rgba(111, 168, 131, 0.6))",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 blur-md opacity-40" style={{ color: "#6fa883" }}>
              {emoji.symbol}
            </div>
            <div className="relative">
              {emoji.symbol}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmojiFloating;
