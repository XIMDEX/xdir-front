import React, { useEffect, useState } from "react";
import { faEdit, faKey, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { XButton, XDropdown, XPopUp, XRow, XRowContent } from "@ximdex/xui-react/material";
import { StyledFlexFullCenter, StyledMarginContent, StyledXCard, StyledXModal } from "../../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import useModals from '../../hooks/useModals';
import { assignPermissionToRole, createNewRole, deleteExistingRole, getRole, getRoles, updateExistingRole } from "../../service/xdir.service";
import { useSpinner } from '@ximdex/xui-react/hooks';

export default function RolesList({refreshRoles}) {
  const [rolesList, setRolesList] = useState([])
  const {XDirModal, XDirModalInput, executeXPopUp} = useModals()
  const [refreshList, setRefreshList] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showSpinner, hideSpinner } = useSpinner();
  const [permissionsRolModal, setPermissionsRolModal] = useState({
    open: false,
    role: undefined
  })

  useEffect(() => {
    getListRoles()
  }, [refreshList, refreshRoles]);


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
      executeXPopUp(res, "Rol updated successfully")
      setRefreshList(!refreshList)
    }
  }

  const deleteRole = async ( roleID, roleName) => {
    await XDirModal({
      text:`Are you sure you want to delete ${roleName}?`,
      title:'Delete rol',
      confirmButtonColor:'#e13144',
      onConfirmFunction: async () => {
        const res = await deleteExistingRole(roleID)
        executeXPopUp(res, "Rol deleted successfully")
        setRefreshList(!refreshList)
        }
    })
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
    executeXPopUp(res, "Permission/s assigned successfully")
    setRefreshList(!refreshList)
  }

  return (
        <>

            {loading ? <></> : rolesList?.length === 0 ? 
              <StyledFlexFullCenter>
                <p>No roles created yet.</p>
              </StyledFlexFullCenter>
                :
                  <>
                    {rolesList?.map((role, index) => (
                      <XRow
                          style={{
                              borderBottom: index === (rolesList?.length - 1) ? '1px solid #BBBBBB' : '',
                              background: 'rgb(247, 247, 247)',
                              width: '100%'
                          }}
                          key={'row' + index}
                          identifier={role?.uuid}
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
                      </XRow>
                    ))}
                  </>
            }

                
            {/* <StyledXModal
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
            </StyledXModal> */}
        </>
  );
}
