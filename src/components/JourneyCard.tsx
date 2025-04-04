
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Clock, DollarSign, Leaf } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TransportIcon from './TransportIcon';
import { Journey, Segment } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface JourneyCardProps {
  journey: Journey;
  onBook?: (journeyId: string) => void;
}

const JourneyCard: React.FC<JourneyCardProps> = ({ journey, onBook }) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  
  const handleBookClick = () => {
    // Show booking toast
    toast({
      title: "Booking Initiated",
      description: `Booking journey from ${journey.from} to ${journey.to}`,
    });
    
    // Call the onBook callback if provided
    if (onBook) {
      onBook(journey.id);
    }
    
    // Redirect to a booking confirmation page
    setTimeout(() => {
      navigate(`/booking-confirmation/${journey.id}`);
    }, 1500);
  };
  
  // Ensure journey.segments exists and has elements before trying to map over it
  const segments = journey?.segments || [];
  
  return (
    <Card className={cn(
      "journey-card mb-4 transition-all duration-300",
      expanded ? "border-travel-blue" : ""
    )}>
      {/* Summary View */}
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="flex items-center space-x-3 mb-3 md:mb-0">
            {/* Transport Mode Icons */}
            <div className="flex space-x-1">
              {segments.map((segment, index) => (
                <TransportIcon key={index} mode={segment.type} size={18} />
              ))}
            </div>
            
            {/* Journey Duration */}
            <div className="flex items-center space-x-2 text-gray-700">
              <Clock size={16} />
              <span className="font-medium">{journey.totalDuration}</span>
            </div>
          </div>
          
          {/* Journey Price */}
          <div className="flex flex-col items-end">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">₹{journey.totalPrice}</span>
              <DollarSign size={16} className="text-travel-green ml-1" />
            </div>
            <div className="flex items-center mt-1">
              <Leaf size={14} className="text-travel-green mr-1" />
              <span className="text-xs text-gray-500">Low emissions</span>
            </div>
          </div>
        </div>
        
        {/* Journey Route Overview */}
        <div className="mt-4 flex items-center">
          <div className="flex-1">
            <div className="relative flex items-center">
              {segments.length > 0 && segments.map((segment, index) => (
                <React.Fragment key={`segment-${index}`}>
                  {index > 0 && <div className="h-[2px] flex-grow bg-gray-300" />}
                  <div className="relative flex flex-col items-center">
                    <div className={cn(
                      "w-4 h-4 rounded-full z-10",
                      index === 0 ? "bg-travel-blue" : 
                      index === segments.length - 1 ? "bg-travel-green" : "bg-travel-gray"
                    )} />
                    <span className="text-xs text-gray-500 mt-1 text-center w-20 truncate">
                      {index === 0 ? segment.from : index === segments.length - 1 ? segment.to : segment.from}
                    </span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        
        {/* Journey Type Badge */}
        <div className="mt-4 flex justify-between items-center">
          <Badge 
            variant={journey.bestFor === "fastest" ? "default" : 
                  journey.bestFor === "cheapest" ? "outline" : "secondary"}
            className={cn(
              "capitalize",
              journey.bestFor === "fastest" ? "bg-travel-blue" : 
              journey.bestFor === "cheapest" ? "border-travel-green text-travel-green" : 
              "bg-travel-yellow text-black"
            )}
          >
            {journey.bestFor}
          </Badge>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)} 
            className="text-travel-blue hover:text-travel-blue-dark"
          >
            {expanded ? (
              <span className="flex items-center">Less Details <ChevronUp size={16} className="ml-1" /></span>
            ) : (
              <span className="flex items-center">More Details <ChevronDown size={16} className="ml-1" /></span>
            )}
          </Button>
        </div>
      </CardContent>
      
      {/* Expanded Details */}
      {expanded && (
        <div className="px-4 pb-4 animate-fade-in">
          <div className="border-t border-gray-200 pt-4">
            {/* Journey Segments */}
            {segments.map((segment, index) => (
              <SegmentDetail key={segment.id} segment={segment} isLast={index === segments.length - 1} />
            ))}
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button 
              className="w-full bg-travel-blue hover:bg-travel-blue-dark"
              onClick={handleBookClick}
            >
              Book this Journey
            </Button>
          </CardFooter>
        </div>
      )}
    </Card>
  );
};

const SegmentDetail: React.FC<{ segment: Segment; isLast: boolean }> = ({ segment, isLast }) => {
  return (
    <div className={cn("py-3", !isLast && "border-b border-dashed border-gray-200")}>
      <div className="flex items-center space-x-3 mb-2">
        <TransportIcon mode={segment.type} />
        <div>
          <span className="font-medium">{segment.carrier || 'Unknown Provider'}</span>
          <span className="text-sm text-gray-500 ml-2">{segment.duration}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-start mt-1 ml-9">
        <div>
          <div className="font-medium">{segment.departureTime}</div>
          <div className="text-sm text-gray-500">{segment.from}</div>
        </div>
        <div className="flex flex-col items-center px-4">
          <div className="text-xs text-gray-500">{segment.duration}</div>
          <div className="w-16 h-[1px] bg-gray-300 my-2"></div>
          <div className="text-xs text-gray-500">₹{segment.price || 'N/A'}</div>
        </div>
        <div>
          <div className="font-medium">{segment.arrivalTime}</div>
          <div className="text-sm text-gray-500">{segment.to}</div>
        </div>
      </div>
      
      {segment.amenities && (
        <div className="ml-9 mt-2">
          <div className="flex flex-wrap gap-1">
            {segment.amenities.map((amenity, i) => (
              <Badge key={i} variant="outline" className="bg-travel-blue/5 text-travel-blue-dark border-travel-blue/20 text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyCard;
