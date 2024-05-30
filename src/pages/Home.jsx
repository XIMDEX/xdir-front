import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider/AuthContext';
import { useEffect, useState } from 'react';
import { faBuilding, faKey, faSchool, faUsers } from '@fortawesome/free-solid-svg-icons';
import { XLabel } from '@ximdex/xui-react/material';
import { StyledHomeItem } from '../components/styled-compontent/Links';
import { StyledHomeXBox } from '../components/styled-compontent/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import xevalTool from '../assets/logotipo_ximdex-EVAL-small.png'
import xdamTool from '../assets/logotipo_ximdex-DAM-small-header.png'


function Home() { 
    const [xdirButtons, setXdirButtons] = useState([])
    const [toolsButtons, setToolsButtons] = useState([])
    const { user, isAdmin, isSuperAdmin } = useAuth();
    const navigate = useNavigate();

    // Create XDir buttons
    useEffect(() => {
        const buttons = [];
        if (isAdmin || isSuperAdmin) {
            buttons.push(
                {
                    name: 'users',
                    icon: faUsers,
                    path: '/users'
                },
                {
                    name: 'organizations',
                    icon: faBuilding,
                    path: '/organizations'
                }
            );
        }
    
        setXdirButtons(buttons);
    }, [isAdmin, isSuperAdmin]);


    // Create toolsButtons
    useEffect(() => {
        if(false){
            setToolsButtons([
                {
                    name: 'XEVAL',
                    toolSrc: xevalTool,
                    path: '/'
                },
            {
                    name: 'XDAM',
                    toolSrc: xdamTool,
                    path: '/'
                }
            ])
            }
    
    }, [user]);


    const renderButton = (element, index) => (
        <StyledHomeItem
            key={'regularElement' + index}
            to={element.path}
            style={{
                color: '#214F61',
                textTransform: 'uppercase',
            }}
        >
            <XLabel
                style={{ width: '100%' }}
                label={element.name}
                paddingSize='s'
                component={
                    <StyledHomeXBox
                        width={200}
                        minHeigthContent={200}
                        id={element.id}
                        className="xboxItem"
                    >
                        {element.toolSrc && <img src={element.toolSrc} alt={element.name} />}
                        {element.icon && <FontAwesomeIcon icon={element.icon} size='6x' />}
                    </StyledHomeXBox>
                }
                htmlFor={element.name}
                labelLocation='bottom'
            />
        </StyledHomeItem>
    );

    return (
        <>
            {xdirButtons.length > 0 || toolsButtons.length > 0 ?
                <> 
                    <Stack
                        spacing={2}
                        direction="row"
                        width={'100%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        height={'100%'}
                    >
                        {xdirButtons.map(renderButton)}
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="row"
                        width={'100%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        height={'100%'}
                    >
                        {toolsButtons.map(renderButton)}
                    </Stack>
                </>
            :
                <Stack
                    spacing={2}
                    direction="row"
                    width={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    height={'100%'}
                >   
                <p style={{width: '30%', textAlign:'center', paddingTop: '10em 0'}}>
                    Please contact an administrator to complete the setup of your account with the necessary roles and start working!
                </p>
                </Stack>
            }
        </>
    );
}

export default Home;