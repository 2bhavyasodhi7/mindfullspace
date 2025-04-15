
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMediaQuery } from "../hooks/use-mobile";

interface Guru {
  id: number;
  name: string;
  image: string;
  description: string;
}

const gurus: Guru[] = [
  {
    id: 1,
    name: "Sadhguru",
    image: "/images/sadhguru.jpg",
    description: "Founder of Isha Foundation, Sadhguru is a yogi and visionary who has touched millions of lives worldwide through his transformational programs."
  },
  {
    id: 2,
    name: "Thich Nhat Hanh",
    image: "/images/Thich Nhat Hanh.jpg",
    description: "A Vietnamese Zen Buddhist monk, peace activist, and author known for teaching mindfulness with clarity and joy."
  },
  {
    id: 3,
    name: "Eckhart Tolle",
    image: "/images/Eckhart Tolle.jpg",
    description: "Spiritual teacher and author of 'The Power of Now,' Tolle emphasizes the importance of living in the present moment."
  },
  {
    id: 4,
    name: "Dalai Lama",
    image: "/images/Dalai Lama.jpg",
    description: "The 14th Dalai Lama, Tenzin Gyatso, is the spiritual leader of Tibet and a global advocate for peace, compassion, and mindfulness."
  },
  {
    id: 5,
    name: "Andrew Huberman",
    image: "/images/Andrew Huberman.jpg", 
    description: "Neuroscientist and professor at Stanford University who teaches about the science of meditation and breathing techniques."
  },
  {
    id: 6,
    name: "Osho",
    image: "/images/osho.jpg",
    description: "A controversial spiritual leader who created dynamic meditation techniques and emphasized living life fully and consciously."
  }
];

const GuruCardSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const cardsToShow = isMobile ? 1 : 3;
  
  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex > 0 ? prevIndex - 1 : gurus.length - cardsToShow
    );
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => 
      prevIndex < gurus.length - cardsToShow ? prevIndex + 1 : 0
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const visibleGurus = gurus.slice(currentIndex, currentIndex + cardsToShow);
  if (visibleGurus.length < cardsToShow) {
    const remaining = cardsToShow - visibleGurus.length;
    visibleGurus.push(...gurus.slice(0, remaining));
  }

  return (
    <div className="relative w-full py-6 overflow-hidden">
      <div
        ref={containerRef}
        className="flex items-center justify-center gap-4 transition-transform duration-300 ease-in-out"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {visibleGurus.map((guru) => (
          <Card 
            key={guru.id} 
            className="w-full max-w-xs bg-gradient-to-br from-teal-100 to-blue-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 flex-shrink-0 animate-fade-in"
          >
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-teal-200">
                <img
                  src={guru.image}
                  alt={guru.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-teal-800 mb-2">{guru.name}</h3>
              <p className="text-gray-700 text-center text-sm leading-relaxed">{guru.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button 
          onClick={handlePrev} 
          variant="outline" 
          size="icon" 
          className="rounded-full border-teal-300 bg-white text-teal-700 hover:bg-teal-50 hover:text-teal-800 shadow-sm"
          disabled={isTransitioning}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button 
          onClick={handleNext} 
          variant="outline" 
          size="icon"
          className="rounded-full border-teal-300 bg-white text-teal-700 hover:bg-teal-50 hover:text-teal-800 shadow-sm"
          disabled={isTransitioning}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GuruCardSwiper;
