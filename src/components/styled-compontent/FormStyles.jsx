import React from 'react';
import styled, {css} from 'styled-components';

export const StyledForm = styled.form`
    margin: 10px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;

    a{
        text-decoration: none;
        color: #1877f2;
        margin-bottom: 20px;
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