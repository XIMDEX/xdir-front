import { XThemeProvider } from '@ximdex/xui-react/providers/';
import  XAuthProvider from '@ximdex/xui-react/providers/XAuthProvider/XAuthProvider';
import { CLIENT, ENVIRONMENT, TOOL_HASH } from "../../CONSTATNS";

const Providers = ({children}) => {
    return (
        <XThemeProvider>
            <XAuthProvider CLIENT={CLIENT} ENVIRONMENT={ENVIRONMENT} TOOL={TOOL_HASH}>
                {children}
            </XAuthProvider>
        </XThemeProvider>
    )
}

export default Providers;
