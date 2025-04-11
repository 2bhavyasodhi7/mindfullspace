
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ResourcesMenuProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

const ResourcesMenu: React.FC<ResourcesMenuProps> = ({ mobile = false, onItemClick }) => {
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  const handleItemClick = () => {
    if (onItemClick) {
      onItemClick();
    }
    setIsResourcesOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (mobile) {
    return (
      <div>
        <button 
          onClick={toggleResources}
          className="flex items-center text-gray-300 hover:text-white transition-colors w-full justify-between"
        >
          Resources {isResourcesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </button>
        
        {isResourcesOpen && (
          <div className="mt-2 pl-4 border-l-2 border-gray-700">
            <Link to="/journaling" className="block py-2 text-gray-300 hover:text-white" onClick={handleItemClick}>
              Journaling
            </Link>
            <Link to="/articles" className="block py-2 text-gray-300 hover:text-white" onClick={handleItemClick}>
              Articles
            </Link>
            <Link to="/yoga" className="block py-2 text-gray-300 hover:text-white" onClick={handleItemClick}>
              Yoga
            </Link>
            <Link to="/ai-chat" className="block py-2 text-gray-300 hover:text-white" onClick={handleItemClick}>
              AI Chat
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={toggleResources}
        className="flex items-center text-gray-300 hover:text-white transition-colors"
        aria-expanded={isResourcesOpen}
        aria-haspopup="true"
      >
        Resources {isResourcesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
      </button>
      
      {isResourcesOpen && (
        <div className="absolute mt-2 w-48 rounded-md shadow-lg py-1 z-10 dropdown-menu">
          <Link to="/journaling" className="block px-4 py-2 text-gray-300 hover:bg-green-800 hover:text-white">
            Journaling
          </Link>
          <Link to="/articles" className="block px-4 py-2 text-gray-300 hover:bg-green-800 hover:text-white">
            Articles
          </Link>
          <Link to="/yoga" className="block px-4 py-2 text-gray-300 hover:bg-green-800 hover:text-white">
            Yoga
          </Link>
          <Link to="/ai-chat" className="block px-4 py-2 text-gray-300 hover:bg-green-800 hover:text-white">
            AI Chat
          </Link>
        </div>
      )}
    </div>
  );
};

export default ResourcesMenu;
