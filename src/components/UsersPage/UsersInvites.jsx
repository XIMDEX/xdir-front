import { useSpinner } from "@ximdex/xui-react/hooks";
import React, { useEffect, useState } from "react";
import { deleteInvitation, getUserInvitations } from "../../service/xdir.service";
import { StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import {XRow, XRowContent, XRowDetails } from "@ximdex/xui-react/material";
import { StyledDivFlexBetween, StyledFlexFullCenter } from "../../components/styled-compontent/Container";
import { StyledTagStatus } from "../styled-compontent/Text";
import useModals from "../../hooks/useModals";
import { Trash } from "lucide-react";

export default function UsersInvites() {
    const [invitesList, setInvitesList] = useState([])
    const [loading, setLoading] = useState(false)
    const { showSpinner, hideSpinner } = useSpinner()
    const [refreshList, setRefreshList] = useState(false)
    const {XDirModal, executeXPopUp} = useModals()

    useEffect(() => {
        getInvites()
      }, [refreshList]);

    const getInvites = async () => {
        setLoading(true)
        showSpinner()
        const res = await getUserInvitations()
        setInvitesList(res?.invitations ?? [])
        hideSpinner()
        setLoading(false)
    }


    const removeInvite = async (inviteId, inviteEmail) => {
      XDirModal({
          text:`Are you sure you want to delete this invite to ${inviteEmail}?`,
          title:'Delete invite',
          confirmButtonColor:'#e13144',
          onConfirmFunction: async () => {
            const res = await deleteInvitation(inviteId)
            executeXPopUp(res, "Invite deleted successfully")
            if(!res.error) setRefreshList(!refreshList)
          }
        })
    }


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
                {invitesList.map((invite, index) => (
                  <XRow
                      style={{
                          borderBottom: index === (invitesList.length - 1) ? '1px solid #BBBBBB' : '',
                          background: 'rgb(247, 247, 247)',
                          width: '100%'
                      }}
                      key={'row' + index}
                      identifier={invite.id}
                      controls={[
                        {
                            component:<StyledRedButtonIcon  title='Remove invite' onClick={() => removeInvite(invite.id, invite.email)}>
                                        <Trash size={20}/>
                                    </StyledRedButtonIcon>
                        },
                      ]}
                  >
                    <XRowContent key={"XRowContent" + index} style={{width: '100%'}}>
                      <StyledDivFlexBetween>
                        <p><strong>User invited:</strong> {invite?.email}</p>
                        <StyledTagStatus status={invite.status}>
                          {invite.status.toUpperCase()}
                        </StyledTagStatus>
                      </StyledDivFlexBetween>
                    </XRowContent>
                  </XRow>
                ))}
              </>
            }
          </>  
      }
  </>;
}
