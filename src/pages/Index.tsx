
import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import WhatIsMindfulness from '@/components/WhatIsMindfulness';
import GuruSection from '@/components/GuruSection';
import FAQSection from '@/components/FAQSection';

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
