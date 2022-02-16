import React, {useState} from 'react';

import styled from 'styled-components';
import { BlockPicker } from 'react-color';

import { connect } from "react-redux";
import bgKey from './../actionCreator/bgKey';
import itemZoom from '../actionCreator/itemZoom';

const HeaderStyles = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:8px;
    width:100%;
    box-sizing:border-box;
`;

const KeyPickerInput = styled.div`
    background:#fff;
    width:100px;
    height:24px;
    box-sizing:border-box;
    padding:0 8px;
    display:flex;
    align-items:center;
`;

const WebsiteStates = styled.div`
    >div{
        margin-left:8px;
        display:inline-block;
        vertical-align:center;
    }
`;

const KeyPickerContainer = styled.div`
    display:inline-block;
    vertical-align:middle;
    margin-left:8px;
    position:relative;
    color:#000;
    font-size:12px;
`;

const ColorPickerStyles = styled(BlockPicker)`
    position:absolute !important;
    top:calc(100% + 20px);
    left:50%;
    transform:translateX(-50%);
    z-index: 1;
`;

interface Props{
    bgKey:string,
    itemZoom:number,
    setBgKey:any,
    setItemZoom:any,
};

const Header:React.FC<Props> = ({bgKey,setBgKey,itemZoom,setItemZoom}) => {
    const [keyPickOpen, setKeyPickOpen] = useState(false);
    //const [bgKey, setBgKey] = useState('#111111');
    return <HeaderStyles>
        <div><b>Radomizer Race Stream Helper</b></div>
        <WebsiteStates>
            <div>
                Key:
                <KeyPickerContainer onClick={(e)=>{setKeyPickOpen(!keyPickOpen);return false;}}>
                    <KeyPickerInput dangerouslySetInnerHTML={{__html:bgKey}} />
                    {(keyPickOpen) ? <ColorPickerStyles 
                        color={bgKey} 
                        onChangeComplete={(e)=>setBgKey(e.hex)} 
                        colors={['#111','#eee','#e00','#0e0','#00e']}
                    /> : <React.Fragment /> }
                </KeyPickerContainer>
            </div>
            <div>
                Item sizes:
                <input type="number" value={itemZoom ? itemZoom : 100} onChange={(e)=>{setItemZoom(e.target.value)}} />
            </div>
        </WebsiteStates>
    </HeaderStyles>
}
const mapStateToProps = (state:any) => {
    return {
        bgKey: state.bgKey,
        itemZoom: state.itemZoom,
    };
};
const mapDispatchToProps = (dispatch:any) => ({
    setBgKey: (key:any) => dispatch(bgKey(key)),
    setItemZoom: (key:any) => dispatch(itemZoom(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);