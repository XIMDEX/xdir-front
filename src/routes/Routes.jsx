import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';

import Register from '../pages/Register'
import LoginPage from '../pages/Login'
import ProtectedSuperAdminRoute from './ProtectedSuperAdmin';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAdminRoutes from './ProtectedAdminRoutes';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Organizations from '../pages/Organizations';
import UserProfile from '../pages/UserProfile';
import VerificationEmail from '../pages/VerificationEmail';
import RolesPage from '../pages/RolesPage';
// import NotFound from '../pages/NotFound';

const Routes = () => {

    return (
        <ReactRoutes>
            {/* Rutas publicas */}
            <Route path="/register" element={<Register/> } />
            <Route path="/login" element={<LoginPage/> } />
            <Route path="/email_verification" element={<VerificationEmail />} />
            <Route path="/email_verification/:action" element={<VerificationEmail />} />
            <Route path="/email_verification/:action/:token" element={<VerificationEmail />} />            
            {/* <Route path="*" element={<NotFound/> } />  */}
            
            {/* Rutas privadas */}
            <Route  exact path="/" element={<ProtectedRoute component={<Home/>}/>}/> 
            <Route  exact path="/home" element={<ProtectedRoute component={<Home/>}/>}/> 
            <Route  path="/profile" element={<ProtectedRoute component={<UserProfile/>}/>}/> 

            {/* Rutas privadas de administrador */}
            <Route  path="/users" element={<ProtectedAdminRoutes component={<Users/>}/>}/> 
            {/* <Route  path="/roles" element={<ProtectedAdminRoutes component={<RolesPage/>}/>}/>  */}


            {/* Rutas privadas de super administrador */}
            <Route  path="/organizations" element={<ProtectedSuperAdminRoute component={<Organizations/>}/>}/> 
               
        </ReactRoutes>
    )
};

export default Routes;