import * as React from 'react';
import './Home.css'
import axios from 'axios'
import { useState } from 'react';
import DM from './DM/DM'
import './DM/DM.css'
import Lchat from './live_chat/L_chat'
import Search from './search/Search'
import TopButton from './TopButton'
import { useCallback,useEffect } from 'react';
import Addroom from './add_room/Add_room'
import { MyGlobalContext,useGlobalContext } from './Context'
import User from './interfaces/User'
import {Room} from "./interfaces/Room";
import {useChat} from "../components/hooks/useChat";
import Avatar from "./DM/Avatar";



const Vector = require('../img/Vector.svg').default as string;
const Union = require('../img/Union.svg').default as string;
const fill1 = require('../img/Fill1.svg').default as string;


const ChatTopBar = (props: any) => {
    
    return (
        <div className="Chat-top-bar">
            <TopButton src={Vector} onClick={()=> {
                props.setischvisib(false)
                // (document.getElementById("Chat") as HTMLInputElement).style.display = "none";
            }} s_padding={{padding: '12px 16px'}} />
            <div className="add_room" >
                <TopButton title="Add new room" src={fill1} s_padding={{padding: '11px 11px'}} setStatus={()=>props.setStatus("3")}/>
                <TopButton src={Union}  num={props?.value} setStatus={() => props.setStatus("2")}/>
            </div>
        </div>
    );
};



const Homep = (props: any) => {

    const {currentRoom } = useChat();
    //console.log(currentRoom);
 
    return (
    <>
        {!currentRoom &&<><ChatTopBar setischvisib={props.setischvisib} value={props.value<0?"0":props.value}
                                      setStatus={props?.setStatus} />
            <DM  setStatus={props.setStatus}></DM> </> }
        {currentRoom && <Lchat setStatus={props.setStatus}></Lchat> }

    </>
    );
};

const vector = require('../img/Vector_white.svg').default as string;
const avatar = require('../img/avatar.jpg') as string;



export const RoomDetails = ({r} : {r : Room} ) => {
    const { setCurrentRoomId } = useChat();

    //console.log("last mssg :", r?.lastMessage, " in ", r.name);
    return (
        // style={props?.style}
        <div  className="mssg"   >
                <div className="room_avatar">
                    <img  alt="" src={r.avatar ? r.avatar : avatar} />
                </div>
                <div className="c_text" onClick={(e) =>
                { setCurrentRoomId(r.id || '')}}>
                    <div className="c_user">
                        <div className="c_username">
                                <ul>{r.name}</ul>
                    {r.unread && <div className="badge" style={{padding:"0px"}} ><div className="badge_color_rooms" /></div>}
                                <p>{r?.lastMessageTime?.split('T')[0]}</p>
                                <div />
                        </div>
                        <img src={vector}  alt="" />
                    </div>
                    <div style={r.unread?{color: "#E2E5E9"}:{}} className="Room_masssg">{r?.lastMessage}</div>
                </div>
            </div>
    );
};








const Chat = (props:any) => {

    const [status, setStatus] = useState<string>("0"); // 0: normal, 1: livechat , 2: members, 3: add_room
    const [slct, setSlct] = useState<string>();  // 0 :room and 1 DM

    return (
      <>

        <div className="Chat" id="Chat">

            {status=== "0" &&  <Homep setStatus={setStatus} setischvisib={props.setischvisib} ></Homep>}
            {status=== "3" &&  <Addroom setStatus={setStatus} ></Addroom>}
            {status=== "2" &&  <Search  setSlct={setSlct} setStatus={setStatus} ></Search>}


        </div>
      </> 
    )
};

export default Chat;
