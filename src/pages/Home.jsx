import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import { useEffect, useState } from 'react';
import { faBuilding, faTools, faUsers } from '@fortawesome/free-solid-svg-icons';
import { XLabel } from '@ximdex/xui-react/material';
import { StyledHomeItem } from '../components/styled-compontent/Links';
import { StyledHomeXBox } from '../components/styled-compontent/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import xevalTool from '../assets/logotipo_ximdex-EVAL-small.png'
import xdamTool from '../assets/logotipo_ximdex-DAM-small-header.png'


const XIMDEX_AVAILABLES_SERVICES = [
    { name: 'XEVAL', toolSrc: xevalTool, type: 'xeval', path: '/' },
    { name: 'XDAM', toolSrc: xdamTool, type: 'xdam', path: '/' },
    // Añadir más herramientas aquí según sea necesario
];


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
                },
                {
                    name: 'services',
                    icon: faTools,
                    path: '/services'
                }
            );
        }
    
        setXdirButtons(buttons);
    }, [isAdmin, isSuperAdmin]);


    // Create toolsButtons
    useEffect(() => {
        let services = {...XIMDEX_AVAILABLES_SERVICES}
        Object.values(user.p).forEach(obj => {
            if (obj.tool) {
                services[obj.tool.type] = true;
            }
        });
        const toolsButtons = XIMDEX_AVAILABLES_SERVICES.filter(tool => services[tool.type]);
        setToolsButtons(toolsButtons);
    
    }, [user]);


    const renderButton = (element, index) => (
        <StyledHomeItem
            key={'regularElement' + index}
            to={element.path}
            onClick={() => handleClick(element)}
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
                <p style={{width: '30%', textAlign:'center', paddingTop: '14em'}}>
                    Please contact an administrator to complete the setup of your account with the necessary roles and start working!
                </p>
                </Stack>
            }
        </>
    );
}

export default Home;