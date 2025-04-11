
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
          backgroundImage: 'url("/lovable-uploads/96bbf7e5-56e0-4dfc-885b-03073da3c3d3.png")',
          filter: 'blur(8px)',
          opacity: 0.7,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
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
