import Swal from "sweetalert2";
import './sweetAlertClasses.css'
import { useContext, useEffect, useState } from "react";
import { XButton, XDropdown, XInput, XPopUp } from "@ximdex/xui-react/material";
import { ROLES_OPTIONS, SERVICES_OPTIOINS } from "../../CONSTATNS";
import { createRoot  } from 'react-dom';
import { StyledDivCenterY, StyledDivFlexBetween, StyledFlexFullCenter, StyledXModal } from "../components/styled-compontent/Container";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFormValidator from "./useFormValidatior";
import { getOrganizations, getRoles, getXimdexTools } from "../service/xdir.service";
import AuthContext from "../providers/AuthProvider/AuthContext";

export default function useModals () {
    const {forceLogout} = useContext(AuthContext)
    const [permissionsSelected, setPermissionsSelected] = useState([]);

    const XDirModal = async ({text,title, confirmButtonColor, textColor, onConfirmFunction, showCancelButton}) => {
        Swal.fire({
            text: text,
            title: title,
            showCancelButton: showCancelButton ?? true,
            confirmButtonText: 'ACCEPT',
            color: textColor ?? 'black',
            confirmButtonColor: confirmButtonColor ?? '#43a1a2',
            cancelButtonText: 'CANCEL',
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
            cancelButtonText: 'CANCEL',
            confirmButtonText: 'SUBMIT',
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

    const logoutModal = async () => {
        Swal.fire({
            title: 'LOG OUT',
            text: "Are you sure you want to log out?",
            confirmButtonText: 'YES',
            cancelButtonText: 'CANCEL',
            showCancelButton: true,
            confirmButtonColor: "#43a1a2",
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
        }).then((result) => {
            if (result.isConfirmed) {
                forceLogout();
            }
        })
    };
      
    
    return {
        XDirModal,
        XDirModalInput,
        executeXPopUp,
        logoutModal
    }
}

export const XDirModalRoles = ({title, subtitle, confirmButton, setOpenModal, organizations,tools, roles, isSuperAdmin}) => {
    const [rolSelected, setRolSelected] = useState(null);
    const [organizationSelected, setOrganizationSelected] = useState(null)
    const [toolSelected, setToolSelected] = useState(null)

    const handleDropdown = (type, data) => {
        if(type === 'rol') setRolSelected(data);
        if(type === 'org') setOrganizationSelected(data);
        if(type === 'tool') setToolSelected(data);
    };

    return (
    <StyledDivFlexBetween style={{flexDirection:'row', height: '100%'}}>
        <StyledFlexFullCenter style={{height: 'auto', flexDirection:'column'}}>
            <h2 style={{margin: '0'}}>{title}</h2>
            <p style={{margin: '10px 0'}}>{subtitle}</p>
        </StyledFlexFullCenter>
        <StyledDivCenterY style={{width: '100%', justifyContent: 'center', margin: '10px 0'}}>
            <XDropdown
                value={organizationSelected}
                onChange={(e, data) => handleDropdown('org',data)} // Ajusta el índice según sea necesario
                options={organizations}
                labelOptions="label"
                displayEmpty
                label="Select organization"
                bgColor="100"
                width="350px"
                size="small"
                hasCheckboxes={false}
                multiple={false}
                disableClearable
            />
        </StyledDivCenterY>
        <StyledDivCenterY style={{width: '100%', justifyContent: 'center', margin: '10px 0'}}>
            <XDropdown
                value={toolSelected}
                onChange={(e, data) => handleDropdown('tool',data)} // Ajusta el índice según sea necesario
                options={tools}
                labelOptions="label"
                displayEmpty
                label="Select tool"
                bgColor="100"
                width="350px"
                size="small"
                hasCheckboxes={false}
                multiple={false}
                disableClearable
            />
        </StyledDivCenterY>
        <StyledDivCenterY style={{width: '100%', justifyContent: 'center', margin: '10px 0'}}>
            <XDropdown
                getOptionDisabled={(option) => option?.disabled}
                value={rolSelected}
                onChange={(e, data) => handleDropdown('rol',data)} // Ajusta el índice según sea necesario
                options={roles}
                labelOptions="label"
                displayEmpty
                label="Select role"
                bgColor="100"
                width="350px"
                size="small"
                hasCheckboxes={false}
                multiple={false}
                disableClearable
            />
        </StyledDivCenterY>
            <StyledDivCenterY style={{width: '100%', justifyContent: 'center'}}>
                <XButton
                    style={{margin: '1em'}}
                    onClick={() => {
                        setOpenModal()
                        confirmButton(organizationSelected.value,toolSelected.value,rolSelected.value)
                    }}
                >
                    Assign
                </XButton>
                <XButton
                    style={{margin: '1em', background: '#6e7881'}}
                    onClick={() => setOpenModal()}
                >
                    Cancel
                </XButton>
            </StyledDivCenterY>

    </StyledDivFlexBetween>
    )
}

export const XDirModalInvitation = ({title, subtitle, confirmButton, setOpenModal, organizations}) => {
    const [organizationSelected, setOrganizationSelected] = useState(null);
    const [organizationOptions, setOprganizationOptions] = useState(organizations)
    const [email, setEmail] = useState('');
    const {validateEmail} = useFormValidator()

    return (
    <StyledDivFlexBetween style={{flexDirection:'row', height: '100%'}}>
        <StyledFlexFullCenter style={{height: 'auto', flexDirection:'column'}}>
            <h2 style={{margin: '0'}}>{title}</h2>
            <p style={{margin: '10px 0'}}>{subtitle}</p>
        </StyledFlexFullCenter>
        <StyledDivCenterY style={{width: '100%', justifyContent: 'center', marginBottom: '10px', flexDirection: 'column'}}>
                <XInput style={{width:"300px", marginBottom: '1em'}}id='email' type='text' label='Email' required size='small' value={email} onChange={(e) => setEmail(e.target.value)} />
                <XDropdown
                    value={organizationSelected}
                    onChange={(e, data) => setOrganizationSelected(data)}
                    options={organizationOptions}
                    labelOptions="label"
                    displayEmpty
                    placeholder="Select organization"
                    label="Select organization"
                    bgColor="100"
                    width="300px"
                    size="small"
                    hasCheckboxes={false}
                    multiple={false}
                    disableClearable
                />
            </StyledDivCenterY>
            <StyledDivCenterY style={{width: '100%', justifyContent: 'center'}}>
                <XButton
                    style={{margin: '1em'}}
                    disabled={!validateEmail(email)}
                    onClick={() => {
                        setOpenModal(false)
                        confirmButton(organizationSelected.value, email)
                    }}
                >
                    SEND
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