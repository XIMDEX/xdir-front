import React, { useContext, useEffect, useState } from "react";
import { StyledFlexFullCenter, StyledMarginContent, StyledXCard, StyledXRow } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPaperPlane, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { XButton, XPopUp, XRowContent, XRowDetails } from "@ximdex/xui-react/material";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import { useSpinner } from '@ximdex/xui-react/hooks';
import { getUsers } from "../service/xdir.service";
import useModals from "../hooks/useModals";
import useFormValidator from "../hooks/useFormValidatior";



export default function Users() {
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshList, setRefreshList] = useState(false)
  const { showSpinner, hideSpinner } = useSpinner()
  const {XDirModalInput} = useModals()
  const {validateEmail} = useFormValidator()

  useEffect(() => {
    // getExistingUsers()
  }, [refreshList]);


  const getExistingUsers = async () => {
    setLoading(true)
    showSpinner()
    const res = await getUsers()
    setUsersList(res?.users)
    hideSpinner()
    setLoading(false)
  }

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

  const deleteUser = () => {}

  const modifyUserRoles = () => {

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
    </StyledMarginContent>
  </StyledXCard>



  );
}
