import { useState, useEffect } from "react";

const useUserRoleObject = (selectedUser, organization, services, roles) => {
  const [userRoleObject, setUserRoleObject] = useState({});

  useEffect(() => {
    if (
      !selectedUser?.p ||
      !selectedUser.uuid ||
      !organization.uuid ||
      !services
    )
      return;

    const userUUID = selectedUser.uuid;

    const organizationsMap = Object.entries(selectedUser.p).reduce(
      (acc, [key, entries]) => {
        entries.forEach((entry) => {
          if (!acc[entry.organization]) {
            acc[entry.organization] = {
              organization_uuid: entry.organization,
              services: [],
            };
          }
          const serviceUUID = services.find(
            (service) => service.label === entry.tool.name
          )?.value;
          const roleUUID = roles.find(
            (role) => role.label === entry.role
          )?.value;
          if (serviceUUID && roleUUID) {
            const existingService = acc[entry.organization].services.find(
              (service) => service.service_uuid === serviceUUID
            );
            if (existingService) {
              existingService.role_uuid.push(roleUUID);
            } else {
              acc[entry.organization].services.push({
                service_uuid: serviceUUID,
                role_uuid: [roleUUID],
              });
            }
          }
        });
        return acc;
      },
      {}
    );

    setUserRoleObject({
      user_uuid: userUUID,
      organizations: Object.values(organizationsMap),
    });
  }, [selectedUser, organization, services, roles]);

  const addOrChangeRole = (organizationUUID, serviceUUID, roleUUID) => {
    setUserRoleObject((prevUserRoleObject = { organizations: [] }) => {
      const newOrganizations = [...prevUserRoleObject.organizations ?? ""];
      let organization = newOrganizations.find(
        (org) => org.organization_uuid === organizationUUID
      );

      if (!organization) {
        organization = { organization_uuid: organizationUUID, services: [] };
        newOrganizations.push(organization);
      }

      let service = organization.services.find(
        (srv) => srv.service_uuid === serviceUUID
      );
      if (!service) {
        service = { service_uuid: serviceUUID, role_uuid: [roleUUID] };
        organization.services.push(service);
      } else {
        service.role_uuid = [roleUUID];
      }

      return {
        ...prevUserRoleObject,
        organizations: newOrganizations,
      };
    });
  };

  const removeRole = (organizationUUID, serviceUUID) => {
    setUserRoleObject((prevUserRoleObject = { organizations: [] }) => {
      const newOrganizations = prevUserRoleObject.organizations
        .map((org) => {
          if (org.organization_uuid !== organizationUUID) {
            return org;
          }
  
          const newServices = org.services.filter(
            (srv) => srv.service_uuid !== serviceUUID
          );
  
          return {
            ...org,
            services: newServices,
          };
        })
        .filter((org) => org.services.length > 0);
  
      return {
        ...prevUserRoleObject,
        organizations: newOrganizations,
      };
    });
  };

  return {
    userRoleObject,
    addOrChangeRole,
    removeRole
  };
};

export default useUserRoleObject;
