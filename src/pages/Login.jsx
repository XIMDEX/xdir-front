import React, {useContext, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {XContainer, XLogin}  from '@ximdex/xui-react/material';
import LoginImage from '../assets/ximdex-logo-poweredby.png';
import { styled } from "@mui/system";
import AuthContext, { useAuth } from '../providers/AuthProvider/AuthContext';
import { loginXDIR } from '../service/xdir.service';
import { COOKIE_NAME, FAKE_USER } from '../../CONSTATNS';


export const StyledXLogin = styled(XLogin)`
    width: auto !important;
    height: auto !important;

    border-radius: 0;
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
    const [loginStatus, setLoginStatus] = useState('');

    const navigateToPage = () => {
        navigate('/')
    }

  //Actualiza el estado de autenticacion
  const handleLogin = async (email, password) => {
    // const res = await loginXDIR(email,password)
    // console.log("RES",res);
    // if(res.error) return res;
    // saveUserData(res.user)
    saveUserData(FAKE_USER)
    setLoginStatus('Login success. Loading user data, please wait.');
    navigateToPage();
  };

    const RenderStatus = () => {
        if (typeof loginStatus === 'string') {
            return (
            <p style={{ textAlign: 'center', marginTop: 10 }}>{loginStatus}</p>
            );
        }
        return (
            <ul>
            {' '}
            {Object.keys(loginStatus).map((item, i) => (
                <li key={i}>{loginStatus[item][0]}</li>
            ))}{' '}
            </ul>
        );
    }
    

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
                hasLogo 
                srcLogo={LoginImage}
                handleLogin={handleLogin}
            />
            <RenderStatus />
        </XContainer>
    )
}

export default Login
