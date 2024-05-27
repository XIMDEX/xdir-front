import { styled } from "@mui/system";
import { XCard, XBox, XRow, XLogin } from "@ximdex/xui-react/material";
import ReactModal from "react-modal";

export const StyledCenteredXYDiv = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    min-height: 100vh;
    margin: 0 5vw;
`


export const StyledPoweredByContainer = styled('div')`
    ${({position}) => {
        if(position){
            return`
                position: relative;
            `
        }else{
            return `
                position: absolute;
                bottom: 0px;
                right: 0px;

            
            `
        }
    }}
    width: 200px;
    margin: calc(1rem - 8px);
`;


export const StyledDivFlexAroundWrap = styled('div')`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const StyledDivFlexWrap = styled('div')`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const StyledDivFlexBetween = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-flow: wrap;
    margin: 0.5rem 0;
`;

export const StyledFlexFullCenter = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;



export const StyledDivCenterY = styled('div')`
    display: flex;
    align-items: center;
`


export const StyledButtonsContainer = styled('div')`
    background: #43a1a2;
    color: white;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.25rem;
    cursor: pointer;
`;


export const StyledSpaceAroundDiv = styled('div')`
    display: flex;
    justify-content: space-around;
`


export const StyledXCard = styled(XCard)`
    border-radius: 0 !important;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    
    margin-top: 0;
    margin-bottom: 1.5rem;
`

export const StyledHomeXBox = styled(XBox)`

    padding: 3rem;
    display: flex !important; 
    place-content: center !important;
    align-items: center;
    border-radius: 0 !important;
    background-color: rgb(255, 255, 255);
    
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    border: 2px solid transparent;
    transition: all 0.2s ease;
`


export const StyledXModal = styled(ReactModal)`
    position: unset;
    inset: 40px;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    overflow: auto;
    outline: none;
    padding: 20px;
    width: 600px;
    height: 400px;
`




export const StyledMarginContent = styled('div')`
    margin: 1em 2em;
    padding-bottom: 1em;
`



export const StyledXRow = styled(XRow)`
    border: 0;
    border-top: 1px solid #BBBBBB;
    border-left: 1px solid #BBBBBB;
    border-right: 1px solid #BBBBBB;
`




export const StyledXLogin = styled(XLogin)`
    width: auto !important;
    height: auto !important;
    &:hover{
        border: 1px solid #43a1a2 !important;
    }   

    img{
        margin-bottom: 1em;
        width: 300px !important;
    }
`


export const StyledXCardRegister = styled(StyledXCard)`
    margin: 2em auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px;
    padding: 10px 30px;
    border: 1px solid lightgray;
    background: #ffffff;


    &:hover{
        border: 1px solid #43a1a2 !important;
    }


`




export const StyledTabsContainer = styled('div')`
    width: 100%;
    min-height: 55vh;
    border-left: 2px solid lightgray;
    border-right: 2px solid lightgray;
    border-bottom: 2px solid lightgray;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 0.5vw;
      }
      
    /* Track */
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px #214f61;
        border-radius: 0px;
    }
    
    /* Handle #43a1a2 or #214F61 or #ADADAD */
    &::-webkit-scrollbar-thumb {
        box-shadow: inset 4px 2px 12px 2px #214f61;
        border-radius: 4px;
    }
`