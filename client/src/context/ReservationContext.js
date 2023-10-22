import React, { createContext, useContext, useState } from 'react';

const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [isReserved, setIsReserved] = useState(false)
  const [reservedBikeId, setReservedBikeId] = useState(null)

  const contextValue = {
    isReserved,
    setIsReserved,
    reservedBikeId,
    setReservedBikeId
  };

  return (
    <ReservationContext.Provider value={contextValue}>
      {children}
    </ReservationContext.Provider>
  );
};



export const useReservation = () => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useRent must be used within a ReservationProvider');
  }
  return context;
};
