import { useSpinner } from "@ximdex/xui-react/hooks";
import React, { useEffect, useState } from "react";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import { XButton, XPopUp, XRowContent, XRowDetails, XRowExtraDetails } from "@ximdex/xui-react/material";
import { faEdit, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { StyledFlexFullCenter, StyledXRow } from "../../components/styled-compontent/Container";
import { deleteExistingUser, getUsers } from "../../service/xdir.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModals from "../../hooks/useModals";

export default function UsersList() {
    const [usersList, setUsersList] = useState([])
    const {XDirModal} = useModals()
    const [loading, setLoading] = useState(false)
    const { showSpinner, hideSpinner } = useSpinner()
    const [refreshList, setRefreshList] = useState(false)

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

    const modifyUserRoles = () => {
  
    }


  return <>
    {loading 
        ? 
         <></>
        :
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
                          borderBottom: index === (usersList.length - 1) ? '1px solid #BBBBBB' : '',
                          background: 'rgb(247, 247, 247)',
                          width: '100%'
                      }}
                      key={'row' + index}
                      identifier={user.uuid}
                      isCollapsable={true}
                      labelButtonCollapsable={`Show details`}
                      controls={[
                        {
                            component:<StyledRedButtonIcon onClick={() => deleteUser(user.uuid, user.email)}>
                                        <FontAwesomeIcon icon={faTrash} size='1x' title='Delete user' />
                                    </StyledRedButtonIcon>
                        },
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
          </>  
      }
  </>;
}
