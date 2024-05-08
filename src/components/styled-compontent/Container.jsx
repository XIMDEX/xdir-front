import { styled } from "@mui/system";
import { XContainerContent, XCard, XTag, XBox, XModal, XTabs, XRow, XLogin } from "@ximdex/xui-react/material";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

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

export const StyledDivFlexStartWrap = styled('div')`
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    
    & .css-5x384n-MuiAutocomplete-root, .css-89vv9g-MuiAutocomplete-root, .css-y9f21q-MuiFormControl-root-MuiTextField-root {
       & input {
            padding: 0 !important;
        }
        & label {
            margin-top: -5px !important;
        }
    }

    & .css-17vbkzs-MuiFormControl-root-MuiTextField-root{
        margin-top: 0 !important;
    }
`;


export const StyledHeaderListDiv = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: wrap;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    padding: 0 2em;
    margin: 2rem 5rem 0 5rem;
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


export const StyledActivityCardsContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
`;

export const StyledPageContainer = styled('div')`
    border-radius: 0 !important;
    background-color: rgb(255, 255, 255);
        // background-color: rgb(238 238 238);
    
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    height: 90%;
    margin: 2em 5em;    
    // border: 1px solid rgba(33, 79, 97, 0.38);
    border: 1px solid rgb(204, 204, 204);

    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 0.5vw;
      }
      
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px #214f61;
        border-radius: 0px;
      }
      
    /* Handle #43a1a2 or #214F61 or #ADADAD */
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 4px 2px 12px 2px #214f61;
        border-radius: 4px;
    }


    
    
    
    `;
    
    export const StyledCreateNewActivityHeader = styled('div')`
        background-color: rgb(255, 255, 255);
        display: flex;  
        overflow: hidden;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        text-align: center;
        border-bottom: 1px solid lightgrey;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        padding: 0 1em;
        h2{
            font-size: 30px;
            background-color: white;
            width: 100%;
        }

`

export const StyledFeedbackContainer = styled('div')`
    display: flex;
    align-items: start;
`;

export const StyledDivCenterY = styled('div')`
    display: flex;
    align-items: center;
`

export const StyledButtonCenterContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin: 1rem;
`;

export const StyledGrid = styled('div')`
    display: grid;
    grid-template-columns: auto 1fr;
    min-height: calc(100VH - 82px);
    margin: 1rem 4rem 0 4rem;
`;

export const StyledActivitiesListContainer = styled('div')`
    padding: 1rem;
    // background: #EAEAEA;
    background: transparent;
`;

export const StyledListMapContainer = styled('div')`
    padding: 1rem 2rem;
    background-color: rgb(255, 255, 255);
    
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    width: 100%;
    margin: 0;

`

export const ActivityRow = styled('div')`
    display: grid;
    grid-template-columns: 100px auto 210px 135px;
    grid-column-gap: 1rem;
    padding: 0.25rem 0.75rem;
    min-height: 65px;
    align-items: center;
    border: 0.5px solid #BBBBBB;
    background: #FBFBFB;
`;

export const ActivityRowDetails = styled('div')`
    display: grid;
    padding: 0.5rem;
    align-items: center;
    border: 0.25px solid #DDD;
    background: white;
    grid-template-columns: 0.25fr 2.25fr 0.75fr;
    margin: 0 0 0 6px;
`;

export const ActivityRowDateDetails = styled(ActivityRowDetails)`
    border: 0.5px solid #BBBBBB;
    border-top: 0.5px solid #FFF;
    background: #FBFBFB;
    margin: -5px 0 0 0;    
    padding: 0 0.5rem;
    grid-template-columns: 2.5fr 0.75fr;
    justify-items: self-end;
`;

export const ActivityRowDetailsArchived = styled(ActivityRowDetails)`
    grid-template-columns: 1fr;

    >p {
        margin: 6px;
    }
`;

export const AssessmentRow = styled('div')`
    display: grid;
    grid-template-columns: 85px auto 160px 120px;
    grid-column-gap: 1rem;
    padding: 0.25rem 0.75rem;
    min-height: 65px;    
    align-items: center;
    border: 0.5px solid #BBBBBB;
    background: #FBFBFB;
`;

export const AssessmentRowDetails = styled(AssessmentRow)`
    border: 0.25px solid #DDD;
    background: white;
    display: grid;
    align-items: center;
    grid-template-columns: 0.30fr 2.0fr 0.75fr;
    grid-column-gap: 1rem;
    margin: 0 0 0 6px;
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

export const StyledActionsEditTranslations = styled('div')`
    display: flex;
    justify-content: center;
    aling-items: center;
    flex-direction: column;
`

export const StyledSpaceAroundDiv = styled('div')`
    display: flex;
    justify-content: space-around;
`
export const StyledSearchContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    background: transparent;
    max-width: 300px;
    width: 100%;
    height: 100%;
`

export const StyledTagContainer = styled('div')`
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem;
`;

export const StyledTagContainerForIdentifyingData = styled(StyledTagContainer)`
    margin: 0 0 0 89px;
`

