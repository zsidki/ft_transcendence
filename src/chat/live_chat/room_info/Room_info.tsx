import * as React from 'react';
import { useEffect} from 'react';
import Avatar from '../../DM/Avatar'
import { useState } from 'react';
import '../../search/sh.css'
import '../../Home.css'
import TopButton from '../../TopButton'
import "./room_info.css"
import "../../add_room/Add_room.css"
import Opt from "./Opt"
import { useGlobalContext } from '../../Context'
import {roomType} from "../../interfaces/Room";
import { useChat } from '../../../components/hooks/useChat';
import { account } from '../../../interfaces/account.interface';
import { useAccounts } from '../../../components/hooks/useAccount';

const fill = require('../../../img/Fill.svg').default as string;
const Option = require('../../../img/Options.svg').default as string;
const modify = require('../../../img/modify.svg').default as string;
const addd_pic = require('../../../img/add_pic.svg').default as string;
const exit = require('../../../img/exit.svg').default as string;
const ava = require('../../../img/avatar.jpg') as string;
const del = require('../../../img/delete.svg').default as string;
const mute = require('../../../img/mute.svg').default as string;
const block = require('../../../img/block.svg').default as string;
const add = require('../../../img/+.svg').default as string;
const fill1 = require('../../../img/Arrow2.svg').default as string;



