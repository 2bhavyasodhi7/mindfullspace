
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MeditationProgressProps {
  duration: number; // in seconds
  className?: string;
  onComplete?: () => void;
  isActive: boolean;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

const MeditationProgress: React.FC<MeditationProgressProps> = ({
  duration,
  className = '',
  onComplete,
  isActive,
  size = 200,
  strokeWidth = 8,
  color = '#73A580' // mindful green
}) => {
  const [progress, setProgress] = useState(0);
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / duration);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        
        return newProgress;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive, duration, onComplete]);
  
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const remainingTime = Math.ceil((duration * (100 - progress)) / 100);
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div style={{ width: size, height: size }} className="relative">
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`} 
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(115, 165, 128, 0.2)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-2xl font-medium">{formatTime(remainingTime)}</p>
            <p className="text-sm text-gray-600">{isActive ? 'Remaining' : 'Duration'}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MeditationProgress;
