import React from "react";
import { Link } from "react-router-dom";
import  TopButton from "../../chat/TopButton"
const chat = require('../../img/chat.svg').default as string;
const control = require('../../img/controller.png') as string;

function TableItem(props :any) {
  // INTEGRATE DATA
  const {rank,  name, win, lose,avatar, Userid} = props.data;


  return (
    <>
      <tr >
        {/* RANK */}
        <td>{rank}</td>
        <td className="flex items-center">
          {/* IMAGE */}
          <div className="flex-1">
            <img
              className="w-12 h-12 rounded-full m-auto"
              src={avatar}
              alt="user-img"
            />
          </div>
          {/* NAME */}
          <span className="flex-1"><Link to={`/user?username=${name}`}>{name}</Link></span>
        </td>
        
        {/* WIN */}
        <td>{win}</td>
        {/* LOSE */}
        <td>{lose}</td>
        {/* MATCHES */}
        <td>{win + lose}</td>
        <td>
          <TopButton src={chat} s_padding={{padding: '8px 10px'}} onClick={()=>{

          }}/>
        </td>

          <td>
          <TopButton src={control} s_padding={{padding: '10px 12px'}} onClick={()=>{
            console.log('play')
            window.location.href ='/gamesettings?invite=' + Userid;
            
          }}/>
          </td>
      </tr>
    </>
  );
}

export default TableItem;
