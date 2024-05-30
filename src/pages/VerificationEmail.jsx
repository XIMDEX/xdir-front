import React, { useContext, useEffect, useState } from "react";
import { StyledDivCenterY, StyledFlexFullCenter, StyledMarginContent, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faLock, faSave } from "@fortawesome/free-solid-svg-icons";
import { XButton, XInput, XPopUp } from "@ximdex/xui-react/material";
import AuthContext from "../providers/AuthProvider/AuthContext";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmailCode, verifyEmailSendCode } from "../service/xdir.service";
import { CircularProgress } from "@mui/material";
import useModals from "../hooks/useModals";

export default function VerificationEmail() {
  const [emailVerified, setEmailVerified] = useState(false)
  const { code, action } = useParams();


  return (
    <>
        {!emailVerified
        ? <VerificationEmailForm
            action={action}
            code={code}
            setEmailVerified={setEmailVerified}
          /> 
        : <NewPasswordForm/>}
    </>
    );
}



const VerificationEmailForm = ({
  setEmailVerified,
  code,
  action
}) => {
  const {user, saveUserData} = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email ?? '')
  const [loadingVerification, setLoadingVerification] = useState(false)
  const navigate = useNavigate()
  const {executePopUp} = useModals()

  useEffect(() => {
    verifyEmail()
  }, []);

  const getVerificationCode = async () => {
    const res = await verifyEmailSendCode(email)
    executePopUp(res, 'An email has been sent to your address.')
  }

  /** SEND VERIFICATION CODE TO BACKEND */
  const verifyEmail = async () => {
    if(code){
      setLoadingVerification(true)
      const res = await verifyEmailCode(action, code)
      executePopUp(res,'Email has been verified.')
      if(!res?.error && action === 'register')navigate('/login')
      if(!res?.error && action === 'password_change') setEmailVerified(true)
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

}) => {
  const passwordInit = {
    password: "",
    password_confirmation: ""
  }

  const [userPassword, setUserPassword] = useState(passwordInit)
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [error, setError] = useState('');


  useEffect(() => {
    if(userPassword.password !== userPassword.password_confirmation){
        setError('Passwords dont match');
    } else {
        setError('');
    }
  },[userPassword])


  const onInputChange = (e) => {
    setUserPassword({
        ...userPassword,
        [e.target.id]: e.target.value
    });
  }

  const changePassowrd = () => {

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
            <label style={{marginBottom: '-10px'}}>New Password</label>
            <XInput 
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