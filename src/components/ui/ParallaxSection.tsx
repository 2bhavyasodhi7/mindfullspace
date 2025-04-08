
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  className?: string;
  backgroundUrl: string;
  backgroundOpacity?: number;
  children?: React.ReactNode;
  overlayColor?: string;
  speed?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  className,
  backgroundUrl,
  backgroundOpacity = 0.7,
  children,
  overlayColor = "from-black/70 to-black/30",
  speed = 0.3
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return (
    <section ref={ref} className={cn("relative min-h-[50vh] flex items-center overflow-hidden", className)}>
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y, backgroundImage: `url(${backgroundUrl})`, opacity: backgroundOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: backgroundOpacity }}
        transition={{ duration: 1.5 }}
        aria-hidden="true"
      >
        <div className={`absolute inset-0 bg-gradient-to-t ${overlayColor}`} />
      </motion.div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-6">
        {children}
      </div>
    </section>
  );
};

export default ParallaxSection;
