
import React from 'react';
import { Link } from 'react-router-dom';
import ResourcesMenu from './ResourcesMenu';
import ThemeToggle from './ThemeToggle';
import UserMenu from './UserMenu';

const DesktopNav = () => {
  return (
    <>
      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/sleep" className="text-gray-300 hover:text-white transition-colors">
          Sleep
        </Link>
        <Link to="/meditation" className="text-gray-300 hover:text-white transition-colors">
          Meditation
        </Link>
        <Link to="/stress-and-anxiety" className="text-gray-300 hover:text-white transition-colors">
          Stress & Anxiety
        </Link>

        {/* Resources Dropdown */}
        <ResourcesMenu />
      </div>

      {/* Right side - Theme toggle and Auth */}
      <div className="hidden md:flex items-center space-x-4">
        <ThemeToggle />
        <UserMenu />
      </div>
    </>
  );
};

export default DesktopNav;
