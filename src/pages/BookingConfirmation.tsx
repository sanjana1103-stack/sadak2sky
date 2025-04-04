
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { mockJourneys, Journey } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, MapPin, Clock, Users, CreditCard, Printer, Share2, Download } from 'lucide-react';
import TransportIcon from '@/components/TransportIcon';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

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
      let foundJourney = null;
      
      // First check if journey is in mockJourneys
      foundJourney = mockJourneys.find(j => j.id === journeyId);
      
      // If not found, create a dynamic journey based on the journeyId
      if (!foundJourney && journeyId) {
        // Extract from and to from dynamic journeyId if possible
        let from = "Mumbai";
        let to = "Delhi";
        
        if (journeyId.includes('-')) {
          const parts = journeyId.split('-');
          if (parts.length > 1) {
            from = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
          }
        }
        
        // Create a dynamic journey
        const baseJourney = mockJourneys[0];
        foundJourney = {
          ...baseJourney,
          id: journeyId,
          from: from,
          to: to,
          // Generate random values for dynamic journeys
          totalPrice: Math.floor(Math.random() * 5000) + 2000,
          totalDuration: `${Math.floor(Math.random() * 6) + 2}h ${Math.floor(Math.random() * 55) + 5}m`,
          segments: baseJourney.segments.map((segment, index) => ({
            ...segment,
            from: index === 0 ? from : `${from.substring(0, 3)}-${to.substring(0, 3)}-Stop`,
            to: index === baseJourney.segments.length - 1 ? to : `${from.substring(0, 3)}-${to.substring(0, 3)}-Stop`,
            id: `seg-${Math.random().toString(36).slice(2, 9)}`
          }))
        };
      }
      
      setJourney(foundJourney);
      setIsLoading(false);
      
      // Show confirmation toast
      toast({
        title: "Booking Confirmed!",
        description: `Your journey from ${foundJourney?.from} to ${foundJourney?.to} has been confirmed.`,
        variant: "default",
      });
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
  journeyDate.setDate(journeyDate.getDate() + Math.floor(Math.random() * 14) + 3); // 3-16 days in future
  
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-travel-blue text-white p-6 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center">
            <CheckCircle size={48} className="mr-4" />
            <div>
              <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
              <p>Your journey is booked and ready to go</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-80">Confirmation #</div>
            <div className="font-mono text-xl font-bold">{confirmationNumber}</div>
          </div>
        </div>
        
        <Card className="rounded-t-none mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Journey Details</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Date</div>
                      <div className="text-gray-600">{journeyDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Route</div>
                      <div className="text-gray-600">{journey.from} to {journey.to}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-gray-600">{journey.totalDuration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
                    <div>
                      <div className="font-medium">Passengers</div>
                      <div className="text-gray-600">1 Adult</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span>Base fare</span>
                    <span>₹{(journey.totalPrice * 0.8).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes & fees</span>
                    <span>₹{(journey.totalPrice * 0.15).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Booking charges</span>
                    <span>₹{(journey.totalPrice * 0.05).toFixed(0)}</span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between font-bold">
                    <span>Total paid</span>
                    <span>₹{journey.totalPrice}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center text-green-600">
                    <CreditCard size={16} className="mr-2" />
                    <span className="text-sm">Paid with Credit Card (xxxx-1234)</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Journey Segments</h3>
              
              <div className="space-y-4">
                {journey.segments.map((segment, index) => (
                  <div key={segment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <TransportIcon mode={segment.type} size={24} />
                        <span className="ml-2 font-medium">{segment.carrier || 'Transport Provider'}</span>
                      </div>
                      <Badge variant="outline" className="bg-gray-50">
                        {segment.type.charAt(0).toUpperCase() + segment.type.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Departure</div>
                        <div className="font-medium">{segment.departureTime}</div>
                        <div className="text-sm">{segment.from}</div>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-sm text-gray-500">{segment.duration}</div>
                        <div className="w-full h-[1px] bg-gray-300 my-2 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-400"></div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {index === journey.segments.length - 1 ? 'Final Destination' : 'Connection'}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Arrival</div>
                        <div className="font-medium">{segment.arrivalTime}</div>
                        <div className="text-sm">{segment.to}</div>
                      </div>
                    </div>
                    
                    {segment.amenities && segment.amenities.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-sm text-gray-500 mb-1">Amenities</div>
                        <div className="flex flex-wrap gap-1">
                          {segment.amenities.map((amenity, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-50 text-gray-700 text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
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
