
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockJourneys } from '@/lib/mockData';
import NavBar from '@/components/NavBar';
import { CheckCircle, Calendar, Clock, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const BookingConfirmation = () => {
  const { journeyId } = useParams();
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingReference, setBookingReference] = useState('');
  
  useEffect(() => {
    // Simulate API call to get journey details
    setTimeout(() => {
      if (journeyId) {
        const foundJourney = mockJourneys.find(j => j.id === journeyId);
        setJourney(foundJourney || null);
        
        // Generate random booking reference
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let ref = '';
        for (let i = 0; i < 8; i++) {
          ref += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setBookingReference(ref);
      }
      setLoading(false);
    }, 1000);
  }, [journeyId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-4xl mx-auto px-4 py-12 flex justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-travel-blue border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your booking...</p>
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
          <Card className="w-full">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Journey Not Found</h2>
                <p className="text-gray-600 mb-6">We couldn't find the journey you're looking for.</p>
                <Link to="/">
                  <Button>Return to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="w-full">
          <CardHeader className="bg-travel-blue/10 border-b pb-6">
            <div className="flex items-center justify-center mb-4 text-travel-blue">
              <CheckCircle size={48} />
            </div>
            <CardTitle className="text-center text-2xl">Booking Confirmation</CardTitle>
            <p className="text-center text-gray-600 mt-2">Your journey has been booked successfully</p>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="text-center mb-6">
              <div className="font-medium text-gray-500">Booking Reference</div>
              <div className="text-2xl font-bold">{bookingReference}</div>
              <p className="text-sm text-gray-500 mt-1">Please save this reference for your records</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Journey Details</h3>
              
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-8 flex-shrink-0 mt-1">
                  <MapPin className="text-travel-blue" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">From - To</div>
                  <div className="font-medium">{journey.from} - {journey.to}</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-4">
                <div className="w-8 flex-shrink-0 mt-1">
                  <Calendar className="text-travel-blue" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="font-medium">{journey.departureDate}</div>
                </div>
              </div>

              <div className="flex items-start space-x-4 mb-4">
                <div className="w-8 flex-shrink-0 mt-1">
                  <Clock className="text-travel-blue" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{journey.totalDuration}</div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-3">Payment Summary</h3>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Base fare</span>
                <span className="font-medium">₹{(journey.totalPrice * 0.9).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & Fees</span>
                <span className="font-medium">₹{(journey.totalPrice * 0.1).toFixed(2)}</span>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{journey.totalPrice}</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
            <Button variant="outline">Download E-Ticket</Button>
            <Link to="/">
              <Button>Return to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;
