
import { useState } from 'react';
import { mockJourneys, popularFromLocations, popularToLocations, Journey } from '@/lib/mockData';
import { toast } from '@/components/ui/use-toast';

const useSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [filteredResults, setFilteredResults] = useState<Journey[]>(mockJourneys);
  
  // Added new states for booking functionality
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const performSearch = (fromLocation: string, toLocation: string) => {
    setIsSearching(true);
    setFrom(fromLocation);
    setTo(toLocation);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Create dynamic search results based on the entered locations
      let results: Journey[] = [];
      
      // Generate at least 5-10 dynamic results for any search
      const numResults = 5 + Math.floor(Math.random() * 5); // 5-10 results
      
      for (let i = 0; i < numResults; i++) {
        // Create a random journey template
        const baseJourney = mockJourneys[Math.floor(Math.random() * mockJourneys.length)];
        
        // Adjust price randomly (±20%)
        const priceAdjustment = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
        const newPrice = Math.round(baseJourney.totalPrice * priceAdjustment);
        
        // Adjust duration randomly
        const baseDurationHours = parseInt(baseJourney.totalDuration.split('h')[0]);
        const baseDurationMins = parseInt(baseJourney.totalDuration.split('h')[1]?.split('m')[0] || '0');
        const totalBaseMins = baseDurationHours * 60 + baseDurationMins;
        const newTotalMins = totalBaseMins * (0.9 + (Math.random() * 0.3)); // ±20%
        const newDurationHours = Math.floor(newTotalMins / 60);
        const newDurationMins = Math.round(newTotalMins % 60);
        const newDuration = `${newDurationHours}h ${newDurationMins}m`;
        
        // Create journey with customized segments
        const newJourney: Journey = {
          ...baseJourney,
          id: `dynamic-${Math.random().toString(36).substring(2, 9)}`,
          from: fromLocation,
          to: toLocation,
          totalPrice: newPrice,
          totalDuration: newDuration,
          // Distribute bestFor types for variety
          bestFor: i === 0 ? "fastest" : 
                  i === 1 ? "cheapest" : 
                  i === 2 ? "recommended" : 
                  i === 3 ? "comfort" : 
                  i === 4 ? "scenic" : "budget",
          segments: baseJourney.segments.map((segment, index) => ({
            ...segment,
            from: index === 0 ? fromLocation : (
              // For middle segments, use intermediate locations
              index !== baseJourney.segments.length - 1 ? 
              `${fromLocation.substring(0, 3)}-${toLocation.substring(0, 3)}-Stop-${index}` : 
              segment.from
            ),
            to: index === baseJourney.segments.length - 1 ? toLocation : (
              // For middle segments, use intermediate locations
              index !== 0 ? 
              `${fromLocation.substring(0, 3)}-${toLocation.substring(0, 3)}-Stop-${index+1}` : 
              segment.to
            ),
            id: `s-${Math.random().toString(36).substring(2, 9)}`
          }))
        };
        
        results.push(newJourney);
      }
      
      // Sort by a mix of criteria to show variety
      results.sort((a, b) => {
        // Sort first by bestFor="recommended"
        if (a.bestFor === "recommended" && b.bestFor !== "recommended") return -1;
        if (a.bestFor !== "recommended" && b.bestFor === "recommended") return 1;
        
        // Then sort by a combination of price and duration
        const aDurationHours = parseInt(a.totalDuration.split('h')[0]);
        const bDurationHours = parseInt(b.totalDuration.split('h')[0]);
        
        // Random sorting weight (sometimes prefer price, sometimes duration)
        const priceWeight = Math.random() > 0.5 ? 2 : 1;
        const durationWeight = Math.random() > 0.5 ? 2 : 1;
        
        return (a.totalPrice * priceWeight + aDurationHours * durationWeight) - 
               (b.totalPrice * priceWeight + bDurationHours * durationWeight);
      });
      
      setFilteredResults(results);
      setIsSearching(false);
      setSearchPerformed(true);
      
      toast({
        title: "Search Completed",
        description: `Found ${results.length} routes from ${fromLocation} to ${toLocation}`,
      });
    }, 1500);
  };

  // Function to handle booking
  const bookJourney = (journeyId: string) => {
    setSelectedJourneyId(journeyId);
    setIsBooking(true);
    
    // Show toast for booking initiation
    toast({
      title: "Booking Initiated",
      description: "Preparing your booking details...",
      variant: "default",
    });
    
    // No need for timeout here as the redirect happens in JourneyCard component
  };

  return {
    isSearching,
    searchPerformed,
    results: filteredResults,
    from,
    to,
    performSearch,
    bookJourney,
    isBooking,
    selectedJourneyId,
    // Export available locations for use in components
    availableFromLocations: popularFromLocations,
    availableToLocations: popularToLocations
  };
};

export default useSearch;
