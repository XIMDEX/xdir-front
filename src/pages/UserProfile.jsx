import React, { useContext, useEffect, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendar, faEye, faEyeSlash, faGenderless, faKey, faPen, faPerson, faSave, faTransgender, faUser, faUserCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import { XButton, XInput, XPopUp } from "@ximdex/xui-react/material";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { GENDER_OPTIONS } from "../../CONSTATNS";
import _ from "lodash";
import { updateUserXDIR } from "../service/xdir.service";

export default function UserProfile() {
  const {user} = useContext(AuthContext);
  const [canEdit, setCanEdit] = useState(false)
  const [userForm, setUserForm] = useState({...user})

  const handleCanEdit = () => {
    if(canEdit){
      setUserForm({...user})
      setCanEdit(false)
    }else{
      setCanEdit(true)
    }
  }

  const onInputChange = (e) => {
    setUserForm({
        ...userForm,
        [e.target.id]: e.target.value
    });
  }


  const updateUserData = async () => {
    const res = await updateUserXDIR(user)
    if(res?.error){
      XPopUp({
        text: res?.error,
        iconType:'error',
        timer:'3000',
        popUpPosition:'top',
        iconColor: 'red',
        timer: 3000
      })
    }else{
      XPopUp({
        type: 'success',
        text: "User information updated successfully.",
        position: 'top',
        showConfirmButton: false,
        iconColor: 'lightgreen',
        timer: 3000
      })
      saveUserData(res.user)
    }
  }

  return (
  <StyledXCard
        title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faUser} style={{marginRight: '10px'}}/>USER INFORMATION</p>}
        style={{height: 'auto', width: '80%', margin: '2em auto'}}
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
                    onClick= {() => updateUserData()}
                    title="Update user"
                >
                    <FontAwesomeIcon icon={faSave} style={{marginRight: '10px'}}/> 
                    SAVE
                </XButton>
        }
        ]}
      >
        <StyledMarginContent>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1.5em'}}>
            <label style={{marginBottom: '-5px'}}>
              Name
            </label>
            <XInput 
              id='name' 
              type='text' 
              disabled={!canEdit}
              size='medium' 
              fullWidth
              value={userForm.name} 
              onChange={(e) => onInputChange(e)}
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1.5em'}}>
            <label style={{marginBottom: '-5px'}}>
              Surname
            </label>
            <XInput 
              id='surname' 
              type='text' 
              disabled={!canEdit}
              size='medium' 
              fullWidth
              value={userForm.surname} 
              onChange={(e) => onInputChange(e)}
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1.5em'}}>
            <label style={{marginBottom: '-5px'}}>
              Email
            </label>
            <XInput 
              id='email' 
              type='text' 
              disabled={!canEdit}
              size='medium' 
              fullWidth
              value={userForm.email} 
              onChange={(e) => onInputChange(e)}
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1.5em'}}>
            <label style={{marginBottom: '-5px'}}>
              Birth date
            </label>
            <XInput 
              id='birthdate'
              type='date'
              disabled={!canEdit}
              size='medium' 
              fullWidth
              value={userForm.birthdate} 
              onChange={(e) => onInputChange(e)}
            />
          </StyledDivCenterY>
          <StyledDivCenterY style={{flexDirection:'column', alignItems:'flex-start', marginBottom: '1em'}}>
            <label style={{marginBottom: '-5px'}}>
              <FontAwesomeIcon size="1x" icon={faKey} style={{marginRight: '10px'}}/>
              {user?.roles?.length === 1 ? "Role assigned: " : "Roles assigned: "}
            </label>
            <p style={{marginRight:'1em'}}> 
            {user?.roles?.length > 0 ? (
                  user?.roles?.map((role, i) => (
                      <span key={i}>
                      {role?.name.toUpperCase()}
                      {user.roles?.length === i + 1 ? "" :
                          user.roles?.length - 1 === i + 1 ? " and " : ", "}
                      </span>
                  ))
                  ) : (
                  <span>No roles assigned</span>
                  )}        
            </p>       
          </StyledDivCenterY>
        </StyledMarginContent>
      </StyledXCard>

    );
}
