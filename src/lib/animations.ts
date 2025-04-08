
import { Variants } from "framer-motion";

export const textVariant = (delay?: number): Variants => {
  return {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay,
      },
    },
  };
};

export const fadeIn = (direction: string, delay?: number): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
      y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay,
      },
    },
  };
};

export const zoomIn = (delay?: number, duration?: number): Variants => {
  return {
    hidden: {
      scale: 0.8,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: duration || 0.4,
        delay,
      },
    },
  };
};

export const slideIn = (direction: string, type: string, delay?: number, duration?: number): Variants => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : 0,
    },
    visible: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration: duration || 0.5,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cardHoverVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.03,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

export const imageHoverVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
};
