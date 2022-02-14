import React, {useState,useEffect} from 'react';
import Body from '../layouts/body'
import Loader from '../pages/loader';

import Header from '../components/header';
import Button from '../components/button';

import styled from 'styled-components'

import { initializeApp, setLogLevel } from '@firebase/app';
import {getDatabase, ref, onValue} from '@firebase/database';
import Config from './../config';


const BoxToPageCenter = styled.div`
    width:100%;
    min-height:80vh;
    display:flex;
    align-items:center;
    justify-content:center;
`;

const JoinBox = styled.div`
    display:flex;
    align-items:center;
    flex-direction:column;
`;

const JoinRoomForm = styled.div`
    display:flex;
    margin-top:16px;
`;

const RoomCodeInput = styled.select`
    margin-right:16px;
    padding:0 8px;
    min-width:200px;
    font-size:18px;
`;

const InfoParagraph = styled.p`
    text-align:center;
    span{
        cursor:pointer;
        text-decoration:underline;
    }
`;

interface Props{
    roomcode?:string
};

const RoomJoining:React.FC<Props> = ({roomcode}) => {
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
                var spectateDataEl = snapshot.val();
                if(typeof spectateDataEl.players === 'undefined'){
                    spectateDataEl = {
                        'items': '',
                        'players': {}
                    }
                }
                setSpectateData(JSON.stringify(spectateDataEl));
            })
        }
    },[roomcode,spectateData])
    var [player,changePlayer] = useState('')
    //console.log(spectateData)
    if(spectateData.length!==0 && spectateData !== 'null'){
        const data = JSON.parse(spectateData);
        return <Body>
            <Header></Header>
            <BoxToPageCenter>
                <JoinBox>
                    <InfoParagraph>
                        Want to invite a player to this room? Share them the current URL!<br />
                        <span onClick={()=>{
                            navigator.clipboard.writeText(window.location.hostname+'/room/'+roomcode)
                        }}>
                            Add room URL to my clipboard
                        </span>
                    </InfoParagraph>
                    <Button linkto={'/room/'+roomcode+'/admin'}>Manage</Button>
                    <br /><Button linkto={'/room/'+roomcode+'/spectate'}>Spectate</Button>
                    <JoinRoomForm>
                        <RoomCodeInput 
                            value={player} 
                            onChange={
                                (e)=>changePlayer(e.target.value)
                            } 
                        >
                            <option value="">Select...</option>
                            {Object.keys(data.players).map((k,i)=>{
                                return <option value={k}>{k}</option>
                            })}
                            
                        </RoomCodeInput>
                        <Button linkto={'/room/'+roomcode+'/player/'+player} isDisabled={(player !=="")?false:true}>Join room</Button>
                    </JoinRoomForm>
                    <br /><Button linkto={'/'}>Exit</Button>
                </JoinBox>
            </BoxToPageCenter>
        </Body>
    }else if(spectateData === 'null'){
        return <Body>
            <Header></Header>
            <BoxToPageCenter>
                <JoinBox>
                    <p>No room with this code</p>
                    <Button linkto={'/new/'+roomcode}>Create?</Button>
                </JoinBox>
            </BoxToPageCenter>
        </Body>
    }else{
        return <Body>
            <Header></Header>
            <Loader />
        </Body>
    }
}

export default RoomJoining;