
import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import RouteResults from '@/components/RouteResults';
import useSearch from '@/hooks/useSearch';
import FeaturesSection from '@/components/home/FeaturesSection';
import DocumentSection from '@/components/home/DocumentSection';
import TransportSection from '@/components/home/TransportSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import Footer from '@/components/home/Footer';

const Index = () => {
  const { 
    isSearching, 
    searchPerformed, 
    results, 
    from, 
    to, 
    performSearch,
    bookJourney,
  } = useSearch();

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
            <>
              <FeaturesSection />
              <DocumentSection />
              <TransportSection />
              <HowItWorksSection />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
