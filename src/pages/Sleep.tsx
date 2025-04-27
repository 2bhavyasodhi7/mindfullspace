
import React, { useState, useEffect } from 'react';
import { Moon, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import MediaToggle from '@/components/sleep/MediaToggle';
import VideoPlayer from '@/components/sleep/VideoPlayer';
import AudioCard from '@/components/sleep/AudioCard';
import { audioFiles } from './audioData';

interface AudioResource {
  id: string;
  title: string;
  duration: string;
  audio_url: string;
  category: string;
  created_at?: string;
  youtube_url?: string;
  section: string;
}

interface SleepTimer {
  isRunning: boolean;
  startTime: Date | null;
  elapsedTime: number;
}

const Sleep = () => {
  const [selectedCategory, setSelectedCategory] = useState('sleepStories');
  const [audioResources, setAudioResources] = useState<AudioResource[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<AudioResource | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<SleepTimer>({
    isRunning: false,
    startTime: null,
    elapsedTime: 0,
  });

  // Fetch audio resources from Supabase
  useEffect(() => {
    const fetchAudioResources = async () => {
      console.log("Fetching audio resources from Supabase");
      // Try to get resources from Supabase
      const { data, error } = await supabase
        .from('media_resources')
        .select('*')
        .eq('section', 'sleep');

      console.log("Supabase response:", { data, error });

      if (error || !data || data.length === 0) {
        console.log("Using local audio data instead of Supabase", error);
        // Use local audio data as fallback
        const localData = mapLocalAudioToResources(selectedCategory);
        setAudioResources(localData);
        
        if (localData.length > 0) {
          setSelectedAudio(localData[0]);
        }
      } else {
        // Use Supabase data
        console.log("Using Supabase data:", data);
        setAudioResources(data as AudioResource[]);
        
        if (data && data.length > 0) {
          setSelectedAudio(data[0] as AudioResource);
        }
      }
    };

    fetchAudioResources();
  }, []);

  // Map local audio data to match the AudioResource format
  const mapLocalAudioToResources = (category: string): AudioResource[] => {
    const categoryData = audioFiles[category as keyof typeof audioFiles] || [];
    
    return categoryData.map(audio => ({
      id: audio.id.toString(),
      title: audio.title,
      duration: audio.duration,
      audio_url: audio.url,
      category: category,
      section: 'sleep'
    }));
  };

  // Filter audio resources when category changes
  useEffect(() => {
    console.log("Category changed to:", selectedCategory);
    console.log("Current audioResources:", audioResources);
    
    // Check if we're using Supabase data (by checking if id is a string that looks like a UUID)
    const isUsingSupabase = audioResources.length > 0 && 
      typeof audioResources[0].id === 'string' && 
      audioResources[0].id.includes('-');
    
    if (isUsingSupabase) {
      console.log("Filtering Supabase resources by category:", selectedCategory);
      // Filter Supabase resources by category
      const filteredResources = audioResources.filter(audio => audio.category === selectedCategory);
      console.log("Filtered resources:", filteredResources);
      
      if (filteredResources.length > 0 && (!selectedAudio || selectedAudio.category !== selectedCategory)) {
        console.log("Setting selected audio to:", filteredResources[0]);
        setSelectedAudio(filteredResources[0]);
      }
    } else {
      console.log("Using local audio data for category:", selectedCategory);
      // Use local audio data
      const localData = mapLocalAudioToResources(selectedCategory);
      setAudioResources(localData);
      
      if (localData.length > 0) {
        console.log("Setting selected audio to local data:", localData[0]);
        setSelectedAudio(localData[0]);
      }
    }
  }, [selectedCategory]);

  // Handle sleep timer
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

  const toggleTimer = () => {
    if (sleepTimer.isRunning) {
      setSleepTimer({ isRunning: false, startTime: null, elapsedTime: 0 });
      toast.info("Sleep timer stopped");
    } else {
      setSleepTimer({ isRunning: true, startTime: new Date(), elapsedTime: 0 });
      toast.success("Sleep timer started");
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const renderMediaPlayer = () => {
    if (!selectedAudio) return null;

    if (showVideo && selectedAudio.youtube_url) {
      return <VideoPlayer url={selectedAudio.youtube_url} title={selectedAudio.title} />;
    }

    return null; // The audio player is now in AudioCard component
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
            <MediaToggle showVideo={showVideo} onToggle={setShowVideo} />
            <Button 
              onClick={toggleTimer} 
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
        
        {sleepTimer.isRunning && (
          <div className="mb-8 p-3 bg-mindful/10 rounded-lg inline-block">
            <span className="font-mono font-medium">Sleep timer: {formatTime(sleepTimer.elapsedTime)}</span>
          </div>
        )}
        
        <Tabs 
          defaultValue="sleepStories" 
          className="w-full mb-8" 
          onValueChange={handleCategoryChange}
        >
          <TabsList className="grid grid-cols-3 mb-8 bg-white/50 backdrop-blur-sm">
            <TabsTrigger value="sleepStories">Sleep Stories</TabsTrigger>
            <TabsTrigger value="nsdr">NSDR</TabsTrigger>
            <TabsTrigger value="soundscapes">Soundscapes</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderMediaPlayer()}
            
            {/* Display Supabase data if available */}
            {audioResources.length > 0 && audioResources[0].id.includes('-') && 
              audioResources
                .filter(audio => audio.category === selectedCategory)
                .map((audio) => (
                  <AudioCard
                    key={audio.id}
                    title={audio.title}
                    duration={audio.duration || "Unknown"}
                    audioUrl={audio.audio_url || ""}
                    isSelected={selectedAudio?.id === audio.id}
                    onSelect={() => setSelectedAudio(audio)}
                  />
                ))
            }
            
            {/* Local data fallback */}
            {(!audioResources.length || !audioResources[0].id.includes('-')) && 
              audioFiles[selectedCategory as keyof typeof audioFiles].map((audio) => (
                <AudioCard
                  key={audio.id}
                  title={audio.title}
                  duration={audio.duration}
                  audioUrl={audio.url}
                  isSelected={selectedAudio?.id === audio.id.toString()}
                  onSelect={() => setSelectedAudio({
                    id: audio.id.toString(),
                    title: audio.title,
                    duration: audio.duration,
                    audio_url: audio.url,
                    category: selectedCategory,
                    section: 'sleep'
                  })}
                />
              ))
            }
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
