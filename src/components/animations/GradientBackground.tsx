
import React from 'react';
import { motion } from 'framer-motion';

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  animated?: boolean;
  variant?: 'forest' | 'mint' | 'emerald' | 'sage' | 'lime';
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  className = '',
  children,
  animated = true,
  variant = 'forest',
}) => {
  const gradientVariants = {
    forest: "linear-gradient(135deg, #2C5E1A 0%, #60A561 100%)",
    mint: "linear-gradient(135deg, #A8E6CF 0%, #DCEDC1 100%)",
    emerald: "linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)",
    sage: "linear-gradient(135deg, #8EC5FC 0%, #D8EFAB 100%)",
    lime: "linear-gradient(135deg, #C9FA49 0%, #8BFF83 100%)"
  };
  
  const animationVariants = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 20,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };
  
  return (
    <motion.div
      className={`relative ${className}`}
      initial="initial"
      animate={animated ? "animate" : "initial"}
      variants={animationVariants}
      style={{ 
        background: gradientVariants[variant],
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.div>
  );
};

export default GradientBackground;
