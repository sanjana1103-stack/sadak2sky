
import React from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Menu, Search, User } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 py-4 px-4 md:px-8 bg-white/80 backdrop-blur-lg border-b border-gray-200 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Globe className="h-6 w-6 text-travel-blue" />
        <span className="text-xl font-bold text-gray-900">Travel Scanner</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-6">
        <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">Home</Button>
        <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">Explore</Button>
        <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">My Trips</Button>
        <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">Help</Button>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Search size={20} />
        </Button>
        <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2 border-travel-blue text-travel-blue hover:bg-travel-blue/10">
          <User size={18} />
          <span>Sign In</span>
        </Button>
        <Button variant="ghost" size="icon" className="md:hidden text-gray-600">
          <Menu size={24} />
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
