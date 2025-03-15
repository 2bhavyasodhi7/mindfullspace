
import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AudioPlayerProps {
  isVisible: boolean;
  onClose: () => void;
}

const AudioPlayer = ({ isVisible, onClose }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isVisible && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVisible]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full animate-float-up">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Mindfulness Meditation</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-mindful flex items-center justify-center cursor-pointer" onClick={togglePlay}>
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </div>
          </div>
          
          <p className="text-center mt-4 text-gray-600 dark:text-gray-300">
            A calming meditation to help you center your thoughts and find peace.
          </p>
        </div>
        
        <audio 
          ref={audioRef}
          src="https://cdn.pixabay.com/download/audio/2022/03/09/audio_1b0390e27c.mp3?filename=calm-down-114856.mp3" 
          loop
          className="hidden"
        />
        
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Let the music guide your meditation practice. Close your eyes and focus on your breath.
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
