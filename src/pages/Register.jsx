import React, { useContext, useEffect, useState } from 'react';
import { XInput, XButton, XBox, XPopUp } from '@ximdex/xui-react/material';
import {useNavigate, useSearchParams } from "react-router-dom";
import { StyledForm, StyledDivSVG, StyledSVG } from '../components/styled-compontent/FormStyles';
import { StyledXCardRegister, StyledXCard, StyledFlexFullCenter } from '../components/styled-compontent/Container';
import { registerXDIR } from '../service/xdir.service';
import ximdexLogo from "../assets/logotipo_ximdex-DIR-small.png"
import { CircularProgress } from '@mui/material';
import AuthContext from '../providers/AuthProvider/AuthContext';
import { FAKE_USER } from '../../CONSTATNS';

function Register() { 
    const {saveUserData} = useContext(AuthContext)
    let [searchParams] = useSearchParams();
    const client = searchParams.get("client");    
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [clientName, setClientName] = useState(null);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        birthdate: "",
        email: "",
        password:"",
        password_confirmation: "",
        idClient: null,

    })
    const {name, surname, birthdate, email, password, password_confirmation} = user;
    
    const navigate = useNavigate();

    
    //Comprueba que las contraseñas coinciden
    useEffect(() => {
        if(password !== password_confirmation){
            setError('Passwords dont match');
        } else {
            setError('');
        }
    },[password_confirmation, password])

    //Actualiza el objeto user con los datos del formulario
    const onInputChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    }

    //Envia el formulario
    function handleSubmit(event){
        event.preventDefault();
        register();
    }

    //Envia los datos al servidor
    const register = async() => {
        setIsLoading(true);

        let copyUser = user;
        
        Object.keys(copyUser).forEach(key => copyUser[key] == null && delete copyUser[key]);

        const user_res = await registerXDIR(copyUser)
        console.log(user_res);
        if(user_res?.errors){
        // if(false){
            setIsLoading(false)
            setUser({
                ...user,
                password: '',
                password_confirmation: '',
            });
            XPopUp({
                type: 'error',
                title: 'Register Error',
                text: user_res?.message ?? "An error has occurred while regiter, verify your data and try again.",
                position: 'top-center',
                showConfirmButton: false,
                timer: 3000
            })
        }else{
            setIsLoading(false)
            console.log(user_res?.user);
            // saveUserData(user_res.user)
            // saveUserData(FAKE_USER)
            // navigate('/')
        }
        setIsLoading(false)
    }

    return (

        <StyledXCardRegister 
        style={{flexDirection: 'column'}}>
            <img src={ximdexLogo} style={{width: '250px'}}/>
            <p style={{marginBottom: 0}}>Enter your information:</p>
            <StyledForm onSubmit={handleSubmit}>
                {clientName ? <Alert icon={false} severity="info">Register for client: {clientName}</Alert> : null}
                <XInput id='name' type='text' label='Name' required={true} size='small' fullWidth value={name} onChange={(e) => onInputChange(e)} />
                <XInput id='surname' type='text' label='Surname' required={true} size='small' fullWidth value={surname} onChange={(e) => onInputChange(e)} />
                <XInput id='birthdate' type='date' required size='small' fullWidth value={birthdate} onChange={(e) => onInputChange(e)} />
                <XInput id='email' type='text' label='Email' required size='small' fullWidth value={email} onChange={(e) => onInputChange(e)} />
                <XInput id='password' type='password' label='Password' required size='small' fullWidth value={password} onChange={(e) => onInputChange(e)} />
                <XInput id='password_confirmation' type='password' label='Repeat Password' required size='small' fullWidth value={password_confirmation} onChange={(e) => onInputChange(e)} />
                <p style={{ color: 'red', textAlign:'center', visibility: error === '' ? 'hidden' : 'visible' }}>{error}</p>
                {isLoading ? 
                    <StyledFlexFullCenter><CircularProgress size={20}/></StyledFlexFullCenter>
                    : <XButton onClick={register} size='small'>Register</XButton>}
            </StyledForm>
        </StyledXCardRegister> 
    ); 
} 
export default Register; 