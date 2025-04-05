
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, BookOpen, Clock, MessageCircle, Share2, ThumbsUp, Bookmark } from 'lucide-react';
import { Button } from "@/components/ui/button";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useToast } from "@/components/ui/use-toast";

// Mock article data
const articles = [
  {
    id: '1',
    title: 'Rewire Your Brain: The Power of Neuroplasticity in Mindfulness',
    excerpt: 'Learn how mindfulness practices can literally reshape your brain for better mental health and cognitive performance.',
    content: `
      <h1>Rewire Your Brain: The Power of Neuroplasticity in Mindfulness</h1>
      
      <p>For decades, scientists believed that the brain was fixed and unchangeable after early childhood. But groundbreaking research in neuroplasticity has revealed that our brains can change throughout our lives, forming new neural connections in response to our experiences, thoughts, and behaviors.</p>
      
      <p>Mindfulness meditation has emerged as one of the most powerful tools to harness this neuroplasticity, offering a way to literally reshape our brains for improved mental health, emotional regulation, and cognitive performance.</p>
      
      <h2>The Science Behind Brain Change</h2>
      
      <p>When you practice mindfulness meditation consistently, you're not just feeling calmer in the moment—you're actually changing the physical structure of your brain. Studies using MRI scans have shown several remarkable changes in the brains of long-term meditators:</p>
      
      <ul>
        <li><strong>Increased gray matter</strong> in the prefrontal cortex, associated with higher-order brain functions like awareness, concentration, and decision-making</li>
        <li><strong>Reduced size of the amygdala</strong>, the brain's alarm system associated with stress and fear responses</li>
        <li><strong>Enhanced connectivity</strong> between brain regions that process attention and emotion regulation</li>
      </ul>
      
      <h2>How Meditation Changes Your Brain</h2>
      
      <p>Even short periods of regular meditation practice (8 weeks of daily practice) can lead to measurable changes in brain structure and function. Here's how different mindfulness practices affect your brain:</p>
      
      <h3>Focused Attention Meditation</h3>
      
      <p>When you focus on your breath or a specific object, you're training the prefrontal cortex—strengthening neural networks associated with sustained attention and concentration. Each time your mind wanders and you bring it back, it's like doing a rep at the mental gym.</p>
      
      <h3>Open Monitoring Meditation</h3>
      
      <p>Practices that involve observing thoughts without attachment help create distance between stimuli and response. This strengthens connections between the prefrontal cortex and the limbic system, improving emotional regulation and reducing reactivity.</p>
      
      <h3>Loving-Kindness Meditation</h3>
      
      <p>Compassion-focused practices activate and strengthen circuits in the brain associated with empathy and positive emotions, particularly the insula and the anterior cingulate cortex.</p>
      
      <h2>Practical Applications of Neuroplasticity</h2>
      
      <p>Understanding neuroplasticity allows us to be more intentional about how we shape our brains:</p>
      
      <ol>
        <li><strong>Habit formation and breaking:</strong> Repeated thoughts and behaviors create neural pathways that become stronger over time. Mindfulness helps us observe unhelpful patterns and create new, healthier ones.</li>
        <li><strong>Stress resilience:</strong> Regular meditation strengthens the prefrontal cortex's ability to regulate the amygdala, improving our ability to respond to stress rather than react.</li>
        <li><strong>Cognitive enhancement:</strong> The improved attention and working memory that come from meditation practice can enhance learning, creativity, and problem-solving abilities.</li>
      </ol>
      
      <h2>Getting Started with Brain-Changing Meditation</h2>
      
      <p>To harness neuroplasticity through meditation:</p>
      
      <ul>
        <li><strong>Start small:</strong> Even 5-10 minutes daily can lead to measurable brain changes over time</li>
        <li><strong>Be consistent:</strong> Regular practice is more important than long sessions</li>
        <li><strong>Be patient:</strong> Neuroplastic changes take time—stick with it even when progress seems slow</li>
        <li><strong>Practice mindfulness throughout your day:</strong> Extend your meditation practice into daily activities</li>
      </ul>
      
      <h2>The Bottom Line</h2>
      
      <p>Your brain is constantly being shaped by your experiences and thoughts. Mindfulness meditation gives you a tool to actively participate in this process, helping you cultivate a brain that's wired for greater well-being, emotional balance, and cognitive performance.</p>
      
      <p>Remember that neuroplasticity works both ways—what you repeatedly do, think, and focus on shapes your brain. Choose mindfulness, and you choose to build a brain that supports your highest potential.</p>
    `,
    author: 'Dr. Sarah Johnson',
    date: 'April 2, 2025',
    readTime: '8 min read',
    category: 'Mental Health',
    image: '/lovable-uploads/7e575c2d-6979-450d-b7bd-502df750d57b.png',
    audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_942258089f.mp3?filename=let-it-go-12279.mp3'
  },
  {
    id: '2',
    title: 'The Science of Deep Breathing',
    excerpt: 'Explore how deep breathing techniques affect your nervous system and can help manage stress and anxiety.',
    content: `
      <h1>The Science of Deep Breathing</h1>
      <p>Deep breathing is one of the most powerful tools we have for regulating our nervous system and managing stress...</p>
      <h2>How Breathing Affects Your Body</h2>
      <p>Your breath is directly connected to your autonomic nervous system, which controls unconscious processes like heart rate...</p>
    `,
    author: 'Dr. Michael Chen',
    date: 'March 28, 2025',
    readTime: '6 min read',
    category: 'Stress Management',
    image: '/lovable-uploads/031154ed-69c2-4cb3-b86e-8c724f0e1364.png',
    audio: 'https://cdn.pixabay.com/download/audio/2021/04/07/audio_b687fabb42.mp3?filename=lofi-study-112191.mp3'
  },
  // Add more articles as needed
];

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Find the article by ID
    const foundArticle = articles.find(article => article.id === id);
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Reset reading progress when article changes
      setReadingProgress(0);
      window.scrollTo(0, 0);
    }

    // Set up scroll listener to track reading progress
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  if (!article) {
    return (
      <div className="container-custom py-20">
        <div className="flex items-center justify-center h-60">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Article not found</h2>
            <Link to="/articles" className="text-mindful hover:underline">
              Back to Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleBookmark = () => {
    toast({
      title: "Article saved",
      description: "This article has been added to your bookmarks.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Article link copied to clipboard.",
    });
  };

  const toggleAudioPlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Reading Progress */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Progress value={readingProgress} className="h-1 bg-gray-200 dark:bg-gray-700" />
      </div>
      
      <div className="container-custom pt-8 pb-20">
        {/* Back Button */}
        <Link 
          to="/articles" 
          className="inline-flex items-center text-gray-600 hover:text-mindful mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Articles
        </Link>
        
        {/* Article Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 font-raleway mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 gap-4 mb-6">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 mr-1" />
              <span>{article.category}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{article.readTime}</span>
            </div>
            <div>
              <span>{article.date}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="h-10 w-10 rounded-full bg-mindful/20 flex items-center justify-center text-mindful">
                {article.author.split(' ').map((n: string) => n[0]).join('')}
              </div>
            </div>
            <div>
              <p className="font-medium">{article.author}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mental Health Specialist</p>
            </div>
          </div>
        </div>
        
        {/* Audio Player Card */}
        <Card className="mb-8 border-none shadow-md bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="mb-2 font-medium">Listen to this article</div>
            <AudioPlayer
              src={article.audio}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="article-audio-player"
              layout="horizontal-reverse"
            />
          </CardContent>
        </Card>
        
        {/* Featured Image */}
        {article.image && (
          <div className="mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-md"
            />
          </div>
        )}
        
        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <article className="prose prose-lg max-w-none dark:prose-invert">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
            
            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Thank you!", description: "Your feedback is appreciated." })}>
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Helpful
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleBookmark}>
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {article.date}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="shadow-sm bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Related Articles</h3>
                  <div className="space-y-3">
                    {articles
                      .filter(a => a.id !== article.id)
                      .slice(0, 3)
                      .map(relatedArticle => (
                        <Link 
                          key={relatedArticle.id} 
                          to={`/article/${relatedArticle.id}`}
                          className="block group"
                        >
                          <div className="text-sm font-medium group-hover:text-mindful transition-colors">
                            {relatedArticle.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {relatedArticle.readTime}
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link to="/articles" className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-mindful/20 transition-colors">
                      Meditation
                    </Link>
                    <Link to="/articles" className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-mindful/20 transition-colors">
                      Mental Health
                    </Link>
                    <Link to="/articles" className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-mindful/20 transition-colors">
                      Neuroplasticity
                    </Link>
                    <Link to="/articles" className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm hover:bg-mindful/20 transition-colors">
                      Stress Management
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm bg-mindful/10 dark:bg-mindful/5">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discuss with AI
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Have questions about this article? Chat with our AI assistant.
                  </p>
                  <Link to="/ai-chat">
                    <Button className="w-full">
                      Start AI Chat
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
