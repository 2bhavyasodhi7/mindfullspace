
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import MeditationHeader from './meditation/components/MeditationHeader';
import MeditationOptions from './meditation/components/MeditationOptions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SemiCircleChartProps {
  percentage: number;
  color: string;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const SemiCircleChart: React.FC<SemiCircleChartProps> = ({ percentage, color, label, value, icon }) => {
  const rotation = percentage * 1.8; // 180 degrees * percentage/100

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-24 h-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full rounded-t-full bg-gray-100 dark:bg-gray-700"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-t-full origin-bottom" 
          style={{ 
            backgroundColor: color,
            clipPath: `polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%)`,
            transform: `rotate(${-90 + rotation}deg)`,
            opacity: 0.85
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="font-medium text-lg font-calming">{value}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-2">
        {icon && <span className="text-mindful">{icon}</span>}
        <p className="text-sm font-medium font-stay-calm">{label}</p>
      </div>
    </div>
  );
};

const MeditationStats = () => {
  const [streakDays, setStreakDays] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [longestSession, setLongestSession] = useState(0);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  
  useEffect(() => {
    // Simulate loading data from storage
    const loadStats = () => {
      // For demonstration - in a real app, this would come from storage/API
      setStreakDays(7);
      setTotalMinutes(145);
      setLongestSession(25);
      setSessionsCompleted(12);
    };
    
    loadStats();
  }, []);
  
  return (
    <Card className="border-mindful-light bg-white shadow-sm hover:shadow-md transition-all duration-300 mt-8">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-mindful-dark font-calming text-center">
          Your Meditation Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-4">
          <SemiCircleChart 
            percentage={streakDays >= 30 ? 100 : (streakDays / 30) * 100} 
            color="#73A580" 
            label="Day Streak" 
            value={streakDays}
          />
          
          <SemiCircleChart 
            percentage={totalMinutes >= 200 ? 100 : (totalMinutes / 200) * 100} 
            color="#86EFAC" 
            label="Total Minutes" 
            value={totalMinutes}
          />
          
          <SemiCircleChart 
            percentage={(longestSession / 60) * 100} 
            color="#A5F3FC" 
            label="Longest Session" 
            value={`${longestSession}m`}
          />
          
          <SemiCircleChart 
            percentage={sessionsCompleted >= 20 ? 100 : (sessionsCompleted / 20) * 100} 
            color="#BAE6FD" 
            label="Sessions" 
            value={sessionsCompleted}
          />
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-6 italic font-raleway">
          "Consistency is key. Keep showing up for yourself."
        </p>
      </CardContent>
    </Card>
  );
};

function Meditation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mindful-lighter to-white relative">
      <MeditationHeader />
      <div className="container-custom py-8">
        <MeditationOptions />
        <MeditationStats />
      </div>
    </div>
  );
}

export default Meditation;
