
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <motion.div 
      className={cn("flex items-center gap-2", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-spice-500 to-mystic-500 rounded-full p-1 flex items-center justify-center">
        <div className="text-white font-serif font-bold">MS</div>
      </div>
      <span className="text-lg font-serif font-semibold">MindfulSpace</span>
    </motion.div>
  );
};
