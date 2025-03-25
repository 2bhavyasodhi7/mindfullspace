
import React from 'react';
import { Clock } from 'lucide-react';

interface MeditationTimerProps {
  currentTime: number;
  isTimerRunning: boolean;
  setIsTimerRunning: (isRunning: boolean) => void;
  currentClockTime: Date;
  selectedTimer: number;
  setSelectedTimer: (minutes: number) => void;
  setCurrentTime: (seconds: number) => void;
  formatTime: (seconds: number) => string;
}

const MeditationTimer: React.FC<MeditationTimerProps> = ({
  currentTime,
  isTimerRunning,
  setIsTimerRunning,
  currentClockTime,
  selectedTimer,
  setSelectedTimer,
  setCurrentTime,
  formatTime,
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 gap-8">
        <div className="flex flex-col justify-center">
          <div className="text-6xl font-bold text-mindful mb-4 text-center">
            {formatTime(currentTime)}
          </div>
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => {
                setIsTimerRunning(!isTimerRunning);
                setSelectedTimer(0);
              }}
              className="px-6 py-2 bg-mindful text-white rounded-full hover:bg-mindful-dark transition-colors"
            >
              {isTimerRunning ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setCurrentTime(0);
                setSelectedTimer(0);
              }}
              className="px-6 py-2 bg-mindful-lighter text-mindful-dark rounded-full hover:bg-mindful-light transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[5, 10, 15, 20].map((minutes) => (
              <button
                key={minutes}
                onClick={() => {
                  setSelectedTimer(minutes);
                  setCurrentTime(0);
                  setIsTimerRunning(true);
                }}
                className={`p-4 rounded-xl transition-all duration-300 ${
                  selectedTimer === minutes
                    ? 'bg-mindful-light text-mindful-dark'
                    : 'bg-mindful-lighter hover:bg-mindful-light'
                }`}
              >
                <Clock className="w-6 h-6 mx-auto mb-2" />
                <span className="block text-sm font-medium">{minutes} min</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-8 border-mindful flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl font-bold text-mindful-dark">
                {currentClockTime.toLocaleTimeString()}
              </div>
              <div className="text-xs text-mindful">
                {currentClockTime.toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;
