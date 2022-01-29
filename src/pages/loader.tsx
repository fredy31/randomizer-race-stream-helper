import React from 'react';
import styled, {keyframes} from 'styled-components'

const Page = styled.div`
    display:flex;
    position:absolute;
    left:0;
    top:0;
    width:100%;
    min-height:100%;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background:#111;
`;
const Title = styled.h1`
    color:#fff;
`;
const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;
const Spinner = styled.div`
    border:5px solid #fff;
    border-color:#333;
    border-top-color:#fff;
    border-radius:999vw;
    width:40px;
    height:40px;
    animation: ${rotate} 2s linear infinite;
`;

const Loading = () => {
    return <Page>
        <Spinner />
        <Title>Loading</Title>
    </Page>
}

export default Loading;