import Swal from "sweetalert2";
import './sweetAlertClasses.css'
import { useEffect, useState } from "react";
import { XButton, XDropdown, XInput, XPopUp, XRadio } from "@ximdex/xui-react/material";
import { StyledDivCenterY, StyledDivFlexBetween, StyledFlexFullCenter, StyledRoleOptionsColumn, StyledRolesToolsColumn, StyledTabsContainer, StyledXRadio } from "../components/styled-compontent/Container";
import useFormValidator from "./useFormValidatior";
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import CustomTabs from "../components/CustomTabs/CustomTabs";
import { StyledAddButtonWithEffect, StyledGreenButtonIcon } from "../components/styled-compontent/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPlusCircle, faSave, faX } from "@fortawesome/free-solid-svg-icons";
import { getRoles, getXimdexTools } from "../service/xdir.service";

export default function useModals () {
    const {forceLogout} = useAuth()
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

export const XDirModalRoles = ({title, subtitle, confirmButton, setOpenModal, userSelected, isSuperAdmin}) => {
    // Options for control the modal
    const [organizationsTabsOptions, setOrganizationsTabsOptions] = useState([])
    const [rolesOptions, setRolesOptions] = useState([])
    const [servicesOptions, setServicesOptions] = useState([])


    const [organizationTabSelected, setOrganizationTabSelected] = useState(organizationsTabsOptions[0]?.label)
    const [userRoles, setUserRoles] = useState(null)

    const [rolSelected, setRolSelected] = useState(null);
    const [organizationSelected, setOrganizationSelected] = useState(null)
    const [toolSelected, setToolSelected] = useState(null)
    const [serviceTabSelected, setServiceTabSelected] = useState(servicesOptions[0]?.label)
    const [addNewService, setAddNewService] = useState(false)

    console.log(userSelected);

    useEffect(() => {
        buildOptions()
        buildUserRolesObject()
    }, [userSelected]);

    const buildOptions = async () => {
        const resRoles = await getRoles()
        const resServices = await getXimdexTools()
        if(resRoles.error || resServices.error){
            XPopUp({
            text: res?.error,
            iconType:'error',
            timer:'3000',
            popUpPosition:'top',
            iconColor: 'red',
            timer: 3000
            })
        }
        const organizationsOptions = Object.entries(userSelected?.organizations).map(([uuid, name]) => ({
            value: uuid,
            label: name
        }));

        setServicesOptions(resServices?.tools?.map(tool => ({ value: tool.uuid, label: tool.name})))
        setRolesOptions(resRoles?.roles?.map(rol => ({ value: rol.uuid, label: rol.name, disabled: rol?.label === 'superadmin' && !isSuperAdmin })))
        setOrganizationsTabsOptions(organizationsOptions)
    }

    const buildUserRolesObject = () => {

    }
    console.log(organizationsTabsOptions.map(org => org.label));
    return (
    <>
        {/* MODAL HEADER */}
        <StyledDivFlexBetween style={{height: 'auto', width:'100%', alignItems:'flex-start'}}>
            <div>
                <h2 style={{margin: '0'}}>{title}</h2>
                <p style={{margin: '10px 0'}}>{subtitle}</p>
            </div>
            <StyledDivCenterY>

            <StyledGreenButtonIcon
                onClick={() => {
                    setOpenModal()
                    confirmButton(organizationSelected.value,toolSelected.value,rolSelected.value)
                }}
                title={'Save'}
            >
                <FontAwesomeIcon icon={faSave} size="1x"/>
            </StyledGreenButtonIcon>
            <StyledGreenButtonIcon
                title={'Close modal'}
                onClick={() => setOpenModal(false)}
            >
                <FontAwesomeIcon icon={faX} size="1x"/>
            </StyledGreenButtonIcon>
            </StyledDivCenterY>
        </StyledDivFlexBetween>

        {/* MODAL TABS (USER ORGANIZATIONS AVAILABLE) */}
        <CustomTabs
            tabs={organizationsTabsOptions?.map(org => org.label)}
            setTabSelected={setOrganizationTabSelected}
        />
        <StyledTabsContainer style={{minHeight: '50vh', display:'flex'}}>
            <StyledRolesToolsColumn>
                {servicesOptions.map(service => 
                    <>
                        <p 
                            onClick={() => setServiceTabSelected(service.label)}
                            style={{backgroundColor: service?.label === serviceTabSelected ? '#e0e0e0' : 'transparent'}}>{service.label}
                        </p>
                    </>
                )}
                 <StyledAddButtonWithEffect
                    title="Add new service"
                    onClick={() => console.log('create new service')}
                >
                    + <span>ADD SERVICE</span>
                </StyledAddButtonWithEffect>
            </StyledRolesToolsColumn>
            <StyledRoleOptionsColumn>
            <StyledXRadio
                    direction='column'
                    value={rolSelected?.value}
                    onChange={(e) => updateSearchParams('language_default', e.target.value)}
                    options={rolesOptions}
                />
            </StyledRoleOptionsColumn>

        </StyledTabsContainer>

    </>
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


// return {
//     user_uuid: 'value_user_id',
//     organizations: [
//         {
//             orgID: 'value_orgID',
//             tools: [
//                 {
//                     tooli_d: 'value_tooli_d',
//                     rol_id: 'value_rol_id'
//                 }
//             ]
//         }
//     ]
// };