const Schattopbar = (props: any) => {
    const {currentRoom,leaveRoom} = useChat()
    
    const [style, setstyle] = useState({display:"none"})
    const onClickOutside = () => setstyle({display:"none"});
    const ref = React.useRef<HTMLInputElement>(null);
    const {me} = useAccounts();

    useEffect(() => {
        const handleClickOutside = (event :any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [ref]);

    
    return (
        <div className="Chat-top-bar"  >
            <TopButton src={fill} s_padding={{padding: '14px 14px'}} onClick={()=>props.setStat("1")} />
                <div className="Text_c">
                    <ul className="L_title" >{props.title}</ul>
            </div>
                <div ref={ref}>
            <TopButton src={Option} s_padding={{padding: '8px 8px'}} onClick={() => {if(style.display === "none") setstyle({display:"flex"}); else setstyle({display:"none"}); }}/>
            <div style={style} className="dropdown-content">
                <Opt text='EXIT' style={{color:"#FF0000"}} img={exit}  onClick={() => {
                    leaveRoom( currentRoom?.id || '');
                    props.setStat("1");
                }} />
            </div>
            </div>
        </div>
    );
}


const Tab =  (props :any) => {
    var style = {background: 'none'}
    if (props.stt === props.id)
        style = {background: "#006CFF"}

        return (
        <div className="tab" style={style} onClick={props.onClick}>
            <ul className="tab_title" >{props.val}</ul>
        </div>
    );
}




const Security = (props :any) => {
    const {currentRoom} = useChat();
    const {me} = useAccounts();

    return (
        <>
        <div className="security" >
            <ul className="sec">Security:</ul>
            <Tab val="private" stt={props.stt} id={roomType.PRIVATE} onClick={() => {if (me?.Userid === currentRoom?.Owner)props.setType(roomType.PRIVATE)}} />
            <Tab val="public" stt={props.stt} id={roomType.PUBLIC} onClick={() => {if (me?.Userid === currentRoom?.Owner) props.setType(roomType.PUBLIC)}} />
        </div>
        </>
    )
}




const Room = (props:any) =>{
    


    return (
        <div className="Room_pic">
            <img src={ava} alt='' className="avatar" />
            <div className="room_text">
                <ul className="Room_title" style={{padding:"0px"}}>
                    {props.name}
                    </ul>
            </div>
        </div>
    );
}




const User = ({member,isMeAdmin}:{member: account,isMeAdmin:boolean|undefined}) =>{


    const [style, setstyle] = useState({display:"none"})
    const onClickOutside = () => setstyle({display:"none"});
    const ref = React.useRef<HTMLInputElement>(null);
    const {me} = useAccounts();
    const {currentRoom, kickUser, muteUser, banUser, makeAdmin} = useChat();


    useEffect(() => {
        const handleClickOutside = (event:any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [ref]);

    return (
        <div className="user" >
            <div className="av_text" >
                <Avatar src={member?.avatar} status={member.status} />
                <ul className="L_title">{member.username}</ul>
                {member?.isRoomOwner === true && <div className='admin'><ul className='admin_title'>Owner</ul></div>}
                {member?.isRoomAdmin === true && member?.isRoomOwner ===false && <div className='admin'><ul className='admin_title'>Admin</ul></div>}
                {member?.isMuted && !member.isBanned && <img src={mute}/>}
                {member?.isBanned && <img src={block}/>}
                

            </div>
            {/* && me?.Userid!==member.Userid  */} 
            {currentRoom?.isMeAdmin   && me?.Userid!==member.Userid &&
            <div ref={ref}>
                <img src={Option} style={{cursor: "pointer"}} alt="" onClick={() => {if(style.display === "none") setstyle({display:"flex"}); else setstyle({display:"none"}); }} />
                <div id="myDropdown" style={style} className="dropdown-content"  >
                 
                    <> 
                        {member?.isRoomAdmin === false && <Opt text='Make room admin' onClick={()=>{
                            makeAdmin(currentRoom.id || '', member.Userid);
                        }}/>}
                        {currentRoom.Owner === me?.Userid && <Opt text={"kick"} onClick={()=>{kickUser(currentRoom.id|| '', member.Userid)}} />}
                        <Opt text={!member.isBanned?'BAN':'unban'} style={{color:"#FF0000"}} onClick={()=>{banUser(currentRoom.id || '', member.Userid)}} />
                        {!member.isBanned &&<Opt text={!member.isMuted?'mut':'unmut'} style={{color:"#FF0000"}}
                                                 onClick={()=>{muteUser(currentRoom.id|| '', member.Userid)}} />}
                    </>
                </div>
            </div>}
        </div>
    );
}




const Passw = (props:{value: string, setpassw: Function}) =>{

    return (
        <>
        <div  className="passw" >
            <ul className='sec'>Password:</ul>
            <input className='passwcomp' id='passw' value={props?.value} type={'password'} onChange={(e) =>{ props?.setpassw(e.target.value)}}  />
        </div>
        </>
        )
}






const  Roominfo = (props:{setStat:Function, stat: string, setStatus: Function}) => {

    const [sh,setsh] = useState("");
    const [search, setsearch] = useState(""); // search val
    const {currentRoom, updateRoom} = useChat();
    const {me} = useAccounts();
    const [type, setType] = useState(currentRoom?.status); //0:room, 1:dm
    const [passw,setpassw] = useState<string>(""); //add passw
    const  isMeAdmin = currentRoom?.membersInfo?.find((member: account ) =>member?.Userid === me?.Userid)?.isRoomAdmin as boolean|undefined;
 
    return (
        <>
        <Schattopbar  setStat={props.setStat} setStatus={props.setStatus} title="Room info"  />
        <div className="room_body">
            <Room name={currentRoom?.name} />
            <Security  setType={setType} stt={type}/>
            {type === roomType.PRIVATE && me?.Userid === currentRoom?.Owner && <Passw value={passw} setpassw={setpassw}/> }
            {me?.Userid === currentRoom?.Owner &&<div className="submit" style={{padding :"0px"}}> 
                <TopButton src={fill1} s_padding={({padding: '12.5px 12px'})} onClick={()=>{
                    if (currentRoom && type)
                        updateRoom(currentRoom, type, passw)
                }} />
            </div>}
            <div className="search_tab">
                <ul>Participants</ul>
                <div className="s_search" style={{ padding: "0px", width:sh,transition: "all 0.5s"}}>
                    <input className="M_input" id="SH"  placeholder="Search" type="text" 
                    onChange={(e) =>{ setsearch(e.target.value)}} onSelect={() => setsh("100%")} onBlur={(e) => { if (!e.target.value) setsh("32px") }}/> 
                 </div>
            </div>
        <div className="users" style={{width: "100%",padding:"0px"}} >
            {currentRoom?.membersInfo?.map((member:account, index:number) => {
                if (member.username.toLowerCase().includes(search.toLowerCase()))
                    return (
                        <User member={member} key={index} isMeAdmin={isMeAdmin} ></User>
                        )
            })}
        </div>
        </ div>
        </>
    )
}

export default  Roominfo;