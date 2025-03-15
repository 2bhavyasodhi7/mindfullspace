
import React from 'react';

const WhatIsMindfulness = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What is <span className="text-mindful">Mindfulness?</span>
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It's about being fully engaged with whatever you're doing at the moment, free from distraction or judgment, and aware of your thoughts and feelings without getting caught up in them.
            </p>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-mindful shadow-md">
              <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2">
                "The present moment is the only time over which we have dominion."
              </p>
              <p className="text-right text-gray-600 dark:text-gray-400">
                - Thích Nhất Hạnh
              </p>
            </div>
          </div>
          
          <div>
            <img 
              src="/public/lovable-uploads/7e575c2d-6979-450d-b7bd-502df750d57b.png" 
              alt="Person meditating" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMindfulness;
