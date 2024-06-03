import {Navigate, useLocation} from "react-router-dom"
import useAuth from '@ximdex/xui-react/hooks/useAuth';

const ProtectedRoute = ({component}) => {
    const location = useLocation();
    const { user } = useAuth();
    
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