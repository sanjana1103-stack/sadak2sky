
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const backgroundImages = [
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
  'https://images.unsplash.com/photo-1530521954074-e64f6810b32d',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828'
];

const featureImages = [
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1'
];

const FeaturesSection = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    const featureInterval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % featureImages.length);
    }, 4000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <div className="relative">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
          opacity: 0.15
        }} 
      />

      <div className="relative z-10 py-12">
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

        {/* Contact Information */}
        <div className="mt-16 text-center p-8 bg-gray-50 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <div className="space-y-2 text-gray-600">
            <p>Sanjana Shetty</p>
            <p>Phone: <a href="tel:+919902030158" className="text-travel-blue hover:underline">+91 99020 30158</a></p>
            <p>Email: <a href="mailto:sanjanashetty1103@gmail.com" className="text-travel-blue hover:underline">sanjanashetty1103@gmail.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
