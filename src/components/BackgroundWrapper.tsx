
import React from 'react';

interface BackgroundWrapperProps {
  children: React.ReactNode;
}

const BackgroundWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat blur-md brightness-[0.7] z-[-1]"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/a1314a15-4c8e-4926-b612-c4fd49cfb57d.png")',
          filter: 'blur(8px)',
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default BackgroundWrapper;
