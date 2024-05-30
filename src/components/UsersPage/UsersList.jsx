import { useSpinner } from "@ximdex/xui-react/hooks";
import React, { useContext, useEffect, useState } from "react";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import { XButton, XPopUp, XRowContent, XRowDetails, XRowExtraDetails } from "@ximdex/xui-react/material";
import { faEdit, faKey, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { StyledFlexFullCenter, StyledXModal, StyledXRow } from "../../components/styled-compontent/Container";
import { assignRoleToUser, deleteExistingUser, getUser, getUsers } from "../../service/xdir.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModals, { XDirModalRoles } from "../../hooks/useModals";
import AuthContext from "../../providers/AuthProvider/AuthContext";

export default function UsersList({
  organizations
}) {
    const { isSuperAdmin } = useContext(AuthContext)
    const [usersList, setUsersList] = useState([])
    const {XDirModal} = useModals()
    const [loading, setLoading] = useState(false)
    const { showSpinner, hideSpinner } = useSpinner()
    const [refreshList, setRefreshList] = useState(false)
    const [roleAssignModal, setRolesAssignModal] = useState({
      open: false,
      user: undefined
    })

    useEffect(() => {
        getExistingUsers()
      }, [refreshList]);

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
            await deleteExistingUser(userId)
            setRefreshList(!refreshList)
          }
        })
    }
  
    const confirmNewRoles = async (rolesSelected) => {
      const res =  await assignRoleToUser(roleAssignModal?.user.roles?.uuid, rolesSelected.map(rol => rol.value))
      executeXPopUp(res, "Role/s assigned successfully")
      setRefreshList(!refreshList)
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
                      labelButtonCollapsable={`Show details`}
                      controls={[
                        {
                            component:<StyledGreenButtonIcon onClick={() => setRolesAssignModal({open: true, user: {email:user.email, uuid:user.uuid}})}>
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
                  setOpenModal={setRolesAssignModal}
                  subtitle={`Assign role to user ${roleAssignModal?.user?.email}`}
                  title='Assign role'
                  confirmButton={confirmNewRoles}
                  organizations={organizations}
                  isSuperAdmin={isSuperAdmin}
                />
              </div>
            </StyledXModal>

          </>  
      }
  </>;
}
