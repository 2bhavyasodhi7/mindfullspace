
import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Bookmark, Heart, Share, Clock, Headphones, ZoomIn, ZoomOut } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Articles = () => {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState('normal');
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [activeArticle, setActiveArticle] = useState<string | null>(null);

  const articles = [
    {
      id: "1",
      title: "The Science of Mindful Breathing",
      category: "Science",
      readTime: "5 min",
      snippet: "Discover how controlled breathing techniques can reduce stress and anxiety by activating your parasympathetic nervous system.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      readCount: 1243,
      likePercentage: 92
    },
    {
      id: "2",
      title: "5-Minute Grounding Techniques",
      category: "Practical",
      readTime: "3 min",
      snippet: "Quick and effective methods to ground yourself during moments of stress or anxiety, perfect for busy schedules.",
      image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1lZGl0YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      readCount: 956,
      likePercentage: 88
    },
    {
      id: "3",
      title: "How Mindfulness Rewires Your Brain",
      category: "Science",
      readTime: "8 min",
      snippet: "The latest neuroscience research reveals how consistent mindfulness practice creates lasting changes in brain structure and function.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJhaW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      readCount: 2105,
      likePercentage: 94
    },
    {
      id: "4",
      title: "My Journey Through Anxiety",
      category: "Personal Story",
      readTime: "6 min",
      snippet: "A personal account of overcoming chronic anxiety through mindfulness, meditation, and lifestyle changes.",
      image: "https://images.unsplash.com/photo-1531951634065-9c4cdaaa5d33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFueGlldHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      readCount: 1876,
      likePercentage: 96
    },
    {
      id: "5",
      title: "The Body Scan Meditation Guide",
      category: "Practical",
      readTime: "4 min",
      snippet: "Learn how to perform a body scan meditation, a powerful technique for relaxation and increasing bodily awareness.",
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJlbGF4YXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      readCount: 1452,
      likePercentage: 90
    },
    {
      id: "6",
      title: "Mindful Eating: Taste Every Bite",
      category: "Lifestyle",
      readTime: "5 min",
      snippet: "Transform your relationship with food by practicing mindful eating, focusing on taste, texture, and gratitude.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhbHRoeSUyMGZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
      readCount: 1187,
      likePercentage: 87
    }
  ];

  const saveArticle = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(articleId => articleId !== id));
      toast({
        title: "Article removed from library",
        description: "Successfully removed from your saved articles",
      });
    } else {
      setSavedArticles([...savedArticles, id]);
      toast({
        title: "Article saved to library",
        description: "You can find this article in your saved collection",
      });
    }
  };

  const shareArticle = (title: string) => {
    navigator.clipboard.writeText(`Check out this article on MindfulSpace: "${title}"`);
    toast({
      title: "Link copied to clipboard",
      description: "Share this article with friends and family",
    });
  };

  const playAudio = (title: string) => {
    toast({
      title: "Audio narration starting",
      description: `Now playing: ${title}`,
    });
  };

  const toggleFontSize = () => {
    setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'small' : 'normal');
  };

  const handleReadArticle = (id: string) => {
    setActiveArticle(id);
  };
  
  const FontSizeButton = () => {
    return (
      <Button variant="outline" size="icon" onClick={toggleFontSize} className="ml-2">
        {fontSize === 'large' ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
      </Button>
    );
  };

  // Full article content for demo
  const articleContent = `
    <h2>Introduction</h2>
    <p>Mindfulness is the practice of being fully present and engaged in the moment, aware of your thoughts and feelings without distraction or judgment. It's about paying attention to our thoughts, feelings, bodily sensations, and surrounding environment.</p>
    
    <h2>The Science Behind Mindfulness</h2>
    <p>Research shows that mindfulness practices can help reduce stress, anxiety, and depression. Regular mindfulness meditation has been linked to changes in the brain's structure and function, particularly in areas associated with attention and emotion regulation.</p>
    
    <p>Studies have found that mindfulness can:</p>
    <ul>
      <li>Reduce rumination (repetitive negative thinking)</li>
      <li>Decrease stress reactivity</li>
      <li>Improve working memory</li>
      <li>Enhance cognitive flexibility</li>
      <li>Boost immune function</li>
    </ul>
    
    <h2>Practical Mindfulness Techniques</h2>
    <p>Here are some simple ways to incorporate mindfulness into your daily life:</p>
    
    <h3>1. Mindful Breathing</h3>
    <p>Take a few minutes to focus solely on your breath. Notice the sensation of air flowing in and out of your lungs. When your mind wanders (which is natural), gently bring your attention back to your breath.</p>
    
    <h3>2. Body Scan</h3>
    <p>Starting from your toes and moving up to your head, pay attention to each part of your body. Notice any sensations, tension, or discomfort without trying to change anything.</p>
    
    <h3>3. Mindful Observation</h3>
    <p>Choose an object in your environment and focus all your attention on observing it. Notice its colors, textures, shapes, and other details.</p>
    
    <h2>Integrating Mindfulness Into Daily Life</h2>
    <p>Mindfulness doesn't have to be limited to formal meditation. You can practice it while:</p>
    <ul>
      <li>Eating (paying attention to flavors and textures)</li>
      <li>Walking (noticing the sensation of your feet touching the ground)</li>
      <li>Listening (giving someone your full attention)</li>
      <li>Working (focusing completely on one task at a time)</li>
    </ul>
    
    <p>Remember, mindfulness is a skill that develops with practice. Start with short periods and gradually extend your practice as you become more comfortable.</p>
  `;

  return (
    <div className="container-custom mindful-section">
      <h1 className="mindful-heading text-left">Mindfulness <span className="text-mindful">Articles</span></h1>
      <p className="mindful-subheading text-left mb-8">
        Explore our collection of expert-written articles on mindfulness, meditation, and well-being.
      </p>

      {activeArticle ? (
        <div className={`font-${fontSize} mb-12`}>
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={() => setActiveArticle(null)}>
              Back to Articles
            </Button>
            <div className="flex">
              <Button variant="outline" size="icon" onClick={() => playAudio(articles.find(a => a.id === activeArticle)?.title || "")}>
                <Headphones className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => saveArticle(activeArticle)}
                className={`ml-2 ${savedArticles.includes(activeArticle) ? 'bg-mindful text-white' : ''}`}
              >
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => shareArticle(articles.find(a => a.id === activeArticle)?.title || "")} className="ml-2">
                <Share className="h-4 w-4" />
              </Button>
              <FontSizeButton />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">{articles.find(a => a.id === activeArticle)?.title}</h2>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span className="flex items-center mr-4">
              <Clock className="h-4 w-4 mr-1" />
              {articles.find(a => a.id === activeArticle)?.readTime} read
            </span>
            <Badge variant="outline" className="mr-4">
              {articles.find(a => a.id === activeArticle)?.category}
            </Badge>
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1 text-red-500" />
              {articles.find(a => a.id === activeArticle)?.likePercentage}% found this helpful
            </span>
          </div>

          <div className="relative h-72 w-full mb-8 rounded-lg overflow-hidden">
            <img 
              src={articles.find(a => a.id === activeArticle)?.image} 
              alt={articles.find(a => a.id === activeArticle)?.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />

          <Separator className="my-8" />

          <div className="bg-mindful-lighter rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-mindful-dark mb-4">Reflection Questions</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">1. How might you incorporate this mindfulness practice into your daily routine?</p>
            <p className="text-gray-700 dark:text-gray-300">2. What barriers have prevented you from practicing mindfulness in the past, and how could you overcome them?</p>
            <Button className="mt-4 bg-mindful hover:bg-mindful-dark">Add to Journal</Button>
          </div>

          <div className="flex justify-between items-center mt-8">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Was this article helpful?</p>
              <div className="flex mt-2">
                <Button variant="outline" size="sm" className="mr-2">Yes</Button>
                <Button variant="outline" size="sm">No</Button>
              </div>
            </div>
            <div>
              <Button 
                onClick={() => saveArticle(activeArticle)}
                className={`${savedArticles.includes(activeArticle) ? 'bg-mindful hover:bg-mindful-dark' : 'bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'}`}
              >
                {savedArticles.includes(activeArticle) ? 'Saved to Library' : 'Save to Library'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all" className="data-[state=active]:bg-mindful data-[state=active]:text-white">All Articles</TabsTrigger>
                <TabsTrigger value="science" className="data-[state=active]:bg-mindful data-[state=active]:text-white">Science</TabsTrigger>
                <TabsTrigger value="practical" className="data-[state=active]:bg-mindful data-[state=active]:text-white">Practical</TabsTrigger>
                <TabsTrigger value="stories" className="data-[state=active]:bg-mindful data-[state=active]:text-white">Personal Stories</TabsTrigger>
                <TabsTrigger value="saved" className="data-[state=active]:bg-mindful data-[state=active]:text-white">Saved</TabsTrigger>
              </TabsList>
              
              <div className="hidden md:flex items-center">
                <Button variant="outline" size="sm" className="mr-2">
                  <Clock className="h-4 w-4 mr-2" />
                  Quick Reads
                </Button>
                <Button variant="outline" size="sm" className="mr-2">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Most Popular
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48 w-full">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} read
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {article.snippet}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {article.readCount} reads
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => saveArticle(article.id)}
                          className={savedArticles.includes(article.id) ? 'text-mindful' : ''}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleReadArticle(article.id)} 
                          className="ml-2"
                        >
                          Read Article
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="science" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.filter(article => article.category === "Science").map((article) => (
                  // Same card structure as above
                  <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48 w-full">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} read
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {article.snippet}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {article.readCount} reads
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => saveArticle(article.id)}
                          className={savedArticles.includes(article.id) ? 'text-mindful' : ''}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleReadArticle(article.id)} 
                          className="ml-2"
                        >
                          Read Article
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="practical" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.filter(article => article.category === "Practical").map((article) => (
                  // Same card structure
                  <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48 w-full">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} read
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {article.snippet}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {article.readCount} reads
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => saveArticle(article.id)}
                          className={savedArticles.includes(article.id) ? 'text-mindful' : ''}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleReadArticle(article.id)} 
                          className="ml-2"
                        >
                          Read Article
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stories" className="focus:outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.filter(article => article.category === "Personal Story").map((article) => (
                  // Same card structure
                  <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48 w-full">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} read
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                        {article.snippet}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {article.readCount} reads
                      </div>
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => saveArticle(article.id)}
                          className={savedArticles.includes(article.id) ? 'text-mindful' : ''}
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleReadArticle(article.id)} 
                          className="ml-2"
                        >
                          Read Article
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="saved" className="focus:outline-none">
              {savedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.filter(article => savedArticles.includes(article.id)).map((article) => (
                    // Same card structure
                    <Card key={article.id} className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="relative h-48 w-full">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2 bg-white text-gray-800">
                          {article.category}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime} read
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {article.snippet}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between pt-0">
                        <div className="flex items-center text-sm text-gray-500">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {article.readCount} reads
                        </div>
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => saveArticle(article.id)}
                            className="text-mindful"
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleReadArticle(article.id)} 
                            className="ml-2"
                          >
                            Read Article
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No saved articles yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Articles you save will appear here for easy access.</p>
                  <Button 
                    onClick={() => document.querySelector('button[data-value="all"]')?.click()} 
                    variant="outline"
                  >
                    Browse Articles
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-mindful-lighter rounded-lg p-6">
            <h2 className="text-xl font-bold text-mindful-dark mb-4">Your Reading Progress</h2>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="w-16 h-16 rounded-full bg-mindful flex items-center justify-center text-white text-xl font-bold">
                  2/6
                </div>
                <div className="ml-4">
                  <p className="font-medium">Articles Read This Week</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Keep exploring to earn badges!</p>
                </div>
              </div>
              <div className="flex">
                <Badge variant="outline" className="mr-2 bg-white">Beginner Reader</Badge>
                <Button className="bg-mindful hover:bg-mindful-dark">View All Progress</Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Articles;
