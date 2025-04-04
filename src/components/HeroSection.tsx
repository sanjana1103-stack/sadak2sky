
import React from 'react';
import SearchForm from './SearchForm';
import { popularDestinations } from '@/lib/mockData';

interface HeroSectionProps {
  onSearch: (from: string, to: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  return (
    <section className="relative">
      {/* Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1908&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
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

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <SearchForm onSearch={onSearch} />
        </div>

        {/* Popular Destinations */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-white text-xl font-semibold mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {popularDestinations.map((destination, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                onClick={() => onSearch("Your Location", destination.name)}
              >
                <div 
                  className="h-24 bg-cover bg-center"
                  style={{ backgroundImage: `url(${destination.img})` }}
                >
                  <div className="w-full h-full flex items-end bg-gradient-to-t from-black/60 to-transparent p-2">
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
