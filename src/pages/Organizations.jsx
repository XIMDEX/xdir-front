import React, { useContext, useEffect, useState } from "react";
import { StyledDivCenterY, StyledMarginContent, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { XButton, XPopUp, XRow, XRowContent } from "@ximdex/xui-react/material";
import { createNewOrganization, deleteExistingOrganization, getOrganizations, updateExistingOrganization } from "../service/xdir.service";
import useModals from '../hooks/useModals';
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import { useSpinner } from '@ximdex/xui-react/hooks';
import { Building, Plus } from "lucide-react";


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
                      isCollapsable={true}
                      labelButtonCollapsable={`Show details`}
                      controls={[
                        {
                            component:<StyledGreenButtonIcon onClick={() => editOrganization(organization.uuid, organization.name)}>
                                        <FontAwesomeIcon icon={faEdit} size='1x' title='Edit organization' />
                                    </StyledGreenButtonIcon>
                        },
                        {
                            component:<StyledRedButtonIcon onClick={() => deleteOrganization(organization.uuid, organization.name)}>
                                        <FontAwesomeIcon icon={faTrash} size='1x' title='Delete organization' />
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
