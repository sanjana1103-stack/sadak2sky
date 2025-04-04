
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, Menu, Search, User, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

const NavBar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 py-4 px-4 md:px-8 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-travel-blue" />
          <span className="text-xl font-bold text-gray-900">Sadak2Sky</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/">
            <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">Home</Button>
          </Link>
          {session && (
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">Dashboard</Button>
            </Link>
          )}
          <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">Explore</Button>
          {session && (
            <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">My Trips</Button>
          )}
          <Button variant="ghost" className="text-gray-600 hover:text-travel-blue">Help</Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-gray-600">
            <Search size={20} />
          </Button>
          
          {session ? (
            <div className="flex items-center space-x-3">
              <Link to="/dashboard">
                <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2 border-travel-blue text-travel-blue hover:bg-travel-blue/10">
                  <User size={18} />
                  <span>Dashboard</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                className="hidden md:flex text-gray-600"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="hidden md:flex items-center space-x-2 border-travel-blue text-travel-blue hover:bg-travel-blue/10">
                <LogIn size={18} />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-gray-600"
            onClick={toggleMobileMenu}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-gray-100">
          <div className="flex flex-col space-y-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-gray-600">Home</Button>
            </Link>
            {session && (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-gray-600">Dashboard</Button>
              </Link>
            )}
            <Button variant="ghost" className="w-full justify-start text-gray-600">Explore</Button>
            {session && (
              <Button variant="ghost" className="w-full justify-start text-gray-600">My Trips</Button>
            )}
            <Button variant="ghost" className="w-full justify-start text-gray-600">Help</Button>
            
            {session ? (
              <Button 
                variant="ghost"
                className="w-full justify-start text-gray-600"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-travel-blue hover:bg-travel-blue/90 text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
