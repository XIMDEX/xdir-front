import Swal from "sweetalert2";
import './sweetAlertClasses.css'
import { useEffect, useState } from "react";
import { XButton, XDropdown, XInput, XPopUp } from "@ximdex/xui-react/material";
import { StyledDivCenterY, StyledDivFlexBetween, StyledFlexFullCenter, StyledRoleOptionsColumn, StyledRolesToolsColumn, StyledTabsContainer, StyledXRadio } from "../components/styled-compontent/Container";
import useFormValidator from "./useFormValidatior";
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import CustomTabs from "../components/CustomTabs/CustomTabs";
import { StyledAddButtonWithEffect, StyledGreenButtonIcon, StyledRedButtonIcon } from "../components/styled-compontent/Buttons";
import { createUserOnService, getRoles, getXimdexTools } from "../service/xdir.service";
import { CircularProgress } from "@mui/material";
import { Save, Trash, X } from "lucide-react";
import { SERVICES_TO_CREATE_USER } from "../../CONSTATNS";

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
          popUpPosition:'top',
          iconColor: 'red',
          timer: 3000
        })
      }else{
        XPopUp({
          text: title,
          iconType:'success',
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
    const {XDirModal, executeXPopUp} = useModals()
    const [loading, setLoading] = useState(false);
    
    // Options for control the modal
    const [organizationsTabsOptions, setOrganizationsTabsOptions] = useState([])
    const [rolesOptions, setRolesOptions] = useState([])
    const [servicesOptions, setServicesOptions] = useState([])
    const [userServicesAvailables, setUserServicesAvailables] = useState([])

    // Object to send to my endpoint
    const [userRoles, setUserRoles] = useState(null)

    const [organizationTabSelected, setOrganizationTabSelected] = useState(null)
    const [serviceTabSelected, setServiceTabSelected] = useState(null)
    const [addNewService, setAddNewService] = useState(false)
    const [canSave, setCanSave] = useState(false)

    useEffect(() => {
        buildOptions()
    }, [userSelected]);


    useEffect(() => {
        console.log("USER ROLES",userRoles);
    }, [userRoles]);

    /** Build options list for organizations, services and roles */
    const buildOptions = async () => {
        setLoading(true)
        const resRoles = await getRoles()
        const resServices = await getXimdexTools()
        if(resRoles.error || resServices.error){
            XPopUp({
            text: res?.error,
            iconType:'error',
            popUpPosition:'top',
            iconColor: 'red',
            timer: 3000
            })
        }
        const organizationsOptions = Object.entries(userSelected?.organizations).map(([uuid, name]) => ({
            value: uuid,
            label: name
        }));
        const services = resServices?.services?.map(tool => ({ value: tool.uuid, label: tool.name, type: tool.type}))
        const roles = resRoles?.roles?.map(rol => ({ value: rol.uuid, label: rol.name, disabled: rol?.label === 'superadmin' && !isSuperAdmin }))
        // SET OPTIONS
        setServicesOptions(services)
        setRolesOptions(roles)
        setOrganizationsTabsOptions(organizationsOptions)
        buildUserRolesObject(services, roles)

        setLoading(false)
    }

    /** Create the userRole object THAT WILL BE SEND TO BACKEND */
    const buildUserRolesObject = (services, roles) => {
        // SET VALUES
        let userServices = []
        let userRolesCopy = {...userRoles}
        userRolesCopy.user_uuid = userSelected.uuid

        let userOrganizationsRoles = []
        let organization = {}
        organization.services = []

        // LOOP OVER USER SERVICES FINDING SERVICIES AND ROLES ASSOCIETAS
        if(userSelected?.p){
            Object.entries(userSelected?.p).map(([serviceRolID, serviceRolObject]) => {
                if(!organization.organization_uuid) organization.organization_uuid = serviceRolObject.organization
    
                const service_uuid =  services?.filter(service => service.label.toLowerCase() === serviceRolObject.tool.name.toLowerCase())[0].value
                const role_uuid = roles?.filter(role => role.label.toLowerCase() === serviceRolObject.role.toLowerCase())[0].value
                let service = {
                    service_uuid: service_uuid,
                    role_uuid: [role_uuid]
                }
                userServices.push(service_uuid)
                organization.services.push(service)
            });
        }else{
            if(!organization.organization_uuid) organization.organization_uuid = Object.keys(userSelected?.organizations)[0]


        }
        
        // SET USER ROLES OBJECT
        userOrganizationsRoles.push(organization)
        userRolesCopy.organizations = [organization]
        setUserRoles(userRolesCopy)


        // CREATE SERVICES AVAILABLES LIST AND SELECT THE FIRST ONE AS SELECTED
        const servicesAvailables = services.filter(service => userServices.includes(service.value))
        setUserServicesAvailables(servicesAvailables)
        setServiceTabSelected(servicesAvailables[0])

    }

    /**Add new service to the list but not to the userRoles object */
    const handleNewService = (data) => {
        let servicesAvailableCopy = [...userServicesAvailables]
        let index = servicesAvailableCopy.findIndex(service => service.value === data.value)
        if(index !== -1) return 
        servicesAvailableCopy.push(data)
        setUserServicesAvailables(servicesAvailableCopy)
        setServiceTabSelected(data)

        let userRolesCopy = {...userRoles}
        userRolesCopy?.organizations[0]?.services.push({
            service_uuid: data.value,
            role_uuid: [rolesOptions.filter(role => role.label === 'viewer')[0].value]
        })
        setUserRoles(userRolesCopy)
        setAddNewService(false)
        setCanSave(true)
    }

    /** Update rol */
    const updateRol = (roleID) => {
        let userRolesCopy = { ...userRoles };
        let index = userRolesCopy?.organizations[0]?.services?.findIndex(service => service?.service_uuid === serviceTabSelected?.value);
        
        if (index !== -1) {
          userRolesCopy.organizations[0].services[index].role_uuid = [roleID];
          setUserRoles(userRolesCopy); // Actualizar el estado con la nueva copia modificada
          setCanSave(true)
        }
    };

    /**Get role selected of the service selected */
    const getSelectedRoleUUID = () => {
        const service = userRoles?.organizations[0]?.services?.find(service => service?.service_uuid === serviceTabSelected?.value);
        return service ? service.role_uuid : '';
    };

    /**Delete a selected service from user */
    const deleteServiceFromUser = (index) => {
        let userRolesCopy = {...userRoles}
        let userServicesAvailablesCopy = [...userServicesAvailables]
        userRolesCopy.organizations[0].services[index].role_uuid = []
        userServicesAvailablesCopy.splice(index, 1)
        

        console.log(userRolesCopy);
        setUserServicesAvailables(userServicesAvailablesCopy)
        setUserRoles(userRolesCopy)
        setCanSave(true)
    }

    const closeModalControl = () => {
        if(canSave){
            XDirModal({
                text:`Are you sure you want to close without save?`,
                title:'Close Assign Role',
                confirmButtonColor:'#43a1a2',
                onConfirmFunction: () => setOpenModal(false)
            })
        }else{
            setOpenModal(false)
        }
    }

    const saveButton = async () => {
        try {
            // const servicesIDToCreateUser = servicesOptions.filter(service => SERVICES_TO_CREATE_USER.includes(service?.type)).map(service => service.value);
            
            // // Must create the user on the service
            // const servicesToUpload = userServicesAvailables.filter(service => servicesIDToCreateUser.includes(service.value));

            // const createUserPromises = servicesToUpload.map(xService => 
            //     createUserOnService(userRoles.user_uuid, xService.value)
            // );
    
            // await Promise.all(createUserPromises);
            setOpenModal();
            confirmButton(userRoles);
        } catch (error) {
            setOpenModal();
            executeXPopUp({error: "Error creating users on services"})
        }
    }

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
                    onClick={() => saveButton()}
                    disabled={!canSave}
                    title={'Save'}
                >
                    <Save size={20}/>
                </StyledGreenButtonIcon>
                <StyledGreenButtonIcon
                    title={'Close modal'}
                    onClick={() => closeModalControl()}
                >
                    <X size={20}/>
                </StyledGreenButtonIcon>
                </StyledDivCenterY>
            </StyledDivFlexBetween>

            {
                loading 
                ? 
                    <StyledFlexFullCenter>
                        <CircularProgress size={20}/>
                    </StyledFlexFullCenter>
                :
                <>
                    {/* MODAL TABS (USER ORGANIZATIONS AVAILABLE) */}
                    <CustomTabs
                        tabs={organizationsTabsOptions?.map(org => org.label)}
                        setTabSelected={setOrganizationTabSelected}
                    />
                    <StyledTabsContainer style={{minHeight: '50vh', display:'flex'}}>
                        <StyledRolesToolsColumn>
                            {userServicesAvailables.length > 0 ? userServicesAvailables.map((service, index) => 
                                        <p 
                                            key={service.value}
                                            onClick={() => setServiceTabSelected(service)}
                                            style={{backgroundColor: service?.value === serviceTabSelected?.value ? '#e0e0e0' : 'transparent'}}>{service.label}
                                            <StyledRedButtonIcon className="trash-icon" onClick={() => deleteServiceFromUser(index)} style={{marginLeft: '2em'}}>
                                                <Trash size={20}/>
                                            </StyledRedButtonIcon>
                                        </p>
                                        
                                )
                            :
                                <StyledFlexFullCenter style={{height: 'auto', padding: '10px 20px', textAlign:'center'}}>
                                    <span>Services have not been added yet.</span>
                                </StyledFlexFullCenter>
                            }
                            {!addNewService ? 
                            <StyledAddButtonWithEffect
                                style={{marginTop: '1em'}}
                                title="Add new service"
                                onClick={() => setAddNewService(true)}
                            >
                                + <span>ADD SERVICE</span>
                            </StyledAddButtonWithEffect>
                            :
                            <StyledDivCenterY style={{marginTop: '1em'}}>
                            <XDropdown
                                onChange={(e, data) => handleNewService(data)}
                                options={servicesOptions}
                                labelOptions="label"
                                displayEmpty
                                placeholder="Select organization"
                                label="Select organization"
                                bgColor="100"
                                fullwidth
                                size="small"
                                hasCheckboxes={false}
                                multiple={false}
                                style={{marginLeft: '10px'}}
                            />
                            <StyledGreenButtonIcon
                                title="Close"
                                onClick={() => setAddNewService(false)}
                                style={{marginRight: '10px'}}
                            >
                                <X size={20}/>
                            </StyledGreenButtonIcon>
                            </StyledDivCenterY>
                            }
                        </StyledRolesToolsColumn>
                        <StyledRoleOptionsColumn>
                        {userServicesAvailables.length > 0 && 
                        <StyledXRadio
                                direction='column'
                                value={getSelectedRoleUUID()}
                                onChange={(e, data) => updateRol(e.target.value)}
                                options={rolesOptions}
                        />}
                        </StyledRoleOptionsColumn>
                    </StyledTabsContainer>
                </>
            }
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

