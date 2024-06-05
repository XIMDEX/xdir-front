import { styled } from "@mui/system";


export const TitlePage = styled('h1')`
    font-size: 50px;


`

export const StyledTagStatus = styled ('p')`
    background-color : ${(props) => 
    props.status === 'pending' ? '#f6e80e'
    : props.status === 'completed' ? '#4BA0A0'
    : '#E13144'
    };
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    border: 1px solid lightgrey;
`


export const StyledNavBarProfileText = styled('p')`
    border-radius: 50%;
    border: 1px solid #4BA0A0;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgray;
    color: black;
`

export const StyledNavBarProfileImage = styled('img')`
    border-radius: 50%;
    border: 1px solid #4BA0A0;
`