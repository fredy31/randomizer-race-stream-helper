import React, {useState} from 'react';
import Helmet from 'react-helmet';

import styled from 'styled-components'

import Body from '../layouts/body';
import Header from '../components/header';
import Button from '../components/button';

interface Props{
};

const BoxToPageCenter = styled.div`
    width:100%;
    min-height:80vh;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const JoinRoomForm = styled.div`
    display:flex;
    margin-top:16px;
`;

const RoomCodeInput = styled.input`
    margin-right:16px;
    padding:0 8px;
    min-width:200px;
    font-size:18px;
`;

const HomeBox = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
`;

const Home:React.FC<Props> = () => {
    var [roomCode,changeRoomCode] = useState('')
    return <Body>
        <Helmet>
            <title>Radomizer Race Stream Helper</title>
        </Helmet>
        <Header />
        <BoxToPageCenter>
            <HomeBox>
                <Button linkto='/new'>Create a new room</Button>
                <JoinRoomForm>
                    <RoomCodeInput 
                        type='text' 
                        value={roomCode} 
                        onChange={
                            (e)=>changeRoomCode(e.target.value.toUpperCase())
                        } 
                    />
                    <Button linkto={'/room/'+roomCode} isDisabled={(roomCode!="")?false:true}>Join a room</Button>
                </JoinRoomForm>
            </HomeBox>
        </BoxToPageCenter>
    </Body>
}

export default Home;