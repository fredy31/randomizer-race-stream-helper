import React, {useState,useEffect} from 'react';
import Body from '../layouts/body'

import Header from '../components/header';

import PlayerData from '../components/playerdata';

import { initializeApp, setLogLevel } from '@firebase/app';
import {getDatabase, ref, onValue} from '@firebase/database';
import Config from './../config';

import Loader from '../pages/loader';
import styled from 'styled-components';

const RoomModForm = styled.div`
    margin-bottom:32px;
    width:100%;
    overflow:hidden;
    >input{
        width:100%;
        height:32px;
    }
    >p{
        text-align:center;
    }
`;

interface Props{
    roomcode?:string
};

const RoomManagement:React.FC<Props> = ({roomcode}) => {
    const [spectateData, setSpectateData] = useState<string>('');
    initializeApp({
        apiKey: Config.firebaseApiKey,
        databaseURL: Config.firebaseURL,
        authDomain: Config.firebaseAuthDomain
    });
    setLogLevel('debug');
    useEffect(()=>{
        const db = getDatabase();
        const dataRef = ref(db,String(roomcode).toLowerCase());
        if(spectateData === ''){
            onValue(dataRef,(snapshot) => {
                setSpectateData(JSON.stringify(snapshot.val()));
            })
        }
    },[roomcode,spectateData])
    if(spectateData.length!==0){
        const data = JSON.parse(spectateData);
        console.log(data);
        return <Body>
            <Header></Header>
            <RoomModForm>
                <p>
                    Add the elements you want (check config.tsx for all possible elements).<br />
                    Put a comma (,) between each element. No spaces.<br />
                    Split lines with the pipe (|)
                </p>
                <input type="text" value={data.items} />
            </RoomModForm>
            <PlayerData key={'player'} fullList={data.items} playerName={'Admin'} playerData={'Admin'} />
        </Body>
    }else{
        return <Body>
            <Header></Header>
            <Loader />
        </Body>
    }
}

export default RoomManagement;