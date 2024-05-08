import React, { useContext, useEffect, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledXCard, StyledXRadio } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faPen, faSave, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { XButton, XInput } from "@ximdex/xui-react/material";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { GENDER_OPTIONS } from "../../CONSTATNS";
import _ from "lodash";

export default function UserProfile() {
  const {user} = useContext(AuthContext);
  const [canEdit, setCanEdit] = useState(false)
  const [userForm, setUserForm] = useState({...user})
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const handleCanEdit = () => {
    if(canEdit){
      setUserForm({...user})
      setCanEdit(false)
    }else{
      setCanEdit(true)
    }
  }

  const onInputChange = (e, key) => {
    setUserForm({
        ...userForm,
        [key ? key : e.target.id]: e.target.value
    });
}

  return (
  <StyledXCard
        title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faUser} style={{marginRight: '10px'}}/>USER INFORMATION</p>}
        style={{height: '100%'}}
        controls={[
          {
              component:
                  <XButton
                      style={{marginRight: '10px'}}
                      onClick= {() => handleCanEdit()}
                      title="Edit information"
                  >
                      <FontAwesomeIcon icon={canEdit ? faXmark :faPen} style={{marginRight: '10px'}}/> 
                      {canEdit ? 'CANCEL' : 'EDIT'}
                  </XButton>
          },
          {
            component:
                <XButton
                    disabled={_.isEqual(user, userForm)}
                    onClick= {() => modifyOptions('delete', optionIndex)}
                    title="Update user"
                >
                    <FontAwesomeIcon icon={faSave} style={{marginRight: '10px'}}/> 
                    SAVE
                </XButton>
        }
        ]}
      >
        <StyledMarginContent>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-10px'}}>Full name</label>
            <XInput 
              id='name' 
              type='text' 
              disabled={!canEdit}
              size='medium' 
              style={{width: '40%'}}
              value={userForm.name} 
              onChange={(e) => onInputChange(e)}
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-10px'}}>Date</label>
            <XInput 
              id='birth_date'
              type='date'
              disabled={!canEdit}
              size='medium' 
              style={{width: '40%'}}
              value={userForm.birthdate} 
              onChange={(e) => onInputChange(e)}
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-10px'}}>New Password (Complete only if want to change the password)</label>
            <XInput 
              disabled={!canEdit}
              value={userForm.password} 
              onChange={(e) => onInputChange(e)}
              type={passwordVisibility ? 'text' : 'password'} 
              size='medium' 
              style={{width: '40%'}}
              InputProps={{
                endAdornment: (
                  <XButton
                    disabled={!canEdit}
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
            <label style={{marginBottom: '-10px'}}>Gender</label>
            <StyledXRadio
                key="gender"
                disabled={!canEdit}
                direction="row"
                value={GENDER_OPTIONS.filter(option => option.value === userForm.gender)[0]?.value}
                onChange={(e) => onInputChange(e, 'gender')}
                options={GENDER_OPTIONS}
              />
          </StyledDivCenterY>
        </StyledMarginContent>
      </StyledXCard>

    );
}
