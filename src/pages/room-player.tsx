import React, {useState, useEffect} from 'react';
import Body from '../layouts/body'
import Header from '../components/header';
import Loader from '../pages/loader';

import { initializeApp, setLogLevel } from '@firebase/app';
import {getDatabase, ref, onValue, set} from '@firebase/database';
import Config from './../config';

import PlayerData from '../components/playerdata';

interface Props{
    roomcode:string,
    player:string
};

const RoomPlayer:React.FC<Props> = ({roomcode,player}) => {
    const [spectateData, setSpectateData] = useState<string>('');
    initializeApp({
        apiKey: Config.firebaseApiKey,
        databaseURL: Config.firebaseURL,
        authDomain: Config.firebaseAuthDomain
    });
    setLogLevel('debug');
    const db = getDatabase();
    useEffect(()=>{
        const dataRef = ref(db,String(roomcode).toLowerCase());
        if(spectateData === ''){
            onValue(dataRef,(snapshot) => {
                setSpectateData(JSON.stringify(snapshot.val()));
            })
        }
    },[roomcode,spectateData]);
    //Update element
    const updateItem = (el:string) => {
        var data = JSON.parse(spectateData);
        var value = data.players[player] ? data.players[player].split(',') : [];
        var indOf = value.indexOf(el);

        //To update for upgrades
        if(indOf === -1){
            value.push(el);
        }else{
            value.splice(indOf,1);
        }

        set(ref(db,String(roomcode).toLowerCase()+'/players/'+player),value.toString()).catch((e)=>{console.log(e)});
        var date = new Date();
        set(ref(db,String(roomcode).toLowerCase()+'/last-change'),date.toISOString()).catch((e)=>{console.log(e)});
    }
    if(spectateData.length!==0){
        const data = JSON.parse(spectateData);
        //console.log(data);
        return <Body>
            <Header></Header>
            <PlayerData key={'player'} fullList={data.items} playerName={player} playerData={data.players[player]} updateItem={updateItem} />
        </Body>
    }else{
        return <Body>
            <Header></Header>
            <Loader />
        </Body>
    }
}

export default RoomPlayer;