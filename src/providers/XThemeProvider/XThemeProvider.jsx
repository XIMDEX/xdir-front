import React from 'react';
import { XThemeProvider } from '@ximdex/xui-react/providers/';
import XthemeContext from './XThemeContext';

const XthemeProvider = ({ children }) => {

    return (
        <XthemeContext.Provider value={{}}>
            <XThemeProvider>
                {children}
            </XThemeProvider>
        </XthemeContext.Provider>
    )
};

export default XthemeProvider;
