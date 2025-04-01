
import React, { useState } from 'react';
import JourneyCard from './JourneyCard';
import { Journey } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter, ArrowDownUp, Clock, DollarSign, ThumbsUp } from 'lucide-react';

interface RouteResultsProps {
  journeys: Journey[];
  from: string;
  to: string;
}

const RouteResults: React.FC<RouteResultsProps> = ({ journeys, from, to }) => {
  const [filteredJourneys, setFilteredJourneys] = useState<Journey[]>(journeys);
  const [sortBy, setSortBy] = useState<string>("recommended");
  
  const handleSort = (value: string) => {
    if (!value) return;
    
    setSortBy(value);
    let sorted = [...journeys];
    
    if (value === "price") {
      sorted = sorted.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (value === "duration") {
      sorted = sorted.sort((a, b) => {
        const durationA = parseInt(a.totalDuration.split('h')[0]);
        const durationB = parseInt(b.totalDuration.split('h')[0]);
        return durationA - durationB;
      });
    } else {
      // Recommended - sort by bestFor
      sorted = sorted.sort((a) => a.bestFor === "recommended" ? -1 : 0);
    }
    
    setFilteredJourneys(sorted);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Travel options from {from} to {to}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {filteredJourneys.length} routes found • {new Date().toLocaleDateString()}
        </p>
      </div>
      
      {/* Sorting and Filtering */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div className="flex items-center">
          <Filter size={18} className="text-gray-500 mr-2" />
          <span className="text-sm font-medium">Sort by:</span>
        </div>
        
        <ToggleGroup type="single" value={sortBy} onValueChange={handleSort} className="bg-gray-100 p-1 rounded-lg">
          <ToggleGroupItem value="recommended" className="data-[state=on]:bg-white data-[state=on]:text-travel-blue rounded-md">
            <ThumbsUp size={16} className="mr-1" />
            <span className="hidden sm:inline">Recommended</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="duration" className="data-[state=on]:bg-white data-[state=on]:text-travel-blue rounded-md">
            <Clock size={16} className="mr-1" />
            <span className="hidden sm:inline">Fastest</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="price" className="data-[state=on]:bg-white data-[state=on]:text-travel-blue rounded-md">
            <DollarSign size={16} className="mr-1" />
            <span className="hidden sm:inline">Cheapest</span>
          </ToggleGroupItem>
        </ToggleGroup>
        
        <Button variant="outline" size="sm" className="text-sm text-gray-600">
          <ArrowDownUp size={16} className="mr-2" />
          Filters
        </Button>
      </div>
      
      {/* Journey Cards */}
      <div className="space-y-4">
        {filteredJourneys.map((journey) => (
          <JourneyCard key={journey.id} journey={journey} />
        ))}
      </div>
    </div>
  );
};

export default RouteResults;
