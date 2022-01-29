import React, {useState} from 'react';
import Body from '../layouts/body'
import Header from '../components/header';

interface Props{
    roomcode?:string
};

const RoomSpectate:React.FC<Props> = ({roomcode}) => {
    return <Body>
        <Header></Header>
        <div>{roomcode} spectate</div>
    </Body>
}

export default RoomSpectate;