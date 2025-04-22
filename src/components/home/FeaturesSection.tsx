
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Plan Your Journey with Confidence
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sadak2Sky searches across multiple transport providers to find you the best routes, 
          prices, and travel times for your journey.
        </p>
      </div>

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
    </div>
  );
};

export default FeaturesSection;
