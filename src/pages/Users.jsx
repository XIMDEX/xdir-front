import React, { useContext, useEffect, useState } from "react";
import { StyledFlexFullCenter, StyledMarginContent, StyledXCard, StyledXRow } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faEdit, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { XButton, XPopUp, XRowContent } from "@ximdex/xui-react/material";
import AuthContext from "../providers/AuthProvider/AuthContext";
import { createNewOrganization, deleteExistingOrganization, updateExistingOrganization } from "../service/xdir.service";
import useSweetAlert from '../hooks/useSweetAlert';
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import { useSpinner } from '@ximdex/xui-react/hooks';


const fakeUSR = [
  {
    name: 'Federico',
    username: 'Garcia',
    email: 'fedengarcia@gmail.com',
    roles: ['CEO, jefe'],
    uiid: '123123123'
  }
]

export default function Users() {
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshList, setRefreshList] = useState(false)
  const {XDirModalInput, XDirModal} = useSweetAlert()
  const { showSpinner, hideSpinner } = useSpinner()

  const createUser = () => {}

  const deleteUser = () => {}

  return (
    <StyledXCard
    title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faUsers} style={{marginRight: '10px'}}/>USERS</p>}
    style={{height: 'auto', width: '80%', margin: '2em auto'}}
    controls={[
      {
          component:
              <XButton
                  onClick={createUser}
                  title="Create new user"
              >
                  <FontAwesomeIcon icon={faPlus} style={{marginRight: '10px'}}/> 
                  Create
              </XButton>
      },
    ]}
  >
    <StyledMarginContent>
      {loading 
        ? 
         <></>
        :
          <>
            {usersList.length === 0 ? <p>No users created yet.</p>
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
                      identifier={organization.uuid}
                      isCollapsable={true}
                      labelButtonCollapsable={`Show users`}
                      controls={[
                        {
                            component:<StyledRedButtonIcon onClick={() => deleteOrganization(user.uuid, user.name)}>
                                        <FontAwesomeIcon icon={faTrash} size='1x' title='Delete user' />
                                    </StyledRedButtonIcon>
                        },
                      ]}
                  >
                    <XRowContent key={"XRowContent" + index}>
                      <p><strong>Name:</strong> {user.name}</p>
                    </XRowContent>
                  </StyledXRow>
                ))}
              </>
            }
          </>  
      }
    </StyledMarginContent>
  </StyledXCard>



  );
}
