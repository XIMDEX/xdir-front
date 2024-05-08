import { Link } from 'react-router-dom';
import { styled } from "@mui/system";

export const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


export const StyledHomeItem = styled(StyledLink)`
    width: 250px;
    a{
        
        height:auto;
    }
    &:hover{
        transition: all 0.2s ease;

        label{
            font-weight: bold;
        }
        .xboxItem{
            border: 2px solid #43a1a2;

        }
    }

`
