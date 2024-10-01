import { XTabs } from '@ximdex/xui-react/material';
import React, { useEffect, useState } from 'react';

const CustomTabs = ({ tabs, setTabSelected }) => {
    const [infoTabs, setInfoTabs] = useState([]);
    const [infoTabChecked, setInfoTabChecked] = useState(tabs[0]);

    const handleSetLangTabs = (customTabsItems, checkedTab) => {
        const customTabs = customTabsItems.map(customName => ({
            name: customName,
            status: checkedTab === customName ? 'checked' : 'unchecked',
            handleTabChange: () => setInfoTabChecked(customName),
        }));
        setInfoTabs(customTabs);

    };

    useEffect(() => {
        handleSetLangTabs(tabs, tabs[0]);
        setTabSelected(tabs[0]);
    }, [tabs, setTabSelected]);

    useEffect(() => {
        handleSetLangTabs(tabs, infoTabChecked);
        setTabSelected(infoTabChecked);
    }, [infoTabChecked, tabs, setTabSelected]);

    return (
        <XTabs
            bgColor='100'
            rounded={false}
            tabs={infoTabs}
            style={{ paddingLeft: '16px', borderRadius: '0' }}
        />
    );
};

export default CustomTabs;