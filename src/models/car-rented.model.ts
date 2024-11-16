export interface CarRented { 
    name: string;
    madeIn: string;
    contractId: string;
    licensePlate: string;
    brand: string;
    model: string;
    color: string;
    seats: string;
    year: string;
    price: string;
    imageUrls: string[];  
    rentalDate: string;
    returnDate: string;
    rentalTime: string;
    returnTime?: string;
  }