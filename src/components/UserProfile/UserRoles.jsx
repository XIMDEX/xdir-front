


import { useAuth } from '@ximdex/xui-react/hooks';
import React from 'react';
import { StyledDivCenterY, StyledFlexFullCenter, StyledXCard } from '../styled-compontent/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faTools } from '@fortawesome/free-solid-svg-icons';
import { ROLES } from '../../../CONSTATNS';
import { XRow, XRowContent, XRowDetails } from '@ximdex/xui-react/material';




const UserRoles = ({user}) => {
    const rolesAvailables = Object.values(user.p);
    const rolesInfo = rolesAvailables.map(item => {
        return {
          role: item.role,
          service: item.tool.type,
          service_name: item.tool.name
        };
      });

  
    return (<StyledXCard
              title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faTools} style={{marginRight: '10px'}}/>SERVICES</p>}
              style={{height: 'auto', width: '80%', margin: '2em auto', padding: '0 1em'}}
              isCollapsable={true}
              isCollapsed={true}
              // controls={}
            >
                {rolesInfo?.length === 0 ? 
              <StyledFlexFullCenter>
                <p>No roles assigned yet.</p>
              </StyledFlexFullCenter>
            :
              <>
                {rolesInfo?.map((role, index) => (
                  <XRow
                      style={{
                          background: 'rgb(247, 247, 247)',
                          width: '100%',
                          marginBottom: "1em"
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
                </>
            }
          </StyledXCard>);
  }
  
  
  

export default UserRoles;

  
  
  