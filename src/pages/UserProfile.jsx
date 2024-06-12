import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import _ from "lodash";
import { StyledRedXButton } from "../components/styled-compontent/Buttons";
import UserInformation from "../components/UserProfile/UserInformation";
import UserRoles from "../components/UserProfile/UserRoles";
import { StyledFlexFullCenter } from "../components/styled-compontent/Container";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function UserProfile() {
  const {user, saveUserData} = useAuth()

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


  return (
    <StyledFlexFullCenter style={{
      flexDirection: 'column'
    }}>
      <UserInformation
        user={user}
        saveUserData={saveUserData}
      />
      <UserRoles
        user={user}
      />
      <StyledRedXButton
          style={{alignSelf: 'flex-start', marginLeft:'11em', marginTop: '1em'}}
          onClick= {() => deleteUserAccount()}
          title="Delete account"
      >
          <FontAwesomeIcon icon={faTrash} style={{marginRight: '10px'}}/> 
          DELETE ACCOUNT
      </StyledRedXButton>
    </StyledFlexFullCenter>
);}


