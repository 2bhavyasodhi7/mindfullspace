
import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundImage?: string;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  backgroundImage,
  speed = 0.5
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <motion.section 
      className={cn("relative overflow-hidden", className)}
    >
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y
          }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default ParallaxSection;
