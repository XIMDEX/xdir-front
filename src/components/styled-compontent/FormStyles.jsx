import React from 'react';
import styled, {css} from 'styled-components';

export const StyledForm = styled.form`
    margin: 10px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;


        .login-link{
            color:  #214f61;
            cursor: pointer;
            transition: all 1s ease;
            margin-bottom: 10px;

        &:hover{
            text-decoration: underline;
        }
    }

    
`;

export const StyledDivSVG = styled.div`
    width: 400px;
    border: 2px solid #214f61;
    border-radius: 16px;
    display: block;
    margin: auto;
`;

export const StyledSVG = styled.svg`
    width: 32px;
    height: 32px;
    display: block;
    margin: auto;
`;

export const StyledLabel = styled('label')`
    font-size: 14px;
    

`