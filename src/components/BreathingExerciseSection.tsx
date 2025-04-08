
import React from 'react';
import BreathingAnimation from './animations/BreathingAnimation';
import { motion } from 'framer-motion';
import FadeInSection from './animations/FadeInSection';

const BreathingExerciseSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeInSection direction="right">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Take A <span className="text-mindful">Mindful</span> Moment
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Experience the power of a simple breathing exercise. Just a few moments of focused breathing can help reduce stress, increase alertness, and provide a sense of calm.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Reduce Stress",
                    description: "Deep breathing activates your parasympathetic nervous system, which helps reduce stress and anxiety."
                  },
                  {
                    title: "Improve Focus",
                    description: "Taking a breathing break helps clear your mind and improve concentration and mental performance."
                  },
                  {
                    title: "Enhance Well-being",
                    description: "Regular breathing exercises can improve overall mood and help manage emotions."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        duration: 0.5, 
                        delay: 0.2 + index * 0.1,
                      }
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeInSection>
          
          <FadeInSection direction="left" delay={0.3} className="flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
              <BreathingAnimation 
                inhaleTime={4}
                holdTime={4}
                exhaleTime={6}
              />
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default BreathingExerciseSection;
