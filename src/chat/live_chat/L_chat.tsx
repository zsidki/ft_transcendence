
import * as React from 'react';
import '../Home.css'
import TopButton from '../TopButton'
import MssgCompos from './Mssg_compos'
import { useState, useEffect} from 'react';
import '../DM/DM.css'
import Search from '../search/Search'
import Roominfo from './room_info/Room_info'
import { useGlobalContext } from '../Context'
import {useChat} from "../../components/hooks/useChat";
import {IoMessage} from "../interfaces/Mssg";
import {useGame} from "../../components/hooks/useGame";
import {useNavigate} from "react-router-dom";
import {useAccounts} from "../../components/hooks/useAccount";
const Vector = require('../../img/Vector.svg').default as string;
const block = require('../../img/block.svg').default as string;
const opt = require('../../img/Options.svg').default as string;
const union = require('../../img/Union1.svg').default as string;
const control = require('../../img/controller.png') as string;
const fill = require('../../img/Fill.svg').default as string;


const Opt = (props:{text:string , img:string, onClick:React.MouseEventHandler<HTMLDivElement>}) => {
    return (
        <>
            <div className='acc' onClick={props?.onClick}>
                 <div  className='optins_icone'>
                    <ul>{props.text}</ul>
                    <img src={props.img} alt='' />
                 </div>
            </div>
        </>
    )
}


const LChatTopbar = (props:{title: string | undefined, Subtitle:string, setStat: Function, isroom: boolean, userId: string | undefined}) => {
    const ref = React.useRef<HTMLInputElement>(null);
    // const { room, socket,otheruser } = useGlobalContext()
    const navigate = useNavigate();
    var handle_submit = () => {}

    const {setCurrentRoomId} = useChat();




    if (props?.isroom === true)
        handle_submit =() =>{props?.setStat("0")};
    
    return (
        <div className="Chat-top-bar"  >
            <TopButton  src={fill} s_padding={{padding: '14px 14px'}} onClick={() => {
            setCurrentRoomId(undefined);}
            }  />
                <div className="Text_c">
                    <ul className="L_title">{props.title}</ul>
                    <ul className="Subtitle">{props.Subtitle}</ul>
                </div>
                <div ref={ref} >
            {!props?.isroom &&  <TopButton src={control} s_padding={{padding: '10px 10px'}}  onClick={() =>
            {
                navigate('/gamesettings?invite=' +props.userId );
            }}   />}
            {props?.isroom && <TopButton src={union} onClick={handle_submit} s_padding={{padding: '10px 8.5px'}} /> }
            </div>
        </div>
    );
}
const Avatar= (props: any) => {
    return (
        <div key={props.key} className="c_avatar">
            <img  alt="" src={props.src} />
            <div className={props.status} style={props?.style} />
        </div>);
}

const MssgBox = ({msg}: {msg: IoMessage}) =>{

    return (
        <div  className="mssg"   >
            <Avatar style={{width:"13px"}} src={msg.senderInfo?.avatar} status={msg?.senderInfo?.status} />
            <div className="c_text" >
                <div className="c_user">
                    <div className="c_username">
                            <ul>{msg?.senderInfo?.username}</ul>
                            <p>{ msg?.time?.split('T')[1].split(':',2).join(':') + " " + msg?.time?.split('T')[0] }</p>
                            <div />
                    </div>
                </div>
                <div className="msssg">{msg?.text}</div>
            </div>
        </div>
    )
}

const Mssgs = (props:{mssgs: any}) => {
    const {currentRoom, moreMessagesByRoomId}= useChat();
    const {me} = useAccounts();
  return (
    <div className="mssgs">

        {currentRoom && currentRoom.messages?.filter((msg: IoMessage) => me?.blocker.find((a) => a.Userid == msg.senderId) == undefined)?.map((msg: IoMessage, index: number) => {
                return (
                    <MssgBox key={index} msg={msg}></MssgBox>
            );
        })}
        {!currentRoom?.noMoreMessages && <div className="load_more" onClick={() =>
        {moreMessagesByRoomId(currentRoom?.id || '')}}>Load more</div>}
    </div>
        );
}



function useComponentVisible(setstatus: Function) {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleClickOutside = (event:any) => {
      if (ref.current && !ref.current.contains(event.target)) {
          setstatus('0')
      }
  };

  useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  });

  return { ref };
}

const Lchat = (props:{_slct?: string, setStatus: Function}) => {
    const [stat, setStat] = useState<string>("1");
    const [otherUser , setOtherUser] = useState<string>('');
    const {sendMessage, currentRoom} = useChat();
    const {me} = useAccounts();
    const { ref } = useComponentVisible(props?.setStatus);
    
 useEffect(() => {
     setOtherUser(currentRoom?.Members?.find((id: string) =>  id !== me?.Userid) || '');

 }, [me, currentRoom]);

    if (currentRoom?.type === 'DM')
        var selected = <LChatTopbar  title={currentRoom?.name} Subtitle="Direct Messege"
                                      isroom={false} setStat={setStat} userId={otherUser} />;
    else
        selected = <LChatTopbar  title={currentRoom?.name} Subtitle="Room" isroom={true}  setStat={setStat} userId={''}/>




    if (stat === "0")
      var body = <Roominfo  setStat={setStat} stat={stat} setStatus={props.setStatus} />
    else if (stat === "1")
      body = <>{selected}<Mssgs  mssgs={currentRoom?.messages} /><MssgCompos /></>
    else
      body = <Search setStatus={setStat}  adduser={true} />
    return (
         <>
        {body}
        </>
    );
}

export default Lchat;