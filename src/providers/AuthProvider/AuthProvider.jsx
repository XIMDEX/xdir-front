import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import Swal from 'sweetalert2';
import { XPopUp } from '@ximdex/xui-react/material';
import { COOKIE_NAME } from '../../../CONSTATNS';
import { loginXDIR } from '../../service/xdir.service';

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


  async function logoutUser() {
    // await userManagementApi.post('logout','', {bearerToken: token})
    //   .then((response => {
    //     sessionStorage.setItem(`${COOKIE_NAME}`, JSON.stringify({}))
    //     setIsAuthenticated(false);
    //     setIsAdmin(false);
    //     setIsSuperAdmin(false);
    //     navigate('/login?logout=true');
    //   }))
    //   .catch((error) => {
    //     XPopUp({
    //       type: 'error',
    //       title: 'Logout error',
    //       text: 'An error has occurred while logging out, try again...',
    //       position: 'top-end',
    //       showConfirmButton: false,
    //       timer: 3000
    //     })
    //   });
  }

  async function forceLogout() {
    deleteLocalStorage()
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsSuperAdmin(false);
    navigate('/login');
  }

  const deleteLocalStorage = () => {
    localStorage.setItem(`${COOKIE_NAME}`, JSON.stringify({}))
  }

  //Revoca el token, lo borra del localStorage y navega a la pagina de logout
  const logout = async () => {
    Swal.fire({
      title: 'Log out',
      text: "Are you sure you want to log out?",
      icon: 'warning',
      confirmButtonText: 'Yes',
      showCancelButton: true,
      cancelButtonColor: '#43a1a2',
      confirmButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    })
  };


  const saveUserData = (user) => {
    localStorage.setItem(`${COOKIE_NAME}`, JSON.stringify(user))
    setUser(user)
    setIsSuperAdmin(user?.roles?.some(role => role.name === "superAdmin"));
    setIsAdmin(user?.roles?.some(role => role.name === "admin"));
    setIsAuthenticated(true)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, isSuperAdmin, logout, forceLogout, user, saveUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;