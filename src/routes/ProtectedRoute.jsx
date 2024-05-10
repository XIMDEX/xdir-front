import { useContext } from "react";
import {Navigate, useLocation} from "react-router-dom"
import AuthContext from "../providers/AuthProvider/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedRoute = ({component}) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    
    if (!user?.access_token) {
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

export default ProtectedRoute;