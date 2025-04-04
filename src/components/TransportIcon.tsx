
import React from 'react';
import { Plane, Train, Bus, Car, Ship, Landmark, PersonStanding, CarTaxiFront, Bike, MotorCycle, Mountain } from 'lucide-react';

// Define all possible transport modes
export type TransportMode = "flight" | "train" | "bus" | "car" | "ferry" | "subway" | "walk" | "taxi" | "bicycle" | "scooter" | "trekking";

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
    subway: <Landmark size={size} className={`text-travel-green-dark ${className}`} />,
    walk: <PersonStanding size={size} className={`text-travel-gray ${className}`} />,
    taxi: <CarTaxiFront size={size} className={`text-travel-yellow ${className}`} />,
    bicycle: <Bike size={size} className={`text-travel-green ${className}`} />,
    scooter: <MotorCycle size={size} className={`text-travel-gray ${className}`} />,
    trekking: <Mountain size={size} className={`text-travel-blue-dark ${className}`} />
  };

  return (
    <div className="flex items-center justify-center">
      {iconMap[mode] || <Car size={size} className={`text-gray-500 ${className}`} />}
    </div>
  );
};

export default TransportIcon;
