
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
    <nav className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-mindful">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <span className="text-xl font-bold">MindfulSpace</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/sleep" className="text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors">
              Sleep
            </Link>
            <Link to="/meditation" className="text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors">
              Meditation
            </Link>
            <Link to="/stress-and-anxiety" className="text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors">
              Stress & Anxiety
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleResources}
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors"
              >
                Resources {isResourcesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              
              {isResourcesOpen && (
                <div className="absolute mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <Link to="/journaling" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Journaling
                  </Link>
                  <Link to="/rewards" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Rewards
                  </Link>
                  <Link to="/articles" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Articles
                  </Link>
                  <Link to="/yoga" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Yoga
                  </Link>
                  <Link to="/ai-chat" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
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
                <Button variant="outline" size="icon">
                  {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profileImage || undefined} />
                      <AvatarFallback className="bg-mindful text-white">
                        {userName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">{userName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/ai-chat">AI Chat</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    // Simple logout - clear localStorage
                    localStorage.removeItem('profileImage');
                    localStorage.removeItem('userName');
                    window.location.href = '/';
                  }}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-mindful hover:bg-mindful-dark">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="mr-2">
                  {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
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
            
            <button onClick={toggleMenu} className="text-gray-700 dark:text-gray-200">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link to="/sleep" className="text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors" onClick={toggleMenu}>
              Sleep
            </Link>
            <Link to="/meditation" className="text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors" onClick={toggleMenu}>
              Meditation
            </Link>
            <Link to="/stress-and-anxiety" className="text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors" onClick={toggleMenu}>
              Stress & Anxiety
            </Link>
            
            {/* Mobile Resources Dropdown */}
            <div>
              <button 
                onClick={toggleResources}
                className="flex items-center text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful transition-colors w-full justify-between"
              >
                Resources {isResourcesOpen ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
              
              {isResourcesOpen && (
                <div className="mt-2 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  <Link to="/journaling" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful" onClick={toggleMenu}>
                    Journaling
                  </Link>
                  <Link to="/rewards" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful" onClick={toggleMenu}>
                    Rewards
                  </Link>
                  <Link to="/articles" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful" onClick={toggleMenu}>
                    Articles
                  </Link>
                  <Link to="/yoga" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful" onClick={toggleMenu}>
                    Yoga
                  </Link>
                  <Link to="/ai-chat" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-mindful dark:hover:text-mindful" onClick={toggleMenu}>
                    AI Chat
                  </Link>
                </div>
              )}
            </div>
            
            <div className="pt-4 flex space-x-4">
              {isLoggedIn ? (
                <Link to="/profile" className="flex-1" onClick={toggleMenu}>
                  <Button className="w-full bg-mindful hover:bg-mindful-dark">Profile</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="flex-1" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" className="flex-1" onClick={toggleMenu}>
                    <Button className="w-full bg-mindful hover:bg-mindful-dark">Sign Up</Button>
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
