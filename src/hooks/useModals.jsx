import Swal from "sweetalert2";
import './sweetAlertClasses.css'
import { useEffect, useState } from "react";
import { XButton, XDropdown, XPopUp } from "@ximdex/xui-react/material";
import { PERMISSIONS_OPTIONS } from "../../CONSTATNS";
import { createRoot  } from 'react-dom';
import { StyledDivCenterY, StyledDivFlexBetween, StyledFlexFullCenter, StyledXModal } from "../components/styled-compontent/Container";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function useModals () {
    const [permissionsSelected, setPermissionsSelected] = useState([]);

    const XDirModal = async ({text,title, confirmButtonColor, textColor, onConfirmFunction, showCancelButton}) => {
        Swal.fire({
            text: text,
            title: title,
            showCancelButton: showCancelButton ?? true,
            confirmButtonText: 'Accept',
            color: textColor ?? 'black',
            confirmButtonColor: confirmButtonColor ?? '#43a1a2',
            background: 'rgb(255,255,255)',
            focusConfirm: false,
            customClass: {
                popup: 'modalContainer',
            },
            showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
            },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
            }
        }).then(async(result) => {
            if (result.isConfirmed) {
                onConfirmFunction()
            }
        })
    }
    const XDirModalInput = async ({title,input,inputLabel, inputPlaceholder,inputValidator,confirmButtonColor, textColor}) => {
        const {value} = await Swal.fire({
            title: title,
            input: input,
            inputLabel: inputLabel,
            inputPlaceholder: inputPlaceholder,
            showCancelButton: true,
            inputValidator:inputValidator,
            confirmButtonText: 'Submit',
            color: textColor ?? 'black',
            confirmButtonColor: confirmButtonColor ?? '#43a1a2',
            background: 'rgb(255,255,255)',
            customClass: {
                popup: 'modalContainer',
                input: 'customInputClass'
            },
            showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
            },
            hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
            }
        });
        return value
    };

    const executeXPopUp = (res, title) => {
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
          text: title,
          iconType:'success',
          timer:'3000',
          popUpPosition:'top',
          iconColor: 'lightgreen',
          timer: 3000
        })
      }
    }
      
    
    return {
        XDirModal,
        XDirModalInput,
        executeXPopUp
    }
}


export const XDirModalDropdownPermissions = ({title, subtitle, roleSelected, confirmButton, setOpenModal}) => {
    const superAdminPermission = { value: 'superadmin', label: 'Superadmin' };
    const [permissionsSelected, setPermissionsSelected] = useState([]);


    useEffect(() => {
        let roles = PERMISSIONS_OPTIONS?.filter(permission => roleSelected?.permissionsAssigned?.includes(permission?.value))
        if(roleSelected?.permissionsAssigned?.includes('superadmin')) roles.push(superAdminPermission)
        setPermissionsSelected(roles);
    }, []);

    const handlePermissionDropdown = (data) => {
        if (roleSelected?.permissionsAssigned?.includes('superadmin') && !data.some(permission => permission.value === 'superadmin')) {
            data.push(superAdminPermission);
        }
        setPermissionsSelected(data);
    };

    return (
    <StyledDivFlexBetween style={{flexDirection:'row', height: '100%'}}>
        <StyledFlexFullCenter style={{height: 'auto', flexDirection:'column'}}>
            <h2 style={{margin: '0'}}>{title}</h2>
            <p style={{margin: '10px 0'}}>{subtitle}</p>
        </StyledFlexFullCenter>
        <StyledDivCenterY style={{width: '100%', justifyContent: 'center', margin: '10px 0'}}>
                <XDropdown
                    value={permissionsSelected}
                    onChange={(e, data) => handlePermissionDropdown(data)} // Ajusta el índice según sea necesario
                    options={PERMISSIONS_OPTIONS}
                    labelOptions="label"
                    displayEmpty
                    label="Select permissions"
                    bgColor="100"
                    width="300px"
                    size="small"
                    hasCheckboxes={true}
                    multiple={true}
                    disableClearable
                />
            </StyledDivCenterY>
            <StyledDivCenterY style={{width: '100%', justifyContent: 'center'}}>
                <XButton
                    style={{margin: '1em'}}
                    onClick={() => {
                        setOpenModal(false)
                        confirmButton(permissionsSelected)
                    }}
                >
                    Assign
                </XButton>
                <XButton
                    style={{margin: '1em', background: '#6e7881'}}
                    onClick={() => setOpenModal(false)}
                >
                    Cancel
                </XButton>
            </StyledDivCenterY>

    </StyledDivFlexBetween>
    )
  }


export const XDirModalRoles = ({title, subtitle, roleSelected, confirmButton, setOpenModal}) => {
    const superAdminPermission = { value: 'superadmin', label: 'Superadmin' };
    const [permissionsSelected, setPermissionsSelected] = useState([]);


    useEffect(() => {
        let roles = PERMISSIONS_OPTIONS?.filter(permission => roleSelected?.permissionsAssigned?.includes(permission?.value))
        if(roleSelected?.permissionsAssigned?.includes('superadmin')) roles.push(superAdminPermission)
        setPermissionsSelected(roles);
    }, []);

    const handlePermissionDropdown = (data) => {
        if (roleSelected?.permissionsAssigned?.includes('superadmin') && !data.some(permission => permission.value === 'superadmin')) {
            data.push(superAdminPermission);
        }
        setPermissionsSelected(data);
    };

    return (
    <StyledDivFlexBetween style={{flexDirection:'row', height: '100%'}}>
        <StyledFlexFullCenter style={{height: 'auto', flexDirection:'column'}}>
            <h2 style={{margin: '0'}}>{title}</h2>
            <p style={{margin: '10px 0'}}>{subtitle}</p>
        </StyledFlexFullCenter>
        <StyledDivCenterY style={{width: '100%', justifyContent: 'center', margin: '10px 0'}}>
                <XDropdown
                    value={permissionsSelected}
                    onChange={(e, data) => handlePermissionDropdown(data)} // Ajusta el índice según sea necesario
                    options={PERMISSIONS_OPTIONS}
                    labelOptions="label"
                    displayEmpty
                    label="Select roles"
                    bgColor="100"
                    width="300px"
                    size="small"
                    hasCheckboxes={true}
                    multiple={true}
                    disableClearable
                />
            </StyledDivCenterY>
            <StyledDivCenterY style={{width: '100%', justifyContent: 'center'}}>
                <XButton
                    style={{margin: '1em'}}
                    onClick={() => {
                        setOpenModal(false)
                        confirmButton(permissionsSelected)
                    }}
                >
                    Assign
                </XButton>
                <XButton
                    style={{margin: '1em', background: '#6e7881'}}
                    onClick={() => setOpenModal(false)}
                >
                    Cancel
                </XButton>
            </StyledDivCenterY>

    </StyledDivFlexBetween>
    )
  }