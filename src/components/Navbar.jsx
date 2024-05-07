import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { XNav } from '@ximdex/xui-react/material';
import ximdexImagenav from '../assets/ximdex-logo-poweredby.png';
import AuthContext from '../providers/AuthProvider/AuthContext';


const Navbar = () => {
    const navigate = useNavigate();
    const { forceLogout, user } = useContext(AuthContext);

    const externalLinks = [];

    const internalLinks = [
        {
            text: 'Users',
            url: '/users',
            target: '_self'
        },
        {
            text: 'Roles',
            url: '/roles',
            target: '_self'
        },
        {
            text: 'Organizations',
            url: '/organizations',
            target: '_self'
        },
        {
            text: 'Clients',
            url: '/clients',
            target: '_self'
        }
    ];

    const userLink = [
        {
            text: user ? user?.name : 'xeval user',
            icon: <FontAwesomeIcon icon={faUser} size="1x" title="" />,
            items: [
                {
                    text: 'User',
                    icon: <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ marginRight: '8px'}} />,
                    onClick: () => {navigate('/user')}
                },
                {
                    text: 'Change password',
                    icon: <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ marginRight: '8px'}} />,
                    onClick: () => {navigate('/changePassword')}
                },
                {
                    text: 'Sign out',
                    icon: <FontAwesomeIcon icon={faSignOutAlt} size="1x" style={{ marginRight: '8px'}} />,
                    onClick: () => {forceLogout()}
                },
            ]
        },
    ];

    const links = user ? [ internalLinks, userLink] : []

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
