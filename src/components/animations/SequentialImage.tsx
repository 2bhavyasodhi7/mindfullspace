
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SequentialImageProps {
  images: string[];
  className?: string;
  alt: string;
}

const SequentialImage: React.FC<SequentialImageProps> = ({
  images,
  className,
  alt
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress to image index
  const imageIndex = useTransform(
    scrollYProgress, 
    [0, 0.8], 
    [0, images.length - 1]
  );
  
  useEffect(() => {
    const unsubscribe = imageIndex.onChange(latest => {
      setCurrentIndex(Math.min(Math.floor(latest), images.length - 1));
    });
    
    return () => unsubscribe();
  }, [imageIndex, images.length]);
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {images.map((src, index) => (
        <motion.img
          key={src}
          src={src}
          alt={`${alt} - view ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            transition: { duration: 0.3 }
          }}
        />
      ))}
    </div>
  );
};

export default SequentialImage;
