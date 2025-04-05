import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, Mic, Bot, User, MessageSquare, Sparkles, Info, 
  PanelLeft, Wand2, Settings, Plus, Search, Calendar, 
  Clock, ChevronRight, Volume2, Award, Share2
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Typing indicator component
const TypingIndicator = () => (
  <div className="flex space-x-1 items-center p-2">
    <div className="w-2 h-2 rounded-full bg-mindful animate-pulse"></div>
    <div className="w-2 h-2 rounded-full bg-mindful animate-pulse delay-75"></div>
    <div className="w-2 h-2 rounded-full bg-mindful animate-pulse delay-150"></div>
  </div>
);

// Breathing animation component
const BreathingAnimation = ({ isActive }: { isActive: boolean }) => {
  if (!isActive) return null;
  
  return (
    <div className="flex justify-center my-4">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 bg-mindful-lighter rounded-full animate-ping opacity-30"></div>
        <div className="absolute inset-4 bg-mindful-light rounded-full animate-ping opacity-50 delay-300"></div>
        <div className="absolute inset-8 bg-mindful rounded-full flex items-center justify-center text-white text-xs">
          Breathe
        </div>
      </div>
    </div>
  );
};

// Quick reply button component
const QuickReplyButton = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <Button 
    variant="outline" 
    size="sm" 
    className="bg-transparent border border-mindful text-mindful hover:bg-mindful-lighter rounded-full px-4 py-1 text-xs"
    onClick={onClick}
  >
    {text}
  </Button>
);

