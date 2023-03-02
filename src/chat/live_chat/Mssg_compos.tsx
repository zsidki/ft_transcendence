import * as React from 'react';
import './livechat.css'
import TopButton from '../TopButton'
import { useGlobalContext } from '../Context'
import {useChat} from "../../components/hooks/useChat";

const fill = require('../../img/Arrow.svg').default as string;

const MssgCompos = (props: any) => {
    // const { user, room } = useGlobalContext()
    const  {currentRoom, sendMessage} = useChat();

    const handle_submit = (e: any) => 
    { 
        if (e.target.value.trim()?.length && e.key === 'Enter' && currentRoom && currentRoom.id)
        {
            sendMessage({
                roomId: currentRoom.id,
                text: e.target.value,
            });
            e.target.value = "";
        }
    }
    
    if (currentRoom?.isMuted === true)
        var swaah = <><ul className='title'>sorry, you can't send messages to this channel</ul></>
    else
        swaah  = <><input type="dee" className="mssginput" id='1'  placeholder="Say something" onKeyDown={handle_submit} ></input>
        <TopButton src={fill} s_padding={{padding: '14px 14px'}} handleSendMessage={props?.handleSendMessage} onClick={()=>{
            const msg = (document.getElementById('1') as HTMLInputElement).value
            if (msg.trim()?.length !==0 && currentRoom && currentRoom.id)
            {
                sendMessage({
                    roomId: currentRoom.id,
                    text: msg,
                });
                (document.getElementById('1') as HTMLInputElement).value ="";
            }
        }}  /></>
    return (<>
        <div className="mssgcompos">
            {swaah}
        </div>
    </>);
}

export default MssgCompos;