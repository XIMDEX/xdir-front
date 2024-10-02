import {  XButton, XRow, XRowContent, XRowDetails } from "@ximdex/xui-react/material";
import { StyledXRadio } from "../styled-compontent/Container";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

const AssignRoleRows = ({ index,name,roles,role,addOrChangeRole,removeRole,organization,service,removeList,setRemoveList,disabled = true }) => {
  const [roleSelected,setRoleSelected] = useState()
  const handleRoleChange = (event) => {
    addOrChangeRole(organization,service.value,event.target.value)
    setRoleSelected(event.target.value)
  }

  const handleRemoveList = () => {
    setRemoveList([...removeList, {organization:organization,service:service.value,role:roleSelected}])
    removeRole(organization,service.value,roleSelected)
  }

  useEffect(() => {
    setRoleSelected(role)
  }, [role])
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
      controls={[
        {
          component: (
              <XButton
              onClick={() => {handleRemoveList()}}
              title="Create group"
              >
                <Trash size={20} />
              </XButton>
          ),
        }
      ]}
    >
      <XRowContent  key={"XRowContent"} style={{justifyContent: "space-between"}}>
        <p>{name}</p>
      </XRowContent>
      <XRowDetails key={"XRowDetails" }>
         <StyledXRadio
                                direction='row'
                                value={roleSelected}
                                onChange={(e) =>  {handleRoleChange(e)}}
                                options={roles.map(role => ({...role, label: role.label.toUpperCase()}))}
                                disabled={disabled}
                        />
      </XRowDetails>
 
    </XRow>) }
    </>
  );
  
};

export default AssignRoleRows;
