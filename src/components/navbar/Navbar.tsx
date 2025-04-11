
import React from 'react';
import Logo from './Logo';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className="bg-[#0c1420] backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Brand */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
