
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BreathingCircleProps {
  className?: string;
  size?: number;
  duration?: number;
  isActive?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({
  className = '',
  size = 200,
  duration = 4,
  isActive = true,
  primaryColor = 'rgb(115, 165, 128)', // Default is mindful green
  secondaryColor = 'rgba(115, 165, 128, 0.2)',
}) => {
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('inhale');
  const [counter, setCounter] = useState(duration);

  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          // Change phase
          setBreathingPhase((currentPhase) => {
            switch(currentPhase) {
              case 'inhale': return 'hold';
              case 'hold': return 'exhale';
              case 'exhale': return 'rest';
              case 'rest': return 'inhale';
              default: return 'inhale';
            }
          });
          return duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration]);

  const instructions = {
    inhale: 'Breathe In',
    hold: 'Hold',
    exhale: 'Breathe Out',
    rest: 'Rest'
  };

  const circleVariants = {
    inhale: {
      scale: 1.5,
      opacity: 1,
      backgroundColor: primaryColor,
      transition: { duration: duration, ease: "easeInOut" }
    },
    hold: {
      scale: 1.5,
      opacity: 1,
      backgroundColor: primaryColor,
      transition: { duration: duration / 2, ease: "easeInOut" }
    },
    exhale: {
      scale: 1,
      opacity: 0.8,
      backgroundColor: secondaryColor,
      transition: { duration: duration, ease: "easeInOut" }
    },
    rest: {
      scale: 1,
      opacity: 0.7,
      backgroundColor: secondaryColor,
      transition: { duration: duration / 2, ease: "easeInOut" }
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <p className="text-lg font-medium text-mindful-dark mb-4">
        {instructions[breathingPhase]}
      </p>
      
      <div className="relative" style={{ width: size, height: size }}>
        <motion.div
          className="absolute inset-0 rounded-full flex items-center justify-center"
          variants={circleVariants}
          animate={breathingPhase}
          initial="rest"
        >
          <span className="text-white font-medium">{counter}</span>
        </motion.div>
        
        <svg className="absolute inset-0" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="rgba(115, 165, 128, 0.2)"
            strokeWidth="1"
          />
        </svg>
      </div>
      
      <p className="text-sm text-gray-500 mt-4">
        Follow the circle to regulate your breathing
      </p>
    </div>
  );
};

export default BreathingCircle;
