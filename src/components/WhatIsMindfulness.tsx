
import React, { useState } from 'react';
import EmojiFloating from './EmojiFloating';

const WhatIsMindfulness = () => {
  const [showEmojis, setShowEmojis] = useState(false);
  
  // Trigger emoji animation when component is viewed
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowEmojis(true);
        }
      });
    }, { threshold: 0.3 });
    
    const element = document.getElementById('mindfulness-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);
  
  return (
    <section id="mindfulness-section" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {showEmojis && <EmojiFloating contained={true} duration={30000} />}
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 nike-headline">
              WHAT IS <span className="bg-gradient-to-r from-mindful to-amber-500 bg-clip-text text-transparent nike-highlight">MINDFULNESS?</span>
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 nike-body-text">
              Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It's about being fully engaged with whatever you're doing at the moment, free from distraction or judgment, and aware of your thoughts and feelings without getting caught up in them.
            </p>
            
            <div className="mindful-card p-8 rounded-lg shadow-lg border-l-4 border-gradient-to-r from-mindful to-amber-400">
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2 nike-quote">
                "THE PRESENT MOMENT IS THE ONLY TIME OVER WHICH WE HAVE <span className="bg-gradient-to-r from-mindful to-amber-500 bg-clip-text text-transparent">DOMINION</span>."
              </p>
              <p className="text-right text-gray-600 dark:text-gray-400 nike-quote-author">
                - THÍCH NHẤT HẠNH
              </p>
            </div>
          </div>
          
          <div className="relative animate-on-scroll">
            <div className="absolute -inset-4 bg-gradient-to-r from-mindful/10 to-amber-400/10 blur-lg rounded-xl"></div>
            <img 
              src="src/pages/images/m1.jpg" 
              alt="Person meditating" 
              className="relative rounded-xl shadow-xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </div>
      
      {/* Soft glowing background accents */}
      <div className="absolute top-1/4 left-10 w-40 h-40 bg-[#6fa883] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-60 h-60 bg-[#FFD700] rounded-full opacity-10 blur-3xl"></div>
    </section>
  );
};

export default WhatIsMindfulness;
