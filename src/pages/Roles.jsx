import { faEdit, faKey, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { XButton, XDropdown, XPopUp, XRowContent } from "@ximdex/xui-react/material";
import React, { useEffect, useState } from "react";
import { StyledMarginContent, StyledXCard, StyledXModal, StyledXRow } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import useModals, { XDirModalDropdownPermissions } from '../hooks/useModals';
import { assignPermissionToRole, createNewRole, deleteExistingRole, getRole, getRoles, updateExistingRole } from "../service/xdir.service";
import { useSpinner } from '@ximdex/xui-react/hooks';

export default function Roles() {
  const [rolesList, setRolesList] = useState([])
  const {XDirModal, XDirModalInput} = useModals()
  const [refreshList, setRefreshList] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showSpinner, hideSpinner } = useSpinner();
  const [permissionsRolModal, setPermissionsRolModal] = useState({
    open: false,
    role: undefined
  })

  useEffect(() => {
    getListRoles()
  }, [refreshList]);


  const getListRoles = async () => {
    setLoading(true)
    showSpinner()
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
    hideSpinner()
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
          text: res?.error,
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
    setRefreshList(!refreshList)
  }

  const editRole = async (roleID, roleName) => {
    const newRoleName = await XDirModalInput({
      input: 'text',
      title:'Edit role',
      inputLabel: `Editing existing role ${roleName}`,
      inputPlaceholder: 'Insert new role name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your role";
        }
      },
    })
    if(newRoleName) {
      const res = await updateExistingRole(roleID, newRoleName)
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
          text: "Rol updated successfully",
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

  const deleteRole = async ( roleID, roleName) => {
    const res = await XDirModal({
      text:`Are you sure you want to delete ${roleName}?`,
      title:'Delete rol',
      confirmButtonColor:'#e13144',
      onConfirmFunction: async () => await confirmDeleteRol(roleID)
    })

   
  }

  const confirmDeleteRol = async (roleID) => {
    const res = await deleteExistingRole(roleID)
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
        text: "Rol deleted successfully",
        iconType:'success',
        timer:'3000',
        popUpPosition:'top',
        iconColor: 'lightgreen',
        timer: 3000
      })
      setRefreshList(!refreshList)
    } 
  }

  const handleAssignPermissions = async (roleID) => {
    const res = await getRole(roleID)
    if(!res?.error){
      XPopUp({
        text: res?.error,
        iconType:'error',
        timer:'3000',
        popUpPosition:'top',
        iconColor: 'red',
        timer: 3000
      })
    }else{
      setPermissionsRolModal({open: true, role: res})

    }
  }

  const confirmNewPermissions = async (permissionsSelected) => {
    const res =  await assignPermissionToRole(permissionsRolModal?.role?.uuid, permissionsSelected.map(permission => permission.value))
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
        text: "Permission assigned successfully",
        iconType:'success',
        timer:'3000',
        popUpPosition:'top',
        iconColor: 'lightgreen',
        timer: 3000
      })
    }
    setRefreshList(!refreshList)
  }

  return (
    <StyledXCard
        title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faKey} style={{marginRight: '10px'}}/>ROLES</p>}
        style={{height: 'auto', width: '80%', margin: '2em auto'}}
        controls={[
          {
              component:
                  <XButton
                      onClick={createRole}
                      title="Create new rol"
                  >
                      <FontAwesomeIcon icon={faPlus} style={{marginRight: '10px'}}/> 
                      Create
                  </XButton>
          },
        ]}
      >
        <StyledMarginContent>
            {loading ? <></>
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
                                component:<StyledGreenButtonIcon onClick={() => handleAssignPermissions(role.id)}>
                                            <FontAwesomeIcon icon={faKey} size='1x' title='Assign permissions' />
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
        <StyledXModal
          isOpen={permissionsRolModal?.open}
          ariaHideApp={false}
        >
          <div className={`animate__animated ${permissionsRolModal.open ? 'animate__fadeInUp animate__faster' : 'animate__fadeOutDown animate__faster'}`}>
            <XDirModalDropdownPermissions
              setOpenModal={setPermissionsRolModal}
              subtitle={`Assign permission to role ${permissionsRolModal?.role?.name}`}
              title='Assign Permisson'
              roleSelected={permissionsRolModal?.role}
              confirmButton={confirmNewPermissions}
            />
          </div>
        </StyledXModal>

      </StyledXCard>
  );
}
