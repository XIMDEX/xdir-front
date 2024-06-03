import React, { useContext, useEffect, useState } from "react";
import { StyledFlexFullCenter, StyledMarginContent, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools } from "@fortawesome/free-solid-svg-icons";
import { getXimdexTools } from "../service/xdir.service";
import { useSpinner } from "@ximdex/xui-react/hooks";
import { XRow, XRowContent, XRowDetails, XRowExtraDetails } from "@ximdex/xui-react/material";
import { StyledTagStatus } from "../components/styled-compontent/Text";


export default function XimdexTools() {
  const {showSpinner, hideSpinner} = useSpinner()
  const [loading, setLoading] = useState(false)
  const [toolsList, setToolsList] = useState([])

  useEffect(() => {
    getTools()
  }, []);

  const getTools = async () => {
    setLoading(true)
    showSpinner()
    const res = await getXimdexTools()
    console.log(res.tools);
    setToolsList(res.tools)
    hideSpinner()
    setLoading(false)
  }

  return (
    <StyledXCard
      title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faTools} style={{marginRight: '10px'}}/>TOOLS</p>}
      style={{height: 'auto', width: '80%', margin: '2em auto'}}
    >
    <StyledMarginContent>
    {loading ?  <></> :
          <>
            {toolsList.length === 0 ? 
              <StyledFlexFullCenter>
                <p>No tools have been created yet.</p>
              </StyledFlexFullCenter>
            :
              <>
                {toolsList.map((tool, index) => (
                  <XRow
                      style={{
                          background: 'rgb(247, 247, 247)',
                          width: '100%'
                      }}
                      key={'row' + index}
                      identifier={tool.uuid}
                      isCollapsable={true}
                      labelButtonCollapsable={`Show details`}
                      controls={[]}
                  >
                    <XRowContent key={"XRowContent" + index} style={{width: '100%'}}>
                        <p style={{marginLeft: '10px'}}>{tool?.name}</p>
                    </XRowContent>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Description:</strong> {tool.description}</p>
                    </XRowDetails>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Type:</strong> {tool.type}</p>
                    </XRowDetails>
                    <XRowDetails key={"XRowDetails" + index}>
                      <p><strong>Status:</strong> {tool.status}</p>
                    </XRowDetails>
                    <XRowExtraDetails key={"XRowExtraDetails" + index}
                      extraDetails={[
                        {
                            label: 'User ID',
                            type: 'text',
                            value: tool?.uuid
                        }
                      ]}
                    />
                     
                  </XRow>
                ))}
              </>
            }
          </>  
      }
    </StyledMarginContent>
     
  </StyledXCard>

  );
}
