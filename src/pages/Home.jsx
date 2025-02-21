import { Stack } from '@mui/system';
import useAuth from '@ximdex/xui-react/hooks/useAuth';
import { useEffect, useState } from 'react';
import { XLabel } from '@ximdex/xui-react/material';
import { StyledHomeItem } from '../components/styled-compontent/Links';
import { StyledHomeXBox } from '../components/styled-compontent/Container';
import xevalTool from '../assets/logotipo_ximdex-EVAL-small.png'
import xdamTool from '../assets/logotipo_ximdex-DAM-small-header.png'
import { Building, Computer, UsersRound } from 'lucide-react';


const XIMDEX_AVAILABLES_SERVICES = [
    { name: 'XEVAL', toolSrc: xevalTool, type: 'xeval', path: '/' },
    { name: 'XDAM', toolSrc: xdamTool, type: 'xdam', path: '/' },
];


function Home() { 
    const [xdirButtons, setXdirButtons] = useState([])
    const [toolsButtons, setToolsButtons] = useState([])
    const { user, userPermissionManager } = useAuth();
    const isSuperAdmin = userPermissionManager?.isSuperAdmin()
    const isAdmin = userPermissionManager?.isAdmin()

    // Create XDir buttons
    useEffect(() => {
        const buttons = [];
        if (isAdmin || isSuperAdmin) {
            buttons.push(
                {
                    name: 'users',
                    icon:  <UsersRound size={80} />,
                    path: '/users'
                },
                {
                    name: 'organizations',
                    icon: <Building size={80} />,
                    path: '/organizations'
                },
                {
                    name: 'services',
                    icon: <Computer size={80} />,
                    path: '/services'
                }
            );
        }
    
        setXdirButtons(buttons);
    }, [isAdmin, isSuperAdmin]);


    // Create toolsButtons
    useEffect(() => {
        let services = {...XIMDEX_AVAILABLES_SERVICES}
        if(user?.p){
            Object?.values(user?.p)?.forEach(obj => {
                if (obj.tool) {
                    services[obj.tool.type] = true;
                }
            });
            const toolsButtons = XIMDEX_AVAILABLES_SERVICES.filter(tool => services[tool.type]);
            setToolsButtons(toolsButtons);
        }
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
                        {element.icon && element.icon}
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