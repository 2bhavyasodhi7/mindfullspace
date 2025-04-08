
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import WhatIsMindfulness from '@/components/WhatIsMindfulness';
import GuruSection from '@/components/GuruSection';
import FAQSection from '@/components/FAQSection';
import BreathingCircle from '@/components/animations/BreathingCircle';
import GradientBackground from '@/components/animations/GradientBackground';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    // Animation for elements when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });
    
    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      // Cleanup
      document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <WhatIsMindfulness />
      
      {/* Quick Breathing Exercise Section */}
      <GradientBackground variant="mint" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-serif font-bold mb-6 text-mindful-dark"
            >
              Try a Quick Breathing Exercise
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-mindful-dark/80 mb-10 max-w-2xl mx-auto"
            >
              Take a moment to center yourself with this guided breathing exercise. 
              Follow the expanding and contracting circle to regulate your breath.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg"
            >
              <BreathingCircle />
            </motion.div>
          </div>
        </div>
      </GradientBackground>
      
      <div className="py-10 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <GuruSection />
      </div>
      
      <div className="py-10 bg-white dark:bg-gray-900">
        <FAQSection />
      </div>
    </div>
  );
};

export default Index;
