import { useContext } from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom"
import AuthContext from "../providers/AuthProvider/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedSuperAdminRoutes = ({component}) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    if (user?.access_token) {
        if(!user.roles.some(role => role.name === "SuperAdmin")) {
            return <Navigate to="/" state={{ from: location}} replace />
        }
        return (
            <>
                <Navbar />
                {component}
            </>
        ) 
    } else {
        return (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    };
};

export default ProtectedSuperAdminRoutes;
   