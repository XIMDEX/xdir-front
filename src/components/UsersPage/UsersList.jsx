import { useSpinner } from "@ximdex/xui-react/hooks";
import React, { useContext, useEffect, useState } from "react";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import { XPopUp, XRow, XRowContent, XRowDetails, XRowExtraDetails } from "@ximdex/xui-react/material";
import { faKey, faTrash } from "@fortawesome/free-solid-svg-icons";
import { StyledFlexFullCenter, StyledXModal } from "../../components/styled-compontent/Container";
import { assignRoleToUser, deleteExistingUser, getRoles, getUser, getUsers, getXimdexTools } from "../../service/xdir.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModals, { XDirModalRoles } from "../../hooks/useModals";
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import { CircularProgress } from "@mui/material";
import { Key, KeyIcon, KeyRound, Trash } from "lucide-react";

export default function UsersList() {
    const { isSuperAdmin } = useAuth()
    const [usersList, setUsersList] = useState([])
    const [userDetails, setUserDetails] = useState([])
    const [fetchingUser, setFetchingUser] = useState([])
    const {XDirModal, executeXPopUp} = useModals()
    const [loading, setLoading] = useState(false)
    const { showSpinner, hideSpinner } = useSpinner()
    const [refreshList, setRefreshList] = useState(false)
    const [roleAssignModal, setRolesAssignModal] = useState({
      open: false,
      user: undefined,
    })

    useEffect(() => {
        getExistingUsers()
    }, [refreshList]);


    const getExistingUsers = async () => {
        setLoading(true)
        showSpinner()
        const res = await getUsers()
        setUsersList(res?.users.data ?? [])
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
  
    const confirmNewRoles = async (userRoles) => {
      showSpinner()
      const res =  await assignRoleToUser(userRoles)
      executeXPopUp(res, "Role/s assigned successfully")
      setRefreshList(!refreshList)
    }

    const assignRoles = async (user, index) => {
      let userSelected = undefined
      showSpinner()
      const res = await getUser(user.uuid);
      userSelected = res.user
      hideSpinner()
      setRolesAssignModal(
        {
          open: true,
          user: userSelected,
        }
      )
    }

    const showUserDetails = async (user, index) => {
      if (!userDetails[index]?.uuid) {
        let copy = [...fetchingUser];
        copy[index] = true;
        setFetchingUser(copy);
    
        // Fetch user details
        const res = await getUser(user.uuid);
    
        let userDetailsCopy = [...userDetails];
        userDetailsCopy[index] = res.user;
        setUserDetails(userDetailsCopy);
    
        copy = [...fetchingUser];
        copy[index] = false;
        setFetchingUser(copy);
      }

    }


  return <>
    {loading ?  <></> :
          <>
            {usersList?.length === 0 ? 
              <StyledFlexFullCenter>
                <p>No users have joined yet.</p>
              </StyledFlexFullCenter>
            :
              <>
                {usersList?.map((user, index) => (
                  <XRow
                      style={{
                          background: 'rgb(247, 247, 247)',
                          width: '100%'
                      }}
                      key={'row' + index}
                      identifier={user.uuid}
                      isCollapsable={true}
                      functionButtonCollapsable={() => showUserDetails(user, index)}
                      labelButtonCollapsable={`Show details`}
                      controls={[
                        {
                            component:<StyledGreenButtonIcon 
                                      onClick={() => assignRoles(user, index)}
                                      title='Assign roles'
                                      >
                                        <KeyRound size={20}/>
                                    </StyledGreenButtonIcon>
                        },
                        {
                            component:<StyledRedButtonIcon title='Delete user' onClick={() => deleteUser(user.uuid, user.email)}>
                                      <Trash size={20}/>
                                    </StyledRedButtonIcon>
                        }
                      ]}
                  >
                    <XRowContent key={"XRowContent" + index}>
                      <p>{user?.name + ' ' + user?.surname}</p>
                    </XRowContent>

                    {fetchingUser[index] 
                      ? 
                        <XRowDetails
                            key={"XRowDetails_loading"}
                            style={{justifyContent:'center'}}
                            // controlsDetails={[]}
                        >
                            <CircularProgress color='primary' size={'50px'} style={{padding: '10px'}}/>
                        </XRowDetails>
                      :
                      <React.Fragment key="XRowDetails">
                          <XRowDetails key={"XRowDetails" + index}>
                            <p><strong>Email:</strong> {userDetails[index]?.email}</p>
                          </XRowDetails>
                          <XRowDetails key={"XRowDetails" + index}>
                          <p><strong>Organizations: </strong> 
                            {userDetails[index]?.organizations && Object.keys(userDetails[index]?.organizations).length > 0 ? (
                              Object.entries(userDetails[index]?.organizations).map(([id, name]) => name).join(', ')
                            ) : (
                              <span>No organizations assigned yet</span>
                            )}
                          </p>
                          </XRowDetails>
                      </React.Fragment>    
                    }
                  </XRow>
                ))}
              </>
            }
          {/*ASSIGNACION DE ROLES*/}
           <StyledXModal
              isOpen={roleAssignModal?.open}
              ariaHideApp={false}
            >
              <div style={{height: '500px', width:'600px'}} className={`animate__animated ${roleAssignModal.open ? 'animate__fadeInUp animate__faster' : 'animate__fadeOutDown animate__faster'}`}>
                <XDirModalRoles
                  setOpenModal={() => setRolesAssignModal({...roleAssignModal, open:false})}
                  subtitle={`Assign role to user ${roleAssignModal?.user?.email}`}
                  title='Assign role'
                  userSelected={roleAssignModal.user}
                  confirmButton={confirmNewRoles}
                  isSuperAdmin={isSuperAdmin}
                />
              </div>
            </StyledXModal>

          </>  
      }
  </>;
}
