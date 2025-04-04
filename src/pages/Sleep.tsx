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
    <div className="min-h-screen bg-gradient-to-br from-mindful-lighter to-white">
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-mindful-dark flex items-center">
              <Moon className="mr-2 text-mindful" /> Sleep Better
            </h1>
            <p className="text-gray-600 mt-2 max-w-2xl">
              Improve your sleep quality with our collection of sleep stories, soundscapes, and non-sleep deep rest (NSDR) sessions.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <Button 
              onClick={() => toggleTimer()} 
              variant="outline" 
              className="mr-2 bg-white"
            >
              <Clock className="mr-2 h-4 w-4" />
              {sleepTimer.isRunning ? 'Stop Timer' : 'Start Sleep Timer'}
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-white"
              onClick={() => setShowStats(true)}
            >
              View Sleep Stats
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="sleepStories" className="w-full mb-8">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="sleepStories" onClick={() => setSelectedCategory('sleepStories')}>Sleep Stories</TabsTrigger>
            <TabsTrigger value="nsdr" onClick={() => setSelectedCategory('nsdr')}>NSDR</TabsTrigger>
            <TabsTrigger value="soundscapes" onClick={() => setSelectedCategory('soundscapes')}>Soundscapes</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {audioFiles[selectedCategory as keyof typeof audioFiles].map((audio) => (
              <Card key={audio.id} 
                onClick={() => setSelectedAudio(audio)} 
                className={`cursor-pointer hover:shadow-md transition-shadow duration-300 ${selectedAudio.id === audio.id ? 'border-2 border-mindful' : ''}`}
              >
                <CardHeader>
                  <CardTitle>{audio.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Duration: {audio.duration}</p>
                  <AudioPlayer
                    src={audio.url}
                    showJumpControls={true}
                    layout="stacked"
                    customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                    customProgressBarSection={["PROGRESS_BAR", "CURRENT_TIME", "DURATION"]}
                    className="audio-player-custom rounded-md"
                    style={{ 
                      backgroundColor: '#f3f4f6', 
                      borderRadius: '0.5rem',
                      boxShadow: 'none'
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </Tabs>

        <Sheet open={showStats} onOpenChange={setShowStats}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sleep Statistics</SheetTitle>
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
