import React from 'react';

import styled from 'styled-components';
import Config from '../config';

import { connect } from "react-redux";
import bgKey from './../actionCreator/bgKey'

const ItemStyle = styled.div<{gotStyle: Boolean, color:string}>`
    padding:36px;
    font-size:80px;
    max-width:80px;
    max-height:80px;
    overflow:hidden;
    color:currentColor;
    font-weight:700;
    text-transform:uppercase;
    color:${props=>props.color?props.color+';':'#000;'}
    opacity:${props=>props.gotStyle ? '1;' : '0.5;'}
    cursor:default;
`

const getContrastYIQ = (hexcolor:string) => {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

interface Props{
    item : string,
    got : Boolean,
    bgKey:string
};

const ItemComp:React.FC<Props> = ({item,got,bgKey}) => {
    console.log(item);
    if(item){
        //console.log(Config.items[item]);
        /*if(Config.items[item].type == 'svg'){
            return <ItemStyle gotStyle={got}>
                {item}
            </ItemStyle>
        }else{*/
            return <ItemStyle color={getContrastYIQ(bgKey)} gotStyle={got}>
                {item}
            </ItemStyle>
        //}
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