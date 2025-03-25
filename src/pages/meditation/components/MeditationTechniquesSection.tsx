
import React from 'react';
import { BookOpen } from 'lucide-react';

interface MeditationTechnique {
  title: string;
  description: string;
  image: string;
}

interface Article {
  title: string;
  url: string;
}

interface MeditationTechniquesSectionProps {
  meditationTechniques: MeditationTechnique[];
  articles: Article[];
}

const MeditationTechniquesSection: React.FC<MeditationTechniquesSectionProps> = ({
  meditationTechniques,
  articles
}) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="grid gap-6 mb-8">
        {meditationTechniques.map((technique, index) => (
          <div 
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <img 
              src={technique.image}
              alt={technique.title}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 p-6 flex flex-col justify-end">
              <h4 className="text-white text-xl font-semibold mb-2 nike-headline">{technique.title}</h4>
              <p className="text-white/80 text-sm nike-body-text">{technique.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-6">
        <h4 className="text-xl font-semibold text-mindful-dark mb-4 nike-headline">Related Articles</h4>
        <div className="grid gap-4">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-mindful-lighter rounded-lg hover:bg-mindful-light transition-colors"
            >
              <BookOpen className="w-5 h-5 text-mindful-dark" />
              <span className="text-mindful-dark hover:text-mindful-darker transition-colors">
                {article.title}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeditationTechniquesSection;
