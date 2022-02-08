import React from 'react';

import styled from 'styled-components';

import ItemComp from './itemcomp';

const Player = styled.div`
    border:1px solid #fff;
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

interface Props{
    fullList: string,
    player: string
}

const PlayerData:React.FC <Props> = ({fullList,player}) => {
    if(player != 'null'){
        const playerData = JSON.parse(player);
        const itemList = fullList.split(',')
        const itemGotList = playerData.has.split(',')
        return <Player>
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

export default PlayerData;

