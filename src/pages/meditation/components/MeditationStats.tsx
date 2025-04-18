
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleClock, Brain, Target, Award } from 'lucide-react';

interface SemiCircleProps {
  percentage: number;
  color: string;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

const SemiCircle: React.FC<SemiCircleProps> = ({ percentage, color, label, value, icon }) => {
  const rotation = percentage * 1.8; // 180 degrees * percentage/100

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full rounded-t-full bg-mindful-lighter"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full rounded-t-full origin-bottom transition-all duration-500" 
          style={{ 
            backgroundColor: color,
            transform: `rotate(${-90 + rotation}deg)`,
            opacity: 0.85
          }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <span className="font-bold text-2xl text-mindful-dark">{value}</span>
          {icon && <span className="text-mindful-dark mt-1">{icon}</span>}
        </div>
      </div>
      <p className="text-sm font-medium text-mindful-dark mt-2">{label}</p>
    </div>
  );
};

const MeditationStats = () => {
  const [stats, setStats] = useState({
    streakDays: 0,
    totalHours: 0,
    completedSessions: 0,
    focusScore: 0
  });

  useEffect(() => {
    // Simulated data - in a real app, this would come from an API or local storage
    setStats({
      streakDays: 7,
      totalHours: 24,
      completedSessions: 15,
      focusScore: 85
    });
  }, []);

  return (
    <Card className="bg-white shadow-lg rounded-xl overflow-hidden border-mindful-light">
      <CardHeader className="bg-gradient-to-r from-mindful-lighter to-mindful-light/30 pb-6">
        <CardTitle className="text-2xl font-bold text-mindful-dark text-center">
          Your Meditation Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <SemiCircle 
            percentage={(stats.streakDays / 10) * 100}
            color="#73A580"
            label="Day Streak"
            value={stats.streakDays}
            icon={<CircleClock className="w-4 h-4" />}
          />
          <SemiCircle 
            percentage={(stats.totalHours / 30) * 100}
            color="#86EFAC"
            label="Total Hours"
            value={stats.totalHours}
            icon={<Brain className="w-4 h-4" />}
          />
          <SemiCircle 
            percentage={(stats.completedSessions / 20) * 100}
            color="#A5F3FC"
            label="Sessions"
            value={stats.completedSessions}
            icon={<Target className="w-4 h-4" />}
          />
          <SemiCircle 
            percentage={stats.focusScore}
            color="#BAE6FD"
            label="Focus Score"
            value={`${stats.focusScore}%`}
            icon={<Award className="w-4 h-4" />}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MeditationStats;
