import React, { useEffect, useState } from "react";
import { faEdit, faKey, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { XPopUp, XRowContent } from "@ximdex/xui-react/material";
import { StyledFlexFullCenter, StyledXRow } from "../../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledGreenButtonIcon, StyledRedButtonIcon } from "../../components/styled-compontent/Buttons";
import useModals from '../../hooks/useModals';
import { deleteExistingPermission, getPermissisions, updateExistingPermission } from "../../service/xdir.service";
import { useSpinner } from '@ximdex/xui-react/hooks';

export default function PermissionsList({refreshPermissions}) {
  const [permissionsList, setPermissionsList] = useState([])
  const {XDirModal, XDirModalInput, executeXPopUp} = useModals()
  const [refreshList, setRefreshList] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showSpinner, hideSpinner } = useSpinner();

  useEffect(() => {
    getListPermissions()
  }, [refreshList, refreshPermissions]);


  const getListPermissions = async () => {
    setLoading(true)
    showSpinner()
    const res = await getPermissisions()
    if(res.error){
      XPopUp({
        text: res?.error,
        iconType:'error',
        timer:'3000',
        popUpPosition:'top',
        iconColor: 'red',
        timer: 3000
      })
      setPermissionsList([])
    }else{
        console.log(res);
        setPermissionsList(res.permissions)
    }
    hideSpinner()
    setLoading(false)

  }

  const editPermission = async (permissionID, permissionName) => {
    const newPermissionName = await XDirModalInput({
      input: 'text',
      title:'Edit permission',
      inputLabel: `Editing existing permission ${permissionName}`,
      inputPlaceholder: 'Insert new permission name',
      inputValidator: (value) => {
        if (!value) {
          return "Insert a name for your permission";
        }
      },
    })
    if(newPermissionName) {
      const res = await updateExistingPermission(permissionID, newPermissionName)
      executeXPopUp(res, "Permission updated successfully")
      setRefreshList(!refreshList)
    }
  }

  const deletePermission = async ( permissionID, permissionName) => {
    await XDirModal({
      text:`Are you sure you want to delete ${permissionName}?`,
      title:'Delete permission',
      confirmButtonColor:'#e13144',
      onConfirmFunction: async () => {
        const res = await deleteExistingPermission(permissionID)
        executeXPopUp(res, "Permission deleted successfully")
        setRefreshList(!refreshList)
        }
    })
  }  


  return (
        <>

            {loading ? <></> : permissionsList.length === 0 ? 
                <StyledFlexFullCenter>
                    <p>No roles created yet.</p>
                </StyledFlexFullCenter>
                :
                  <>
                    {permissionsList?.map((permission, index) => (
                      <StyledXRow
                          style={{
                              borderBottom: index === (permissionsList?.length - 1) ? '1px solid #BBBBBB' : '',
                              background: 'rgb(247, 247, 247)',
                              width: '100%'
                          }}
                          key={'row' + index}
                          identifier={permission.uuid}
                          isCollapsable={false}
                          controls={[
                            {
                                component:<StyledGreenButtonIcon onClick={() => editPermission(permission.uuid, permission.name)}>
                                            <FontAwesomeIcon icon={faEdit} size='1x' title='Edit role' />
                                        </StyledGreenButtonIcon>
                            },
                            {
                                component:<StyledRedButtonIcon onClick={() => deletePermission(permission.uuid, permission.name)}>
                                            <FontAwesomeIcon icon={faTrash} size='1x' title='Delete role' />
                                        </StyledRedButtonIcon>
                            },

                          ]}
                      >
                        <XRowContent key={"XRowContent" + index}>
                          <p><strong>Name:</strong> {permission.name}</p>
                        </XRowContent>
                      </StyledXRow>
                    ))}
                  </>
            }

        </>
  );
}
