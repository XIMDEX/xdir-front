import React, { useEffect, useState } from "react";
import AssignRoleRows from "./AssignRoleRows";
import UserInfo from "./UserInfo";
import { XButton, XDropdown } from "@ximdex/xui-react/material";
import { CirclePlus } from "lucide-react";

const RoleModalBody = ({
  services,
  roles,
  selectedUser,
  organization,
  addOrChangeRole,
  removeRole,
  removeList,
  setRemoveList,
}) => {
  const [values, setValues] = useState();
  const [userServices, setUserServices] = useState([]);

  const getRoleUUIDByOrganization = (organizationId, toolName) => {
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

    if (!roleName) return null;

    const role = roles.find((role) => role.label === roleName);
    return role ? role.value : null;
  };

  useEffect(() => {
    const fetchUserServices = async () => {
      const tools = Object.values(selectedUser.p)
        .flat()
        .filter((entry) => entry.organization === organization.uuid)
        .map((entry) => ({ value: entry.tool.uuid, label: entry.tool.name }));
      setUserServices(tools);
    };
    fetchUserServices();
  }, [selectedUser, organization.uuid]);

  useEffect(() => {
    if (!removeList || removeList.length === 0) return;
    const updatedUserServices = userServices?.filter(
      (userService) =>
        !removeList.some(({ service }) => service === userService.value)
    );
    
    setUserServices(updatedUserServices);
  }, [removeList]);

  const handleAddButtonClick = () => {
    const viewerRole = roles.find((role) => role.label === "viewer");
    const viewerRoleValue = viewerRole ? viewerRole.value : null;

    if (viewerRoleValue) {
      addOrChangeRole(organization.uuid, values.value, viewerRoleValue);

      setUserServices((prevUserServices) => {
        const existingServiceIndex = prevUserServices.findIndex(
          (service) => service.value === values.value
        );

        if (existingServiceIndex >= 0) {
          return prevUserServices.map((service) =>
            service.value === values.value
              ? { ...service, role_uuid: viewerRoleValue }
              : service
          );
        } else {
          return [
            ...prevUserServices,
            {
              value: values.value,
              label: values.label,
              role_uuid: viewerRoleValue,
            },
          ];
        }
      });
    }
  };

  return (
    <div>
      <UserInfo selectedUser={selectedUser} organization={organization} />
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
      <div style={{ padding: "10px", height: "250px", overflow: "auto" }}>
        {userServices.map((service, index) => (
          <AssignRoleRows
            key={index}
            index={index}
            name={service.label}
            roles={roles}
            role={getRoleUUIDByOrganization(organization.uuid, service.value)}
            addOrChangeRole={addOrChangeRole}
            removeRole={removeRole}
            organization={organization.uuid}
            service={service}
            removeList={removeList}
            setRemoveList={setRemoveList}
          />
        ))}
      </div>
    </div>
  );
};

export default RoleModalBody;
