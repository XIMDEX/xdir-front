import React, { useContext, useEffect, useState } from "react";
import { StyledMarginContent, StyledTabsContainer, StyledXCard } from "../components/styled-compontent/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModals from "../hooks/useModals";
import { SERVICES_TABS } from "../../CONSTATNS";
import CustomTabs from "../components/CustomTabs/CustomTabs";
import { faServer } from "@fortawesome/free-solid-svg-icons";


export default function Services() {
  const [tabSelected, setTabSelected] = useState(SERVICES_TABS[0])

  return (
    <StyledXCard
    title={<p style={{marginLeft: '1em'}}><FontAwesomeIcon icon={faServer} style={{marginRight: '10px'}}/>SERVICES</p>}
    style={{height: 'auto', width: '80%', margin: '2em auto'}}
    
  >
    <StyledMarginContent>
    <CustomTabs
        tabs={SERVICES_TABS}
        setTabSelected={setTabSelected}
      />
      <StyledTabsContainer>
        {tabSelected === 'XDAM' && <p>XDAM</p>}
        {tabSelected === 'XEVAL' && <p>XEVAL</p>}
        {tabSelected === 'XEDIT' && <p>XEDIT</p>}
        {tabSelected === 'XDIR' && <p>XDIR</p>}
      </StyledTabsContainer>
    </StyledMarginContent>
     
  </StyledXCard>

  );
}
