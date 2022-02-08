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
    player: string,
    bgKey:string
}

const PlayerData:React.FC <Props> = ({fullList,player,bgKey}) => {
    if(player != 'null'){
        const playerData = JSON.parse(player);
        const itemList = fullList.split(',')
        const itemGotList = playerData.has.split(',')
        return <Player borderColor={getContrastYIQ(bgKey)}>
            <Name>{playerData.name}</Name>
            <ItemList>
                {itemList.map((el)=>{
                    return <ItemComp key={playerData.name + '-' + el} item={el} got={(itemGotList.indexOf(el) != -1)} />
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

