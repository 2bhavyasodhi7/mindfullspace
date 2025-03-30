
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send, Mic, Bot, User, MessageSquare, Sparkles, Info, PanelLeft, Wand2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

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

  const generateGeminiResponse = async (prompt: string) => {
    try {
      const API_KEY = "AIzaSyALPJtV_B5Z0hXP-c8axP_HCBYql4B7QkU"; // Updated API key
      const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent";
      
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a mindfulness assistant. Respond to the following in a calm, supportive manner with practical advice: ${prompt}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1000,
          },
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.error('API Error:', data.error);
        return `I'm sorry, I encountered an error: ${data.error.message || 'Unknown error'}. Please try again later.`;
      } else {
        console.error('Unexpected API response structure:', data);
        return "I'm sorry, I couldn't generate a response at the moment. Please try again later.";
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
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
      // Get response from Gemini API
      const botResponse = await generateGeminiResponse(input);
      
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

  return (
    <div className="flex h-[calc(100vh-64px-64px)] bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
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
            
            <TabsContent value="chat" className="p-2">
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
                    className="w-full justify-start text-left border-mindful/20 hover:bg-mindful-lighter"
                    onClick={() => {
                      setInput(prompt);
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="exercises" className="p-2">
              <div className="space-y-3">
                <div className="bg-mindful-lighter rounded-lg p-3">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2">
                    <Wand2 className="h-4 w-4" /> Breathing Exercise
                  </h3>
                  <p className="text-sm mt-1">4-7-8 breathing technique for relaxation</p>
                  <Button className="mt-2 bg-mindful hover:bg-mindful-dark text-xs h-8">Start Now</Button>
                </div>
                
                <div className="bg-mindful-lighter rounded-lg p-3">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2">
                    <Wand2 className="h-4 w-4" /> Body Scan
                  </h3>
                  <p className="text-sm mt-1">Progressive relaxation for tension release</p>
                  <Button className="mt-2 bg-mindful hover:bg-mindful-dark text-xs h-8">Start Now</Button>
                </div>
                
                <div className="bg-mindful-lighter rounded-lg p-3">
                  <h3 className="font-medium text-mindful-dark flex items-center gap-2">
                    <Wand2 className="h-4 w-4" /> Gratitude Practice
                  </h3>
                  <p className="text-sm mt-1">Mindful reflection on things you're grateful for</p>
                  <Button className="mt-2 bg-mindful hover:bg-mindful-dark text-xs h-8">Start Now</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="about" className="p-4">
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
              <Button variant="outline" size="sm">
                Settings
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <PanelLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">Mindfulness Assistant</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              New Chat
            </Button>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                  className={`rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-mindful text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p>{message.content}</p>
                  <p 
                    className={`text-xs mt-1 ${
                      message.sender === 'user' 
                        ? 'text-white/70' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleVoiceInput}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
              disabled={isLoading}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button 
              onClick={handleSendMessage}
              className="bg-mindful hover:bg-mindful-dark"
              disabled={input.trim() === '' || isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
            Powered by Google Gemini
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
