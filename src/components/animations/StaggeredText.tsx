
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggeredTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const StaggeredText: React.FC<StaggeredTextProps> = ({
  text,
  className,
  delay = 0,
  staggerDelay = 0.015
}) => {
  const words = text.split(' ');

  return (
    <div className={cn("overflow-hidden", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6, 
              delay: delay + i * staggerDelay,
              ease: [0.22, 1, 0.36, 1]
            } 
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default StaggeredText;
