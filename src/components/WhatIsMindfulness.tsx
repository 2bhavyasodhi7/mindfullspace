
import React from 'react';
import ScrollReveal from './ui/ScrollReveal';
import { motion } from 'framer-motion';

const WhatIsMindfulness = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <span className="inline-block text-spice-500 font-medium tracking-wider text-sm uppercase mb-3">Understand</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                WHAT IS <span className="text-spice-500">MINDFULNESS?</span>
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                Mindfulness is the practice of purposely focusing your attention on the present moment—and accepting it without judgment. It's about being fully engaged with whatever you're doing at the moment, free from distraction or judgment, and aware of your thoughts and feelings without getting caught up in them.
              </p>
              
              <div className="p-8 rounded-xl shadow-lg border-l-4 border-spice-500 bg-white dark:bg-gray-800 dark:border-spice-400">
                <p className="text-lg italic text-gray-700 dark:text-gray-300 mb-2">
                  "THE PRESENT MOMENT IS THE ONLY TIME OVER WHICH WE HAVE <span className="text-spice-500">DOMINION</span>."
                </p>
                <p className="text-right text-gray-600 dark:text-gray-400">
                  - THÍCH NHẤT HẠNH
                </p>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2} direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-spice-500/10 blur-lg rounded-xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl group">
                <motion.img 
                  src="src/pages/images/m1.jpg" 
                  alt="Person meditating" 
                  className="w-full h-auto object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-spice-500 rounded-full text-white text-xs uppercase tracking-wide mb-2">Learn More</span>
                    <h3 className="text-xl font-medium text-white">Meditation Practice</h3>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Benefits Section */}
        <div className="mt-24">
          <ScrollReveal>
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-12 text-center">
              Benefits of <span className="text-spice-500">Mindfulness</span>
            </h3>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Reduced Stress",
                description: "Regular mindfulness practice can lower stress levels and improve your body's response to stress.",
                icon: "🧠"
              },
              {
                title: "Improved Focus",
                description: "Training your attention through mindfulness can enhance concentration and focus in daily tasks.",
                icon: "🎯"
              },
              {
                title: "Emotional Balance",
                description: "Mindfulness helps you respond to difficult emotions with awareness rather than reactivity.",
                icon: "⚖️"
              }
            ].map((benefit, index) => (
              <ScrollReveal key={index} delay={0.1 * index} direction="up">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl mb-4">{benefit.icon}</div>
                  <h4 className="text-xl font-semibold mb-3">{benefit.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsMindfulness;
