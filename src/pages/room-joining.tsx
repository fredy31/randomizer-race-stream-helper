import React, {useState} from 'react';
import Body from '../layouts/body'

import Header from '../components/header';
import Button from '../components/button';

import styled from 'styled-components'

const BoxToPageCenter = styled.div`
    width:100%;
    min-height:80vh;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const JoinBox = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
`;

const JoinRoomForm = styled.div`
    display:flex;
    margin-top:16px;
`;

const RoomCodeInput = styled.select`
    margin-right:16px;
    padding:0 8px;
    min-width:200px;
    font-size:18px;
`;

interface Props{
    roomcode?:string
};

const RoomJoining:React.FC<Props> = ({roomcode}) => {
    var [player,changePlayer] = useState('')
    return <Body>
        <Header></Header>
        <BoxToPageCenter>
            <JoinBox>
                <Button linkto={'/room/'+roomcode+'/admin'}>Manage</Button>
                <br /><Button linkto={'/room/'+roomcode+'/spectate'}>Spectate</Button>
                <JoinRoomForm>
                    <RoomCodeInput 
                        value={player} 
                        onChange={
                            (e)=>changePlayer(e.target.value)
                        } 
                    >
                        <option value="">Select...</option>
                        <option value="Fred">Fred</option>
                        <option value="Alex">Alex</option>
                    </RoomCodeInput>
                    <Button linkto={'/room/'+roomcode+'/player/'+player} isDisabled={(player !="")?false:true}>Join room</Button>
                </JoinRoomForm>
                <br /><Button linkto={'/'}>Exit</Button>
            </JoinBox>
        </BoxToPageCenter>
    </Body>
}

export default RoomJoining;