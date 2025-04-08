
import { Variants } from 'framer-motion';

/**
 * Text variant animations for sequential text animations
 */
export const textVariant = (delay: number): Variants => {
  return {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      },
    },
  };
};

/**
 * Fade in animations with direction
 */
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right', delay: number): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      opacity: 0,
    },
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.65,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

/**
 * Stagger container for child animations
 */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

/**
 * Scale animation variants
 */
export const scaleIn = (delay: number): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.8,
        delay,
      },
    },
  };
};

/**
 * Card hover animations
 */
export const cardHoverVariants: Variants = {
  initial: {
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  },
  hover: {
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    y: -5,
    transition: {
      y: { type: "spring", stiffness: 300, damping: 20 },
      boxShadow: { duration: 0.15 },
    },
  },
};

/**
 * Image hover animations
 */
export const imageHoverVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * Pulse animation variants
 */
export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [0.9, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Breathing circle animation variants
 */
export const breathingVariants: Variants = {
  inhale: {
    scale: 1.2,
    transition: {
      duration: 4,
      ease: "easeInOut",
    },
  },
  exhale: {
    scale: 1,
    transition: {
      duration: 4,
      ease: "easeInOut",
    },
  },
};

/**
 * Float animation for elements
 */
export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * Bounce effect for buttons or important elements
 */
export const bounceVariants: Variants = {
  animate: {
    y: [0, -5, 0],
    transition: {
      duration: 0.6,
      repeat: 3,
      ease: "easeInOut",
      repeatDelay: 0.2,
    },
  },
};
