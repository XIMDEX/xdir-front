import {Navigate, Outlet, useLocation} from "react-router-dom"
import useAuth from '@ximdex/xui-react/hooks/useAuth';

const ProtectedAdminRoutes = ({component}) => {
    const location = useLocation();
    const { user, userPermissionManager } = useAuth();
    const isSuperAdmin = userPermissionManager?.isSuperAdmin();
    const isAdmin = userPermissionManager?.isAdmin();
    

    if (user?.access_token) {
        if(isAdmin && isSuperAdmin) {
            return <Navigate to="/" state={{ from: location}} replace />
        }
    }else{
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return (
        <>
            {component}
        </>
    ) 
};

export default ProtectedAdminRoutes;
   