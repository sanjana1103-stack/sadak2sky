
import React from 'react';
import { Badge } from '@/components/ui/badge';
import TransportIcon from '@/components/TransportIcon';
import { Segment } from '@/lib/mockData';

interface JourneySegmentProps {
  segment: Segment;
  isLast: boolean;
}

const JourneySegment: React.FC<JourneySegmentProps> = ({ segment, isLast }) => {
  return (
    <div className={`py-3 ${!isLast && 'border-b border-dashed border-gray-200'}`}>
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
            {isLast ? 'Final Destination' : 'Connection'}
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
  );
};

export default JourneySegment;
