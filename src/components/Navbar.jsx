import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XNav } from '@ximdex/xui-react/material';
import ximdexImagenav from '../assets/logotipo_ximdex-DIR-white.png';
import useModals from '../hooks/useModals';
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import { StyledNavBarProfileImage, StyledNavBarProfileText } from './styled-compontent/Text';
import { Lock, LogOutIcon, User } from 'lucide-react';


const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate();

    const { 
        user,
        userPermissionManager,
        isAuthenticated
    } = useAuth()
    const isSuperAdmin = userPermissionManager?.isSuperAdmin();
    const isAdmin = userPermissionManager?.isAdmin();
    const {logoutModal} = useModals()
    const [internalLinks, setInternalLinks] = useState([])
    
    useEffect(() => {
        let links = []
        if((isAdmin || isSuperAdmin)){
            links =  [
                {
                    onClick: () => navigate('/users'),
                    text: 'Users',
                },
                {
                    text: 'Organizations',
                    onClick: () => navigate('/organizations'),
                },
                {
                    text: 'Services',
                    onClick: () => navigate('/services'),
                }
            ]
        }   
        setInternalLinks(links)
    }, [isAdmin, isSuperAdmin]);

    const externalLinks = [];

    const userLink = [
        {
            // text: user ? user?.name : 'xeval user',
            icon: user?.image ? <StyledNavBarProfileImage src={user.image}/> : <StyledNavBarProfileText>{`${user?.name[0].toUpperCase()}${user?.surname[0].toUpperCase()}`}</StyledNavBarProfileText>,
            items: [
                {
                    text: <p style={{margin: '0', flexGrow:'1'}}>Account</p>,
                    icon: <User size={25} style={{ marginRight: '8px'}} />,
                    onClick: () => {navigate('/profile')}
                },
                {
                    text: <p style={{margin: '0', flexGrow:'1'}}>Change password</p>,
                    icon: <Lock size={25} style={{ marginRight: '8px'}} />,
                    onClick: () => {navigate('/email_verification')}
                },
                {
                    text: <p style={{margin: '0', flexGrow:'1'}}>Sign out</p>,
                    icon: <LogOutIcon size={25} style={{ marginRight: '8px'}} />,
                    onClick: () => {logoutModal()}
                },
            ]
        },
    ];

    const links =  !isAuthenticated ? [] : (location.pathname === '/' || location.pathname === '/home')? [userLink] : [internalLinks, userLink]

    const logoLink = {
        logoImgSrc: ximdexImagenav
    }


    return (
        <XNav
            color='secondary'
            style={{backgroundColor:'#214F61', position:'fixed', top:'0',zIndex: '10'}}
            logoLink={logoLink}
            links={links}
        />
    );
};

export default Navbar;
