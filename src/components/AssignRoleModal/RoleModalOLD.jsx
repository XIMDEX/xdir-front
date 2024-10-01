import { useEffect, useState } from "react";
import {
  assignRoleToUser,
  getRoles,
  getXimdexTools,
  removeRoleFromUser,
} from "../../service/xdir.service";
import { StyledDivFlexBetween } from "../styled-compontent/Container";
import AssignRoleRows from "./AssignRoleRows";
import CustomTabs from "../CustomTabs/CustomTabs";
import { StyledGreenButtonIcon } from "../styled-compontent/Buttons";
import { X, Pencil, CirclePlus, Home,Globe } from "lucide-react";
import { XDropdown } from "@ximdex/xui-react/material";
import { XButton } from "@ximdex/xui-react/material";
import { ContactSupportOutlined } from "@mui/icons-material";
import useUserRoleObject from "../../hooks/useUserRoleObject";

const RoleModal = ({ selectedUser, setOpenModal, organization }) => {
  const [services, setServices] = useState([]);
  const [serviceObject, setServiceObject] = useState();
  const [roles, setRoles] = useState([]);
  const organizationValues = Object.values(selectedUser.organizations);
  const [userServices, setUserServices] = useState();
  const [removeList, setRemoveList] = useState([]);
  const [values, setValues] = useState();
  const { userRoleObject, addOrChangeRole, removeRole } = useUserRoleObject(
    selectedUser,
    organization,
    services,
    roles
  );

  const handleButtonClick = async () => {
    await Promise.all(
      removeList.map(async ({ organization, service, role }) => {
        await removeRoleFromUser({
          user_uuid: selectedUser.uuid,
          organization_uuid: organization,
          tool_uuid: service,
          role_uuid: role,
        });
      })
    );

    assignRoleToUser(userRoleObject);
    setOpenModal(false);
  };

  useEffect(() => {
    const updatedUserServices = userServices?.filter(
      (userService) =>
        !removeList.some(({ service }) => service === userService.value)
    );
    setUserServices(updatedUserServices);
    console.log(updatedUserServices, removeList);
  }, [removeList]);



  const getRoleUUIDByOrganization = (organizationId, toolName) => {
    // Find the role name for the specified organization and tool
    let roleName = null;

    for (const key in selectedUser.p) {
      const entries = selectedUser.p[key];
      for (const entry of entries) {
        if (
          entry.organization === organizationId &&
          entry.tool.uuid === toolName
        ) {
          roleName = entry.role;
          break;
        }
      }
      if (roleName) break;
    }

    // If no matching organization is found, return null
    if (!roleName) return null;

    // Find the corresponding UUID for the role name
    const role = roles.find((role) => role.label === roleName);
    return role ? role.value : null; // Return the UUID or null if not found
  };

  useEffect(() => {
    setServiceObject(userRoleObject);
  }, [userRoleObject]);

  useEffect(() => {
    const fetchServices = async () => {
      const result = await getXimdexTools();
      const services = result?.services?.map((tool) => ({
        value: tool.uuid,
        label: tool.name,
        type: tool.type,
      }));
      setServices(services);
    };

    const fetchRoles = async () => {
      const result = await getRoles();
      const roles = result?.roles?.map((rol) => ({
        value: rol.uuid,
        label: rol.name,
        disabled: rol?.label === "superadmin",
      }));
      setRoles(roles);
    };

    fetchServices();
    fetchRoles();
  }, []);

  useEffect(() => {
    if (services && roles) {
      setServiceObject(userRoleObject);
    }
  }, [services, roles]);

  useEffect(() => {
    if (selectedUser && selectedUser.p) {
      const tools = Object.values(selectedUser.p)
        .flat()
        .filter((entry) => entry.organization === organization.uuid)
        .map((entry) => ({ value: entry.tool.uuid, label: entry.tool.name }));
      setUserServices(tools);
    }
  }, [selectedUser, organization.uuid]);

  return (
    <StyledDivFlexBetween
      style={{ height: "auto", width: "100%", alignItems: "flex-start" }}
    >
      <StyledGreenButtonIcon
        title={"Close modal"}
        onClick={() => setOpenModal()}
      >
        <X size={20} />
      </StyledGreenButtonIcon>
      <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <h2 style={{ textAlign: "center" }}>
          Assign Role
        </h2>
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {
            <XDropdown
              placeholder="Select tools"
              value={values}
              style={{ width: "90%" }}
              labelOptions="label"
              options={services}
              onChange={(e, value) => setValues(value)}
              multiple={false}
              hasCheckboxes={false}
            />
          }
          <XButton size="medium" onClick={() => handleAddButtonClick()}>
            <CirclePlus />
          </XButton>
        </div>
        <div style={{ display: "flex", flexDirection: "row",   }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "25px",
            }}
          >
            <Home />
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <p style={{ color: "gray", fontWeight: "bold", margin: "0" }}>
                Name
              </p>
              <p style={{ fontWeight: "bold", margin: "0" }}>
                {selectedUser.name}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "25px",
            }}
          >
            <Globe />
            <div
              style={{
                marginLeft: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <p style={{ color: "gray", fontWeight: "bold", margin: "0" }}>
                Organization
              </p>
              <p style={{ fontWeight: "bold", margin: "0" }}>
                 {selectedUser.organizations[organization.uuid]}
              </p>
            </div>
          </div>
        </div>

        <div style={{ height: "230px", overflow: "scroll", marginTop: "10px" }}>
          <AssignRoleRows />
          {userServices?.length > 0 &&
            userServices.map((service, index) => (
              <AssignRoleRows
                key={service.value}
                index={index}
                name={service.label}
                roles={roles}
                role={getRoleUUIDByOrganization(
                  organization.uuid,
                  service.value
                )}
                roleObject={serviceObject}
                organization={organization.uuid}
                service={service}
                addOrChangeRole={addOrChangeRole}
                removeRole={removeRole}
                removeList={removeList}
                setRemoveList={setRemoveList}
              />
            ))}
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <XButton
            onClick={() => handleButtonClick()}
            style={{ marginTop: "10px", width: "200px" }}
            title="Create group"
          >
            <Pencil size={20} style={{ marginRight: "10px" }} />
            save
          </XButton>
        </div>
      </div>
    </StyledDivFlexBetween>
  );
};

export default RoleModal;
