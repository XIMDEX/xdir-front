import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import { COOKIE_NAME } from '../../../CONSTATNS';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [user, setUser] = useState({});
  
  const getUserFromStorage = () => {
    return localStorage.getItem(COOKIE_NAME) ? JSON.parse(localStorage.getItem(COOKIE_NAME)) : {} 
  }
  const navigate = useNavigate();
  const location = useLocation()


  useEffect(() => {
    const usrFromStorage = getUserFromStorage();
    if(usrFromStorage?.access_token) {
      setIsAuthenticated(true);
      setIsSuperAdmin(usrFromStorage?.roles?.some(role => role.name === "superAdmin"));
      setIsAdmin(usrFromStorage?.roles?.some(role => role.name === "admin"));
      setUser(usrFromStorage)
      navigate(location.pathname)

    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsSuperAdmin(false);
    }
  },[])

  useEffect(() => {
    if(isAuthenticated) navigate('/home')
  },[isAuthenticated])


  const forceLogout = () => {
    deleteLocalStorage()
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    navigate('/login');
  }

  const deleteLocalStorage = () => {
    localStorage.setItem(`${COOKIE_NAME}`, JSON.stringify({}))
  }

  const saveUserData = (user) => {
    localStorage.setItem(`${COOKIE_NAME}`, JSON.stringify(user))
    setUser(user)
    setIsSuperAdmin(user?.roles?.some(role => role.name === "superAdmin"));
    setIsAdmin(user?.roles?.some(role => role.name === "admin"));
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, isSuperAdmin, forceLogout, user, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;