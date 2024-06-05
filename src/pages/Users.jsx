import React, { useContext, useEffect, useState } from "react";
import { StyledMarginContent, StyledTabsContainer, StyledXCard, StyledXModal } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUsers } from "@fortawesome/free-solid-svg-icons";
import { XButton } from "@ximdex/xui-react/material";
import { getOrganizations, sendRegisterInvite } from "../service/xdir.service";
import useModals, { XDirModalInvitation } from "../hooks/useModals";
import { USER_TABS } from "../../CONSTATNS";
import CustomTabs from "../components/CustomTabs/CustomTabs";
import UsersList from "../components/UsersPage/UsersList";
import UsersInvites from "../components/UsersPage/UsersInvites";



export default function Users() {
  const {executeXPopUp} = useModals()
  const [tabSelected, setTabSelected] = useState(USER_TABS[0])
  const [inviteModal, setInviteModal] = useState(false)
  const [organizations, setOrganizations] = useState([])

  const sendInvitation = async (organizationID, email) => {
    const res = await sendRegisterInvite(organizationID, email)
    executeXPopUp(res,"Invite sent successfully" )
  }

  useEffect(() => {
      getOrganizationOptions()
  }, []);

  const getOrganizationOptions = async () => {
      const res = await getOrganizations()
      let options = res?.map(org => ({ value: org.uuid, label: org.name }));
      setOrganizations(options)
  }

  return (
    <StyledXCard
    title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faUsers} style={{marginRight: '10px'}}/>USERS</p>}
    style={{height: 'auto', width: '80%', margin: '2em auto'}}
    controls={[
      {
          component:
              <XButton
                  onClick={() => setInviteModal(true)}
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
          {/* ENVIAR INVITACION*/}
      <StyledXModal
        isOpen={inviteModal}
        ariaHideApp={false}
      >
        <div className={`animate__animated ${inviteModal ? 'animate__fadeInUp animate__faster' : 'animate__fadeOutDown animate__faster'}`} style={{height:'280px'}}>
          <XDirModalInvitation
            setOpenModal={setInviteModal}
            subtitle={'Send a email to a new user'}
            title='INVITE USER'
            confirmButton={sendInvitation}
            organizations={organizations}
          />
        </div>
      </StyledXModal>
  </StyledXCard>

  );
}
