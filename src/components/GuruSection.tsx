
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
      imageUrl: "images/sadhguru.jpg",
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
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container-custom">
        <h2 className="text-center mindful-heading">
          <span className="text-mindful">Guru's</span> and The Science Behind
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {gurus.map((guru, index) => (
            <div key={index} className="guru-card">
              <img src={guru.imageUrl} alt={guru.name} className="guru-image" />
              <div className="guru-content">
                <h3 className="guru-name">{guru.name}</h3>
                <p className="guru-description">{guru.description}</p>
                <a 
                  href={guru.websiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-mindful hover:underline"
                >
                  Visit Website
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
