
import { useState, useEffect, useRef } from 'react';

export const useTimer = (selectedTimerInitial = 0) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(selectedTimerInitial);
  const [currentClockTime, setCurrentClockTime] = useState(new Date());
  
  const timerRef = useRef<NodeJS.Timeout>();
  const clockRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isTimerRunning) {
      clockRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (selectedTimer > 0 && prev >= selectedTimer * 60) {
            setIsTimerRunning(false);
            clearInterval(clockRef.current);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(clockRef.current);
  }, [isTimerRunning, selectedTimer]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentClockTime(new Date());
    }, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    currentTime,
    setCurrentTime,
    isTimerRunning,
    setIsTimerRunning,
    selectedTimer,
    setSelectedTimer,
    currentClockTime,
    formatTime
  };
};
