
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <WhatIsMindfulness />
      <div className="py-10 bg-gradient-to-t from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <GuruSection />
      </div>
      <div className="py-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <FAQSection />
      </div>
    </div>
  );
};

export default Index;
