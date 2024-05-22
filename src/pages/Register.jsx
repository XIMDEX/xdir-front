import React, { useContext, useEffect, useState } from 'react';
import { XInput, XButton, XBox, XPopUp } from '@ximdex/xui-react/material';
import {useNavigate } from "react-router-dom";
import { StyledForm } from '../components/styled-compontent/FormStyles';
import { StyledXCardRegister, StyledFlexFullCenter } from '../components/styled-compontent/Container';
import { registerXDIR } from '../service/xdir.service';
import ximdexLogo from "../assets/logotipo_ximdex-DIR-small.png"
import { CircularProgress } from '@mui/material';
import AuthContext from '../providers/AuthProvider/AuthContext';
import { FAKE_USER } from '../../CONSTATNS';
import useFormValidator from '../hooks/useFormValidatior';

function Register() { 
    const {saveUserData} = useContext(AuthContext)
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: "",
        surname: "",
        birthdate: "",
        email: "",
        password:"",
        password_confirmation: "",
    })
    const {name, surname, birthdate, email, password, password_confirmation} = user;
    const {validatePassword, validateEmail} = useFormValidator()
    
    const navigate = useNavigate();

    
    //Comprueba contraseñas
    useEffect(() => {
        if(password !== '' || email !== ''){
            const validationPassword = validatePassword(password)
            if(!validationPassword.length || !validationPassword.hasLowerCase || !validationPassword.hasUpperCase || !validationPassword.hasNumber){
                setError("Password should contain at least one lowercase letter, one uppercase letter, and one number.");
            }else if(password !== password_confirmation){
                setError('Passwords dont match');
            } else if (!validateEmail(email)){
                setError('Insert a valid email address');
            }else{
                setError('')
            }
        }
        
        
    },[password_confirmation, password, email])

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
        if(user_res?.error){
            setIsLoading(false)
            setUser({
                ...user,
                password: '',
                password_confirmation: '',
            });
            XPopUp({
                text: user_res?.error,
                iconType:'error',
                timer:'3000',
                popUpPosition:'top',
                iconColor: 'red',
                timer: 3000
              })
        }else{
            setIsLoading(false)
            saveUserData(user_res.user)
            navigate('/')
        }
    }


    const fakeRegister = () => {
        saveUserData(FAKE_USER)
        navigate('/')
    }

    return (

        <StyledXCardRegister 
        style={{flexDirection: 'column'}}>
            <img src={ximdexLogo} style={{width: '250px'}}/>
            <p style={{marginBottom: 0}}>Enter your information:</p>
            <StyledForm onSubmit={handleSubmit} >
                <XInput id='name' type='text' label='Name' required={true} size='small' fullWidth value={name} onChange={(e) => onInputChange(e)} />
                <XInput id='surname' type='text' label='Surname' required={true} size='small' fullWidth value={surname} onChange={(e) => onInputChange(e)} />
                <XInput id='birthdate' type='date' required size='small' fullWidth value={birthdate} onChange={(e) => onInputChange(e)} />
                <XInput id='email' type='text' label='Email' required size='small' fullWidth value={email} onChange={(e) => onInputChange(e)} />
                <XInput id='password' type='password' label='Password' required size='small' fullWidth value={password} onChange={(e) => onInputChange(e)} />
                <XInput id='password_confirmation' type='password' label='Repeat Password' required size='small' fullWidth value={password_confirmation} onChange={(e) => onInputChange(e)} />
                <p style={{ color: 'red', textAlign:'center', visibility: error === '' ? 'hidden' : 'visible' }}>{error}</p>
                <p onClick={() => navigate('/login')} className='login-link'>Already have an account?</p>
        
                {isLoading 
                ? <StyledFlexFullCenter><CircularProgress size={20}/></StyledFlexFullCenter>
                : 
                    <XButton 
                        onClick={register} 
                        size='small'
                        // disabled={error !== ''}
                    >
                        Register
                    </XButton>
                }

                    
            </StyledForm>
        </StyledXCardRegister> 
    ); 
} 
export default Register; 