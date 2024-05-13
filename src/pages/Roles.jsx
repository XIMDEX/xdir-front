import { faEdit, faKey, faLessThan, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { XButton, XPopUp, XRowContent } from "@ximdex/xui-react/material";
import React, { useEffect, useState } from "react";
import { StyledFlexFullCenter, StyledMarginContent, StyledXCard, StyledXRow } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import useSweetAlert from '../hooks/useSweetAlert';
import { createNewRole, deleteExistingRole, getRoles, updateExistingRole } from "../service/xdir.service";
import { CircularProgress } from "@mui/material";

export default function Roles() {
  const [rolesList, setRolesList] = useState([])
  const {XDirModal, XDirModalInput} = useSweetAlert()
  const [refreshList, setRefreshList] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getListRoles()
  }, [refreshList]);


  const getListRoles = async () => {
    setLoading(true)
    const res = await getRoles()
    if(res.error){
      XPopUp({
        text: res?.error,
        iconType:'error',
        timer:'3000',
        popUpPosition:'top',
        iconColor: 'red',
        timer: 3000
      })
      setRolesList([])
    }else{
      setRolesList(res.roles)
    }
    setLoading(false)

  }

  const createRole = async () => {
    const newRoleName = await XDirModalInput({
      title:'Create role',
      input: 'text',
      inputPlaceholder: 'Insert new role name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your role";
        }
      },
    })
    if(newRoleName){
      const res = await createNewRole(newRoleName)
      if(res?.error){
        XPopUp({
          text: res?.error ?? "An error has occurred while creating new rol, try again later.",
          iconType:'error',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'red',
          timer: 3000
        })
      }else{
        XPopUp({
          text: "Rol created successfully",
          iconType:'success',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'lightgreen',
          timer: 3000
        })
      }
    }
  }

  const editRole = async (roleID, roleName) => {
    const newRoleName = await XDirModalInput({
      input: 'text',
      inputLabel: `Editing existing role ${roleName}`,
      inputPlaceholder: 'Insert new role name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your role";
        }
      },
    })
    if(newRoleName) {
      setLoading(true)
      const res = await updateExistingRole(roleID, newRoleName)
      if(res?.error){
        XPopUp({
          text: res?.error ?? "An error has occurred while updating rol, try again later.",
          iconType:'error',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'red',
          timer: 3000
        })
      }else{
        XPopUp({
          text: "Rol updated successfully",
          iconType:'success',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'lightgreen',
          timer: 3000
        })
        setRefreshList(!refreshList)
      }
      setLoading(false)
    }
  }
  
  const deleteRole = async ( roleID, roleName) => {
    XDirModal({
      text:`Are you sure you want to delete ${roleName}?`,
      title:'Delete rol',
      confirmButtonColor:'#e13144',
      onConfirmFunction: async () => await deleteExistingRole(roleID)
    })
    setRefreshList(!refreshList)
  }


  return (
    <StyledXCard
        title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faKey} style={{marginRight: '10px'}}/>ROLES</p>}
        style={{height: 'auto', width: '50%', margin: '2em auto'}}
        controls={[
          {
              component:
                  <XButton
                      onClick={createRole}
                      title="Create new rol"
                  >
                      <FontAwesomeIcon icon={faPlus} style={{marginRight: '10px'}}/> 
                      NEW ROL
                  </XButton>
          },
        ]}
      >
        <StyledMarginContent>
            {loading ? 
              <StyledFlexFullCenter>
                <CircularProgress size={30} style={{marginLeft: '10px'}}/>
              </StyledFlexFullCenter>
            :
              <>
                {rolesList.length === 0 ? <p>No roles created yet.</p>
                :
                  <>
                    {rolesList.map((role, index) => (
                      <StyledXRow
                          style={{
                              borderBottom: index === (rolesList.length - 1) ? '1px solid #BBBBBB' : '',
                              background: 'rgb(247, 247, 247)',
                              width: '100%'
                          }}
                          key={'row' + index}
                          identifier={role.uuid}
                          isCollapsable={false}
                          controls={[
                            {
                                component:<StyledGreenButtonIcon onClick={() => editRole(role.uuid, role.name)}>
                                            <FontAwesomeIcon icon={faEdit} size='1x' title='Edit role' />
                                        </StyledGreenButtonIcon>
                            },
                            {
                                component:<StyledRedButtonIcon onClick={() => deleteRole(role.uuid, role.name)}>
                                            <FontAwesomeIcon icon={faTrash} size='1x' title='Delete role' />
                                        </StyledRedButtonIcon>
                            },
                          ]}
                      >
                        <XRowContent key={"XRowContent" + index}>
                          <p><strong>Name:</strong> {role.name}</p>
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
