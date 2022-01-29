import React from 'react';

import styled from 'styled-components'

import { connect } from "react-redux";
import bgKey from './../actionCreator/bgKey'

const getContrastYIQ = (hexcolor:string) => {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'black' : 'white';
}

interface PropsStyles{
    bgKey:string
}

const BodyStyle = styled.div<PropsStyles>`
    min-height:100vh;
    color:${props => getContrastYIQ(props.bgKey)};
    background:${props => props.bgKey};
    font-family:Arial,sans-serif;
    transition:0.3s all ease-out;
`;

interface Props{
    bgKey:string,
    setBgKey:any,
}

const Body:React.FC <Props> = ({children,bgKey,setBgKey}) => {
    return <BodyStyle bgKey={bgKey}>{children}</BodyStyle>
}

const mapStateToProps = (state:any) => {
    return {
        bgKey: state.bgKey,
    };
};
const mapDispatchToProps = (dispatch:any) => ({
    setBgKey: (key:any) => dispatch(bgKey(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Body);