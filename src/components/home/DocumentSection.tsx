
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const DocumentSection = () => {
  const navigate = useNavigate();
  const { session } = useAuth();

  const handleGetStarted = () => {
    if (session) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-md my-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Travel Document Management Made Simple
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Upload your travel documents, tickets, and itineraries to have all your travel information 
            organized in one place. Get personalized travel suggestions based on your history.
          </p>
          <Button 
            onClick={handleGetStarted}
            className="bg-travel-blue hover:bg-travel-blue/90 text-white px-8 py-3 text-lg"
          >
            {session ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <StepItem number={1} title="Upload Documents" description="Upload your travel tickets, bookings, and itineraries" />
          <StepItem number={2} title="Get Organized" description="All your travel information in one centralized place" />
          <StepItem number={3} title="Travel Smarter" description="Receive personalized travel suggestions and insights" />
        </div>
      </div>
    </div>
  );
};

const StepItem = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="w-12 h-12 rounded-full bg-travel-blue flex items-center justify-center text-white font-bold text-xl mb-4">
      {number}
    </div>
    <h3 className="font-medium mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default DocumentSection;
