
import { useState } from 'react';
import { mockJourneys } from '@/lib/mockData';
import { toast } from '@/components/ui/use-toast';

const useSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

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

  return {
    isSearching,
    searchPerformed,
    results: mockJourneys,
    from,
    to,
    performSearch
  };
};

export default useSearch;
