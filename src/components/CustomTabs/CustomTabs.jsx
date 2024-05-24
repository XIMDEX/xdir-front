import { XTabs } from '@ximdex/xui-react/material';
import React, { useEffect, useState } from 'react';

const CustomTabs = ({
    tabs,
    setTabSelected
}) => {
    const [infoTabs, setInfoTabs] = useState([])
    const [infoTabChecked, setInfoTabChecked] = useState(tabs[0]);

    const handleSetLangTabs = (customTabsItems) => {
        let customTabs = []
        
        customTabsItems.forEach(customName => {
            const newTab = {
                name: customName,
                status: infoTabChecked === customName ? 'checked' : 'unchecked',
                handleTabChange: (tab) => setInfoTabChecked(tab.name),
            }
            customTabs.push(newTab)
        })
        setInfoTabs(customTabs)
    }

    useEffect(() => {
        handleSetLangTabs(tabs)
    }, []);

    useEffect(() => {
        handleSetLangTabs(tabs)
        setTabSelected(infoTabChecked)
    }, [infoTabChecked]);

    return (
        <XTabs
            bgColor='100'
            rounded={false}
            tabs={infoTabs}
            style={{ paddingLeft: '16px', borderRadius: '0'}}
        />
    );
}

export default CustomTabs;
