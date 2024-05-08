import { styled } from "@mui/system";
import { XButton } from "@ximdex/xui-react/material";

export const StyledGreenButtonIcon = styled(XButton)`
    color: #ffffff;
    font-size: 1em;
    min-width: unset;
    width: 2em;
    margin-left: 0.5em;
`;

export const StyledRedButtonIcon = styled(StyledGreenButtonIcon)`
    &:hover {
        background: #e13144;
    }
`;