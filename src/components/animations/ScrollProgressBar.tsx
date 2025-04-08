
import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollProgressBarProps {
  className?: string;
  barColor?: string;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  className,
  barColor = "bg-mindful"
}) => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className={cn("fixed top-0 left-0 right-0 h-1 z-50 origin-left", barColor, className)}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgressBar;
