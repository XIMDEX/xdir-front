import { useSpinner } from "@ximdex/xui-react/hooks";
import React, { useEffect, useState } from "react";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import { XButton, XPopUp, XRowContent, XRowDetails } from "@ximdex/xui-react/material";
import { faEdit, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { StyledFlexFullCenter, StyledXRow } from "../../components/styled-compontent/Container";
import { getUsers } from "../../service/xdir.service";

export default function UsersList() {
    const [usersList, setUsersList] = useState([])
    const [loading, setLoading] = useState(false)
    const { showSpinner, hideSpinner } = useSpinner()
    const [refreshList, setRefreshList] = useState(false)

    useEffect(() => {
        // getExistingUsers()
      }, [refreshList]);

    const getExistingUsers = async () => {
        setLoading(true)
        showSpinner()
        const res = await getUsers()
        setUsersList(res?.users ?? [])
        hideSpinner()
        setLoading(false)
    }

    const deleteUser = () => {}

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
                            component:<StyledRedButtonIcon onClick={() => deleteOrganization(user.uuid, user.name)}>
                                        <FontAwesomeIcon icon={faTrash} size='1x' title='Delete user' />
                                    </StyledRedButtonIcon>
                        },
                      ]}
                  >
                    <XRowContent key={"XRowContent" + index}>
                      <p><strong>Id:</strong> {user?.uuid} - {user?.name + ' ' + user?.surname}</p>
                    </XRowContent>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Email:</strong> {user?.email}</p>
                    </XRowDetails>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Roles:</strong> {user?.roles}</p>
                    </XRowDetails>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Organizations:</strong> {user?.organizations}</p>
                    </XRowDetails>
                  </StyledXRow>
                ))}
              </>
            }
          </>  
      }
  </>;
}
