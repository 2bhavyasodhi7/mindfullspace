
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Menu, X, ChevronDown, ChevronUp, User } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
  };

  // Check if user is logged in (has profile image in localStorage)
  const isLoggedIn = localStorage.getItem('profileImage') !== null;
  const profileImage = localStorage.getItem('profileImage');
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <nav className="bg-[#0c1420] backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <text x="12" y="16" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="currentColor" textAnchor="middle" dominantBaseline="middle">MS</text>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">MindfulSpace</span>
          </Link>

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
            <div className="relative">
              <button 
                onClick={toggleResources}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                Resources {isResourcesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              
              {isResourcesOpen && (
                <div className="absolute mt-2 w-48 bg-[#0c1420] rounded-md shadow-lg py-1 z-10 backdrop-blur-md border border-gray-700">
                  <Link to="/journaling" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                    Journaling
                  </Link>
                  <Link to="/articles" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                    Articles
                  </Link>
                  <Link to="/yoga" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                    Yoga
                  </Link>
                  <Link to="/ai-chat" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                    AI Chat
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">
                  {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0c1420] border border-gray-700 text-gray-300">
                <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-gray-800 hover:text-white">
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-gray-800 hover:text-white">
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-gray-800 hover:text-white">
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-gray-300 hover:bg-gray-800 hover:text-white">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profileImage || undefined} />
                      <AvatarFallback className="bg-mindful text-white">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#0c1420] border border-gray-700 text-gray-300">
                  <DropdownMenuItem asChild className="hover:bg-gray-800 hover:text-white">
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-gray-800 hover:text-white">
                    <Link to="/ai-chat">AI Chat</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    // Simple logout - clear localStorage
                    localStorage.removeItem('profileImage');
                    localStorage.removeItem('userName');
                    window.location.href = '/';
                  }} className="hover:bg-gray-800 hover:text-white">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#ffcc00] hover:bg-[#e6b800] text-[#0c1420] font-medium">CONTACT US</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">
                  {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-[#0c1420] border border-gray-700 text-gray-300">
                <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-gray-800 hover:text-white">
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-gray-800 hover:text-white">
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-gray-800 hover:text-white">
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
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
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0c1420] py-4 px-4 border-t border-gray-800">
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
            <div>
              <button 
                onClick={toggleResources}
                className="flex items-center text-gray-300 hover:text-white transition-colors w-full justify-between"
              >
                Resources {isResourcesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              
              {isResourcesOpen && (
                <div className="mt-2 pl-4 border-l-2 border-gray-700">
                  <Link to="/journaling" className="block py-2 text-gray-300 hover:text-white" onClick={toggleMenu}>
                    Journaling
                  </Link>
                  <Link to="/articles" className="block py-2 text-gray-300 hover:text-white" onClick={toggleMenu}>
                    Articles
                  </Link>
                  <Link to="/yoga" className="block py-2 text-gray-300 hover:text-white" onClick={toggleMenu}>
                    Yoga
                  </Link>
                  <Link to="/ai-chat" className="block py-2 text-gray-300 hover:text-white" onClick={toggleMenu}>
                    AI Chat
                  </Link>
                </div>
              )}
            </div>
            
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
    </nav>
  );
};

export default Navbar;
