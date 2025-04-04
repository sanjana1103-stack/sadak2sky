import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Globe } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Suggestion {
  id: string;
  location: string;
  description: string;
  image_url: string | null;
}

// Sample suggestion data (in case there are no suggestions in the database yet)
const sampleSuggestions: Suggestion[] = [
  {
    id: '1',
    location: 'Bali, Indonesia',
    description: 'Experience tropical paradise with beautiful beaches and vibrant culture.',
    image_url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    location: 'Kyoto, Japan',
    description: 'Explore ancient temples and traditional gardens in this cultural city.',
    image_url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop',
  },
  {
    id: '3',
    location: 'Santorini, Greece',
    description: 'Enjoy stunning sunsets over white-washed buildings and blue domes.',
    image_url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop',
  },
];

const TravelSuggestions = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('suggestions')
          .select('*')
          .limit(3);

        if (error) throw error;
        
        // If there are suggestions in the database, use those
        // Otherwise, use the sample suggestions
        setSuggestions(data && data.length > 0 ? data : sampleSuggestions);
      } catch (error: any) {
        console.error('Error fetching suggestions:', error);
        setSuggestions(sampleSuggestions);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Travel Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-travel-blue/50 mb-3"></div>
              <div className="text-travel-blue">Loading suggestions...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Globe className="h-5 w-5 mr-2 text-travel-blue" />
          Travel Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="group">
              <div
                className="h-48 rounded-lg overflow-hidden relative mb-3"
                style={{
                  backgroundImage: suggestion.image_url 
                    ? `url(${suggestion.image_url})` 
                    : 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <h3 className="font-semibold">{suggestion.location}</h3>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{suggestion.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TravelSuggestions;
