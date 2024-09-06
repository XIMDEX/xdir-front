import {  XRow, XRowContent, XRowDetails } from "@ximdex/xui-react/material";
import { StyledXRadio } from "../styled-compontent/Container";
 const OPTIONS = [
    { value: 'ALL', label: 'Show all: Active & Draft'},
    { value: 'ACTIVE', label: 'Active'},
    { value: 'DRAFT', label: 'Draft' },
    { value: 'ARCHIVED', label: 'Archived' },
];
const AssignRoleRows = ({ index,name,roles }) => {
  return (
    <>
    {name && (<XRow
      style={{
        background: "rgb(247, 247, 247)",
        width: "100%",
      }}
      key={"row"}
      labelButtonCollapsable={`Show details`}
      isCollapsable={true}
    >
      <XRowContent  key={"XRowContent"}>
        <p>{name}</p>
      </XRowContent>
      <XRowDetails key={"XRowDetails" }>
         <StyledXRadio
                                direction='row'
                                value={"7d25b29c-0e4e-4c6f-a7e8-0f2a5e2d8ee5"}
                                onChange={(e,value) =>  {console.log(e.target.value)}}
                                options={roles.map(role => ({...role, label: role.label.toUpperCase()}))}
                        />
      </XRowDetails>
    </XRow>) }
    </>
  );
  
};

export default AssignRoleRows;
