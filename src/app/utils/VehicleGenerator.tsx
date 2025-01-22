import {Car,Truck,Permit} from '../types'

export const generateRandomCar = (): Car => {
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Tesla'];
  const colors = ['Red', 'Blue', 'Black', 'White', 'Silver', 'Green', 'Yellow'];
  const models = ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Convertible'];
  
  return {
    name: `${brands[Math.floor(Math.random() * brands.length)]} ${models[Math.floor(Math.random() * models.length)]}`,
    model: `Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`,
    yearOfRelease: Math.floor(Math.random() * (2024 - 2000 + 1)) + 2000,
    brand: brands[Math.floor(Math.random() * brands.length)],
    color: colors[Math.floor(Math.random() * colors.length)]
  };
  
};

export const generateRandomTruck = (): Truck => {
  const brands = ['Volvo', 'Freightliner', 'Peterbilt', 'Kenworth', 'Mack', 'International'];
  const models = ['Semi', 'Box Truck', 'Dump Truck', 'Flatbed', 'Tank Truck'];
  const states = ['Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
      'Andaman and Nicobar Islands',
      'Chandigarh',
      'Dadra and Nagar Haveli and Daman and Diu',
      'Delhi',
      'Lakshadweep',
      'Puducherry',];
  
  const numPermits = Math.floor(Math.random() * 5) + 1;
  const selectedStates = new Set<string>();
  const permits: Permit[] = [];
  
  while (permits.length < numPermits) {
    const state = states[Math.floor(Math.random() * states.length)];
    if (!selectedStates.has(state)) {
      selectedStates.add(state);
      permits.push({
        permit_no: `P${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        state
      });
    }
  }

  return {
    name: `${brands[Math.floor(Math.random() * brands.length)]} ${models[Math.floor(Math.random() * models.length)]}`,
    model: `Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`,
    yearOfRelease: Math.floor(Math.random() * (2024 - 2000 + 1)) + 2000,
    brand: brands[Math.floor(Math.random() * brands.length)],
    permits
  };
};