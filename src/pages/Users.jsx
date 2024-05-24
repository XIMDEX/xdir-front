import React, { useContext, useEffect, useState } from "react";
import { StyledMarginContent, StyledTabsContainer, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUsers } from "@fortawesome/free-solid-svg-icons";
import { XButton, XPopUp } from "@ximdex/xui-react/material";
import { sendRegisterInvite } from "../service/xdir.service";
import useModals from "../hooks/useModals";
import useFormValidator from "../hooks/useFormValidatior";
import { USER_TABS } from "../../CONSTATNS";
import CustomTabs from "../components/CustomTabs/CustomTabs";
import UsersList from "../components/UsersPage/UsersList";
import UsersInvites from "../components/UsersPage/UsersInvites";



export default function Users() {
  const {XDirModalInput} = useModals()
  const {validateEmail} = useFormValidator()
  const [tabSelected, setTabSelected] = useState(USER_TABS[0])


  const inviteNewUser = async () => {
    const newUserEmail = await XDirModalInput({
      title: 'INVITE',
      input: 'text',
      inputLabel: "Send an invitation to a new user",
      inputPlaceholder: 'Enter the user\'s email address',
      inputValidator: (value) => {
        if (!validateEmail(value)) {
          return "Please enter a valid email address";
        }
      },
    })
    if(newUserEmail){
      const res = await sendRegisterInvite(newUserEmail)
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
          text: "Invite sent successfully",
          iconType:'success',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'lightgreen',
          timer: 3000
        })
      }
    }
  }


  return (
    <StyledXCard
    title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faUsers} style={{marginRight: '10px'}}/>USERS</p>}
    style={{height: 'auto', width: '80%', margin: '2em auto'}}
    controls={[
      {
          component:
              <XButton
                  onClick={inviteNewUser}
                  title="Invite new user"
              >
                  <FontAwesomeIcon icon={faPaperPlane} style={{marginRight: '10px'}}/> 
                  Invite User
              </XButton>
      },
    ]}
  >
    <StyledMarginContent>
      <CustomTabs
        tabs={USER_TABS}
        setTabSelected={setTabSelected}
      />
      <StyledTabsContainer>
        {tabSelected === 'Users' && <UsersList/>}
        {tabSelected === 'Invites' && <UsersInvites/>}
      </StyledTabsContainer>
    </StyledMarginContent>
  </StyledXCard>



  );
}
