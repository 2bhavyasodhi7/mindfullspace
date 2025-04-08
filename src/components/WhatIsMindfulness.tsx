
import React from 'react';

const WhatIsMindfulness = () => {
  return (
    <section className="py-20 bg-mindful-lighter dark:bg-mindful3-darker">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 font-raleway">
              WHAT IS <span className="text-mindful">MINDFULNESS?</span>
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 font-sans">
              Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It's about being fully engaged with whatever you're doing at the moment, free from distraction or judgment, and aware of your thoughts and feelings without getting caught up in them.
            </p>
            
            <div className="p-8 rounded-2xl shadow-lg border-l-4 border-mindful bg-white dark:bg-mindful3-dark">
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2 font-stay-calm">
                "THE PRESENT MOMENT IS THE ONLY TIME OVER WHICH WE HAVE <span className="text-mindful">DOMINION</span>."
              </p>
              <p className="text-right text-gray-600 dark:text-gray-400 font-sans">
                - THÍCH NHẤT HẠNH
              </p>
            </div>
          </div>
          
          <div className="relative animate-on-scroll">
            <div className="absolute -inset-4 bg-mindful2/20 blur-lg rounded-xl"></div>
            <img 
              src="/images/m1.jpg" 
              alt="Person meditating" 
              className="relative rounded-xl shadow-xl w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMindfulness;
