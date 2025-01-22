import React, { createContext, useContext, useMemo,useState } from 'react';
import { Car, Truck } from '../types';
import { generateRandomCar, generateRandomTruck } from '../utils/VehicleGenerator';

interface VehicleContextType {
  cars: Car[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  trucks: Truck[];
  setTrucks: React.Dispatch<React.SetStateAction<Truck[]>>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Array<Car>>(
    Array.from({ length: 100 }, () => generateRandomCar())
  );
  const [trucks,setTrucks] = useState<Array<Truck>>(
    Array.from({ length: 100 }, () => generateRandomTruck()) 
  );

  const vehicles = useMemo(() => ({ cars, setCars,trucks,setTrucks }), [cars,trucks]);

  return (
    <VehicleContext.Provider value={vehicles}>{children}</VehicleContext.Provider>
  );
};


export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};