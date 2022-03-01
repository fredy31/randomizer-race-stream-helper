import React from 'react';

import styled from 'styled-components';
import Config from '../config';

import { connect } from "react-redux";
import bgKey from './../actionCreator/bgKey'
import itemZoom from '../actionCreator/itemZoom';

const ItemStyle = styled.div<{gotStyle?: number, color?:string, itemZoom:number}>`
    padding:${props=>props.itemZoom?36*props.itemZoom/100+'px':'36px'};;
    display:flex;
    align-items:center;
    justify-content:center;
    max-width:${props=>props.itemZoom?80*props.itemZoom/100+'px':'80px'};
    width:${props=>props.itemZoom?80*props.itemZoom/100+'px':'80px'};;
    height:${props=>props.itemZoom?80*props.itemZoom/100+'px':'80px'};;
    max-height:${props=>props.itemZoom?80*props.itemZoom/100+'px':'80px'};;
    overflow:hidden;
    color:currentColor;
    font-weight:900;
    text-transform:uppercase;
    color:${props=>props.color?getContrastYIQ(props.color):'#000'};
    opacity:${props=>props.gotStyle !== 0 ? '1' : '0.5'};
    filter:${props=>props.gotStyle !== 0 ? 'none' : 'grayscale(100%)'};
    transition:0.3s all ease-out;
    cursor:default;
    img{
        object-fit:contain;
        max-width:100%;
        width:100%;
        height:100%;
        max-height:100%;
    }
    span{
        font-size:${props=>props.itemZoom?80*props.itemZoom/100+'px':'80px'};
        -webkit-text-stroke: ${props=>props.color?getContrastYIQInverse(props.color):'#fff'} ${props=>props.itemZoom?3*props.itemZoom/100+'px':'3px'};
    }
`

const getContrastYIQ = (hexcolor:string) => {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}
const getContrastYIQInverse = (hexcolor:string) => {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'white' : 'black';
}

interface Props{
    item : string,
    got : number,
    bgKey:string,
    itemZoom:number
};

const ItemComp:React.FC<Props> = ({item,got,bgKey,itemZoom}) => {
    const itemsArray = JSON.parse(JSON.stringify(Config.items));

    if(item && typeof itemsArray[item] !== 'undefined'){
        const alt = (itemsArray[item]["nicename"]) ? itemsArray[item]["nicename"] : itemsArray[item]["content"];
        if(itemsArray[item]["type"] === 'svg'){
            //TODO : IMPORT SVG ON THE FLY
            return <ItemStyle color={bgKey} itemZoom={itemZoom} gotStyle={got}>
                <img src={'/images/svg/'+itemsArray[item]['content']+'.'+itemsArray[item]["type"]} alt={alt} />
            </ItemStyle>
        }else if(itemsArray[item]["type"] === 'png' || itemsArray[item]["type"] === 'webp'){
            let imgSrc = '/images/png/'+itemsArray[item]['content']+'.'+itemsArray[item]["type"];
            //Custom Active
            if(itemsArray[item]['active'] && got){
                imgSrc = '/images/png/'+itemsArray[item]['active']+'.'+itemsArray[item]["type"]
            }
            //Upgrade Lvl2-3
            //console.log(got);
            if(itemsArray[item]['up'+got]){ imgSrc = '/images/png/'+itemsArray[item]['up'+got]+'.'+itemsArray[item]["type"] }
            //if(itemsArray[item]['up3'] && got === 3){ imgSrc = '/images/png/'+itemsArray[item]['up3']+'.'+itemsArray[item]["type"] }
            //Render
            return <ItemStyle color={bgKey} itemZoom={itemZoom} gotStyle={got}>
                <img src={imgSrc} alt={alt} />
            </ItemStyle>
        }else{
            return <ItemStyle color={bgKey} itemZoom={itemZoom} gotStyle={got}>
                <span>{itemsArray[item]['content']}</span>
            </ItemStyle>
        }
    }else{
        return <React.Fragment />
    }
}

const mapStateToProps = (state:any) => {
    return {
        bgKey: state.bgKey,
        itemZoom: state.itemZoom,
    };
};
const mapDispatchToProps = (dispatch:any) => ({
    setBgKey: (key:any) => dispatch(bgKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemComp);