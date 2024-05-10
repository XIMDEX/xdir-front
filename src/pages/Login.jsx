import React, {useContext, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {XContainer, XLogin}  from '@ximdex/xui-react/material';
import LoginImage from '../assets/logotipo_ximdex-DIR-small.png';
import { styled } from "@mui/system";
import AuthContext from '../providers/AuthProvider/AuthContext';
import { loginXDIR } from '../service/xdir.service';
import { FAKE_USER } from '../../CONSTATNS';


export const StyledXLogin = styled(XLogin)`
    width: auto !important;
    height: auto !important;

    &:hover{
        border: 1px solid #43a1a2 !important;
    }   

    img{
        margin-bottom: 1em;
        width: 300px !important;
    }
`

const Login = () => {
    const {saveUserData} = useContext(AuthContext)
    const navigate = useNavigate();

    const navigateToPage = () => {
        navigate('/')
    }

  //Actualiza el estado de autenticacion
  const handleLogin = async (email, password) => {
    const res = await loginXDIR(email,password)
    if(res.error) return res;
    // saveUserData(res.user)
    saveUserData(FAKE_USER)
    navigateToPage();
  };

  const handleFALKLogin = async (email, password) => {
    saveUserData(FAKE_USER)
    navigateToPage();
  };

    return (
        <XContainer
            style={{
                width: "100%",
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: 'column'
            }}
        >
            <StyledXLogin 
                rounded={false}
                hasLogo 
                srcLogo={LoginImage}
                handleLogin={handleFALKLogin}
            />
        </XContainer>
    )
}

export default Login
