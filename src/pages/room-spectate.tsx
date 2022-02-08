import React, {useState} from 'react';
import Body from '../layouts/body'
import Header from '../components/header';
import Loader from '../pages/loader';

import PlayerData from '../components/playerdata';

import { initializeApp, setLogLevel } from '@firebase/app';
import {getDatabase, ref, onValue} from '@firebase/database';
import Config from './../config';

interface Props{
    roomcode?:string
};

const RoomSpectate:React.FC<Props> = ({roomcode}) => {
    const [spectateData, setSpectateData] = useState<string>('');
    const [resetData, setResetData] = useState<Boolean>(true);
    initializeApp({
        apiKey: Config.firebaseApiKey,
        databaseURL: Config.firebaseURL,
        authDomain: Config.firebaseAuthDomain
    });
    setLogLevel('debug');
    const db = getDatabase();
    const dataRef = ref(db,String(roomcode).toLowerCase());
    if(resetData === true){
        onValue(dataRef,(snapshot) => {
            setSpectateData(JSON.stringify(snapshot.val()));
            setResetData(false);
        })
    }
    if(spectateData.length!=0){
        const data = JSON.parse(spectateData);
        var i = 0;
        return <Body>
            <Header></Header>
            {data.players.map((e:Array<string>)=>{
                {i++}
                return <PlayerData key={'player'+i} fullList={data.items} player={JSON.stringify(e)} />
            })}
        </Body>
    }else{
        return <Body>
            <Header></Header>
            <Loader />
        </Body>
    }
}

export default RoomSpectate;