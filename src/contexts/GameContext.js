import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(() => {
    // Get initial score from localStorage if it exists
    const savedScore = localStorage.getItem('gameScore');
    return savedScore ? parseInt(savedScore) : 0;
  });

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('gameScore', score.toString());
  }, [score]);

  const incrementScore = (amount) => {
    setScore(prevScore => prevScore + amount);
  };

  return (
    <GameContext.Provider value={{ score, incrementScore }}>
      {children}
    </GameContext.Provider>
  );
}; 