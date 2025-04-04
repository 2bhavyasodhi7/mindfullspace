
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Headphones, XCircle } from 'lucide-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { defaultControlsSection, defaultProgressBarSection, audioPlayerStyles } from '@/utils/audioPlayerUtils';

interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  audioUrl: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([
    {
      id: '1',
      title: 'The Benefits of Daily Meditation',
      content: 'Meditation can significantly reduce stress and improve focus...',
      imageUrl: 'src/pages/images/m1.jpg',
      audioUrl: 'src/pages/audio/meditation-audio.mp3'
    },
    {
      id: '2',
      title: 'Understanding Anxiety and How to Manage It',
      content: 'Anxiety is a common issue, but there are effective ways to manage it...',
      imageUrl: 'src/pages/images/m2.jpg',
      audioUrl: 'src/pages/audio/anxiety-audio.mp3'
    },
    {
      id: '3',
      title: 'Improving Sleep Quality for Better Health',
      content: 'Quality sleep is crucial for overall health and well-being...',
      imageUrl: 'src/pages/images/m3.jpg',
      audioUrl: 'src/pages/audio/sleep-audio.mp3'
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  useEffect(() => {
    const results = articles.filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(results);
  }, [searchTerm, articles]);

  return (
    <section className="container-custom py-12">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold nike-headline">Explore Our Articles</h1>
        <div className="w-64">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map(article => (
          <div key={article.id} className="rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2 nike-headline">{article.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 nike-body-text">{article.content.substring(0, 100)}...</p>
              
              {activeAudio === article.id ? (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-mindful">Audio Narration</h3>
                    <button 
                      onClick={() => setActiveAudio(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                  <AudioPlayer
                    src={article.audioUrl}
                    showJumpControls={true}
                    layout="stacked-reverse"
                    customControlsSection={defaultControlsSection}
                    customProgressBarSection={defaultProgressBarSection}
                    className="audio-player-custom rounded-md"
                    style={audioPlayerStyles}
                  />
                </div>
              ) : null}
              
              <div className="flex justify-between items-center">
                <Button 
                  onClick={() => setActiveAudio(activeAudio === article.id ? null : article.id)} 
                  className="bg-mindful hover:bg-mindful-dark text-white nike-button"
                >
                  <Headphones className="mr-2" size={16} />
                  Listen
                </Button>
                <Link to={`/article/${article.id}`} className="text-mindful hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Articles;
