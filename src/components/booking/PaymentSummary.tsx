
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PaymentSummaryProps {
  totalPrice: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ totalPrice }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span>Base fare</span>
          <span>₹{(totalPrice * 0.8).toFixed(0)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Taxes & fees</span>
          <span>₹{(totalPrice * 0.15).toFixed(0)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Booking charges</span>
          <span>₹{(totalPrice * 0.05).toFixed(0)}</span>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between font-bold">
          <span>Total paid</span>
          <span>₹{totalPrice}</span>
        </div>
        
        <div className="mt-4 flex items-center text-green-600">
          <CreditCard size={16} className="mr-2" />
          <span className="text-sm">Paid with Credit Card (xxxx-1234)</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
