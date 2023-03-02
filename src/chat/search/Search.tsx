import * as React from 'react'
import { useState, useEffect} from 'react';
import Avatar from '../DM/Avatar'

import './sh.css'
import '../Home.css'
import TopButton from '../TopButton'
import Opt from '../live_chat/room_info/Opt';
import { useGlobalContext } from '../Context'
import User from '../interfaces/User'
import { useAccounts } from '../../components/hooks/useAccount';
import { useChat } from '../../components/hooks/useChat';
import {redirect} from "react-router-dom";

const fill = require('../../img/Fill.svg').default as string;
const add = require('../../img/+.svg').default as string;
const Option = require('../../img/Options.svg').default as string;
const ava = require('../../img/avatar.jpg') as string;


const SChatTopbar = (props: {title: string, setStatus:Function }) => {

    return (
        <div className="Chat-top-bar" >
            <TopButton src={fill} s_padding={{padding: '14px 14px'}} onClick={props.setStatus} />
                <div className="Text_c">
                    <ul className="L_title" >{props.title}</ul>
                </div>
                
            <div className="Select_tab" style={{width :"24px"}}/>
        </div>
    );
}



const UserC = (props: any) =>{


    const [style, setstyle] = useState({display:"none"})
    const onClickOutside = () => setstyle({display:"none"});
    const ref = React.useRef<HTMLInputElement>(null);
    const {getRoomById} = useChat();
    const {member} = props;

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



    var handle_submit = () =>{
             //back to chat home page
                //set current room
            window.location.replace("/user?username="+member.username);
        }



        var body = <div ref={ref}> <img src={Option} alt="" onClick={() => {
            if(style.display === "none") 
        setstyle({display:"flex"});
         else setstyle({display:"none"}); 
         }}/>
                <div style={style} className="dropdown-content">
                <Opt text='DM' onClick={() => {
                    getRoomById(member.Userid, 1);
                    props?.setStatus("0");}} />
                </div></div>
    return (
        <div className="user" >
            <div style={{width: "100%"}}>
            <div className="av_text" onClick={handle_submit}>
                <Avatar src={member?.avatar} status={member?.status}/>
                <ul className="L_title">{member.username}</ul>
            </div>
            </div>
            {body}
        </div>
    );
}



const Search = (props: any)  => {

    const [search, setsearch] = useState("");

    const {me, isLoading} = useAccounts();
    if (isLoading) return <div>loading...</div>
    return (
        <>
        <SChatTopbar setStatus={props?.setStatus} title="Participants" />
        <div className="search" >
            <input className="M_input" id="SH2" placeholder="Search" onChange={(e) =>{ setsearch(e.target.value)}} type="text"/> 
        </div>
        <div className="users" >
            {me  &&me.followers?.length > 0  && me.followers?.map((follower , index) => {if (follower?.username?.toLowerCase().includes(search.toLowerCase()))
                return <UserC key={index} setStatus={props.setStatus} member={follower} ></UserC>})
            }
        </div> 
        </>
    );
}

export default Search