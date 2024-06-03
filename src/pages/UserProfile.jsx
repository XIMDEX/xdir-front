import React, { useContext, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faKey, faPen, faSave, faTrash, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { XButton, XInput } from "@ximdex/xui-react/material";
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import _ from "lodash";
import { updateUserXDIR } from "../service/xdir.service";
import { useSpinner } from "@ximdex/xui-react/hooks";
import useModals from "../hooks/useModals";
import { StyledRedXButton } from "../components/styled-compontent/Buttons";
import { ROLES } from "../../CONSTATNS";

export default function UserProfile() {
  const {user, saveUserData, forceLogout,
    canSearch,
    canRead,
    canCreate,
    canUpdate,
    canRemove,
    isAdmin,
    isSuperAdmin
  } = useAuth()
  const rolesMappping = {
    canSearch,
    canRead,
    canCreate,
    canUpdate,
    canRemove,
    isAdmin,
    isSuperAdmin
  }
  const {executeXPopUp, XDirModal} = useModals()
  const [canEdit, setCanEdit] = useState(false)
  const [userForm, setUserForm] = useState({...user})
  const {showSpinner, hideSpinner} = useSpinner()

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

  const removeUnusedFields = (user, userForm) => {
    return _.reduce(userForm, (result, value, key) => {
        if (!_.isEqual(value, user[key])) {
            result[key] = value;
        }
        return result;
    }, {});
  };

  const updateUserData = async () => {
    showSpinner()
    const res = await updateUserXDIR(removeUnusedFields(user, userForm), user.uuid)
    executeXPopUp(res, 'User information updated successfully.' )
    if(!res?.error) saveUserData(res.user)
    setCanEdit(false)
    hideSpinner()
  }

  const deleteUserAccount = async () => {
    XDirModal({
        text:`Are you sure you want to delete your account?`,
        title:'Delete account',
        confirmButtonColor:'#e13144',
        onConfirmFunction: async () => {
          const res = await deleteExistingUser(user.uuid)
          executeXPopUp(res, "Account deleted successfully")
          if(!res.error) forceLogout()
        }
      })
  }

  const showUserActiveRoles = () => {
    const activeRoles = ROLES
      .filter(role => rolesMappping[role.state])
      .map(role => role.name);

    if (activeRoles.length === 0) {
      return 'No roles assigned';
    } else if (activeRoles.length === 1) {
      return activeRoles[0];
    } else {
      const lastRole = activeRoles.pop();
      return `${activeRoles.join(', ')} and ${lastRole}`;
    }
  };


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
              disabled={true}
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
            {showUserActiveRoles()}        
            </p>       
          </StyledDivCenterY>
          <StyledRedXButton
              onClick= {() => deleteUserAccount()}
              title="Delete account"
          >
              <FontAwesomeIcon icon={faTrash} style={{marginRight: '10px'}}/> 
              DELETE ACCOUNT
          </StyledRedXButton>
        </StyledMarginContent>
      </StyledXCard>

    );
}
