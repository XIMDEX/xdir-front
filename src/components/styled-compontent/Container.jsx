import { styled } from "@mui/system";
import { XCard, XBox, XRow, XLogin, XRadio } from "@ximdex/xui-react/material";
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
    padding: 1em 1em;
    h2{
        p{
            margin-left: 0 !important;
        }
    }
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: arial;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5); /* Fondo oscuro detrás del modal */
  z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */

  & > div {
    position: relative;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    outline: none;
    padding: 20px;
    width: 512px;
    height: 250px;
  }
`;



export const StyledMarginContent = styled('div')`
    margin: 1em 1em;
    padding-bottom: 1em;
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
    border-left: 1px solid lightgray;
    border-right: 1px solid lightgray;
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


export const StyledRolesToolsColumn = styled('div')`
    display: flex;
    flex-direction: column;
    width: 80%;
    border-right: 1px solid lightgrey;

    p {
        margin: 0;
        border-bottom: 1px solid lightgrey;
        width: 100%;
        text-align: left;
        padding: 15px 10px;
        transition: all 0.1s ease;
        text-transform: uppercase;
        &:hover {
            background-color: #e0e0e0;
            font-weight: bold;
            cursor: pointer;

            .trash-icon{
                visibility: visible;
            }
        }

        .trash-icon{
            visibility: hidden;        
        }
    }
`;


export const StyledRoleOptionsColumn = styled('div')`
    display: flex;
    flex-direction: column;
    width: 100%;
`;


export const StyledXRadio = styled(XRadio)`
    padding: 5px;
    margin: 1em 1em;
    & .MuiRadio-root{
        padding: 3px !important;
    }

`
