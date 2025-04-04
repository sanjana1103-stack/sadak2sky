export interface Journey {
  id: string;
  from: string;
  to: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  totalDuration: string;
  totalPrice: number;
  bestFor: "price" | "duration" | "recommended" | "comfort" | "scenic" | "cultural" | "budget";
  segments: Segment[];
}

export interface Segment {
  id: string;
  type: "flight" | "train" | "bus" | "car";
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  carrier?: string;
  carrierCode?: string;
  price?: number;
  amenities?: string[];
}

// Enhanced list of locations in India, including remote places
export const popularFromLocations = [
  "Bangalore", 
  "Mumbai", 
  "Delhi", 
  "Chennai", 
  "Kolkata", 
  "Hyderabad", 
  "Pune", 
  "Jaipur", 
  "Ahmedabad", 
  "Kochi", 
  "Varanasi", 
  "Guwahati", 
  "Shimla", 
  "Darjeeling", 
  "Rishikesh", 
  "Manali", 
  "Leh", 
  "Andaman Islands", 
  "Coorg", 
  "Ooty", 
  "Munnar", 
  "Gangtok", 
  "Tawang", 
  "Kasol", 
  "Spiti Valley",
  "Hampi",
  "Khajuraho",
  "Pushkar",
  "Jaisalmer",
  "Gokarna"
];

export const popularToLocations = [
  "Abu Road",
  "Agra",
  "Ajmer",
  "Allahabad",
  "Amritsar",
  "Aurangabad",
  "Badrinath",
  "Bhubaneswar",
  "Bhopal",
  "Chandigarh",
  "Dehradun",
  "Dharamshala",
  "Gangtok",
  "Goa",
  "Haridwar",
  "Indore",
  "Jodhpur",
  "Kanyakumari",
  "Kedarnath",
  "Khajuraho",
  "Kochi",
  "Kodaikanal",
  "Madurai",
  "Mahabalipuram",
  "Mount Abu",
  "Mysore",
  "Nainital",
  "Patna",
  "Pondicherry",
  "Rameswaram",
  "Shillong",
  "Srinagar",
  "Thiruvananthapuram",
  "Tirupati",
  "Udaipur",
  "Ujjain",
  "Valley of Flowers",
  "Vrindavan",
  "Ziro Valley"
];

// Enhanced journey mock data with more diverse routes
export const mockJourneys: Journey[] = [
  {
    id: "j1",
    from: "Delhi",
    to: "Mumbai",
    departureDate: "2023-10-15",
    departureTime: "08:30",
    arrivalTime: "11:30",
    totalDuration: "3h 0m",
    totalPrice: 5999,
    bestFor: "recommended",
    segments: [
      {
        id: "s1",
        type: "flight",
        from: "Delhi",
        to: "Mumbai",
        departureTime: "08:30",
        arrivalTime: "11:30",
        duration: "3h 0m",
        carrier: "IndiGo",
        carrierCode: "6E",
        price: 5999,
        amenities: ["In-flight meal", "Extra legroom"]
      }
    ]
  },
  {
    id: "j2",
    from: "Bangalore",
    to: "Abu Road",
    departureDate: "2023-10-15",
    departureTime: "07:00",
    arrivalTime: "22:30",
    totalDuration: "15h 30m",
    totalPrice: 2899,
    bestFor: "budget",
    segments: [
      {
        id: "s2",
        type: "flight",
        from: "Bangalore",
        to: "Udaipur",
        departureTime: "07:00",
        arrivalTime: "09:30",
        duration: "2h 30m",
        carrier: "SpiceJet",
        carrierCode: "SG",
        price: 2499
      },
      {
        id: "s3",
        type: "bus",
        from: "Udaipur",
        to: "Abu Road",
        departureTime: "19:00",
        arrivalTime: "22:30",
        duration: "3h 30m",
        carrier: "RSRTC",
        price: 400
      }
    ]
  },
  {
    id: "j3",
    from: "Chennai",
    to: "Rishikesh",
    departureDate: "2023-10-16",
    departureTime: "05:15",
    arrivalTime: "18:45",
    totalDuration: "13h 30m",
    totalPrice: 8750,
    bestFor: "comfort",
    segments: [
      {
        id: "s4",
        type: "flight",
        from: "Chennai",
        to: "Delhi",
        departureTime: "05:15",
        arrivalTime: "08:00",
        duration: "2h 45m",
        carrier: "Air India",
        carrierCode: "AI",
        price: 7500
      },
      {
        id: "s5",
        type: "train",
        from: "Delhi",
        to: "Haridwar",
        departureTime: "10:20",
        arrivalTime: "14:50",
        duration: "4h 30m",
        carrier: "Shatabdi Express",
        carrierCode: "12017",
        price: 850
      },
      {
        id: "s6",
        type: "bus",
        from: "Haridwar",
        to: "Rishikesh",
        departureTime: "16:30",
        arrivalTime: "18:45",
        duration: "2h 15m",
        carrier: "Uttarakhand Tourism",
        price: 400
      }
    ]
  },
  {
    id: "j4",
    from: "Kolkata",
    to: "Darjeeling",
    departureDate: "2023-10-17",
    departureTime: "06:00",
    arrivalTime: "15:30",
    totalDuration: "9h 30m",
    totalPrice: 3200,
    bestFor: "scenic",
    segments: [
      {
        id: "s7",
        type: "train",
        from: "Kolkata",
        to: "New Jalpaiguri",
        departureTime: "06:00",
        arrivalTime: "13:00",
        duration: "7h 0m",
        carrier: "Shatabdi Express",
        carrierCode: "12345",
        price: 2500
      },
      {
        id: "s8",
        type: "car",
        from: "New Jalpaiguri",
        to: "Darjeeling",
        departureTime: "13:30",
        arrivalTime: "15:30",
        duration: "2h 0m",
        carrier: "Himalayan Cab Services",
        price: 700
      }
    ]
  },
  {
    id: "j5",
    from: "Mumbai",
    to: "Goa",
    departureDate: "2023-10-18",
    departureTime: "08:00",
    arrivalTime: "20:00",
    totalDuration: "12h 0m",
    totalPrice: 1800,
    bestFor: "budget",
    segments: [
      {
        id: "s9",
        type: "bus",
        from: "Mumbai",
        to: "Goa",
        departureTime: "08:00",
        arrivalTime: "20:00",
        duration: "12h 0m",
        carrier: "Paulo Travels",
        price: 1800,
        amenities: ["AC Sleeper", "WiFi", "Snacks"]
      }
    ]
  },
  {
    id: "j6",
    from: "Hyderabad",
    to: "Hampi",
    departureDate: "2023-10-19",
    departureTime: "07:30",
    arrivalTime: "16:00",
    totalDuration: "8h 30m",
    totalPrice: 3500,
    bestFor: "cultural",
    segments: [
      {
        id: "s10",
        type: "train",
        from: "Hyderabad",
        to: "Hospet Junction",
        departureTime: "07:30",
        arrivalTime: "14:30",
        duration: "7h 0m",
        carrier: "Indian Railways",
        carrierCode: "17225",
        price: 3000
      },
      {
        id: "s11",
        type: "bus",
        from: "Hospet Junction",
        to: "Hampi",
        departureTime: "15:00",
        arrivalTime: "16:00",
        duration: "1h 0m",
        carrier: "Karnataka SRTC",
        price: 500
      }
    ]
  }
];
