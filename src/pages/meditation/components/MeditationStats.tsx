
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { weeklyStats } from '@/pages/audioData1';

const MeditationStats: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg mb-32"> {/* Increased margin bottom to 32 */}
      <h2 className="text-2xl font-bold text-mindful-dark mb-8 nike-headline">Your Stats</h2>
      <div className="h-80">
        <ChartContainer
          config={{
            hours: {
              label: "Meditation Hours",
              color: "#73A580"
            }
          }}
          className="mt-4"
        >
          <BarChart data={weeklyStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8F0EA" />
            <XAxis dataKey="day" />
            <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#73A580' }} />
            <ChartTooltip 
              content={
                <ChartTooltipContent 
                  labelFormatter={(value) => `${value} Hours`}
                />
              }
            />
            <Bar dataKey="hours" fill="#73A580" />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default MeditationStats;
