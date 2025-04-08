
import React from 'react';

interface Guru {
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
}

const GuruSection = () => {
  const gurus: Guru[] = [
    {
      name: "Andrew Huberman",
      description: "Neuroscientist exploring the intersection of mindfulness and brain function, bringing scientific rigor to ancient practices.",
      imageUrl: "/images/Andrew Huberman.jpg",
      websiteUrl: "https://hubermanlab.com/"
    },
    {
      name: "Osho",
      description: "A revolutionary spiritual teacher who brought dynamic meditation techniques to the modern world.",
      imageUrl: "/images/osho.jpg",
      websiteUrl: "https://www.osho.com/"
    },
    {
      name: "Sadhguru",
      description: "Blending ancient yogic wisdom with contemporary understanding to offer practical solutions for modern life.",
      imageUrl: "/images/sadhguru.jpg",
      websiteUrl: "https://isha.sadhguru.org/"
    },
    {
      name: "Thich Nhat Hanh",
      description: "Vietnamese Zen Buddhist monk known for his mindfulness teachings and peaceful advocacy.",
      imageUrl: "/images/Thich Nhat Hanh.jpg",
      websiteUrl: "https://plumvillage.org/"
    },
    {
      name: "Dalai Lama",
      description: "Spiritual leader of Tibetan Buddhism who shares messages of compassion, peace, and mindfulness worldwide.",
      imageUrl: "/images/Dalai Lama.jpg",
      websiteUrl: "https://www.dalailama.com/"
    },
    {
      name: "Eckhart Tolle",
      description: "Spiritual teacher known for his messages about living in the present moment and finding inner peace.",
      imageUrl: "/images/Eckhart Tolle.jpg",
      websiteUrl: "https://eckharttolle.com/"
    }
  ];
  
  return (
    <section className="py-16 bg-white dark:bg-mindful3">
      <div className="container-custom">
        <h2 className="text-center text-4xl font-bold mb-12 font-raleway">
          <span className="text-mindful">Guru's</span> and The Science Behind
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {gurus.map((guru, index) => (
            <div key={index} className="rounded-card bg-mindful-lighter dark:bg-mindful3-light/20 overflow-hidden shadow-lg transition-all hover:shadow-xl group">
              <div className="h-56 overflow-hidden">
                <img 
                  src={guru.imageUrl} 
                  alt={guru.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-mindful3 dark:text-mindful2 mb-2">{guru.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{guru.description}</p>
                <a 
                  href={guru.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-mindful hover:text-mindful-dark dark:text-mindful2 dark:hover:text-mindful2-light transition-colors"
                >
                  Visit Website
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuruSection;
