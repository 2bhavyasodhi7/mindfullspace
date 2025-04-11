
import React from 'react';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background image with blur */}
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: 'url("/lovable-uploads/0b7ddbc8-b2ee-4c59-a8cf-3632faecedb1.png")',
          filter: 'blur(8px)',
          opacity: 0.2,
          backgroundSize: 'cover'
        }}
      />
      
      {/* Content layer above the blurred background */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundWrapper;
