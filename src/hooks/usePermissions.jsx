const usePermissions = () => {
    const checkPermissionOnOrganizationTool = (permissions, organization, tool) => {
        const allEntries = Object.values(permissions).flatMap(entries => entries);
        const entry = allEntries.find(entry => entry.organization === organization && entry.tool.uuid === tool);
        if(entry?.role === "superadmin" || entry?.role === "admin") return false;
        return true;
    };

    return { checkPermissionOnOrganizationTool };
}

export default usePermissions