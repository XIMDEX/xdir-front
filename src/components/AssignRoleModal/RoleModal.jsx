import { useEffect, useState } from "react";
import { getRoles, getXimdexTools } from "../../service/xdir.service";
import { StyledDivFlexBetween } from "../styled-compontent/Container";
import AssignRoleRows from "./AssignRoleRows";
import CustomTabs from "../CustomTabs/CustomTabs";
import { StyledGreenButtonIcon } from "../styled-compontent/Buttons";
import { X } from "lucide-react";

const RoleModal = ({ selectedUser, setOpenModal }) => {
  const [services, setServices] = useState([]);
  const [roles, setRoles] = useState([]);
  const [tabSelected, setTabSelected] = useState(null);
  const [userServices, setUserServices] = useState([]);

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
    if (tabSelected) {
      const organizationUUID = Object.keys(selectedUser.organizations).find(
        (key) => selectedUser.organizations[key] === tabSelected
      );

      if (organizationUUID) {
        const tools = Object.values(selectedUser.p)
          .filter((entry) => entry.organization === organizationUUID)
          .map((entry) => entry.tool.name);
        setUserServices(tools);
      }
    }
  }, [tabSelected, selectedUser]);

  const organizationValues = Object.values(selectedUser.organizations);

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
      <div style={{ width: "100%" }}>
        <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
          Assign Role
        </h2>
        <CustomTabs tabs={organizationValues} setTabSelected={setTabSelected} />
        <div style={{ maxHeight: "300px", overflow: "scroll" }}>
          <AssignRoleRows />
          {userServices.length > 0 &&
            userServices.map((service, index) => (
              <AssignRoleRows
                key={service}
                index={index}
                name={service}
                roles={roles}
              />
            ))}
        </div>
      </div>
    </StyledDivFlexBetween>
  );
};

export default RoleModal;
