
import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollTriggeredAnimationProps {
  children: ReactNode;
  className?: string;
  effect?: 'fade' | 'scale' | 'rotate' | 'slide';
  start?: number;
  end?: number;
  threshold?: number;
}

const ScrollTriggeredAnimation: React.FC<ScrollTriggeredAnimationProps> = ({
  children,
  className,
  effect = 'fade',
  start = 0,
  end = 1,
  threshold = 0.1,
}) => {
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    threshold
  });
  
  // Different transformation effects
  const opacity = useTransform(
    scrollYProgress, 
    [start, (start + end) / 2, end], 
    [0, 1, 1]
  );
  
  const scale = useTransform(
    scrollYProgress, 
    [start, (start + end) / 2, end], 
    [0.8, 1, 1]
  );
  
  const rotate = useTransform(
    scrollYProgress, 
    [start, end], 
    [10, 0]
  );
  
  const x = useTransform(
    scrollYProgress, 
    [start, (start + end) / 2, end], 
    [100, 0, 0]
  );

  // Choose the style based on the effect
  const getStyle = () => {
    switch (effect) {
      case 'fade':
        return { opacity };
      case 'scale':
        return { opacity, scale };
      case 'rotate':
        return { opacity, rotate };
      case 'slide':
        return { opacity, x };
      default:
        return { opacity };
    }
  };

  return (
    <motion.div
      className={cn("", className)}
      style={getStyle()}
    >
      {children}
    </motion.div>
  );
};

export default ScrollTriggeredAnimation;
