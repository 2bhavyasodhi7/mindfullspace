
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, Variant } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  once?: boolean;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
  className,
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-100px 0px" });
  
  const getInitialTransform = (): Record<string, number> => {
    switch (direction) {
      case 'up':
        return { y: 40 };
      case 'down':
        return { y: -40 };
      case 'left':
        return { x: 40 };
      case 'right':
        return { x: -40 };
      default:
        return { y: 40 };
    }
  };
  
  const getAnimation = (): Record<string, number | Variant> => {
    switch (direction) {
      case 'up':
      case 'down':
        return { y: 0 };
      case 'left':
      case 'right':
        return { x: 0 };
      default:
        return { y: 0 };
    }
  };
  
  useEffect(() => {
    if (inView) {
      controls.start({
        ...getAnimation(),
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
    }
  }, [inView, controls, direction, duration, delay]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ ...getInitialTransform(), opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
