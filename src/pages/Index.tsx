
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import RouteResults from '@/components/RouteResults';
import useSearch from '@/hooks/useSearch';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Plane, Train, Bus, Clock, DollarSign, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import type { Session } from '@supabase/supabase-js';

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  
  const { 
    isSearching, 
    searchPerformed, 
    results, 
    from, 
    to, 
    performSearch,
    bookJourney,
    isBooking,
    selectedJourneyId
  } = useSearch();

  useEffect(() => {
    // Check current auth status
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

  const handleGetStarted = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <main className="flex-grow">
        <HeroSection onSearch={performSearch} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {isSearching && (
            <div className="flex justify-center items-center my-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-10 w-10 rounded-full bg-travel-blue/50 mb-3"></div>
                <div className="text-travel-blue">Finding best routes for you...</div>
              </div>
            </div>
          )}

          {!isSearching && searchPerformed && (
            <RouteResults 
              journeys={results} 
              from={from} 
              to={to} 
              onBookJourney={bookJourney}
            />
          )}

          {!searchPerformed && (
            <div className="py-12">
              {/* Features Section */}
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Plan Your Journey with Confidence
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Sadak2Sky searches across multiple transport providers to find you the best routes, 
                  prices, and travel times for your journey.
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                <Card>
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <div className="h-12 w-12 rounded-full bg-travel-blue/10 flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-travel-blue" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Multi-Modal Routes</h3>
                    <p className="text-gray-600">
                      Combine flights, trains, buses and more to find the perfect journey for your needs.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <div className="h-12 w-12 rounded-full bg-travel-green/10 flex items-center justify-center mb-4">
                      <Clock className="h-6 w-6 text-travel-green" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Real-Time Updates</h3>
                    <p className="text-gray-600">
                      Get live updates on schedules, delays, and the latest availability for your journey.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex flex-col items-center text-center p-6">
                    <div className="h-12 w-12 rounded-full bg-travel-yellow/30 flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-travel-yellow" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Best Price Guarantee</h3>
                    <p className="text-gray-600">
                      We compare prices across hundreds of providers to ensure you get the best deal.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Document Scanning Section */}
              <div className="bg-white rounded-2xl p-8 shadow-md my-16">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                      Travel Document Management Made Simple
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                      Upload your travel documents, tickets, and itineraries to have all your travel information 
                      organized in one place. Get personalized travel suggestions based on your history.
                    </p>
                    <Button 
                      onClick={handleGetStarted}
                      className="bg-travel-blue hover:bg-travel-blue/90 text-white px-8 py-3 text-lg"
                    >
                      {session ? 'Go to Dashboard' : 'Get Started'}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
                        1
                      </div>
                      <h3 className="font-medium mb-2">Upload Documents</h3>
                      <p className="text-gray-600">Upload your travel tickets, bookings, and itineraries</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
                        2
                      </div>
                      <h3 className="font-medium mb-2">Get Organized</h3>
                      <p className="text-gray-600">All your travel information in one centralized place</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
                        3
                      </div>
                      <h3 className="font-medium mb-2">Travel Smarter</h3>
                      <p className="text-gray-600">Receive personalized travel suggestions and insights</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Options */}
              <div className="my-16">
                <h2 className="text-2xl font-semibold text-center mb-8">All Transport Options in One Place</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center flex-col">
                    <Plane className="h-8 w-8 text-travel-blue mb-2" />
                    <span className="font-medium">Flights</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center flex-col">
                    <Train className="h-8 w-8 text-travel-green mb-2" />
                    <span className="font-medium">Trains</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center flex-col">
                    <Bus className="h-8 w-8 text-travel-gray mb-2" />
                    <span className="font-medium">Buses</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center flex-col">
                    <Shield className="h-8 w-8 text-travel-yellow mb-2" />
                    <span className="font-medium">Local Transit</span>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-white rounded-2xl p-8 shadow-md my-16">
                <h2 className="text-2xl font-semibold text-center mb-8">How Sadak2Sky Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
                      1
                    </div>
                    <h3 className="font-medium mb-2">Enter Your Journey</h3>
                    <p className="text-gray-600">Tell us where you're starting from and where you want to go</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
                      2
                    </div>
                    <h3 className="font-medium mb-2">Compare Options</h3>
                    <p className="text-gray-600">We'll show you all possible routes with detailed information</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
                      3
                    </div>
                    <h3 className="font-medium mb-2">Book Your Journey</h3>
                    <p className="text-gray-600">Select your preferred option and book tickets directly</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="font-bold text-xl mb-2">Sadak2Sky</h3>
            <p className="text-gray-300 text-sm">Your Journey, Our Scan!</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>About</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4 text-sm">
                <span className="cursor-pointer">Twitter</span>
                <span className="cursor-pointer">Instagram</span>
                <span className="cursor-pointer">Facebook</span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 pt-6 mt-6 border-t border-gray-700 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Sadak2Sky. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
