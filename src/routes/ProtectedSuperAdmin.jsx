import {Navigate, Outlet, useLocation} from "react-router-dom"
import useAuth from '@ximdex/xui-react/hooks/useAuth';

const ProtectedSuperAdminRoutes = ({component}) => {
    const location = useLocation();
    const { user, isSuperAdmin } = useAuth();

    if (user?.access_token) {
        if(!isSuperAdmin) {
            return <Navigate to="/" state={{ from: location}} replace />
        }
    } else {
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    };

    return (
        <>
            {component}
        </>
    ) 
};

export default ProtectedSuperAdminRoutes;
   