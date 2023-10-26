import React, { createContext, useContext, useState } from 'react';

const RentContext = createContext();

export const RentProvider = ({ children }) => {
  const [isRented, setIsRented] = useState(null);
  const [rentedBikeId, setRentedBikeId] = useState(null)
  const [mileage, setMileage] = useState(null)
  const [isActive, setIsActive] = useState(false);


  const contextValue = {
    isRented,
    setIsRented,
    rentedBikeId,
    setRentedBikeId,
    mileage,
    setMileage,
    isActive,
    setIsActive
  };

  return (
    <RentContext.Provider value={contextValue}>
      {children}
    </RentContext.Provider>
  );
};



export const useRent = () => {
  const context = useContext(RentContext);
  if (!context) {
    throw new Error('useRent must be used within a RentProvider');
  }
  return context;
};
