import React, { useEffect, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledXCard } from "../components/styled-compontent/Container";
import { XButton, XRow, XRowContent } from "@ximdex/xui-react/material";
import { createNewOrganization, deleteExistingOrganization, getOrganizations, updateExistingOrganization } from "../service/xdir.service";
import useModals from '../hooks/useModals';
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import { useSpinner } from '@ximdex/xui-react/hooks';
import { Building, Pencil, Plus, Trash } from "lucide-react";


export default function Organizations() {
  const [organizationsList, setOrganizationsList] = useState([])
  const [refreshList, setRefreshList] = useState(false)
  const {XDirModalInput, XDirModal, executeXPopUp} = useModals()
  const [loading, setLoading] = useState(false)
  const { showSpinner, hideSpinner } = useSpinner()

  useEffect(() => {
    getClientOrganizations()
  }, [refreshList]);


  const getClientOrganizations = async () => {
    setLoading(true)
    showSpinner()
    const res = await getOrganizations()
    setOrganizationsList(res)
    hideSpinner()
    setLoading(false)
  }



  const createOrganization = async () => {
    const newOrganizationName = await XDirModalInput({
      title:'Create organization',
      input: 'text',
      inputPlaceholder: 'Insert new organization name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your organization";
        }
      },
    })
    if(newOrganizationName){
      const res = await createNewOrganization(newOrganizationName)
      executeXPopUp(res, "Organization created successfully")
      
    }
    setRefreshList(!refreshList)
  }

  const deleteOrganization = async (organizationID, organizationName) => {
    XDirModal({
        text:`Are you sure you want to delete ${organizationName}?`,
        title:'Delete organization',
        confirmButtonColor:'#e13144',
        onConfirmFunction: async () => {
          const res = await deleteExistingOrganization(organizationID)
          executeXPopUp(res, "Organization deleted successfully")
          setRefreshList(!refreshList)
        }
        
      })
  }


  
  const editOrganization = async (organizationID, organizationName) => {
    const newOrganizationName = await XDirModalInput({
      title:'Edit organization',
      input: 'text',
      inputLabel: `Editing existing organization ${organizationName}`,
      inputPlaceholder: 'Insert new organization name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your organization";
        }
      },
    })
    if(newOrganizationName) {
      setLoading(true)
      showSpinner()
      const res = await updateExistingOrganization(organizationID, newOrganizationName)
      executeXPopUp(res, "Organization updated successfully")
      setRefreshList(!refreshList)
      hideSpinner()
      setLoading(false)
    }
  }


  return (
    <StyledXCard
    title={<StyledDivCenterY>
      <Building size={30} style={{ marginRight: '10px' }}/>
      <p>
        ORGANIZATIONS
      </p>
    </StyledDivCenterY>}
    style={{height: 'auto', width: '80%', margin: '2em auto'}}
    controls={[
      {
          component:
              <XButton
                  onClick={createOrganization}
                  title="Create new organization"
              >
                <Plus size={20} style={{marginRight: '10px'}} />
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
            {organizationsList?.length === 0 ? <p>No organizations created yet.</p>
            :
              <>
                {organizationsList?.map((organization, index) => (
                  <XRow
                      style={{
                          borderBottom: index === (organizationsList.length - 1) ? '1px solid #BBBBBB' : '',
                          background: 'rgb(247, 247, 247)',
                          width: '100%'
                      }}
                      key={'row' + index}
                      identifier={organization.uuid}
                      controls={[
                        {
                            component:<StyledGreenButtonIcon title='Edit organization' onClick={() => editOrganization(organization.uuid, organization.name)}>
                                        <Pencil size={20}/>
                                    </StyledGreenButtonIcon>
                        },
                        {
                            component:<StyledRedButtonIcon onClick={() => deleteOrganization(organization.uuid, organization.name)} title='Delete organization' >
                                        <Trash size={20} style={{margin: 0, padding: 0}}/>
                                    </StyledRedButtonIcon>
                        },
                      ]}
                  >
                    <XRowContent key={"XRowContent" + index}>
                      <p><strong>Name:</strong> {organization.name}</p>
                    </XRowContent>
                  </XRow>
                ))}
              </>
            }
          </>  
      }
    </StyledMarginContent>
  </StyledXCard>



  );
}
