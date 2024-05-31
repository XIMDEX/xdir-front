import { useSpinner } from "@ximdex/xui-react/hooks";
import React, { useContext, useEffect, useState } from "react";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import { XPopUp, XRowContent, XRowDetails, XRowExtraDetails } from "@ximdex/xui-react/material";
import { faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { StyledFlexFullCenter, StyledXModal, StyledXRow } from "../../components/styled-compontent/Container";
import { assignRoleToUser, deleteExistingUser, getRoles, getUser, getUsers, getXimdexTools } from "../../service/xdir.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModals, { XDirModalRoles } from "../../hooks/useModals";
import AuthContext from "../../providers/AuthProvider/AuthContext";

export default function UsersList({
  organizations
}) {
    const { isSuperAdmin } = useContext(AuthContext)
    const [usersList, setUsersList] = useState([])
    const {XDirModal, executeXPopUp} = useModals()
    const [loading, setLoading] = useState(false)
    const { showSpinner, hideSpinner } = useSpinner()
    const [refreshList, setRefreshList] = useState(false)
    const [roleAssignModal, setRolesAssignModal] = useState({
      open: false,
      user: undefined,
      roles: undefined,
      tools: undefined,
      organizations: undefined
    })

    useEffect(() => {
        buildDropdowns()
        getExistingUsers()
    }, [refreshList, isSuperAdmin]);

    const buildDropdowns = async () => {
        const resRoles = await getRoles()
        const resTools = await getXimdexTools()
        if(resRoles.error || resTools.error){
            XPopUp({
            text: res?.error,
            iconType:'error',
            timer:'3000',
            popUpPosition:'top',
            iconColor: 'red',
            timer: 3000
            })
        }
        setRolesAssignModal({
            ...roleAssignModal,
            organizations: organizations,
            roles: resRoles?.roles?.map(rol => ({ value: rol.uuid, label: rol.name })),
            tools: resTools?.tools?.map(tool => ({ value: tool.uuid, label: tool.name, disabled: tool?.label === 'superadmin' && !isSuperAdmin}))
          }
        )
    }

    const getExistingUsers = async () => {
        setLoading(true)
        showSpinner()
        const res = await getUsers()
        setUsersList(res?.users ?? [])
        hideSpinner()
        setLoading(false)
    }

    const deleteUser = async (userId, userEmail) => {
      XDirModal({
          text:`Are you sure you want to delete ${userEmail}?`,
          title:'Delete user',
          confirmButtonColor:'#e13144',
          onConfirmFunction: async () => {
            const res = await deleteExistingUser(userId)
            executeXPopUp(res, "User deleted successfully")
            setRefreshList(!refreshList)
          }
        })
    }
  
    const confirmNewRoles = async (organizationSelected, toolSelected, roleSelected) => {
      showSpinner()
      const body = {
        user_uuid: roleAssignModal.user.uuid,
        organization_uuid: organizationSelected,
        tool_uuid: toolSelected,
        role_uuid: [roleSelected]
      }
      const res =  await assignRoleToUser(body)
      executeXPopUp(res, "Role/s assigned successfully")
      setRefreshList(!refreshList)
    }

    const assignRoles = async (user) => {
      setRolesAssignModal(
        {
          ...roleAssignModal,
          open: true,
          user: {email:user.email, uuid:user.uuid},
        }
      )
    }

    const showUserDetails = async (user) => {
      const res = await getUser(user.uuid)
      console.log(res);
    }

  return <>
    {loading ?  <></> :
          <>
            {usersList.length === 0 ? 
              <StyledFlexFullCenter>
                <p>No users have joined yet.</p>
              </StyledFlexFullCenter>
            :
              <>
                {usersList.map((user, index) => (
                  <StyledXRow
                      style={{
                          background: 'rgb(247, 247, 247)',
                          width: '100%'
                      }}
                      key={'row' + index}
                      identifier={user.uuid}
                      isCollapsable={true}
                      functionButtonCollapsable={() => showUserDetails(user)}
                      labelButtonCollapsable={`Show details`}
                      controls={[
                        {
                            component:<StyledGreenButtonIcon 
                                      disabled={!roleAssignModal?.organizations || !roleAssignModal.tools || !roleAssignModal.roles}
                                      onClick={() => assignRoles(user)}>
                                        <FontAwesomeIcon icon={faKey} size='1x' title='Assign roles' />
                                    </StyledGreenButtonIcon>
                        },
                        {
                            component:<StyledRedButtonIcon onClick={() => deleteUser(user.uuid, user.email)}>
                                        <FontAwesomeIcon icon={faTrash} size='1x' title='Delete user' />
                                    </StyledRedButtonIcon>
                        }
                      ]}
                  >
                    <XRowContent key={"XRowContent" + index}>
                      <p>{user?.name + ' ' + user?.surname}</p>
                    </XRowContent>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Email:</strong> {user?.email}</p>
                    </XRowDetails>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Organizations:</strong> {user?.organizations}</p>
                    </XRowDetails>
                    <XRowExtraDetails key={"XRowExtraDetails" + index}
                      extraDetails={[
                        {
                            label: 'User ID',
                            type: 'text',
                            value: user?.uuid
                        }
                      ]}
                    />
                     
                  </StyledXRow>
                ))}
              </>
            }

          {/*ASSIGNACION DE ROLES*/}
           <StyledXModal
              isOpen={roleAssignModal?.open}
              ariaHideApp={false}
            >
              <div style={{height: '400px'}} className={`animate__animated ${roleAssignModal.open ? 'animate__fadeInUp animate__faster' : 'animate__fadeOutDown animate__faster'}`}>
                <XDirModalRoles
                  setOpenModal={() => setRolesAssignModal({...roleAssignModal, open:false})}
                  subtitle={`Assign role to user ${roleAssignModal?.user?.email}`}
                  title='Assign role'
                  confirmButton={confirmNewRoles}
                  isSuperAdmin={isSuperAdmin}
                  organizations={roleAssignModal.organizations}
                  roles={roleAssignModal.roles}
                  tools={roleAssignModal.tools}
                />
              </div>
            </StyledXModal>

          </>  
      }
  </>;
}
