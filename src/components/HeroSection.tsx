
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import ReactPlayer from 'react-player/lazy';
import EmojiFloating from './EmojiFloating';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { textVariant, fadeIn, staggerContainer } from '@/lib/animations';

const HeroSection = () => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  const handleStartJourney = () => {
    setShowAudioPlayer(true);
    setShowEmojis(true);
  };
  
  const closeAudioPlayer = () => {
    setShowAudioPlayer(false);
    setShowEmojis(false);
    if (playerRef.current) {
      // Seek to beginning and pause
      playerRef.current.seekTo(0);
    }
  };
  
  return (
    <section ref={targetRef} className="relative h-[90vh] w-full flex items-center justify-center text-white overflow-hidden">
      {/* Full-width, full-height background image with parallax effect */}
      <div className="absolute inset-0 w-full h-full">
        <motion.img 
          src="src/pages/images/scenery.jpg" 
          alt="Meditation background" 
          className="w-full h-full object-cover brightness-[0.6]"
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [0, 150]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.15])
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"></div>
      </div>
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="container-custom text-center relative z-10"
      >
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto"
        >
          <motion.p 
            variants={textVariant(0.1)}
            className="text-spice-400 font-medium tracking-widest uppercase text-sm mb-3"
          >
            Begin your mindfulness journey
          </motion.p>
          
          <motion.h1 
            variants={textVariant(0.2)}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 leading-tight"
          >
            FIND YOUR <span className="text-spice-400">INNER PEACE</span>
          </motion.h1>
          
          <motion.p 
            variants={textVariant(0.3)}
            className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-white/80"
          >
            Our guided practices help you develop awareness and live in the 
            <span className="text-spice-400"> present moment</span>.
          </motion.p>
          
          <motion.div 
            variants={fadeIn("up", 0.4)}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              className="bg-spice-500 hover:bg-spice-600 text-white px-8 py-6 rounded-full text-lg transition-all hover:shadow-lg hover:scale-105 flex items-center gap-2 group"
              onClick={handleStartJourney}
            >
              START YOUR JOURNEY
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline"
              className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-6 rounded-full text-lg"
            >
              LEARN MORE
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: "300+", label: "Meditation Sessions" },
            { number: "5M+", label: "Minutes Meditated" },
            { number: "150+", label: "Guided Practices" },
            { number: "50+", label: "Mindful Instructors" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeIn("up", 0.4 + (index * 0.1))}
              className="glass-panel p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-3xl font-medium text-spice-400 mb-1">{stat.number}</h3>
              <p className="text-sm text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-spice-400 mb-2 flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-spice-400 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <p className="text-xs uppercase tracking-widest text-white/80 font-light">Scroll Down</p>
      </motion.div>
      
      {showEmojis && <EmojiFloating />}
      
      {showAudioPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl max-w-md w-full animate-float-up border border-spice-500/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                <span className="text-spice-400">MINDFULNESS</span> MEDITATION
              </h3>
              <button 
                onClick={closeAudioPlayer}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-4 shadow-inner">
              <div className="aspect-w-16 aspect-h-9 mb-3">
                <ReactPlayer
                  ref={playerRef}
                  url="https://cdn.pixabay.com/download/audio/2022/03/09/audio_1b0390e27c.mp3?filename=calm-down-114856.mp3"
                  playing={true}
                  controls={true}
                  width="100%"
                  height="50px"
                  config={{
                    file: {
                      forceAudio: true,
                    },
                  }}
                />
              </div>
              
              <p className="text-center mt-4 text-gray-300">
                A calming meditation to help you center your thoughts and find <span className="text-spice-400">peace</span>.
              </p>
            </div>
            
            <p className="text-sm text-gray-400 text-center">
              Let the music guide your meditation practice. Close your eyes and focus on your breath.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
