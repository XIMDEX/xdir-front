import React, { useEffect, useState } from "react";
import { StyledFlexFullCenter, StyledMarginContent, StyledXCard, StyledXRow } from "../components/styled-compontent/Container";
import { XButton, XRowContent } from "@ximdex/xui-react/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faSchool, faTrash } from "@fortawesome/free-solid-svg-icons";
import useSweetAlert from '../hooks/useSweetAlert';
import { CircularProgress } from "@mui/material";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import { createNewClient, deleteExistingClient } from "../service/xdir.service";

const fakeClients = [
  {
    name: 'FAKE - MHE',
    uuid: '1'
  }
]


export default function Clients() {
  const [clientList, setClientList] = useState(fakeClients)
  const {XDirModalInput, XDirModal} = useSweetAlert()
  const [loading, setLoading] = useState(false)
  const [refreshList, setRefreshList] = useState(false)

  useEffect(() => {
    getClients()
  }, [refreshList]);

  const getClients = () => {

  }

  const createClient = async () => {
    const newClientName = await XDirModalInput({
      title:'Create client',
      input: 'text',
      inputPlaceholder: 'Insert new client name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your client";
        }
      },
    })
    if(newClientName){
      const res = await createNewClient(newClientName)
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
          text: "Client created successfully",
          iconType:'success',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'lightgreen',
          timer: 3000
        })
      }
    }
    setRefreshList(!refreshList)
  }

  const deleteClient = async (clientID, clientName) => {
    XDirModal({
        text:`Are you sure you want to delete ${clientName}?`,
        title:'Delete client',
        confirmButtonColor:'#e13144',
        onConfirmFunction: async () => await deleteExistingClient(clientID)
      })
      setRefreshList(!refreshList)
  }
  

  const editClient = async (clientID, clientName) => {
    const newClientName = await XDirModalInput({
      title:'Edit client',
      input: 'text',
      inputLabel: `Editing existing client ${clientName}`,
      inputPlaceholder: 'Insert new client name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your client";
        }
      },
    })
    if(newClientName) {
      setLoading(true)
      const res = await updateExistingOrganization(clientID, newClientName)
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
          text: "Client updated successfully",
          iconType:'success',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'lightgreen',
          timer: 3000
        })
        setRefreshList(!refreshList)
      }
    }
  }

  return (
    <StyledXCard
      title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faSchool} style={{marginRight: '10px'}}/>CLIENTS</p>}
      style={{height: 'auto', width: '80%', margin: '2em auto'}}
      controls={[
        {
            component:
                <XButton
                    onClick={createClient}
                    title="Create new client"
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
            <StyledFlexFullCenter>
              <CircularProgress size={30} style={{marginLeft: '10px'}}/>
            </StyledFlexFullCenter>
          :
            <>
              {clientList.length === 0 ? <p>No clients created yet.</p>
              :
                <>
                  {clientList.map((client, index) => (
                    <StyledXRow
                        style={{
                            borderBottom: index === (clientList.length - 1) ? '1px solid #BBBBBB' : '',
                            background: 'rgb(247, 247, 247)',
                            width: '100%'
                        }}
                        key={'row' + index}
                        identifier={client.uuid}
                        isCollapsable={false}
                        controls={[
                          {
                              component:<StyledGreenButtonIcon onClick={() => editClient(client.uuid, client.name)}>
                                          <FontAwesomeIcon icon={faEdit} size='1x' title='Edit client' />
                                      </StyledGreenButtonIcon>
                          },
                          {
                              component:<StyledRedButtonIcon onClick={() => deleteClient(client.uuid, client.name)}>
                                          <FontAwesomeIcon icon={faTrash} size='1x' title='Delete client' />
                                      </StyledRedButtonIcon>
                          },
                        ]}
                    >
                      <XRowContent key={"XRowContent" + index}>
                        <p><strong>Name:</strong> {client.name}</p>
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
