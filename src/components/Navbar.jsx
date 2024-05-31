import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faExternalLinkAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { XNav, XPopUp } from '@ximdex/xui-react/material';
import ximdexImagenav from '../assets/logotipo_ximdex-DIR-white.png';
import AuthContext from '../providers/AuthProvider/AuthContext';
import useModals from '../hooks/useModals';


const Navbar = () => {
    const location = useLocation()
    const navigate = useNavigate();
    const { 
        user,
        isSuperAdmin,
        isAdmin,
        isAuthenticated
    } = useContext(AuthContext);
    const {logoutModal} = useModals()
    const [internalLinks, setInternalLinks] = useState([])

    useEffect(() => {
        let links = []
        if((isAdmin || isSuperAdmin)){
            links =  [
                {
                    text: 'Users',
                    url: '/users',
                    target: '_self'
                },
                {
                    text: 'Organizations',
                    url: '/organizations',
                    target: '_self'
                },
                {
                    text: 'Tools',
                    url: '/tools',
                    target: '_self'
                }
            ]
        }   
        setInternalLinks(links)
    }, [user]);

    const externalLinks = [];

    const userLink = [
        {
            text: user ? user?.name : 'xeval user',
            icon: <FontAwesomeIcon icon={faUser} size="1x" title="" />,
            items: [
                {
                    text: <p style={{margin: '0', flexGrow:'1'}}>Account</p>,
                    icon: <FontAwesomeIcon icon={faUser} size="1x" style={{ marginRight: '8px'}} />,
                    onClick: () => {navigate('/profile')}
                },
                {
                    text: <p style={{margin: '0', flexGrow:'1'}}>Change password</p>,
                    icon: <FontAwesomeIcon icon={faLock} size="1x" style={{ marginRight: '8px'}} />,
                    onClick: () => {navigate('/email_verification')}
                },
                {
                    text: <p style={{margin: '0', flexGrow:'1'}}>Sign out</p>,
                    icon: <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ marginRight: '8px'}} />,
                    onClick: () => {logoutModal()}
                },
            ]
        },
    ];

    const links =  !isAuthenticated ? [] : location.pathname === '/' ? [userLink] : [internalLinks, userLink]

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
