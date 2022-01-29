import React, {useState} from 'react';
import Body from '../layouts/body'
import Helmet from 'react-helmet';
import Header from '../components/header';

interface Props{

};

const RoomCreate:React.FC<Props> = () => {
    return <Body>
        <Helmet>
            <title>Creating a new room</title>
        </Helmet>
        <Header />
    </Body>
}

export default RoomCreate;