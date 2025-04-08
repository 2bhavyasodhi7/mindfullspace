
import React from 'react';
import HeroSection from '@/components/HeroSection';
import WhatIsMindfulness from '@/components/WhatIsMindfulness';
import GuruSection from '@/components/GuruSection';
import FAQSection from '@/components/FAQSection';
import ScrollProgressBar from '@/components/animations/ScrollProgressBar';
import FadeInSection from '@/components/animations/FadeInSection';
import ParallaxSection from '@/components/animations/ParallaxSection';
import StaggeredText from '@/components/animations/StaggeredText';
import BreathingExerciseSection from '@/components/BreathingExerciseSection';
import { motion } from 'framer-motion';
import HighlightedFeature from '@/components/animations/HighlightedFeature';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const features = [
    {
      title: "Guided Meditation",
      description: "Follow along with expert-led meditation sessions designed for every experience level.",
      icon: "🧘"
    },
    {
      title: "Sleep Stories",
      description: "Drift off to sleep with calming stories designed to ease your mind and body.",
      icon: "🌙"
    },
    {
      title: "Breathing Exercises",
      description: "Reduce stress and find calm with simple, effective breathing techniques.",
      icon: "🌬️"
    },
    {
      title: "Progress Tracking",
      description: "Monitor your meditation journey and celebrate your mindfulness milestones.",
      icon: "📊"
    }
  ];

  const testimonials = [
    {
      quote: "This mindfulness practice has completely transformed my approach to stress and anxiety.",
      author: "Sarah J.",
      role: "Teacher"
    },
    {
      quote: "I've tried many meditation apps, but this platform truly stands out with its thoughtful approach.",
      author: "Michael R.",
      role: "Software Engineer"
    },
    {
      quote: "The sleep stories have been a game-changer for my insomnia. I'm finally getting restful sleep.",
      author: "Priya K.",
      role: "Healthcare Professional"
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <ScrollProgressBar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* What is Mindfulness */}
      <WhatIsMindfulness />
      
      {/* Breathing Exercise Section */}
      <BreathingExerciseSection />
      
      {/* Features Section with Apple-style animations */}
      <ParallaxSection 
        className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute bg-mindful/20 w-[500px] h-[500px] rounded-full blur-[100px] -top-10 -right-20" />
          <div className="absolute bg-mindful-dark/20 w-[400px] h-[400px] rounded-full blur-[80px] bottom-10 -left-20" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <FadeInSection>
              <p className="text-mindful uppercase tracking-wider text-sm font-medium mb-2">
                Experience the Difference
              </p>
            </FadeInSection>
            
            <StaggeredText
              text="Transform Your Daily Routine With Mindfulness"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              delay={0.2}
            />
            
            <FadeInSection delay={0.4} className="max-w-xl mx-auto">
              <p className="text-white/70 text-lg">
                Our platform offers tools and guidance to help you integrate mindfulness into your everyday life, creating moments of calm in even the busiest schedule.
              </p>
            </FadeInSection>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {features.map((feature, index) => (
              <HighlightedFeature
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <FadeInSection delay={0.6}>
              <Button 
                className="bg-mindful hover:bg-mindful-dark text-white font-medium px-8 py-6 rounded-full"
              >
                Start Your Mindfulness Journey <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </FadeInSection>
          </div>
        </div>
      </ParallaxSection>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              What Our <span className="text-mindful">Community</span> Says
            </h2>
          </FadeInSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInSection
                key={testimonial.author}
                delay={0.2 * index}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
              >
                <p className="text-lg mb-4 italic text-gray-700 dark:text-gray-300">
                  "{testimonial.quote}"
                </p>
                <p className="text-mindful font-medium">{testimonial.author}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Guru Section */}
      <div className="py-10 bg-gradient-to-t from-gray-100 to-white dark:from-gray-800 dark:to-gray-900">
        <GuruSection />
      </div>
      
      {/* FAQ Section */}
      <div className="py-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <FAQSection />
      </div>
      
      {/* Final CTA Section */}
      <ParallaxSection 
        className="py-20 bg-mindful/10"
        backgroundImage="src/pages/images/green leaves.jpg"
        speed={0.3}
      >
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <FadeInSection>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Begin Your Mindfulness Journey Today
              </h2>
              
              <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
                Transform your relationship with stress, improve focus, and find more moments of calm in your daily life.
              </p>
              
              <motion.div
                initial={{ scale: 1 }}
                animate={{ 
                  scale: [1, 1.05, 1],
                  transition: { 
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
              >
                <Button 
                  className="bg-mindful hover:bg-mindful-dark text-white font-medium px-8 py-6 rounded-full text-lg shadow-lg"
                >
                  Get Started Now <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            </FadeInSection>
          </div>
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Index;
