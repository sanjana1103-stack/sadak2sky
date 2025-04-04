
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRightLeft, Calendar, Users } from 'lucide-react';
import { popularFromLocations, popularToLocations } from '@/lib/mockData';

interface SearchFormProps {
  onSearch: (from: string, to: string) => void;
  className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, className = '' }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('1 Traveler');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) {
      return;
    }
    onSearch(from, to);
  };
  
  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Card className={`border-none shadow-lg ${className}`}>
      <CardContent className="p-4 md:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-3 items-center">
            <div className="relative">
              <label htmlFor="from" className="text-sm font-medium text-gray-500 mb-1 block">From</label>
              <Input
                id="from"
                placeholder="City, Airport, or Station"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="h-12"
                list="fromLocations"
                required
              />
              <datalist id="fromLocations">
                {popularFromLocations.map((location, index) => (
                  <option key={`from-${index}`} value={location} />
                ))}
              </datalist>
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="mt-6 rounded-full border-2 border-travel-blue/50 hover:bg-travel-blue/10"
              onClick={handleSwap}
            >
              <ArrowRightLeft size={18} className="text-travel-blue" />
            </Button>
            
            <div className="relative">
              <label htmlFor="to" className="text-sm font-medium text-gray-500 mb-1 block">To</label>
              <Input
                id="to"
                placeholder="City, Airport, or Station"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-12"
                list="toLocations"
                required
              />
              <datalist id="toLocations">
                {popularToLocations.map((location, index) => (
                  <option key={`to-${index}`} value={location} />
                ))}
              </datalist>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="relative">
              <label htmlFor="date" className="text-sm font-medium text-gray-500 mb-1 block">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="date"
                  type="date"
                  placeholder="Select date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>
            </div>
            
            <div className="relative">
              <label htmlFor="travelers" className="text-sm font-medium text-gray-500 mb-1 block">Travelers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="travelers"
                  placeholder="Travelers"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="h-12 pl-10"
                />
              </div>
            </div>
          </div>
          
          <Button type="submit" className="w-full h-12 text-lg bg-travel-blue hover:bg-travel-blue-dark">
            Find Routes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
