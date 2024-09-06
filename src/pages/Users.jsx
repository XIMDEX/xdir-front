import React, { useEffect, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledTabsContainer, StyledXCard, StyledXModal } from "../components/styled-compontent/Container";
import { XButton } from "@ximdex/xui-react/material";
import { getOrganizations, sendRegisterInvite,createNewOrganization } from "../service/xdir.service";
import useModals, { XDirModalInvitation,XDirModalCreateOrganization } from "../hooks/useModals";
import { USER_TABS } from "../../CONSTATNS";
import CustomTabs from "../components/CustomTabs/CustomTabs";
import UsersList from "../components/UsersPage/UsersList";
import UsersInvites from "../components/UsersPage/UsersInvites";
import { Send, Users2 } from "lucide-react";
import { fontSize } from "@mui/system";
import OrganizationList from "../components/OrganizationPage/OrganizationList";



export default function Users() {
  const {executeXPopUp} = useModals()
  const [tabSelected, setTabSelected] = useState(USER_TABS[0])
  const [inviteModal, setInviteModal] = useState(false)
  const [createOrganizationModal, setCreateOrganizationModal] = useState(false)
  const [organizations, setOrganizations] = useState([])

  

  const sendInvitation = async (organizationID, email) => {
    const res = await sendRegisterInvite(organizationID, email)
    executeXPopUp(res,"Invite sent successfully" )
    setTabSelected("")
    setTabSelected("Groups")
  }

  const createOrganization = async (name) => {
    const res = await createNewOrganization(name)
    executeXPopUp(res, "Organization created successfully")
    getOrganizationOptions()
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
    title={<StyledDivCenterY>
      <Users2 size={30} style={{ marginRight: '10px' }}/>
      <p>
        Groups
      </p>
    </StyledDivCenterY>}
    style={{height: 'auto', width: '80%', margin: '2em auto'}}
    controls={[
      {
          component:
              <XButton
                  onClick={() => setInviteModal(true)}
                  title="Invite new user"
                  style={{marginLeft: '10px', width: '160px'}}
              >
                  <Send size={20} style={{marginRight: '10px'}}/>
                  Invite User
              </XButton>
              
      },
      {
        component:
              <XButton
                  onClick={() => setCreateOrganizationModal(true)}
                  style={{marginLeft: '10px', width: '200px'}}
                  title="Create group"
              >
                  <Users2 size={20} style={{ marginRight: '10px' }}/>
                  Create Group
              </XButton>
      }
    ]}
  >
    <StyledMarginContent>
      <CustomTabs
        tabs={USER_TABS}
        setTabSelected={setTabSelected}
      />
      <StyledTabsContainer>
        {tabSelected === 'Groups' && <OrganizationList/>}
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
      <StyledXModal
        isOpen={createOrganizationModal}
        ariaHideApp={false}
      >
        <div className={`animate__animated ${createOrganizationModal ? 'animate__fadeInUp animate__faster' : 'animate__fadeOutDown animate__faster'}`} style={{height:'280px'}}>
          <XDirModalCreateOrganization setOpenModal={setCreateOrganizationModal} title='CREATE GROUP' subtitle='Please provide a name for the new group.' confirmButton={createOrganization} />
        </div>
      </StyledXModal>
  </StyledXCard>

  );
}
