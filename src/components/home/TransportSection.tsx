
import React from 'react';
import { Plane, Train, Bus, Shield } from 'lucide-react';

const TransportSection = () => {
  return (
    <div className="my-16">
      <h2 className="text-2xl font-semibold text-center mb-8">All Transport Options in One Place</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TransportOption icon={<Plane className="h-8 w-8 text-travel-blue mb-2" />} label="Flights" />
        <TransportOption icon={<Train className="h-8 w-8 text-travel-green mb-2" />} label="Trains" />
        <TransportOption icon={<Bus className="h-8 w-8 text-travel-gray mb-2" />} label="Buses" />
        <TransportOption icon={<Shield className="h-8 w-8 text-travel-yellow mb-2" />} label="Local Transit" />
      </div>
    </div>
  );
};

const TransportOption = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-center flex-col">
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default TransportSection;
