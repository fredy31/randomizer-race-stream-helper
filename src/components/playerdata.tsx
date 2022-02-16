import React from 'react';

import styled from 'styled-components';

import ItemComp from './itemcomp';

import { connect } from "react-redux";
import bgKey from './../actionCreator/bgKey'

const Player = styled.div<{borderColor:string}>`
    border:1px solid ${props => props.borderColor};
`;
const Name = styled.h2`
    text-align:center;
`;
const ItemList = styled.div`
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
`;
const ItemNewLine = styled.div`
    width:100%;
    height:1px;
`;

const getContrastYIQ = (hexcolor:string) => {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

interface Props{
    fullList: string,
    playerName: string,
    playerData: string,
    bgKey:string,
    updateItem?:Function
}

const PlayerData:React.FC <Props> = ({fullList,playerName,playerData,bgKey,updateItem}) => {
    if(playerData !== 'null'){
        const itemList = (typeof fullList !== 'undefined') ? fullList.split(',') : [];
        const itemGotList = playerData.split(',')
        var i = 0;
        return <Player borderColor={getContrastYIQ(bgKey)}>
            <Name>{playerName}</Name>
            <ItemList>
                {itemList.map((el)=>{
                    i++;
                    //el.replace('\n','').replace(/(\r\n|\n|\r)/gm, "");;
                    if(!el){
                        return <React.Fragment />
                    }else if(el === '|'){
                        return <ItemNewLine key={'nl-'+i}></ItemNewLine>
                    }else{
                        let itemStatus = 0;
                        if(itemGotList.indexOf(el) !== -1 || itemGotList.indexOf(el+'|1') !== -1 || playerData === 'Admin'){
                            itemStatus = 1;
                        }else if(itemGotList.indexOf(el+'|2') !== -1){
                            //Messy way to check for upgrades
                            itemStatus = 2;
                        }else if(itemGotList.indexOf(el+'|3') !== -1){
                            //Messy way to check for upgrades
                            itemStatus = 3;
                        }
                        return <div key={playerName + '-' + el}  onClick={updateItem 
                                ? ()=>{updateItem(el)} 
                                : ()=>{return false}
                            }>
                            <ItemComp 
                                item={el} got={itemStatus}
                            />
                        </div>
                    }
                })}
            </ItemList>
        </Player>;
    }else{
        return <React.Fragment />;
    }
}

const mapStateToProps = (state:any) => {
    return {
        bgKey: state.bgKey,
    };
};
const mapDispatchToProps = (dispatch:any) => ({
    setBgKey: (key:any) => dispatch(bgKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerData);

