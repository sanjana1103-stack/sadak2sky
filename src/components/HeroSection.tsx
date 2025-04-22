
import React from 'react';
import SearchForm from './SearchForm';
import { popularDestinations } from '@/lib/mockData';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onSearch: (from: string, to: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  // Define featured destinations with guaranteed image URLs
  const featuredDestinations = [
    {
      name: "Rishikesh",
      img: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80",
      description: "The Yoga Capital of the World"
    },
    {
      name: "Munnar",
      img: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80",
      description: "Beautiful Hill Station"
    },
    {
      name: "Goa",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80",
      description: "Beach Paradise"
    }
  ];
  
  return (
    <section className="relative">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-16 md:py-24 lg:py-32 max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            From Road to Sky<br className="sm:hidden" /> All in One Search
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Compare all transport options and find the perfect route from anywhere to everywhere
          </p>
        </div>

        {/* Search Form with shadow effect */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-xl">
            <SearchForm onSearch={onSearch} />
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-white text-xl font-semibold mb-6 flex items-center">
            <span className="bg-travel-blue h-5 w-1 rounded-full mr-2"></span>
            Featured Destinations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {featuredDestinations.map((destination, index) => (
              <div 
                key={`featured-${index}`}
                className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
                onClick={() => onSearch("Your Location", destination.name)}
              >
                <div 
                  className="h-64 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${destination.img})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 text-white">
                    <h4 className="text-xl font-bold mb-1">{destination.name}</h4>
                    <p className="text-sm text-white/80">{destination.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Popular Destinations */}
          <h3 className="text-white text-xl font-semibold mb-4 flex items-center">
            <span className="bg-travel-green h-5 w-1 rounded-full mr-2"></span>
            Popular Destinations
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {popularDestinations.map((destination, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform border border-white/10"
                onClick={() => onSearch("Your Location", destination.name)}
              >
                <div 
                  className="h-28 bg-cover bg-center"
                  style={{ backgroundImage: `url(${destination.img})` }}
                >
                  <div className="w-full h-full flex items-end bg-gradient-to-t from-black/70 to-transparent p-2">
                    <span className="text-white font-medium">{destination.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
