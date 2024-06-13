import { XThemeProvider } from '@ximdex/xui-react/providers/';
import  XAuthProvider from '@ximdex/xui-react/providers/XAuthProvider/XAuthProvider';
import { CLIENT, ENVIRONMENT } from "../../CONSTATNS";

const Providers = ({children}) => {
    return (
        <XThemeProvider>
            <XAuthProvider CLIENT={CLIENT} ENVIRONMENT={ENVIRONMENT} TOOL={'FA08'}>
                {children}
            </XAuthProvider>
        </XThemeProvider>
    )
}

export default Providers;
