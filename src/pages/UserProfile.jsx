import React from "react";
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import _ from "lodash";
import { StyledRedXButton } from "../components/styled-compontent/Buttons";
import UserInformation from "../components/UserProfile/UserInformation";
import UserRoles from "../components/UserProfile/UserRoles";
import { StyledFlexFullCenter } from "../components/styled-compontent/Container";
import { Trash } from "lucide-react";

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
        <Trash size={20} style={{marginRight: '10px'}}/>
          DELETE ACCOUNT
      </StyledRedXButton>
    </StyledFlexFullCenter>
);}


