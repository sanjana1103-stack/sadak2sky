
import { useState } from 'react';
import { mockJourneys } from '@/lib/mockData';
import { toast } from '@/components/ui/use-toast';

const useSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  
  // Added new states for booking functionality
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const performSearch = (fromLocation: string, toLocation: string) => {
    setIsSearching(true);
    setFrom(fromLocation);
    setTo(toLocation);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setIsSearching(false);
      setSearchPerformed(true);
      
      toast({
        title: "Search Completed",
        description: `Found routes from ${fromLocation} to ${toLocation}`,
      });
    }, 1500);
  };

  // New function to handle booking
  const bookJourney = (journeyId: string) => {
    setSelectedJourneyId(journeyId);
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      
      toast({
        title: "Booking Initiated",
        description: "You'll be redirected to complete your booking.",
        variant: "default",
      });
      
      // In a real implementation, we would redirect to a booking page or open a modal
      // This would connect to a Supabase backend for processing the booking
    }, 1500);
  };

  return {
    isSearching,
    searchPerformed,
    results: mockJourneys,
    from,
    to,
    performSearch,
    bookJourney,
    isBooking,
    selectedJourneyId
  };
};

export default useSearch;
