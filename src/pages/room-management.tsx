import React, {useState,useEffect,useRef} from 'react';
import Body from '../layouts/body'

import Header from '../components/header';
import Button from '../components/button';

import PlayerData from '../components/playerdata';

import { initializeApp, setLogLevel } from '@firebase/app';
import {getDatabase, ref, onValue, set, remove} from '@firebase/database';
import Config from './../config';

import { navigate } from "@reach/router"

import Loader from '../pages/loader';
import styled from 'styled-components';

const RoomModForm = styled.div`
    width:100%;
    overflow:hidden;
    input{
        width:100%;
        height:52px;
        margin-bottom:32px;
    }
    >p{
        text-align:center;
    }
`;
const Pills = styled.div`
    margin-bottom:32px;
    text-align:center;
    div{
        display:inline-block;
        margin:8px;
        padding:8px 16px;
        text-transform:capitalize;
        position:relative;
        z-index:1;
        cursor:pointer;
        &:after{
            position:absolute;
            background:currentColor;
            top:0;
            left:0;
            width:100%;
            height:100%;
            content:' ';
            display:block;
            z-index:-1;
            opacity:0.1;
        }
        div{
            margin:0 0 0 8px;
            padding:4px 8px;
            font-size:12px;
            vertical-align:middle;
            display:inline-block;
        }
    }
`;

const Flex = styled.div`
    display:flex;
    align-items:center;
    gap:16px;
    margin-bottom:32px;
    input{
        margin-bottom:0;
    }
`

interface Props{
    roomcode:string
};

const RoomManagement:React.FC<Props> = ({roomcode}) => {
    const [spectateData, setSpectateData] = useState<string>('');
    const [players, setPlayers] = useState<string>('');
    const itemListRef = useRef<any>(null);
    const playerInput = useRef<any>(null);
    //Connect to Firebase
    initializeApp({
        apiKey: Config.firebaseApiKey,
        databaseURL: Config.firebaseURL,
        authDomain: Config.firebaseAuthDomain
    });
    setLogLevel('debug');
    const db = getDatabase();
    const dataRef = ref(db,String(roomcode).toLowerCase());
    // Get the current values and connexion to DB
    useEffect(()=>{
        if(spectateData === ''){
            onValue(dataRef,(snapshot) => {
                var data = JSON.stringify(snapshot.val());
                if(data === null){
                    navigate('/');
                }else{
                    setSpectateData(data);
                }
            })
        }
    },[roomcode,spectateData,dataRef])
    //Submission of the players
    //To figure out: How to not demolish old players while doing so (if it changes mid run)
    const submitNewPlayers = () => {
        const data = players.split(',');
        //console.log(data);
        data.map((e:string)=>{
            set(ref(db,String(roomcode).toLowerCase()+'/players/'+e),'').catch((e)=>{console.log(e)});
            return false;
        })
        setPlayers('');
    }
    const removePlayer = (player:string) => {
        remove(ref(db,String(roomcode).toLowerCase()+'/players/'+player)).catch((e)=>{console.log(e)})
    }
    const removeRoom = () => {
        remove(ref(db,String(roomcode).toLowerCase())).catch((e)=>{console.log(e)})
        navigate('/')
    }
    if(spectateData.length>5 && spectateData !== null){
        const data = JSON.parse(spectateData);
        return <Body>
            <Header></Header>
            <RoomModForm>
                <Flex>
                    <Button linkto={'/room/'+roomcode}>Return</Button>
                    <div onClick={()=>{
                            navigator.clipboard.writeText(window.location.hostname+'/room/'+roomcode)
                        }}>
                        <Button linkto='#'>Copy room URL</Button>
                    </div>
                    <Button linkto='#items'>Items</Button>
                    <Button linkto='#players'>Players</Button>
                    <div onClick={removeRoom}>
                        <Button linkto='#'>Delete room</Button>
                    </div>
                </Flex>
                <h3 id='items'>Items</h3>
                <p>
                    Add the elements you want (check config.tsx for all possible elements).<br />
                    Put a comma (,) between each element. No spaces.<br />
                    Split lines with the pipe (|)
                </p>
                <Pills>
                    {Object.keys(Config.items).map(key => {
                        return <div key={key} onClick={
                            () => {
                                var value = data.items.split(',');
                                var indOf = value.indexOf(key);
                                if(indOf === -1 || value === '|'){
                                    value.push(key);
                                }else{
                                    value.splice(indOf,1);
                                }
                                console.log(value.toString());
                                set(ref(db,String(roomcode).toLowerCase()+'/items'),value.toString()).catch((e)=>{console.log(e)});
                            }
                        }>{key}</div>
                    })}
                </Pills>
                <input type="text" ref={itemListRef} value={data.items ? data.items : ''} onChange={
                    (e)=>{
                        console.log(e.target.value)
                        set(ref(db,String(roomcode).toLowerCase()+'/items'),e.target.value).catch((e)=>{console.log(e)});
                    }
                }  />
                <PlayerData key={'player'} fullList={data.items} playerName={'Admin'} playerData={'Admin'} />

                {/* PLAYERS SECTION */}
                <h3 id='players'>Players</h3>
                <p>
                    Add all names, split by commas.<br />
                    X will delete the player
                </p>
                <p>Current players:</p>
                <Pills>
                    {(typeof data.players !== 'undefined') ? Object.keys(data.players).map((key, index)=>{
                        return <div key={key}>{key}<div onClick={(e)=>{
                            removePlayer(key);
                        }}>x</div></div>
                    }) : <React.Fragment />}
                </Pills>
                <Flex>
                    <input type="text" ref={playerInput} value={players ? players : ''} onChange={
                        (e)=>{
                            setPlayers(e.target.value);
                        }
                    }  />
                    <div onClick={submitNewPlayers}>
                        <Button linkto="#">Submit new players</Button>
                    </div>
                </Flex>
            </RoomModForm>
        </Body>
    }else{
        return <Body>
            <Header></Header>
            <Loader />
        </Body>
    }
}

export default RoomManagement;