const AIChat = () => {
  const { toast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your mindfulness assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentAIPersonality, setCurrentAIPersonality] = useState('Calm');
  const [showDailyCheckIn, setShowDailyCheckIn] = useState(true);
  const [currentMood, setCurrentMood] = useState<string | null>(null);
  const [userStreakDays, setUserStreakDays] = useState(3);

  // Scroll to bottom of chat whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Daily check-in effect
  useEffect(() => {
    // Check if we've already shown the check-in today
    const lastCheckIn = localStorage.getItem('lastMoodCheckIn');
    const today = new Date().toDateString();
    
    if (lastCheckIn !== today) {
      setShowDailyCheckIn(true);
    } else {
      setShowDailyCheckIn(false);
      // Get saved mood if available
      const savedMood = localStorage.getItem('currentMood');
      if (savedMood) {
        setCurrentMood(savedMood);
      }
    }
  }, []);

  const handleMoodSelection = (mood: string) => {
    setCurrentMood(mood);
    localStorage.setItem('currentMood', mood);
    localStorage.setItem('lastMoodCheckIn', new Date().toDateString());
    setShowDailyCheckIn(false);
    
    // Generate a response based on mood
    const moodResponses: Record<string, string> = {
      'Great': "I'm happy to hear you're feeling great today! How can I help maintain this positive energy?",
      'Good': "Good to hear you're doing well! What would you like to focus on today?",
      'Okay': "Thanks for sharing. Some mindfulness practice might help boost your day. Would you like some suggestions?",
      'Stressed': "I'm sorry to hear you're feeling stressed. Would you like to try a quick breathing exercise to help calm your mind?",
      'Anxious': "I understand anxiety can be challenging. Would you like to talk about what's causing your anxiety or try a grounding exercise?",
    };
    
    const botResponse: Message = {
      id: Date.now().toString(),
      content: moodResponses[mood] || "Thank you for sharing how you're feeling. How can I support you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botResponse]);

    // If user is stressed or anxious, suggest breathing exercise
    if (mood === 'Stressed' || mood === 'Anxious') {
      setTimeout(() => {
        setShowBreathingExercise(true);
      }, 1000);
    }
  };

  // Updated to use Grok API instead of Gemini
  const generateGrokResponse = async (prompt: string) => {
    try {
      const API_KEY = "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";
      const API_URL = "https://api.groq.com/openai/v1/chat/completions";
      
      // Adjust prompt based on selected AI personality
      let personalityPrefix = "";
      switch(currentAIPersonality) {
        case 'Calm':
          personalityPrefix = "Respond in a calm, soothing manner. Use gentle language and suggest peaceful activities. ";
          break;
        case 'Motivating':
          personalityPrefix = "Respond with energy and motivation. Use encouraging language and suggest active exercises. ";
          break;
        case 'Friendly':
          personalityPrefix = "Respond in a warm, friendly way. Be conversational and personable in your tone. ";
          break;
        default:
          personalityPrefix = "Respond in a calm, supportive manner. ";
      }
      
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}` 
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: `${personalityPrefix}You are a mindfulness assistant named MindfulChat. ${currentMood ? `The user is feeling ${currentMood} today. ` : ''}Respond to the following with practical mindfulness advice. Keep responses concise and actionable.`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]?.message?.content) {
        return data.choices[0].message.content;
      } else if (data.error) {
        console.error('API Error:', data.error);
        return `I'm sorry, I encountered an error: ${data.error.message || 'Unknown error'}. Please try again later.`;
      } else {
        console.error('Unexpected API response structure:', data);
        return "I'm sorry, I couldn't generate a response at the moment. Please try again later.";
      }
    } catch (error) {
      console.error('Error calling Grok API:', error);
      return "I'm sorry, I encountered an error. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get response from Grok API
      const botResponse = await generateGrokResponse(input);
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from the AI. Please try again.",
        variant: "destructive"
      });
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Input",
      description: "Voice input functionality will be available soon.",
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    // Optional: auto-send the message
    // setTimeout(handleSendMessage, 100);
  };

  const handleStartBreathing = () => {
    setShowBreathingExercise(true);
    toast({
      title: "Breathing Exercise",
      description: "Follow the animation to breathe in and out slowly.",
    });
  };

  const handleStopBreathing = () => {
    setShowBreathingExercise(false);
  };

  const handleShareProgress = () => {
    toast({
      title: "Share Progress",
      description: "Sharing functionality will be available soon.",
    });
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex h-[calc(100vh-64px-64px)] ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Bot className="text-mindful" /> 
              <span>MindfulChat</span>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your AI mindfulness companion</p>
          </div>
          
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="w-full grid grid-cols-3 p-1 m-2">
              <TabsTrigger value="chat" className="text-xs flex flex-col items-center gap-1 py-2">
                <MessageSquare className="h-4 w-4" />
                <span>Chat</span>
              </TabsTrigger>
              <TabsTrigger value="exercises" className="text-xs flex flex-col items-center gap-1 py-2">
                <Sparkles className="h-4 w-4" />
                <span>Exercises</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="text-xs flex flex-col items-center gap-1 py-2">
                <Info className="h-4 w-4" />
                <span>About</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="p-2 overflow-y-auto max-h-[calc(100vh-320px)]">
              <div className="space-y-4">
                {/* User streak */}
                <div className="bg-mindful-lighter rounded-lg p-3">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4" /> Your Mindfulness Streak
                  </h3>
                  <div className="mt-2">
                    <Progress value={userStreakDays * 10} className="h-2" />
                    <p className="text-xs mt-1 text-right">{userStreakDays} days</p>
                  </div>
                </div>
                
                {/* AI Personality Selection */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium flex items-center gap-2 text-sm mb-2">
                    <Bot className="h-4 w-4 text-mindful" /> AI Personality
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Calm', 'Motivating', 'Friendly'].map(personality => (
                      <Badge 
                        key={personality}
                        variant={currentAIPersonality === personality ? "default" : "outline"}
                        className={`cursor-pointer ${
                          currentAIPersonality === personality 
                            ? 'bg-mindful hover:bg-mindful-dark' 
                            : 'hover:bg-mindful-lighter'
                        }`}
                        onClick={() => setCurrentAIPersonality(personality)}
                      >
                        {personality}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Suggested prompts:</p>
                  {[
                    "Help me with a 5-minute meditation",
                    "I'm feeling anxious, what can I do?",
                    "Recommend breathing exercises for stress",
                    "How can I improve my sleep?"
                  ].map((prompt, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start text-left border-mindful/20 hover:bg-mindful-lighter transition-all"
                      onClick={() => {
                        setInput(prompt);
                      }}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
                
                {/* New conversation button */}
                <Button className="w-full gap-2 bg-mindful hover:bg-mindful-dark transition-all mt-4">
                  <Plus className="h-4 w-4" /> New Conversation
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="exercises" className="p-2 overflow-y-auto max-h-[calc(100vh-320px)]">
              <div className="space-y-3">
                <div className="bg-mindful-lighter rounded-lg p-3 transition-transform duration-300 hover:scale-105">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2">
                    <Wand2 className="h-4 w-4" /> Breathing Exercise
                  </h3>
                  <p className="text-sm mt-1">4-7-8 breathing technique for relaxation</p>
                  <Button 
                    className="mt-2 bg-mindful hover:bg-mindful-dark text-xs h-8"
                    onClick={handleStartBreathing}
                  >
                    Start Now
                  </Button>
                </div>
                
                <div className="bg-mindful-lighter rounded-lg p-3 transition-transform duration-300 hover:scale-105">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2">
                    <Wand2 className="h-4 w-4" /> Body Scan
                  </h3>
                  <p className="text-sm mt-1">Progressive relaxation for tension release</p>
                  <Button className="mt-2 bg-mindful hover:bg-mindful-dark text-xs h-8">Start Now</Button>
                </div>
                
                <div className="bg-mindful-lighter rounded-lg p-3 transition-transform duration-300 hover:scale-105">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2">
                    <Wand2 className="h-4 w-4" /> Gratitude Practice
                  </h3>
                  <p className="text-sm mt-1">Mindful reflection on things you're grateful for</p>
                  <Button className="mt-2 bg-mindful hover:bg-mindful-dark text-xs h-8">Start Now</Button>
                </div>
                
                <div className="bg-mindful-lighter rounded-lg p-3 transition-transform duration-300 hover:scale-105">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Schedule Check-in
                  </h3>
                  <p className="text-sm mt-1">Set reminders for daily mindfulness practice</p>
                  <Button className="mt-2 bg-mindful hover:bg-mindful-dark text-xs h-8">Schedule</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="p-4 overflow-y-auto max-h-[calc(100vh-320px)]">
              <div className="text-sm space-y-3">
                <p>
                  MindfulChat is your AI companion for mindfulness and wellbeing.
                </p>
                <p>
                  Ask for guidance on meditation, breathing exercises, stress management, 
                  sleep improvement, and more.
                </p>
                <p>
                  Powered by Google's Gemini AI model to provide mindfulness assistance.
                </p>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Accessibility Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Dark Mode</span>
                      <Switch 
                        checked={isDarkMode} 
                        onCheckedChange={handleThemeToggle} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <span>Font Size</span>
                      <Slider 
                        defaultValue={[1]} 
                        max={2} 
                        step={0.1} 
                        min={0.8}
                        onValueChange={(value) => setFontSizeMultiplier(value[0])}
                      />
                      <div className="flex justify-between text-xs">
                        <span>Small</span>
                        <span>Large</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={localStorage.getItem('profileImage') || undefined} />
                  <AvatarFallback className="bg-mindful text-white">U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{localStorage.getItem('userName') || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Premium Member</p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Privacy</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleThemeToggle}>
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-all duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleSidebar}
              className="hover:bg-mindful-lighter"
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">Mindfulness Assistant</h2>
            {currentMood && (
              <Badge className="bg-mindful hover:bg-mindful">
                Feeling: {currentMood}
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={handleShareProgress}
            >
              <Share2 className="h-4 w-4" />
              <span className="hidden md:inline">Share</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search</span>
            </Button>
          </div>
        </div>
        
        {/* Daily Check-in */}
        {showDailyCheckIn && (
          <div className="p-4 bg-mindful-lighter m-4 rounded-lg animate-fade-in">
            <h3 className="font-medium mb-3">How are you feeling today?</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Great', 'Good', 'Okay', 'Stressed', 'Anxious'].map(mood => (
                <Button 
                  key={mood} 
                  variant="outline"
                  className="border border-mindful hover:bg-mindful hover:text-white transition-all"
                  onClick={() => handleMoodSelection(mood)}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Breathing Exercise */}
        <BreathingAnimation isActive={showBreathingExercise} />
        {showBreathingExercise && (
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Breathe in for 4 seconds, hold for 7, exhale for 8
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleStopBreathing}
              className="text-mindful border-mindful hover:bg-mindful-lighter"
            >
              End Exercise
            </Button>
          </div>
        )}
        
        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ fontSize: `${fontSizeMultiplier}rem` }}
        >
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`flex gap-3 max-w-[80%] ${
                  message.sender === 'user' 
                    ? 'flex-row-reverse' 
                    : 'flex-row'
                }`}
              >
                <Avatar className="h-8 w-8 mt-1">
                  {message.sender === 'user' ? (
                    <>
                      <AvatarImage src={localStorage.getItem('profileImage') || undefined} />
                      <AvatarFallback className="bg-mindful text-white">
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-mindful-dark text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div 
                  className={`rounded-lg p-3 shadow-sm transition-all hover:shadow-md ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-br from-mindful to-mindful-dark text-white' 
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="leading-relaxed">{message.content}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p 
                      className={`text-xs ${
                        message.sender === 'user' 
                          ? 'text-white/70' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    
                    {message.sender === 'bot' && (
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Volume2 className="h-3 w-3 text-gray-500" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-mindful-dark text-white">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Quick Reply Options (if there are messages) */}
        {messages.length > 0 && !isLoading && (
          <div className="px-4 py-2 flex flex-wrap gap-2">
            <QuickReplyButton 
              text="Tell me more" 
              onClick={() => handleQuickReply("Tell me more about this")} 
            />
            <QuickReplyButton 
              text="Breathing exercise" 
              onClick={() => handleQuickReply("Guide me through a breathing exercise")} 
            />
            <QuickReplyButton 
              text="Stress reduction" 
              onClick={() => handleQuickReply("How can I reduce stress quickly?")} 
            />
          </div>
        )}
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="flex-1 rounded-full border-mindful/30 focus-visible:ring-mindful"
              disabled={isLoading}
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => toast({
                title: "Voice Input",
                description: "Voice input functionality will be available soon.",
              })}
              className="rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              disabled={isLoading}
            >
              <Mic className="h-5 w-5 text-mindful" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              className="rounded-full bg-mindful hover:bg-mindful-dark transition-colors"
              disabled={input.trim() === '' || isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
            <Bot className="h-3 w-3" /> Powered by Grok AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
