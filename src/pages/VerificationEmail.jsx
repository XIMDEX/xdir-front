import React, { useContext, useEffect, useState } from "react";
import { StyledDivCenterY, StyledFlexFullCenter, StyledMarginContent, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faLock, faSave } from "@fortawesome/free-solid-svg-icons";
import { XButton, XInput } from "@ximdex/xui-react/material";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { verifyChangePassowordCode, verifyEmailCode, verifyEmailSendCode } from "../service/xdir.service";
import { CircularProgress } from "@mui/material";
import useModals from "../hooks/useModals";
import useFormValidator from "../hooks/useFormValidatior";
import { useSpinner } from "@ximdex/xui-react/hooks";

export default function VerificationEmail() {
  const [emailVerified, setEmailVerified] = useState(false)
  const { token, action } = useParams();


  return (
    <>
        {!emailVerified
        ? <VerificationEmailForm
            action={action}
            token={token}
            setEmailVerified={setEmailVerified}
          /> 
        : <NewPasswordForm 
            token={token}
            setEmailVerified={setEmailVerified}
        />}
    </>
    );
}

const VerificationEmailForm = ({
  setEmailVerified,
  token,
  action
}) => {
  const {user, saveUserData} = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email ?? '')
  const [loadingVerification, setLoadingVerification] = useState(false)
  const navigate = useNavigate()
  const {executeXPopUp} = useModals()

  useEffect(() => {
    verifyEmail()
  }, []);

  const getVerificationCode = async () => {
    const res = await verifyEmailSendCode(email)
    executeXPopUp(res, 'An email has been sent to your address. Please wait a few minutes for it to arrive.')
  }

  /** SEND VERIFICATION CODE TO BACKEND */
  const verifyEmail = async () => {
    if(token){
      setLoadingVerification(true)
      if(action === 'register'){
        const res = await verifyEmailCode(action, token)
        executePopUp(res,'Email has been verified.')
        if(!res?.error) navigate('/login')
      }else{
        setEmailVerified(true)
      }
      setLoadingVerification(false)
    }
  }


  return(
    <StyledXCard
      title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faLock} style={{marginRight: '10px'}}/>EMAIL VERIFICATION</p>}
      style={{height: 'auto', width: '80%', margin: '2em auto'}}
      >
    <StyledMarginContent>
      {loadingVerification ? 
        <StyledFlexFullCenter>
          Loading verification...
          <CircularProgress style={{marginLeft: '5px'}} size={20}/> 
        </StyledFlexFullCenter>
      : 
        <>
          <p>Get the verification code to be able to complete your action:</p>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-10px'}}>Email</label>
            <StyledDivCenterY style={{width: '100%'}}>
              <XInput 
                id="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                fullWidth
                size='medium' 
              />
              <XButton
                title="Get verification code"
                size="large"
                onClick={getVerificationCode}
                disabled={email === ''}
                style={{width: '22%', marginLeft:'1em'}}
              >
                GET CODE
              </XButton>
            </StyledDivCenterY>
            
          </StyledDivCenterY>
      </>
        }

      </StyledMarginContent>
    </StyledXCard>
  )

  
}

const NewPasswordForm = ({
  token,
  setEmailVerified
}) => {
  const {user, forceLogout} = useContext(AuthContext)
  const passwordInit = {
    token: token,
    email: user?.email ?? "",
    password: "",
    password_confirmation: ""
  }

  const [userPassword, setUserPassword] = useState(passwordInit)
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [error, setError] = useState('');
  const {validatePassword, validateEmail} = useFormValidator()
  const {executeXPopUp} = useModals()
  const {showSpinner, hideSpinner} = useSpinner()

    useEffect(() => {
      if(userPassword.password !== '' || userPassword.email !== ''){
          const validationPassword = validatePassword(userPassword.password)
          if(!validationPassword.length || !validationPassword.hasLowerCase || !validationPassword.hasUpperCase || !validationPassword.hasNumber){
              setError("Passwords are incorrect format");
          }else if(userPassword.password !== userPassword.password_confirmation){
              setError('Passwords dont match');
          } else if (!validateEmail(userPassword.email)){
              setError('Insert a valid email address');
          }else{
              setError('')
          }
      }      
  },[userPassword])



  const onInputChange = (e) => {
    setUserPassword({
        ...userPassword,
        [e.target.id]: e.target.value
    });
  }

  const changePassowrd = async () => {
    showSpinner()
    const res = await verifyChangePassowordCode(userPassword)
    executeXPopUp(res,'Passoword reset successfully.')
    if(!res.error) {
      setTimeout(() => {
        forceLogout()
      }, 1000)
    }else{
      setEmailVerified(false)
    }
    hideSpinner()
  }

  return <StyledXCard
        title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faLock} style={{marginRight: '10px'}}/>CHANGE PASSWORD</p>}
        style={{height: 'auto', width: '80%', margin: '2em auto'}}
        controls={[
          {
            component:
                <XButton
                    onClick= {() => changePassowrd()}
                    title="Update user"
                    disabled={userPassword.password === '' || userPassword.password_confirmation === '' || error !== ''}
                >
                    <FontAwesomeIcon icon={faSave} style={{marginRight: '10px'}}/> 
                    UPDATE
                </XButton>
        }
        ]}
      >
        <StyledMarginContent>
          <p>Set new password:</p>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-10px'}}>Email</label>
            <XInput 
              id="email"
              value={userPassword.email} 
              onChange={(e) => onInputChange(e)}
              type={'text'} 
              size='medium' 
              fullWidth
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-10px'}}>New Password</label>
            <XInput 
              placeholder="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols." title="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols."
              id="password"
              value={userPassword.password} 
              onChange={(e) => onInputChange(e)}
              type={passwordVisibility ? 'text' : 'password'} 
              size='medium' 
              fullWidth
              InputProps={{
                endAdornment: (
                  <XButton
                    onClick={() => setPasswordVisibility((prevState) => !prevState)}
                    variant='text'
                    style={{ fontSize: '1em', minWidth: 'unset', width: '2em', marginLeft: '0.5em' }}
                  >
                    <FontAwesomeIcon
                      style={{cursor:'pointer', fontSize:'15px'}}
                      size='1x'
                      icon={passwordVisibility ? faEye : faEyeSlash}
                    />
                  </XButton>
                )
              }} 
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-10px'}}>Repeat password</label>
            <XInput 
              placeholder="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols." title="Use 8 or more characters with a mix of uppercase letters, lowercase letters, numbers and symbols."
              id="password_confirmation"
              value={userPassword.password_confirmation} 
              onChange={(e) => onInputChange(e)}
              type={passwordVisibility ? 'text' : 'password'} 
              size='medium' 
              fullWidth
              InputProps={{
                endAdornment: (
                  <XButton
                    onClick={() => setPasswordVisibility((prevState) => !prevState)}
                    variant='text'
                    style={{ fontSize: '1em', minWidth: 'unset', width: '2em', marginLeft: '0.5em' }}
                  >
                    <FontAwesomeIcon
                      style={{cursor:'pointer', fontSize:'15px'}}
                      size='1x'
                      icon={passwordVisibility ? faEye : faEyeSlash}
                    />
                  </XButton>
                )
              }} 
            />
          </StyledDivCenterY>
          {error !== '' && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
        </StyledMarginContent>
      </StyledXCard>
}