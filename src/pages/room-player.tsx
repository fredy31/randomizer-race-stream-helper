import React, {useState} from 'react';
import Body from '../layouts/body'
import Header from '../components/header';

interface Props{
    roomcode?:string,
    player?:string
};

const RoomPlayer:React.FC<Props> = ({roomcode,player}) => {
    return <Body>
        <Header></Header>
        <div>{roomcode}</div>
        <div>{player}</div>
    </Body>
}

export default RoomPlayer;