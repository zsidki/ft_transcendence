import * as React from 'react';
import './DM.css'
import { useGlobalContext} from '../Context'
import {Room} from "../interfaces/Room";
import {useChat} from "../../components/hooks/useChat";
import {RoomDetails} from "../Chat";

const empty = require('../../img/empty.svg').default as string;

const DM = (props: {setStatus:Function}) => {
  // const { user, rooms,setoUser } = useGlobalContext()


    const {currentRooms, moreRooms, noMoreRooms} = useChat();

    if (!currentRooms || currentRooms.length === 0)
      return ( <div className='empty_state' ><img alt="" src={empty}/>
          <ul className='empty_s_text'>No direct message yet</ul>
          <ul className='empty_s_subtitle'>You will see your first direct message here when you receive it.</ul>
      </div>)
    return (

        <div className="Dm_root" >
            {
                currentRooms && currentRooms.map((room: Room,
                                                  index: number) => {
                    return <RoomDetails r={room} key={index}  />
                })
                }
            {!noMoreRooms && <button className="btn-outline-dark" onClick={() => {moreRooms()}}>Load more</button>}
        </div>
    );
}

export default DM;


