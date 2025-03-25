
import React, { ReactNode } from 'react';

interface FeatureButtonProps {
  icon: ReactNode;
  title: string;
  isActive: boolean;
  onClick: () => void;
  hoverContent: {
    image: string;
    title: string;
    description: string;
  };
}

const FeatureButton: React.FC<FeatureButtonProps> = ({
  icon,
  title,
  isActive,
  onClick,
  hoverContent,
}) => {
  return (
    <div className="relative group mb-8">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        {icon}
        <span className="font-medium text-mindful">{title}</span>
      </button>
      <div className="opacity-0 group-hover:opacity-100 absolute top-full left-0 mt-4 w-full bg-white p-6 rounded-xl shadow-xl transition-opacity duration-300 z-10">
        <div className="flex gap-4">
          <img 
            src={hoverContent.image}
            alt={hoverContent.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="text-left">
            <h3 className="font-semibold text-mindful-dark mb-2">{hoverContent.title}</h3>
            <p className="text-mindful text-sm">
              {hoverContent.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureButton;
