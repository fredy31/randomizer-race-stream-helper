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

const Description = styled.p`
    text-align:center;
    margin:24px 0;
    a{
        color:#fff;
    }
`

const Home:React.FC<Props> = () => {
    var [roomCode,changeRoomCode] = useState('')
    return <Body>
        <Helmet>
            <title>Radomizer Race Stream Helper</title>
        </Helmet>
        <Header />
        <BoxToPageCenter>
            <HomeBox>
                <Description>
                    This a tool to help the streaming team to speedrun randomiser races. Its a tool that is built from the ground up to make it possible for an update, in real time, of your randomiser tracker to someone spectating anywhere else.<br />
                    <br />
                    It can also be used solo, if you want a tracker for your randomiser without having to install anything. Just go to the URL, create a room, select your set of items and boom, you are ready to go!
                </Description>
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
                <Description>
                    Want to contribute or propose new sets/items? Tell me via <a href="https://github.com/fredy31/randomizer-race-stream-helper" target="_blank">Github!</a><br />
                    <br/>
                    The project is also open source, so you can setup anywhere if you want to be independent from my install.
                </Description>
            </HomeBox>
        </BoxToPageCenter>
    </Body>
}

export default Home;