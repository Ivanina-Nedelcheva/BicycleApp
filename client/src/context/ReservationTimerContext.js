import React, { createContext, useContext, useState, useEffect } from 'react';

export const ReservationTimerContext = createContext();

export const ReservationTimerProvider = ({ children }) => {
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    let timerInterval;

    if (endTime) {
      timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const newRemainingTime = endTime - currentTime;

        if (newRemainingTime > 0) {
          setRemainingTime(newRemainingTime);
        } else {
          clearInterval(timerInterval);
        }
      }, 100);

      return () => clearInterval(timerInterval);
    }
  }, [endTime]);

  const startTimer = (duration) => {
    const newEndTime = Date.now() + duration;
    setEndTime(newEndTime);
  };

  const contextValue = {
    remainingTime,
    startTimer,
  };

  return (
    <ReservationTimerContext.Provider value={contextValue}>
      {children}
    </ReservationTimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(ReservationTimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a ReservationTimerProvider');
  }
  return context;
};
