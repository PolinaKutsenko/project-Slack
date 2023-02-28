import React, { useState } from 'react';
import { AuthContext } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser
    ? { username: currentUser.username, token: currentUser.token }
    : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };
  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => (user?.token ? { Authorization: `Bearer ${user.token}` } : {});

  return (
    <AuthContext.Provider value={{
      user, logIn, logOut, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
