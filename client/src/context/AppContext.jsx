import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [message, setMessage] = useState('');

  return <AppContext.Provider value={{ message, setMessage }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
