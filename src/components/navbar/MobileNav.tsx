
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ResourcesMenu from './ResourcesMenu';
import ThemeToggle from './ThemeToggle';

const MobileNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if user is logged in (has profile image in localStorage)
  const isLoggedIn = localStorage.getItem('profileImage') !== null;
  const profileImage = localStorage.getItem('profileImage');

  return (
    <div className="md:hidden">
      <div className="flex items-center">
        <ThemeToggle />
        
        {isLoggedIn && (
          <Link to="/profile" className="mr-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={profileImage || undefined} />
              <AvatarFallback className="bg-mindful text-white">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Link>
        )}
        
        <button onClick={toggleMenu} className="text-gray-300 hover:text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-[#0c1420] py-4 px-4 border-t border-gray-800">
          <div className="flex flex-col space-y-4">
            <Link to="/sleep" className="text-gray-300 hover:text-white transition-colors" onClick={toggleMenu}>
              Sleep
            </Link>
            <Link to="/meditation" className="text-gray-300 hover:text-white transition-colors" onClick={toggleMenu}>
              Meditation
            </Link>
            <Link to="/stress-and-anxiety" className="text-gray-300 hover:text-white transition-colors" onClick={toggleMenu}>
              Stress & Anxiety
            </Link>
            
            {/* Mobile Resources Dropdown */}
            <ResourcesMenu mobile onItemClick={toggleMenu} />
            
            <div className="pt-4 flex space-x-4">
              {isLoggedIn ? (
                <Link to="/profile" className="flex-1" onClick={toggleMenu}>
                  <Button className="w-full bg-[#ffcc00] hover:bg-[#e6b800] text-[#0c1420] font-medium">Profile</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={toggleMenu}>
                    <Button className="w-full bg-[#ffcc00] hover:bg-[#e6b800] text-[#0c1420] font-medium">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
