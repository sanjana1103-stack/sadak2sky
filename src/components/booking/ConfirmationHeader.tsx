
import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ConfirmationHeaderProps {
  confirmationNumber: string;
}

const ConfirmationHeader: React.FC<ConfirmationHeaderProps> = ({ confirmationNumber }) => {
  return (
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
  );
};

export default ConfirmationHeader;
