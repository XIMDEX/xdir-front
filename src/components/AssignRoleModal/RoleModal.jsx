import React, { useState, useEffect } from "react";
import RoleModalHeader from "./RoleModalHeader";
import RoleModalBody from "./RoleModalBody";
import RoleModalFooter from "./RoleModalFooter";
import {
  getXimdexTools,
  getRoles,
  removeRoleFromUser,
  assignRoleToUser,
} from "../../service/xdir.service";
import useUserRoleObject from "../../hooks/useUserRoleObject";
import { XPopUp } from "@ximdex/xui-react/material";

const RoleModal = ({ selectedUser, setOpenModal, organization }) => {
  const [services, setServices] = useState([]);
  const [roles, setRoles] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [serviceObject, setServiceObject] = useState();

  const { userRoleObject, addOrChangeRole, removeRole } = useUserRoleObject(
    selectedUser,
    organization,
    services,
    roles
  );

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
      const roles = result?.roles?.map((role) => ({
        value: role.uuid,
        label: role.name,
        disabled: role?.label === "superadmin",
      }));
      setRoles(roles);
    };
    fetchServices();
    fetchRoles();
  }, [selectedUser, organization.uuid]);

  useEffect(() => {
    if (services && roles) {
      setServiceObject(userRoleObject);
    }
  }, [services, roles, userRoleObject]);

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
    XPopUp({
      text: "Role assigned successfully",
      iconType: "success",
      timer: "3000",
      popUpPosition: "top",
      iconColor: "green",
    });
  };

  return (
    <div>
      <RoleModalHeader onClose={() => setOpenModal(false)} />
      <RoleModalBody
        services={services}
        roles={roles}
        selectedUser={selectedUser}
        organization={organization}
        addOrChangeRole={addOrChangeRole}
        removeRole={removeRole}
        removeList={removeList}
        setRemoveList={setRemoveList}
      />
      <RoleModalFooter onSave={handleButtonClick} />
    </div>
  );
};

export default RoleModal;
