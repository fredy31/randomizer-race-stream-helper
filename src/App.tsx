import React from 'react';
import { Router, RouteComponentProps } from "@reach/router"

import { Provider } from "react-redux";
import store from "./store";

import Home from './pages/home';
import RoomCreate from './pages/room-create';
import RoomJoin from './pages/room-joining';
import RoomManage from './pages/room-management';
import RoomSpectate from './pages/room-spectate';
import RoomPlayer from './pages/room-player';

function App() {

  interface HomeProps extends RouteComponentProps{
  }
  const HomeRoute = (props:HomeProps) => (
    <Home />
  )
  
  interface RoomCodeProp extends RouteComponentProps{
    roomcode?:string
  }
  const CreateRoute = (props:RoomCodeProp) => (
    <RoomCreate roomcode={props.roomcode ? props.roomcode : ''} />
  )
  const JoinRoute = (props:RoomCodeProp) => (
    <RoomJoin roomcode={props.roomcode ? props.roomcode : ''} />
  )
  const ManageRoute = (props:RoomCodeProp) => (
    <RoomManage roomcode={props.roomcode ? props.roomcode : ''} />
  )
  const SpectateRoute = (props:RoomCodeProp) => (
    <RoomSpectate roomcode={props.roomcode ? props.roomcode : ''} />
  )
  
  interface PlayerProps extends RouteComponentProps{
    roomcode?:string,
    player?:string
  }
  const PlayerRoute = (props:PlayerProps) => (
    <RoomPlayer roomcode={props.roomcode ? props.roomcode : ''} player={props.player ? props.player : ''} />
  )
  return (
    <Provider store={store}>
      <Router>
        <HomeRoute path="/" />
        <CreateRoute path="/new/" />
        <CreateRoute path="/new/:roomcode" />
        <JoinRoute path="/room/:roomcode" />
        <ManageRoute path="/room/:roomcode/admin" />
        <SpectateRoute path="/room/:roomcode/spectate" />
        <PlayerRoute path="/room/:roomcode/player/:player" />
      </Router>
    </Provider>
  );
}

export default App;
