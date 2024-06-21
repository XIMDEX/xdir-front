import React, {useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {XContainer, XLogin}  from '@ximdex/xui-react/material';
import LoginImage from '../assets/logotipo_ximdex-DIR-small.png';
import { styled } from "@mui/system";
import { loginXDIR } from '../service/xdir.service';
import { FAKE_USER } from '../../CONSTATNS';
import useAuth from '@ximdex/xui-react/hooks/useAuth';


export const StyledXLogin = styled(XLogin)`
    width: auto !important;
    height: auto !important;
    padding-bottom: 2em;

    &:hover{
        border: 1px solid #43a1a2 !important;
    }   

    img{
        margin-bottom: 1em;
        width: 300px !important;
    }
`

export const StyledExtraActions = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    height: auto;
    width: 100%;

    p{
        margin: 10px 0 0 0;
        color:  #214f61;
        cursor: pointer;
        transition: all 1s ease;

        &:hover{
            text-decoration: underline;
        }
    }
`


const Login = () => {
    const {saveUserData, isAuthenticated } = useAuth()

    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate('/')
    }, [isAuthenticated]);


    const navigateToPage = () => {
        navigate('/home')
    }

  //Actualiza el estado de autenticacion
  const handleLogin = async (email, password) => {
    const res = await loginXDIR(email,password)
    if(res.error) return res;
    saveUserData({
        ...res.user,
    })
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
                handleLogin={handleLogin}
                loginExtraActions={
                    <StyledExtraActions>
                        <p style={{marginBottom: '10px'}} onClick={() => navigate('/email_verification')}>Forgot your password?</p>
                        {/* <p onClick={() => navigate('/register')} style={{marginBottom: '10px'}}>Don't have an account?</p> */}
                    </StyledExtraActions>
                }
            />
        </XContainer>
    )
}

export default Login
