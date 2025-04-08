
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface BreathingAnimationProps {
  className?: string;
  inhaleTime?: number;
  holdTime?: number;
  exhaleTime?: number;
  color?: string;
}

const BreathingAnimation: React.FC<BreathingAnimationProps> = ({
  className,
  inhaleTime = 4,
  holdTime = 4,
  exhaleTime = 4,
  color = "bg-gradient-to-r from-mindful to-mindful-light"
}) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  
  const totalCycleDuration = inhaleTime + holdTime + exhaleTime;
  
  // Animation variants for the breathing circle
  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: {
        duration: inhaleTime,
        ease: "easeInOut"
      }
    },
    hold: {
      scale: 1.5,
      transition: {
        duration: holdTime,
        ease: "linear"
      }
    },
    exhale: {
      scale: 1,
      transition: {
        duration: exhaleTime,
        ease: "easeInOut"
      }
    }
  };
  
  // Handle phase changes and looping
  const handleAnimationComplete = () => {
    if (!isActive) return;
    
    switch (phase) {
      case 'inhale':
        setPhase('hold');
        break;
      case 'hold':
        setPhase('exhale');
        break;
      case 'exhale':
        setPhase('inhale');
        break;
    }
  };
  
  // Get the guidance text based on current phase
  const getGuidanceText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe Out...';
    }
  };
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative flex items-center justify-center mb-8">
        {/* Guide rings */}
        <div className={cn(
          "absolute w-60 h-60 rounded-full opacity-10",
          color
        )} />
        
        {/* Breathing circle */}
        <motion.div
          className={cn(
            "w-40 h-40 rounded-full shadow-lg",
            color
          )}
          variants={circleVariants}
          animate={isActive ? phase : "exhale"}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
      
      {isActive && (
        <motion.div
          className="text-xl font-medium text-center text-gray-700 dark:text-white mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={phase}
        >
          {getGuidanceText()}
        </motion.div>
      )}
      
      <Button
        onClick={() => setIsActive(!isActive)}
        className="flex items-center gap-2"
        variant={isActive ? "outline" : "default"}
      >
        {isActive ? (
          <>
            <Pause size={18} /> Pause
          </>
        ) : (
          <>
            <Play size={18} /> Start Breathing
          </>
        )}
      </Button>
      
      {!isActive && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
          Click start to begin a {totalCycleDuration}-second breathing cycle.<br />
          {inhaleTime}s inhale, {holdTime}s hold, {exhaleTime}s exhale
        </p>
      )}
    </div>
  );
};

export default BreathingAnimation;
