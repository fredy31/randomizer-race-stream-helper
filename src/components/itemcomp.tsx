import React from 'react';

import styled from 'styled-components';
import Config from '../config';

import { connect } from "react-redux";
import bgKey from './../actionCreator/bgKey'

const ItemStyle = styled.div<{gotStyle?: Boolean, color?:string}>`
    padding:36px;
    display:flex;
    align-items:center;
    justify-content:center;
    max-width:80px;
    width:80px;
    height:80px;
    max-height:80px;
    overflow:hidden;
    color:currentColor;
    font-weight:900;
    text-transform:uppercase;
    color:${props=>props.color?getContrastYIQ(props.color):'#000'};
    opacity:${props=>props.gotStyle ? '1' : '0.5'};
    cursor:default;
    img{
        object-fit:contain;
        max-width:80px;
        width:80px;
        height:80px;
        max-height:80px;
    }
    span{
        font-size:80px;
        -webkit-text-stroke: ${props=>props.color?getContrastYIQInverse(props.color):'#fff'} 3px;
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
    got : Boolean,
    bgKey:string
};

const ItemComp:React.FC<Props> = ({item,got,bgKey}) => {
    const itemsArray = JSON.parse(JSON.stringify(Config.items));

    if(item && typeof itemsArray[item] !== 'undefined'){
        const alt = (itemsArray[item]["nicename"]) ? itemsArray[item]["nicename"] : itemsArray[item]["content"];
        if(itemsArray[item]["type"] === 'svg'){
            return <ItemStyle color={bgKey} gotStyle={got}>
                <img src={'/images/svg/'+itemsArray[item]['content']+'.'+itemsArray[item]["type"]} alt={alt} />
            </ItemStyle>
        }else if(itemsArray[item]["type"] === 'png'){
            //import {ReactComponent as SVGImage} from '../images/'+itemsArray[item]['content']+'.svg';
            return <ItemStyle color={bgKey} gotStyle={got}>
                <img src={'/images/png/'+itemsArray[item]['content']+'.'+itemsArray[item]["type"]} alt={alt} />
            </ItemStyle>
        }else{
            return <ItemStyle color={bgKey} gotStyle={got}>
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
    };
};
const mapDispatchToProps = (dispatch:any) => ({
    setBgKey: (key:any) => dispatch(bgKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemComp);