import React, { createContext, useContext, useState } from 'react';

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [card, setCard] = useState(false);

  return (
    <CardContext.Provider value={{ card, setCard }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCard must be used within a CardProvider');
  }
  return context;
};
