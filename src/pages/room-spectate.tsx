import React, {useState, useEffect} from 'react';
import Body from '../layouts/body'
import Header from '../components/header';
import Loader from '../pages/loader';

import styled from 'styled-components';
import PlayerData from '../components/playerdata';

import { initializeApp, setLogLevel } from '@firebase/app';
import {getDatabase, ref, onValue} from '@firebase/database';
import Config from './../config';

const PlayerDataGrid = styled.div`
    padding:16px;
    box-sizing:border-box;
    width:100%;
    overflow:hidden;
    display:grid;
    grid-gap: 32px;
    grid-template-columns:calc(50% - 16px) calc(50% - 16px);
`;

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
                var sectateDataEl = snapshot.val();
                if(typeof sectateDataEl.players === 'undefined'){
                    sectateDataEl = {
                        'items': '',
                        'players': {}
                    }
                }
                setSpectateData(JSON.stringify(sectateDataEl));
            })
        }
    },[roomcode,spectateData])
    
    if(spectateData.length!==0){
        const data = JSON.parse(spectateData);
        return <Body>
            <Header></Header>
            <PlayerDataGrid>
                {Object.keys(data.players).map((k,i)=>{
                    return <PlayerData key={'player'+i} fullList={data.items} playerName={k} playerData={data.players[k]} />
                })}
            </PlayerDataGrid>
        </Body>
    }else{
        return <Body>
            <Header></Header>
            <Loader />
        </Body>
    }
}

export default RoomSpectate;