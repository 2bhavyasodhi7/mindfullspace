
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  once?: boolean;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 30,
  once = true
}) => {
  const initialProps = {
    opacity: 0,
    x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    y: direction === 'up' ? distance : direction === 'down' ? -distance : 0
  };
  
  return (
    <motion.div
      className={cn("", className)}
      initial={initialProps}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { 
          duration: 0.8, 
          delay,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInSection;
