
import React from 'react';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

interface JourneyDetailsProps {
  journey: {
    from: string;
    to: string;
    totalDuration: string;
  };
  journeyDate: Date;
}

const JourneyDetails: React.FC<JourneyDetailsProps> = ({ journey, journeyDate }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Journey Details</h3>
      <div className="space-y-4">
        <div className="flex items-start">
          <Calendar className="w-5 h-5 text-gray-500 mt-0.5 mr-3" />
          <div>
            <div className="font-medium">Date</div>
            <div className="text-gray-600">
              {journeyDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
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
  );
};

export default JourneyDetails;
