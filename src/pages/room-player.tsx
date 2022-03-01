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
    },[roomcode,spectateData,db]);
    //Update element
    const updateItem = (el:string) => {
        var data = JSON.parse(spectateData);
        var value = data.players[player] ? data.players[player].split(',') : [];

        //To update for upgrades
        //var indOf = value.indexOf(el);
        /*if(indOf === -1){
            value.push(el);
        }else{
            value.splice(indOf,1);
        }*/
        let elementInArray = false;
        value.forEach((element:String, index:number)=>{
            //0 => name; 1 => state of upgrades;
            var elementAttributes = element.split('|');
            //If element is in array, check if need to upgrade, or simply turn off.
            if(elementAttributes[0] === el){
                //Check upgrade max
                elementInArray = true;
                let upgradeCount = '0';
                const elementKey = el as keyof typeof Config.items;
                const upgradeKey = 'upgrades' as keyof typeof Config.items[typeof elementKey];
                if(typeof Config.items[elementKey] !== 'undefined'){
                    if('upgrades' in Config.items[elementKey]){
                        upgradeCount = Config.items[elementKey][upgradeKey];
                    }
                }
                //Check current update status
                let currentUpgrade = '1';
                if(elementAttributes[1]){
                    currentUpgrade = elementAttributes[1];
                }
                if(upgradeCount !== '0' && currentUpgrade<upgradeCount){
                    //If can upgrade, set with a + 1 upgrade status.
                    value.splice(index,1);
                    const newUpgrade = parseInt(currentUpgrade)+1
                    //console.log(newUpgrade)
                    value.push(el+'|'+newUpgrade);
                }else{
                    //If cannot upgrade, remove from the get items.
                    value.splice(index,1);
                }
            }
        })
        //If element is simply not in array, put on.
        if(!elementInArray){
            value.push(el);
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