import { Stack } from '@mui/system';
// import { StyledSectionBorder } from '../styles/SectionStyles';
// import { StyledP } from '../styles/ErrorMessagesStyles';
// import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider/AuthContext';
import { useEffect, useState } from 'react';
import { faBuilding, faSchool, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { XLabel } from '@ximdex/xui-react/material';
import { StyledHomeItem } from '../components/styled-compontent/Links';
import { StyledHomeXBox } from '../components/styled-compontent/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Home() { 
    const [homeButtons, setHomeButtons] = useState([])
    const { isAdmin, isSuperAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let buttons = []
        if(isAdmin || isSuperAdmin){
            buttons = [{
                name: 'users',
                icon: faUsers,
                path: '/users'
            }, {
                name: 'roles',
                icon: faUserCheck,
                path: '/roles'
            }, 
            {
                name: 'organizations',
                icon: faBuilding,
                path: '/organizations'
            }
            ]
        }
        if(isSuperAdmin) buttons.push({
            name: 'clients',
            icon: faSchool,
            path: '/clients'
        })
        setHomeButtons(buttons)
    }, []);


    return ( 
        <>
        <Stack 
            spacing={2} 
            direction="row" 
            width={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'100%'}
        > 
            {homeButtons.map((element, index) => (
                <StyledHomeItem
                    key={'regularElement' + index}
                    to={element.path}
                    style={{ 
                        color: '#214F61',
                        textTransform: 'uppercase',
                        fontFamily: 'Open Sans, sans-serif',
                     }}>
                    <XLabel
                        style={{ width: '100%',  }}
                        label={element.name}
                        paddingSize='s'
                        component=
                        {<StyledHomeXBox
                            width={'200'}
                            minHeigthContent={'200'}
                            id={element.id} className="xboxItem">
                            <FontAwesomeIcon icon={element.icon} size='6x' />
                        </StyledHomeXBox>}
                        htmlFor={element.name}
                        labelLocation='bottom'
                    />
                </StyledHomeItem>
            ))}
            {/* <StyledP>Index</StyledP>
        
                {isAdmin || isSuperAdmin ? (
                <>
                    <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={() => {navigate('/users')}}>Manage Users</Button>
                    {isSuperAdmin ? (
                        <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={() => {navigate('/clients')}}>Manage Client</Button>
                    ) : (null)}
                    <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={() => {navigate('/roles')}}>Manage Roles</Button>
                    <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={() => {navigate('/organizations')}}>Manage Organizations</Button>
                </>
                ) : ( null )}
                <Button style={{margin: '10px'}} variant="contained" color="primary" onClick={() => {navigate('/user')}}>My Profile</Button>
            */}
            </Stack> 
        </>
    ); 
} 
export default Home; 