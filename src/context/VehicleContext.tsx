import React from 'react';
import {createContext, useContext, useState} from 'react';
import {VehicleType} from '../data/types';

type FilterType = 'make' | 'model' | 'startingBid';

type ContextType = {
  filter: Record<FilterType, string | number>;
  favorites: VehicleType[];
  setCurrentFilter: (value: string | number, key: FilterType) => void;
  addToFavorites: (vehicleId: VehicleType) => void;
  resetFilters: () => void;
};

export const VehicleContext = createContext<ContextType>({
  filter: {
    make: '',
    model: '',
    startingBid: 0,
  },
  favorites: [],
  setCurrentFilter: () => null,
  addToFavorites: () => null,
  resetFilters: () => null,
});

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);

  if (context === undefined) {
    throw new Error('VehicleProviderContext was used outside of its Provider');
  }

  return context;
};

export const VehicleProvider = ({children}: {children: React.ReactNode}) => {
  const [filter, setFilter] = useState<Record<FilterType, string | number>>({
    make: '',
    model: '',
    startingBid: 0,
  });
  const [favorites, setFavorites] = useState<VehicleType[]>([]);

  const addToFavorites = (vehicle: VehicleType) => {
    const id = favorites.findIndex(
      (favorite: VehicleType) => favorite.id === vehicle.id,
    );
    if (id === -1) {
      setFavorites(prev => [...prev, vehicle]);
    } else {
      setFavorites(prev => prev.filter(favorite => favorite.id !== vehicle.id));
    }
  };

  const setCurrentFilter = (
    value: string | number,
    key: keyof typeof filter,
  ) => {
    setFilter(prev => ({...prev, [key]: value}));
  };
  const resetFilters = () => {
    setFilter(prev => ({...prev, make: '', model: '', startingBid: 0}));
  };
  return (
    <VehicleContext.Provider
      value={{
        filter,
        favorites,
        setCurrentFilter,
        addToFavorites,
        resetFilters,
      }}>
      {children}
    </VehicleContext.Provider>
  );
};