export const StyledImgPairingContainer = styled('div')`
    text-align: center;
    margin-bottom: 8px;
    max-width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:hover {
        img{
            opacity: 0.8;
        }

        .delete-image-button {
            visibility: visible;
        }
    }

    .delete-image-button {
        visibility: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`

export const StyledContainerButtonsList = styled('div')`
    display: flex;
    justify-content: end;
`;


export const StyledContainerPreviewSpinner = styled('div')`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const StyledXContainerPreview = styled(XContainerContent)`
    transition: all 1s ease;
    display: flex; 
    flex-direction: column;
    justify-content: space-around; 
    height: calc(92vh - 82px);
    background-color: transparent;
    border-radius: 0 !important;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    margin: 2em;
    height: 90%;
    width: ${({channel}) => channel === 'web' ? '50%' : '30%'};
    `   

export const StyledHeaderContainer = styled(XCard)`

    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid white;
    border-right: 1px solid #adadad;
    border-left: 1px solid #adadad;
    margin: 0;
    border-radius: 0 !important;
    background-color: rgb(255, 255, 255);
    z-index: 1;
    position: relative;
    
    > h1, > div > h1 {
        font-size: 1em;
        margin: 0;
    }

    > div:first-child{
        border-bottom: 1px solid lightgrey;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    }

`




export const StyledTargetsContainer = styled('div')`
    display: flex;
    flex-direction: column;
    jusitfy-content: center;
    align-items: start;
    width: 100%;
`


export const StyledXCard = styled(XCard)`
    border-radius: 0 !important;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    
    margin-top: 0;
    margin-bottom: 1.5rem;
`

export const StyledFilterInputDiv = styled('div')`
    display: inline-flex;
    width: 90%;
    margin: 1em 1em;
`

export const StyledFilterTags = styled(XTag)`
    background-color: rgb(251, 251, 251); 
    border: 1px solid rgb(187, 187, 187);
    margin-bottom: 6px;
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


export const StyledMapControlsContainer = styled('div')`
    display: flex;
    flex-direction: column;
    margin: 1em 0;
    align-items: center;
    // justify-content: flex-end;
    width: 100%;

`


export const StyledMenuContainer = styled('div')`
    border-radius: 0 !important;
    background-color: rgb(255, 255, 255);
    
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;

    width: 80%;
    height: 80%;

`

export const StyledActivityEditionContainer = styled('div')`
    overflow-y: auto;
    height: calc(100vh - (82px + 60px));
    border-left: 1px solid #adadad;
    border-right: 1px solid #adadad;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    background-color: white;
    // margin-left: 1em;
    ::-webkit-scrollbar {
        width: 0.5vw;
      }
      
    /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px #214f61;
        border-radius: 0px;
      }
      
    /* Handle #43a1a2 or #214F61 or #ADADAD */
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 4px 2px 12px 2px #214f61;
        border-radius: 4px;
    }
`


export const StyledAddActivitiesModal = styled(ReactModal)`
    margin-top: 4em;
    border: 1px solid rgb(204, 204, 204);
    background: rgb(255, 255, 255);
    z-index: 2 !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    position: relative;
    overflow-y: scroll;
    width: 90% !important;
    height: 80% !important;

    ::-webkit-scrollbar {
        width: 0.5vw;
      }
      
      /* Track */
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 4px #214f61;
        border-radius: 0px;
      }
      
      /* Handle #43a1a2 or #214F61 or #ADADAD */
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 4px 2px 12px 2px #214f61;
        border-radius: 4px;
      }
      
      
`


export const StyledActivityCreationXCard = styled(StyledXCard)`
    box-shadow: none;
    margin: 0 0;
    padding: 0.5em 0em;
    padding-bottom: 4em;   
    // & > div:first-child{
    //     margin: 0 auto;
    //     width: 100%;
    //     border-bottom: 1px solid transparent !important;
    //     padding-bottom: 0.2em;
    //     h2{
    //         margin: 0;
    //         width: auto;
    //         // border-bottom: 1px solid lightgray !important;
    //     }
    // }
`

export const StyledMarginContent = styled('div')`
    margin: 1em 2em;
    padding-bottom: 1em;
`

export const StyledXCardOption = styled(StyledXCard)`
    transition: all 0.2s ease-in;
    border: 1px solid lightgray;
    margin: 1em 2em;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover{
        border: 1px solid #43a1a2 !important;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }

`

export const StyledXRow = styled(XRow)`
    border: 0;
    border-top: 1px solid #BBBBBB;
    border-left: 1px solid #BBBBBB;
    border-right: 1px solid #BBBBBB;
`


export const ActivityCreateTranslationCard = styled(StyledXCard)`
    box-shadow: none;
    border-bottom: 1px solid lightgray;
    margin: 1em 0;
    padding: 0 !important;
    padding-bottom: 1em !important;
    & > div:first-child{
        border-bottom: 0px;
    }

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
    width: 400px;
    padding: 10px 30px;
    border: 1px solid lightgray;
    background: #ffffff;


    &:hover{
        border: 1px solid #43a1a2 !important;
    }


`
