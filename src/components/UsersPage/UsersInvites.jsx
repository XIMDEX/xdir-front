import { useSpinner } from "@ximdex/xui-react/hooks";
import React, { useEffect, useState } from "react";
import { getUserInvitations, getUsers } from "../../service/xdir.service";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import { XButton, XPopUp, XRowContent, XRowDetails } from "@ximdex/xui-react/material";
import { faEdit, faPlus, faTrash, faUsers } from "@fortawesome/free-solid-svg-icons";
import { StyledFlexFullCenter, StyledXRow } from "../../components/styled-compontent/Container";

export default function UsersInvites() {
    const [invitesList, setInvitesList] = useState([])
    const [loading, setLoading] = useState(false)
    const { showSpinner, hideSpinner } = useSpinner()
    const [refreshList, setRefreshList] = useState(false)

    useEffect(() => {
        getInvites()
      }, [refreshList]);

    const getInvites = async () => {
        setLoading(true)
        showSpinner()
        const res = await getUserInvitations()
        setInvitesList(res?.users ?? [])
        hideSpinner()
        setLoading(false)
    }

    const deleteInvite = () => {}


  return <>
    {loading 
        ? 
         <></>
        :
          <>
            {invitesList.length === 0 ? 
              <StyledFlexFullCenter>
                <p>No invites have been sent yet. Invite a new user using the button on the right corner of the box!</p> 
              </StyledFlexFullCenter>
            :
              <>
                {invitesList.map((user, index) => (
                  <StyledXRow
                      style={{
                          borderBottom: index === (invitesList.length - 1) ? '1px solid #BBBBBB' : '',
                          background: 'rgb(247, 247, 247)',
                          width: '100%'
                      }}
                      key={'row' + index}
                      identifier={user.uuid}
                      isCollapsable={true}
                      labelButtonCollapsable={`Show invite details`}
                      controls={[
                        {
                            component:<StyledRedButtonIcon onClick={() => deleteOrganization(user.uuid, user.name)}>
                                        <FontAwesomeIcon icon={faTrash} size='1x' title='Delete invite' />
                                    </StyledRedButtonIcon>
                        },
                      ]}
                  >
                    <XRowContent key={"XRowContent" + index}>
                      <p><strong>Id:</strong> {user?.uuid} - {user?.name + ' ' + user?.surname}</p>
                    </XRowContent>
                  </StyledXRow>
                ))}
              </>
            }
          </>  
      }
  </>;
}
