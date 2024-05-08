import React, { useContext, useEffect, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledXCard, StyledXRadio } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faLock, faPen, faSave, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { XButton, XInput } from "@ximdex/xui-react/material";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { GENDER_OPTIONS } from "../../CONSTATNS";
import _ from "lodash";

export default function PasswordChange() {
  const passwordInit = {
    password: "",
    password_confirmation: ""
  }
  const {user} = useContext(AuthContext);
  const [userPassword, setUserPassword] = useState(passwordInit)
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [error, setError] = useState('');

  const onInputChange = (e) => {
    setUserPassword({
        ...userPassword,
        [e.target.id]: e.target.value
    });
  }

  const changePassowrd = () => {

  }

  useEffect(() => {
    if(userPassword.password !== userPassword.password_confirmation){
        setError('Passwords dont match');
    } else {
        setError('');
    }
  },[userPassword])


  return (
  <StyledXCard
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
                    SAVE
                </XButton>
        }
        ]}
      >
        <StyledMarginContent>
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

    );
}
