import React, { useState } from "react";
import LockIcon from '@mui/icons-material/Lock';
import lock from '../../images/lock.svg';
import unlock from '../../images/unlock.svg';
import {Room} from '../../chat/interfaces/Room'
import {roomType} from '../../chat/interfaces/Room'
import { useChat } from "../hooks/useChat";




function RoomC({room }: {room : Room}) {
  const [pass, setpass] = React.useState<string>("")
  const {joinRoom,error} = useChat()
  const [active, setActive] = useState(false);
  var style = {}
    if (error && active)
        style = {border: "1px solid #FF0000"}
  return (
    <>
      <div className="flex flex-col items-center gap-5" >
        {/* PLAYER IMAGE */}
        <div className="w-[150px] h-[150px] rounded-[20px] mb-1.5">
          {room.status === roomType.PRIVATE ? <img src={lock} alt="user-img"/> : <img src={unlock} alt="user-img"/>}
        </div>

        {/* PLAYER NAME */}
        <h6 className="text-white text-[14px] leading-[22px] font-semibold mb-0.5">
          {room.name}
        </h6>

        {/* PLAYER POINTS */}
        <div className="text-[#BDBDBE] flex flex-col gap-5 w-[100%] text-[13px] leading-[16px]">
        <div className='flex flex-col gap-[4px] '>
          
          {room.status === roomType.PRIVATE && <input type="password" placeholder="Password" style={style}  className="fa2_input" onChange={(e) => setpass(e.target.value)} />}
          {error && active && <ul className='error'>error, incorrect pass.</ul>}
            </div>
          <button className="bg-[#004CCC]  text-white border-b-2 px-4 py-2 rounded-md" onClick={()=>{
            setActive(true);
            joinRoom(room.id || '',pass)
            }} >JOIN</button>
          
        </div>
      </div>
    </>
  );
}

export default RoomC;
