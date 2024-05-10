import { useContext } from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom"
import AuthContext from "../providers/AuthProvider/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedSuperAdminRoutes = ({component}) => {
    const location = useLocation();
    const { user, isSuperAdmin } = useContext(AuthContext);

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
   