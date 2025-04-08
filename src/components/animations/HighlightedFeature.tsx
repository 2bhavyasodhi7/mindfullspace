
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HighlightedFeatureProps {
  title: string;
  description: string;
  icon?: ReactNode;
  index?: number;
  className?: string;
}

const HighlightedFeature: React.FC<HighlightedFeatureProps> = ({
  title,
  description,
  icon,
  index = 0,
  className
}) => {
  return (
    <motion.div 
      className={cn("p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.7, 
          delay: 0.1 * index,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.3 }
      }}
    >
      {icon && (
        <div className="text-3xl mb-4 text-mindful">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white/70">{description}</p>
    </motion.div>
  );
};

export default HighlightedFeature;
