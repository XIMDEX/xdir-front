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

export const StyledRedXButton = styled(XButton)`
    &:hover {
        background: #e13144;
    }
`


export const StyledAddButtonWithEffect = styled(XButton)`
    display: inline-block;
    border-radius: 50%;
    transition: all 0.2s ease-in-out 0s;
    font-size: 1em;
    padding: 0.2em 0.8em;
    min-width: auto !important;
    align-self: center;

    
    &:hover {
       border-radius: 5px;
       > span {
          display: inline-block;
       }
    }

    span {
        transition: all .2s ease-in-out;
        display: none;
     }


`