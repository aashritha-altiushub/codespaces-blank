export interface Car {
    name: string;
    model: string;
    yearOfRelease: number;
    brand: string;
    color: string;
  }
  
  export interface Permit {
    permit_no: string;
    state: string;
  }
  
  export interface Truck {
    name: string;
    model: string;
    yearOfRelease: number;
    brand: string;
    permits: Permit[];
  }