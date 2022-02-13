import React, {useEffect} from 'react';
import Body from '../layouts/body'
import Helmet from 'react-helmet';
import Header from '../components/header';

import { initializeApp, setLogLevel } from '@firebase/app';
import {getDatabase, ref, onValue, set} from '@firebase/database';
import Config from './../config';

import { navigate } from "@reach/router"

interface Props{
    roomcode?:string
};

const RoomCreate:React.FC<Props> = ({roomcode}) => {
    function makeid() {
        var result           = '';
        var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 16; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    const createCode = (roomcode !== '') ? roomcode : makeid();
    initializeApp({
        apiKey: Config.firebaseApiKey,
        databaseURL: Config.firebaseURL,
        authDomain: Config.firebaseAuthDomain
    });
    setLogLevel('debug');
    useEffect(()=>{
        const db = getDatabase();
        const dataRef = ref(db,'/');
        onValue(dataRef,(snapshot) => {
            var prevDB = snapshot.val();
            if (typeof createCode === 'string'){
                prevDB[createCode] = {
                    'items' : '',
                    'players' : {}
                };
                //console.log(prevDB);
                if(window.location.pathname.includes('/new')){
                    if(createCode in prevDB){
                        set(ref(db,'/'),prevDB).catch((e)=>{console.log(e)});
                    }
                    navigate('/room/'+createCode);
                }
            };
        });
    },[roomcode,createCode])
    return <Body>
        <Helmet>
            <title>Creating a new room</title>
        </Helmet>
        <Header />
        <div>{createCode}</div>
    </Body>
}

export default RoomCreate;