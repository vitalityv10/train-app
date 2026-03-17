import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [registeredUsers, setRegisteredUsers] = useState([
    { id: 1, name: 'Admin', age: 20, city: 'Kyiv' }
  ]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const registerUser = (newUser) => {
    setRegisteredUsers((prev) => [...prev, newUser]);
    login(newUser); 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, registerUser, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);