import React, { useContext, useEffect, useState } from 'react';
import { XInput, XButton, XPopUp } from '@ximdex/xui-react/material';
import {useNavigate, useSearchParams } from "react-router-dom";
import { StyledForm } from '../components/styled-compontent/FormStyles';
import { StyledXCardRegister, StyledFlexFullCenter } from '../components/styled-compontent/Container';
import { registerXDIR } from '../service/xdir.service';
import ximdexLogo from "../assets/logotipo_ximdex-DIR-small.png"
import { CircularProgress } from '@mui/material';
import useFormValidator from '../hooks/useFormValidatior';
import useModals from '../hooks/useModals'

function Register() { 
    let [searchParams] = useSearchParams();
    const { organization, email: inviteEmail } = Object.fromEntries(searchParams)
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
    const {XDirModal} = useModals();
    const navigate = useNavigate();

    //Obtiene el dato de la organizacion  al cargar
    useEffect(() => {
        setUser({
            ...user,
            email: inviteEmail,
            organization: organization,
        });
    },[])
    
    //Comprueba contraseñas
    useEffect(() => {
        if(password !== '' || email !== ''){
            const validationPassword = validatePassword(password)
            if(!validationPassword.length || !validationPassword.hasLowerCase || !validationPassword.hasUpperCase || !validationPassword.hasNumber){
                setError("Passwords are incorrect format");
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
            console.log(user_res);
            XDirModal({
                text:`Please check your email to verify your address and complete the registration process. Don't forget to check your spam folder if you don't see the email!`,
                title:'Email confirmation',
                confirmButtonColor:'#e13144',
                showCancelButton: false,
                onConfirmFunction: async () => await deleteExistingOrganization(organizationID)
              })
        }
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
                <XInput id='email' disabled type='text' label='Email' required size='small' fullWidth value={email} onChange={(e) => onInputChange(e)} />
                <XInput id='password' type='password' label='Password' required size='small' placeholder="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols." title="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols." fullWidth value={password} onChange={(e) => onInputChange(e)} />
                <XInput id='password_confirmation' type='password' label='Repeat Password' placeholder="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols." title="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols." required size='small' fullWidth value={password_confirmation} onChange={(e) => onInputChange(e)} />
                <p style={{ color: 'red', textAlign:'center', visibility: error === '' ? 'hidden' : 'visible' }}>{error}</p>
                <p onClick={() => navigate('/login')} className='login-link'>Already have an account?</p>
        
                {isLoading 
                ? <StyledFlexFullCenter><CircularProgress size={20}/></StyledFlexFullCenter>
                : 
                    <XButton 
                        onClick={register} 
                        size='small'
                        disabled={error !== '' || email === '' || surname === ''}
                    >
                        Register
                    </XButton>
                }

                    
            </StyledForm>
        </StyledXCardRegister> 
    ); 
} 
export default Register; 