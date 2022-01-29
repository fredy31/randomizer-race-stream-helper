import React, {useState} from 'react';
import Body from '../layouts/body'

import Header from '../components/header';

interface Props{
    roomcode?:string
};

const RoomManagement:React.FC<Props> = ({roomcode}) => {
    return <Body>
        <Header></Header>
        <div>{roomcode} Admin</div>
    </Body>
}

export default RoomManagement;