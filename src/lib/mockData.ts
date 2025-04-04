export type TransportMode = 'flight' | 'train' | 'bus' | 'car' | 'ferry' | 'metro' | 'walk' | 'taxi';

export type JourneyLeg = {
  id: string;
  mode: TransportMode;
  from: string;
  to: string;
  fromCode?: string;
  toCode?: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  distance: string;
  operator: string;
  amenities?: string[];
};

export type Journey = {
  id: string;
  totalDuration: string;
  totalPrice: number;
  legs: JourneyLeg[];
  co2Emission: string;
  bestFor: 'cheapest' | 'fastest' | 'recommended';
};

export const mockJourneys: Journey[] = [
  {
    id: 'journey-1',
    totalDuration: '4h 45m',
    totalPrice: 5680,
    legs: [
      {
        id: 'leg-1-1',
        mode: 'taxi',
        from: 'Your Location',
        to: 'Bangalore Airport',
        departureTime: '06:00',
        arrivalTime: '06:45',
        duration: '45m',
        price: 650,
        distance: '35 km',
        operator: 'Uber'
      },
      {
        id: 'leg-1-2',
        mode: 'flight',
        from: 'Bangalore Airport',
        to: 'Udaipur Airport',
        fromCode: 'BLR',
        toCode: 'UDR',
        departureTime: '08:15',
        arrivalTime: '10:05',
        duration: '1h 50m',
        price: 4200,
        distance: '1,285 km',
        operator: 'IndiGo Airlines',
        amenities: ['Meal', 'WiFi', 'Entertainment']
      },
      {
        id: 'leg-1-3',
        mode: 'bus',
        from: 'Udaipur Bus Stand',
        to: 'Abu Road',
        departureTime: '11:30',
        arrivalTime: '13:00',
        duration: '1h 30m',
        price: 830,
        distance: '165 km',
        operator: 'Rajasthan State Transport'
      }
    ],
    co2Emission: '145 kg',
    bestFor: 'fastest'
  },
  {
    id: 'journey-2',
    totalDuration: '17h 30m',
    totalPrice: 1850,
    legs: [
      {
        id: 'leg-2-1',
        mode: 'metro',
        from: 'Your Location',
        to: 'Bangalore City Station',
        departureTime: '18:00',
        arrivalTime: '18:40',
        duration: '40m',
        price: 35,
        distance: '12 km',
        operator: 'Namma Metro'
      },
      {
        id: 'leg-2-2',
        mode: 'train',
        from: 'Bangalore City',
        to: 'Abu Road Junction',
        fromCode: 'SBC',
        toCode: 'ABR',
        departureTime: '20:00',
        arrivalTime: '11:30',
        duration: '15h 30m',
        price: 1650,
        distance: '1,600 km',
        operator: 'Indian Railways',
        amenities: ['Sleeper', 'Food', 'Charging']
      },
      {
        id: 'leg-2-3',
        mode: 'walk',
        from: 'Abu Road Junction',
        to: 'Abu Road Bus Stand',
        departureTime: '11:30',
        arrivalTime: '11:45',
        duration: '15m',
        price: 0,
        distance: '0.8 km',
        operator: '-'
      },
      {
        id: 'leg-2-4',
        mode: 'taxi',
        from: 'Abu Road Bus Stand',
        to: 'Destination',
        departureTime: '12:00',
        arrivalTime: '12:15',
        duration: '15m',
        price: 165,
        distance: '3 km',
        operator: 'Local Taxi'
      }
    ],
    co2Emission: '54 kg',
    bestFor: 'cheapest'
  },
  {
    id: 'journey-3',
    totalDuration: '14h 20m',
    totalPrice: 3250,
    legs: [
      {
        id: 'leg-3-1',
        mode: 'taxi',
        from: 'Your Location',
        to: 'Bangalore Bus Terminal',
        departureTime: '16:00',
        arrivalTime: '16:30',
        duration: '30m',
        price: 350,
        distance: '15 km',
        operator: 'Ola'
      },
      {
        id: 'leg-3-2',
        mode: 'bus',
        from: 'Bangalore',
        to: 'Ahmedabad',
        departureTime: '17:00',
        arrivalTime: '05:00',
        duration: '12h',
        price: 2400,
        distance: '1,500 km',
        operator: 'VRL Travels',
        amenities: ['AC', 'Sleeper', 'Water']
      },
      {
        id: 'leg-3-3',
        mode: 'train',
        from: 'Ahmedabad',
        to: 'Abu Road',
        fromCode: 'ADI',
        toCode: 'ABR',
        departureTime: '06:20',
        arrivalTime: '09:30',
        duration: '3h 10m',
        price: 500,
        distance: '220 km',
        operator: 'Indian Railways'
      }
    ],
    co2Emission: '87 kg',
    bestFor: 'recommended'
  }
];

export const popularDestinations = [
  { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
  { name: 'Delhi', img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
  { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
  { name: 'Ladakh', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
  { name: 'Varanasi', img: 'https://images.unsplash.com/photo-1561361058-c24e021e2964?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
  { name: 'Darjeeling', img: 'https://images.unsplash.com/photo-1544714042-5c0a53660216?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400' },
];

export const popularFromLocations = [
  "Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Kolkata", 
  "Jaipur", "Ahmedabad", "Pune", "Kochi", "Lucknow", "Bhopal",
  "Chandigarh", "Guwahati", "Srinagar", "Shimla", "Dehradun", "Patna",
  
  "Dubai", "Singapore", "Bangkok", "London", "New York", "Tokyo"
];

export const popularToLocations = [
  "Abu Road", "Manali", "Goa", "Kerala", "Ooty", "Darjeeling",
  "Coorg", "Andaman", "Rann of Kutch", "Spiti Valley", "Ziro Valley", "Tawang",
  "Majuli Island", "Dhanushkodi", "Hampi", "Khajuraho", "Gokarna", "Lakshadweep",
  "Valley of Flowers", "Sundarbans", "Auli", "Tirthan Valley", "Zanskar", "Lahaul",
  
  "Bali", "Paris", "Rome", "Barcelona", "Amsterdam", "Istanbul"
];
