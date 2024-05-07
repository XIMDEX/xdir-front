import React from 'react';
import { Routes as ReactRoutes, Route } from 'react-router-dom';
// import Home from '../pages/Home'
// import Users from '../pages/Users'
import Register from '../pages/Register'
import LoginPage from '../pages/Login'
// import Profile from '../pages/Profile'
// import Roles from '../pages/Roles'
// import Organizations from '../pages/Organizations'
// import Clients from '../pages/Clients';
import ProtectedSuperAdminRoute from './ProtectedSuperAdmin';
import ProtectedRoute from './ProtectedRoute';
import ProtectedAdminRoutes from './ProtectedAdminRoutes';
import Home from '../pages/Home';
// import PasswordChange from '../pages/PasswordChange';
// import NotFound from '../pages/NotFound';

const Routes = () => {

    return (
        <ReactRoutes>
            {/* Rutas publicas */}
            <Route path="/register" element={<Register/> } />
            <Route path="/login" element={<LoginPage/> } />
            {/* <Route path="*" element={<NotFound/> } />  */}
            
            {/* Rutas privadas */}
            {/* <Route element={<ProtectedRoute/>}> */}
            <Route 
                exact path="/" 
                element={<ProtectedRoute component={<Home/>}/>} 
            /> 
        
                {/* <Route path="/user" element={<Profile/> } /> */}
                {/* <Route path="/changePassword" element={<PasswordChange/> } /> */}

                {/* Rutas privadas de administrador */}
                {/* <Route element={<ProtectedAdminRoutes/>}> */}
                    {/* <Route path="/users" element={<Users/> } /> */}
                    {/* <Route path="/roles" element={<Roles/> } /> */}
                    {/* <Route path="/organizations" element={<Organizations/> } />  */}

                    {/* Rutas privadas de super administrador */}
                    {/* <Route element={<ProtectedSuperAdminRoute/>}> */}
                        {/* <Route path="/clients" element={<Clients/> } /> */}
                    {/* </Route> */}
                {/* </Route> */}
            {/* </Route> */}
        </ReactRoutes>
    )
};

export default Routes;