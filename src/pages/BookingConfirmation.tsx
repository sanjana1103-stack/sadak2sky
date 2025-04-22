
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { mockJourneys, Journey } from '@/lib/mockData';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Share2, Download } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import ConfirmationHeader from '@/components/booking/ConfirmationHeader';
import JourneyDetails from '@/components/booking/JourneyDetails';
import PaymentSummary from '@/components/booking/PaymentSummary';
import JourneySegment from '@/components/booking/JourneySegment';

const BookingConfirmation = () => {
  const { journeyId } = useParams();
  const [journey, setJourney] = useState<Journey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  
  useEffect(() => {
    // Generate random confirmation number
    const generateConfirmationNumber = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };
    
    setConfirmationNumber(generateConfirmationNumber());
    
    // Simulate API call to get journey details
    setTimeout(() => {
      let foundJourney = mockJourneys.find(j => j.id === journeyId);
      
      if (!foundJourney && journeyId) {
        // Create a dynamic journey based on the journeyId
        const baseJourney = mockJourneys[0];
        foundJourney = {
          ...baseJourney,
          id: journeyId,
          from: journeyId.split('-')[0] || "Mumbai",
          to: journeyId.split('-')[1] || "Delhi",
          totalPrice: Math.floor(Math.random() * 5000) + 2000,
          totalDuration: `${Math.floor(Math.random() * 6) + 2}h ${Math.floor(Math.random() * 55) + 5}m`,
        };
      }
      
      setJourney(foundJourney || null);
      setIsLoading(false);
      
      // Show confirmation toast
      if (foundJourney) {
        toast({
          title: "Booking Confirmed!",
          description: `Your journey from ${foundJourney.from} to ${foundJourney.to} has been confirmed.`,
          variant: "default",
        });
      }
    }, 1500);
  }, [journeyId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel-blue"></div>
            <p className="text-gray-600">Confirming your booking...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!journey) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-red-500 mb-4 text-5xl">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Journey Not Found</h2>
              <p className="text-gray-600 mb-6">We couldn't find the booking you're looking for.</p>
              <Link to="/">
                <Button>Return to Home</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Calculate a realistic future date for the journey
  const journeyDate = new Date();
  journeyDate.setDate(journeyDate.getDate() + Math.floor(Math.random() * 14) + 3);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ConfirmationHeader confirmationNumber={confirmationNumber} />
        
        <Card className="rounded-t-none mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <JourneyDetails journey={journey} journeyDate={journeyDate} />
              <PaymentSummary totalPrice={journey.totalPrice} />
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Journey Segments</h3>
              <div className="space-y-4">
                {journey.segments.map((segment, index) => (
                  <JourneySegment 
                    key={segment.id} 
                    segment={segment}
                    isLast={index === journey.segments.length - 1}
                  />
                ))}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 p-6 flex flex-wrap gap-3 justify-between">
            <div className="space-y-2">
              <h4 className="text-gray-700 font-medium">Need help?</h4>
              <p className="text-sm text-gray-600">Contact our support team at support@sadak2sky.com</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Printer size={18} /> Print
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={18} /> Download
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 size={18} /> Share
              </Button>
            </div>
          </CardFooter>
        </Card>
        
        <div className="text-center">
          <Link to="/">
            <Button variant="outline" className="mx-auto">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
