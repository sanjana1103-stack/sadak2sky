
import React from 'react';
import { Plane, Train, Bus, Car, Ship, Underground, Walking, Taxi } from 'lucide-react';
import { TransportMode } from '@/lib/mockData';

interface TransportIconProps {
  mode: TransportMode;
  size?: number;
  className?: string;
}

const TransportIcon: React.FC<TransportIconProps> = ({ 
  mode, 
  size = 20, 
  className = "" 
}) => {
  const iconMap = {
    flight: <Plane size={size} className={`text-travel-blue ${className}`} />,
    train: <Train size={size} className={`text-travel-green ${className}`} />,
    bus: <Bus size={size} className={`text-travel-gray ${className}`} />,
    car: <Car size={size} className={`text-travel-gray-dark ${className}`} />,
    ferry: <Ship size={size} className={`text-travel-blue-dark ${className}`} />,
    metro: <Underground size={size} className={`text-travel-green-dark ${className}`} />,
    walk: <Walking size={size} className={`text-travel-gray ${className}`} />,
    taxi: <Taxi size={size} className={`text-travel-yellow ${className}`} />
  };

  return (
    <div className="flex items-center justify-center">
      {iconMap[mode]}
    </div>
  );
};

export default TransportIcon;
