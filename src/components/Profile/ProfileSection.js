import React from "react";
import { useContext, useEffect, useState } from "react";
import profile_cover_img from "../../images/profile_cover_img.png";
import avatar_img from "../../images/avatar_img.png";
import axios from "axios";
import { useLocation } from "react-router-dom"
import UserSocketContext from "../../context/userSocket";
import { ClassNames } from "@emotion/react";

import ProfileInteraction from "./interactions";
import {useAccounts} from "../hooks/useAccount";
import {fetchAccountService} from "../../utils/fetchAccountService";
function ProfileSection(props) {
  const socket = useContext(UserSocketContext);
  const [data, setData] = useState([]);
  const [wins, setWin] = useState([]);
  const [lost, setlose] = useState([]);
  const location = useLocation();
  const[status, setStatus] = useState("offline");
  const[myusername, setUser] = useState("");
  const {isAuthenticated, me} = useAccounts();

  const path = window.location.pathname.split("/").at(-1);
  useEffect(() => {
    if (isAuthenticated) {
      setUser(me);
    }
  },[isAuthenticated]);
  useEffect(() => {
    const endPoint = path === 'profile' ? "users/me" : `users/username/${path}`;
    fetchAccountService(`${endPoint}`)
        .then((res) => {
      setData(res);
      console.log(res);
    }).catch((err) => {
      console.table(err);
    })
    
  },[location]);
  useEffect(() => {
    // print the response from the server
    console.log("ttttt");
    console.log(data.username)
    socket.on('userstatus', (res) => {
      if(res.username === data.username){
        setStatus(res.status);
      }
     });
    socket.emit("getUserStatus", {username: data.username}, (data) => { setStatus(data.status); });
    console.log("aaaaa");
  },[data.username]);

  return (
    <>
      <div className="bg-[#2c2f489c] rounded-[10px]">
        <div className="w-full h-[199px] rounded-t-[10px]">
          {/* COVER IMAGE */}
          <img
            className="w-full h-full object-cover rounded-t-[10px]"
            src={profile_cover_img}
            alt="profile_cover_img"
          />

        </div>
        
        <div className="flex">
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-[22px] leading-[26px] font-bold">
              {/* WIN COUNT */}
              Win Count:<span className="ml-3">0</span>
            </h3>
          </div>
          <div className="flex-1 text-center -mt-24 pb-3.5">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 rounded-full p-1 profile_avatar_bg mb-1">
                {/* AVATAR IMAGE */}
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={data.avatar}
                  alt="avatar"
                />
                {/* use class "red" instead of "green" to change it to offline */}
                  {/* i want to change the tag to green when offline and red when online*/}
                  <span className={`bottom-0 left-5 absolute bd w-4 h-4 ${status == "online" ? "bg-green-500" : ""} ${status == "offline" ? "bg-red-500" : ""}${status == "in game" ? "bg-yellow-500" : ""}  border-white dark:border-gray-800 rounded-full`}></span>
                 
                  
              </div>
             
              {/* USER DETAILS */}
              <h4 className="text-[20px] leading-[30px] font-medium mb-px">
                {data.username}
              </h4>
              <span className="text-[14px] leading-[21px] opacity-50 font-light">
                {data.email}
              </span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-[22px] leading-[26px] font-bold">
              {/* LOSS COUNT */}
              Loss Count:<span className="ml-3">0</span>
            </h3>
          </div>
        </div>
    <div className="flex justify-center w-full">

    {(path !== 'profile' && myusername !== data.username) && (
    <ProfileInteraction status={status} username={data.username}/>
)}
    </div>

      </div>
    </>
  );
}

export default ProfileSection;
