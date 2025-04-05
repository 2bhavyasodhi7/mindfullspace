
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Send, FileText, Info, MessageSquare, User, Bot, Sparkles, MoreHorizontal, Share2, Copy, ThumbsUp, ThumbsDown, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Gemini API key
const GEMINI_API_KEY = "AIzaSyALXZHcvALcuNBcSG6AJjAsApqUkj5k9Ro";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I\'m MindfulAssistant, powered by Gemini. How can I help you with mindfulness, meditation, or stress management today?',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are MindfulAssistant, an AI expert in mindfulness, meditation, mental health, and wellness.
                  
                  Context: The user is interacting with you on a mindfulness app called MindfulSpace. 
                  Your goal is to provide helpful, evidence-based information about mindfulness practices, 
                  stress management, and mental wellbeing.
                  
                  When responding to the user, use a calm, supportive tone. Include practical advice they
                  can immediately apply to their life. Where appropriate, reference scientific research 
                  that supports mindfulness practices.
                  
                  Here's what the user is asking: "${input.trim()}"`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from Gemini API");
      }

      const data = await response.json();
      
      // Extract the response text
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      const assistantMessage = {
        role: 'assistant' as const,
        content: aiResponse || "I'm sorry, I couldn't generate a response. Please try again.",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        {
          role: 'assistant',
          content: "I'm sorry, there was an issue generating a response. Please try again in a moment.",
          timestamp: new Date()
        }
      ]);
      
      toast({
        title: "Error",
        description: "Failed to connect to AI service. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      description: "Copied to clipboard",
    });
  };

  return (
    <div className="container min-h-[calc(100vh-64px)] flex flex-col py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold font-raleway flex items-center">
          <Sparkles className="h-6 w-6 mr-2 text-mindful" /> 
          MindfulAssistant
        </h1>
        
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-9 w-9 p-0 rounded-full">
                <Info className="h-4 w-4" />
                <span className="sr-only">Info</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">About MindfulAssistant</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Powered by Google's Gemini AI, this assistant specializes in mindfulness, meditation, and mental wellbeing. Ask questions about stress management, meditation techniques, or general mindfulness practices.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <Card className="flex-grow flex flex-col overflow-hidden border-gray-200 dark:border-gray-800 shadow-sm">
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-6 pb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`relative max-w-[80%] md:max-w-[70%] group ${
                    message.role === 'user' 
                      ? 'bg-mindful/10 text-gray-800 dark:text-gray-100' 
                      : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                  } rounded-2xl p-4 shadow-sm`}
                  onMouseEnter={() => setSelectedMessage(index)}
                  onMouseLeave={() => setSelectedMessage(null)}
                >
                  <div className="flex items-start">
                    <div className={`mr-2 mt-0.5 ${message.role !== 'user' ? 'text-mindful' : ''}`}>
                      {message.role === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        {message.content.split('\n').map((paragraph, i) => (
                          <p key={i} className={i > 0 ? 'mt-4' : ''}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      
                      <div className="text-xs text-gray-500 mt-2">
                        {formatDate(message.timestamp)}
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Controls */}
                  {selectedMessage === index && (
                    <div className="absolute -bottom-4 right-4 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1.5 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                      
                      {message.role === 'assistant' && (
                        <>
                          <button 
                            className="p-1.5 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                          <button 
                            className="p-1.5 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                        </>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button 
                            className="p-1.5 bg-white dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
                          >
                            <MoreHorizontal className="h-3 w-3" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => copyToClipboard(message.content)}>
                            <Copy className="h-4 w-4 mr-2" /> Copy
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 max-w-[80%] md:max-w-[70%] shadow-sm">
                  <div className="flex items-start">
                    <div className="text-mindful mr-2 mt-0.5">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Thinking...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Empty div for scroll reference */}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <div className="relative flex-grow">
              <Input
                placeholder="Ask about mindfulness, meditation, stress management..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="pr-10"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              size="sm" 
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
          
          <div className="mt-2 text-xs text-center text-gray-500">
            Powered by Gemini AI • Responses may not always be accurate
          </div>
        </div>
      </Card>
      
      <div className="flex justify-center mt-4">
        <div className="text-sm text-gray-500 flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          <span>All conversations are processed securely</span>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
