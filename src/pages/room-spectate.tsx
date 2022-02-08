import React, {useState, useEffect} from 'react';
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