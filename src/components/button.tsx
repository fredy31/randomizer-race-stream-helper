import React from 'react';

import styled from 'styled-components';

import {Link} from '@reach/router';

const ButtonStyles = styled(Link)`
    display:block;
    border:3px solid currentColor;
    width:200px;
    padding:16px 0;
    text-align:center;
    color:currentColor;
    text-decoration:none;
    font-size:16px;
    font-weight:700;
    transition:0.3s all ease-out;
    &:hover{
        background:#fff;
        border-color:#fff;
        color:#000;        
    }
    &.disabled{
        opacity:0.3
    }
`;

interface Props{
    linkto: string,
    isDisabled?: boolean
}

const Button:React.FC <Props> = ({linkto,isDisabled,children}) => {
    /*if(isDisabled==true){
        return <ButtonStylesDisabled>{children}</ButtonStylesDisabled>;
    }else{*/
        return <ButtonStyles className={isDisabled?'disabled':''} to={isDisabled?'#':linkto}>{children}</ButtonStyles>;
    //}
}

export default Button;

