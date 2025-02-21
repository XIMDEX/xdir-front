import React, { useState } from "react";
import { StyledMarginContent, StyledTabsContainer, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArchive, faKey } from "@fortawesome/free-solid-svg-icons";
import { XButton } from "@ximdex/xui-react/material";
import { createNewPermission as createNewPermissionService, createNewRole as createNewRoleService } from "../service/xdir.service";
import useModals from "../hooks/useModals";
import { ROLE_TABS } from "../../CONSTANTS";
import CustomTabs from "../components/CustomTabs/CustomTabs";
import RolesList from "../components/RolesPage/RolesList";
import PermissionsList from "../components/RolesPage/PermissionsList";

export default function RolesPage() {
  const { XDirModalInput, executeXPopUp } = useModals();
  const [tabSelected, setTabSelected] = useState(ROLE_TABS[0]);
  const [refreshRoles, setRefreshRoles] = useState(false);
  const [refreshPermissions, setRefreshPermissions] = useState(false);

  const createNewRole = async () => {
    const newName = await XDirModalInput({
      title: 'Create role',
      input: 'text',
      inputPlaceholder: 'Insert new role name',
      inputValidator: (value) => {
        if (!value) {
          return "Please insert a valid name";
        }
      },
    });
    if (newName) {
      const res = await createNewRoleService(newName);
      executeXPopUp(res, 'Role created successfully');
      setRefreshRoles(!refreshRoles);
    }
  };

  const createNewPermission = async () => {
    const newName = await XDirModalInput({
      title: 'Create permission',
      input: 'text',
      inputPlaceholder: 'Insert new permission name',
      inputValidator: (value) => {
        if (!value) {
          return "Please insert a valid name";
        }
      },
    });
    if (newName) {
      const res = await createNewPermissionService(newName);
      executeXPopUp(res, 'Permission created successfully');
      setRefreshPermissions(!refreshPermissions);
    }
  };

  return (
    <StyledXCard
      title={<p style={{ marginLeft: '1em' }}><FontAwesomeIcon icon={faKey} style={{ marginRight: '10px' }} />ROLES AND PERMISSIONS</p>}
      style={{ height: 'auto', width: '80%', margin: '2em auto' }}
      controls={[
        {
          component: (
            <XButton
              onClick={tabSelected === 'Roles' ? createNewRole : createNewPermission}
              title={`${tabSelected === 'Roles' ? 'Create new Role' : 'Create new Permission'}`}
            >
              <FontAwesomeIcon icon={tabSelected === 'Roles' ? faKey : faFileArchive} style={{ marginRight: '10px' }} />
              {`${tabSelected === 'Roles' ? 'Create role' : 'Create Permission'}`}
            </XButton>
          )
        },
      ]}
    >
      <StyledMarginContent>
        <CustomTabs
          tabs={ROLE_TABS}
          setTabSelected={setTabSelected}
        />
        <StyledTabsContainer>
          {tabSelected === 'Roles' && <RolesList refreshRoles={refreshRoles} />}
          {tabSelected === 'Permissions' && <PermissionsList refreshPermissions={refreshPermissions} />}
        </StyledTabsContainer>
      </StyledMarginContent>
    </StyledXCard>
  );
}
