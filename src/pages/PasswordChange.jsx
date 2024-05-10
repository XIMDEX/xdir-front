import React, { useContext, useEffect, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledXCard, StyledXRadio } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faLock, faPaperPlane, faPen, faSave, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { XButton, XInput } from "@ximdex/xui-react/material";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { GENDER_OPTIONS } from "../../CONSTATNS";
import _ from "lodash";

export default function PasswordChange() {
  const [emailVerified, setEmailVerified] = useState(false)



  return (
    <>
      {!emailVerified
      ? <VerificationEmailForm
          setEmailVerified={setEmailVerified}
        /> 
      : <NewPasswordForm/>}
    </>
    );
}



const VerificationEmailForm = ({
  setEmailVerified
}) => {
  const {user} = useContext(AuthContext);
  const [verificationCode, setVerificationCode] = useState('')
  const [email, setEmail] = useState(user?.email ?? '')

  const sendVerificationCode = () => {
    setEmailVerified(true)
  }
  const getVerificationCode = () => {

  }

  return(
    <StyledXCard
    title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faLock} style={{marginRight: '10px'}}/>CHANGE PASSWORD</p>}
    style={{height: 'auto', width: '50%', margin: '2em auto'}}
    controls={[
      {
        component:
            <XButton
                onClick= {() => sendVerificationCode()}
                title="Send verification code"
                disabled={verificationCode === ''}
            >
                <FontAwesomeIcon icon={faPaperPlane} style={{marginRight: '10px'}}/> 
                SEND CODE
            </XButton>
    }
    ]}
  >
    <StyledMarginContent>
      <p>Get the verification code to be able to change your password:</p>
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
      <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
        <label style={{marginBottom: '-10px'}}>Varification code</label>
        <XInput 
            id="verification_code"
            value={verificationCode} 
            onChange={(e) => setVerificationCode(e.target.value)}
            type="text" 
            size='medium' 
            fullWidth
        />
      </StyledDivCenterY>
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
        style={{height: 'auto', width: '50%', margin: '2em auto'}}
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