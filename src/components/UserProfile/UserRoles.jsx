


import React, { useEffect, useState } from 'react';
import { StyledDivCenterY, StyledFlexFullCenter, StyledXCard } from '../styled-compontent/Container';
import { XRow, XRowContent, XRowDetails } from '@ximdex/xui-react/material';
import { Computer } from 'lucide-react';




const UserRoles = ({user}) => {
  const rolesAvailables = Object?.values(user?.p ?? {});
  const [rolesInfo, setRolesInfo] = useState();

  useEffect(() => {
    setRolesInfo(
      rolesAvailables?.map(item => {
        return {
          role: item.role,
          service: item.tool.type,
          service_name: item.tool.name
        };
      })
    );
  }, []);
  
  
    return (<StyledXCard
              title={<StyledDivCenterY>
                <Computer size={30} style={{ marginRight: '10px' }}/>
                <p>
                  SERVICES
                </p>
              </StyledDivCenterY>}
              style={{height: 'auto', width: '80%', margin: '10px auto', padding: '0 1em'}}
              isCollapsable={true}
              isCollapsed={true}
              // controls={}
            >
                {rolesInfo?.length === 0 ? 
              <StyledFlexFullCenter>
                <p>No roles assigned yet.</p>
              </StyledFlexFullCenter>
            :
              <StyledFlexFullCenter style={{paddingBottom:'1em', flexDirection: 'column'}}>
                {rolesInfo?.map((role, index) => (
                  <XRow
                      style={{
                          borderTop: '1px solid lightgray',
                          background: 'rgb(247, 247, 247)',
                          width: '100%',
                      }}
                      key={'row' + index}
                      identifier={index}
                      isCollapsable={true}
                      labelButtonCollapsable={`Show details`}
                  >
                    <XRowContent key={"XRowContent" + index}>
                      <p>{role.service_name}</p>
                    </XRowContent>

                    
                        <XRowDetails
                            key={"XRowDetails_1"}
                        >
                            <p><strong>Name:</strong> {role.service_name}</p>
                        </XRowDetails>
                        <XRowDetails
                            key={"XRowDetails_2"}
                        >
                            <p><strong>Type:</strong> {role.service}</p>
                        </XRowDetails>
                        <XRowDetails
                            key={"XRowDetails_3"}
                        >
                            <p><strong>Role:</strong> {role.role}</p>
                        </XRowDetails>
                  </XRow>
                ))}
                </StyledFlexFullCenter>
            }
          </StyledXCard>);
  }
  
  
  

export default UserRoles;

  
  
  