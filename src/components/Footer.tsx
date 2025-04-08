import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent text-black shadow-md">
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-lg font-bold flex items-center">
          <span className="text-mindful">MS</span>
          <span className="ml-2">MindfulSpace</span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link to="/sleep" className="hover:text-mindful transition-colors">
            Sleep
          </Link>
          <Link to="/meditation" className="hover:text-mindful transition-colors">
            Meditation
          </Link>
          <Link to="/stress-and-anxiety" className="hover:text-mindful transition-colors">
            Stress & Anxiety
          </Link>
          <div className="group relative">
            <button className="hover:text-mindful transition-colors">Resources</button>
            {/* Dropdown */}
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md p-4 mt-2">
              <Link to="/journaling" className="block hover:text-mindful transition-colors">
                Journaling
              </Link>
              <Link to="/articles" className="block hover:text-mindful transition-colors mt-2">
                Articles
              </Link>
            </div>
          </div>
        </nav>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="apple-button-secondary">Login</button>
          <button className="apple-button">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
