import React from "react";
import { useChat } from "../hooks/useChat";
import RoomC from './RoomC';
import { TopPlayersData } from "./TopPlayersData";
import {Room} from '../../chat/interfaces/Room'
function TopPlayers() : JSX.Element {
    const {roomsToJoin} = useChat();
    //console.log(roomsToJoin);
  return (
    <>
      <div className="top-players rounded-3xl   ">
        <div className="shadow rounded-3xl w-full  px-[34px] pt-3.5 pb-6">
          {/* TOP PLAYERS TITLE */}
          <h3 className="uppercase text-white text-[18px] leading-[22px] font-semibold">
            Rooms
          </h3>

          <div className="player-boxes flex flex justify-around gap-10  mt-2.5 grid grid-cols-4">

            {/* TOP PLAYER LIST */}
            {roomsToJoin.map((room: Room, index: number)=>{
              return (<RoomC key={index} room={room}  />)
            })}


          </div>
        </div>
      </div>
    </>
  );
}

export default TopPlayers;
