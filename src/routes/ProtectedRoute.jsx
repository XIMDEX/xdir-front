import { useContext } from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom"
import AuthContext from "../providers/AuthProvider/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedRoute = ({component}) => {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    if (user?.access_token) {
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

export default ProtectedRoute;