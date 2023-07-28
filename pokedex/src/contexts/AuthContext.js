import React, { createContext, useState, useContext, useEffect } from "react";
import { recuperarTreinadorDoLocalStorage } from "../utils/recuperaTreinador";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const treinador = recuperarTreinadorDoLocalStorage();
    if(treinador === null){
      setIsAuthenticated(false);
    }else{
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
