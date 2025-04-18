import React, { useState, useEffect, useRef } from 'react';
import {
  Moon,
  Volume2,
  VolumeX,
  Clock,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { audioFiles } from '../pages/audioData';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { defaultControlsSection, defaultProgressBarSection, audioPlayerStyles } from '@/utils/audioPlayerUtils';

interface SleepTimer {
  isRunning: boolean;
  startTime: Date | null;
  elapsedTime: number;
}

const Sleep = () => {
  const [selectedCategory, setSelectedCategory] = useState('sleepStories');
  const [selectedAudio, setSelectedAudio] = useState(audioFiles.sleepStories[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<SleepTimer>({
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioRef.current.pause();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    }
  }, [isPlaying, volume, selectedAudio]);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current ? audioRef.current.duration : 0);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current ? audioRef.current.currentTime : 0);
      };

      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [selectedAudio]);

  useEffect(() => {
    if (sleepTimer.isRunning) {
      const intervalId = setInterval(() => {
        setSleepTimer(prev => ({
          ...prev,
          elapsedTime: Date.now() - (prev.startTime?.getTime() || Date.now()),
        }));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [sleepTimer.isRunning]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleTimer = () => {
    if (sleepTimer.isRunning) {
      setSleepTimer({ isRunning: false, startTime: null, elapsedTime: 0 });
    } else {
      setSleepTimer({ isRunning: true, startTime: new Date(), elapsedTime: 0 });
    }
  };

  const whilePlaying = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8BA989]/30 to-[#F2C94C]/20">
      <div className="container mx-auto py-12 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-mindful-dark flex items-center">
              <Moon className="mr-3 text-mindful h-8 w-8 md:h-10 md:w-10" /> 
              Sleep Better
            </h1>
            <p className="text-gray-600 mt-3 max-w-2xl text-lg">
              Improve your sleep quality with our collection of sleep stories, soundscapes, and non-sleep deep rest (NSDR) sessions.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <Button 
              onClick={() => toggleTimer()} 
              variant="secondary"
              className="shadow-md hover:shadow-lg transition-all"
            >
              <Clock className="mr-2 h-4 w-4" />
              {sleepTimer.isRunning ? 'Stop Timer' : 'Start Sleep Timer'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setShowStats(true)}
              className="shadow-md hover:shadow-lg transition-all"
            >
              View Sleep Stats
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="sleepStories" className="w-full mb-8">
          <TabsList className="grid grid-cols-3 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="sleepStories">Sleep Stories</TabsTrigger>
            <TabsTrigger value="nsdr">NSDR</TabsTrigger>
            <TabsTrigger value="soundscapes">Soundscapes</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {audioFiles[selectedCategory as keyof typeof audioFiles].map((audio) => (
              <Card 
                key={audio.id} 
                onClick={() => setSelectedAudio(audio)}
                className={`transform transition-all duration-300 hover:scale-[1.02] cursor-pointer
                  ${selectedAudio.id === audio.id 
                    ? 'border-2 border-mindful shadow-xl bg-gradient-to-br from-mindful-lighter to-white' 
                    : 'border border-mindful/20 shadow-md hover:shadow-xl bg-white/80 backdrop-blur-sm'
                  }`}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-mindful-dark font-semibold">{audio.title}</span>
                    <span className="text-sm text-gray-500">{audio.duration}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-mindful/5 rounded-xl p-4">
                    <AudioPlayer
                      src={audio.url}
                      showJumpControls={true}
                      layout="stacked"
                      customControlsSection={defaultControlsSection}
                      customProgressBarSection={defaultProgressBarSection}
                      className="audio-player-custom rounded-lg shadow-inner"
                      style={{
                        backgroundColor: 'transparent',
                        borderRadius: '12px',
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>

        <Sheet open={showStats} onOpenChange={setShowStats}>
          <SheetContent className="bg-white/95 backdrop-blur-sm border-l border-mindful/20">
            <SheetHeader>
              <SheetTitle className="text-mindful-dark">Sleep Statistics</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <p>Here you can view your sleep statistics.</p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Sleep;
