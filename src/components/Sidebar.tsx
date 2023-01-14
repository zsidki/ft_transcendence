// @ts-nocheck
import React from "react";
import { useContext, useEffect, useState } from "react";
import logo from "../images/logo.svg";
import logo_text from "../images/logo_text.svg";
import explore_icon from "../images/explore_icon.svg";
import home_icon from "../images/home_icon.svg";
import profile_icon from "../images/profile_icon.svg";
import game_icon from "../images/game_icon.svg";
import leaderboard_icon from "../images/leaderboard_icon.svg";
import live_icon from "../images/live_icon.svg";
import settings_icon from "../images/settings_icon.svg";
import user_img from "../images/user_img.png";
import exit_icon from "../images/exit_icon.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import UserSocketContext from "../context/userSocket";
import {useAccounts} from "./hooks/useAccount";

const Sidebar= (props ) =>  {
  const handlelogout = () => {
    window.location = `${process.env.REACT_APP_API_URL}/users/logout`;
  };
  const [data, setData] = useState([]);
 const {isAuthenticated, me} = useAccounts();

 useEffect(() => {
    if (isAuthenticated && me)
      setData(me);
 },[isAuthenticated, me]);
  // FUNCTION TO OPEN SIDEBAR
  const handleMouseOver = () => {
    props.setIsHovering(true);
  };

  // FUNCTION TO CLOSE SIDEBAR
  const handleMouseOut = () => {
    props.setIsHovering(false);
  };

  // TO ADD OR REMOVE ACTIVE CLASS
  //assigning location variable
  const location = useLocation();

  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  return (
    <>
      <div
        className={
          props.isHovering ? "sidebar transition active" : "sidebar transition"
        }
      >
        {/* SIDEBAR HEADER WITH LOGO */}
        <div className="sidebar-header flex items-center justify-center h-[70px]">
          <img className="" src={logo} alt="logo" />
          <img className="" src={logo_text} alt="logo-text" />
        </div>

        <div className="bg-[#2c2f4880] h-full flex flex-col">
          <div className="pl-5 flex w-full h-[44px] items-center border-b border-[#574F85]" onClick={() => props.setIsHovering(!props.isHovering)} >
            {/* EXPLORE LINK */}
            <Link
              href="#abc"
              className="flex items-center h-full w-full pl-[9px]"
            >
              <span className="sidebar-link-icon text-2xl">
                {/* ICON */}
                <img src={explore_icon} width="24px" height="24px" alt="icon" />
              </span>

              {/* TEXT */}
              <span className="sidebar-link-text text-[17px] leading-[20px] text-white font-bold" >
                Explore
              </span>
            </Link>
          </div>

          {/* SIDEBAR LINKS LIST */}
          <ul className="pl-5 pt-3.5 space-y-2">
            {/* HOME LINK */}
            <li className="flex w-full h-[40px] items-center">
              {/* ADD OR REMOVE ACTIVE CLASS ON CLICK */}
              <Link
                className={
                  splitLocation[1] === ""
                    ? "flex items-center h-full w-full pl-[9px] rounded-l-[5px] bg-[#00000080]"
                    : "flex items-center h-full w-full pl-[9px] rounded-l-[5px]"
                }
                to="/"
              >
                {/* ICON */}
                <span className="sidebar-link-icon text-2xl">
                  <img src={home_icon} width="24px" height="24px" alt="icon" />
                </span>

                {/* TEXT */}
                <span className="sidebar-link-text text-[15px] leading-[18px] text-white">
                  Home
                </span>
              </Link>
            </li>

            {/* PROFILE LINK */}
            <li className="flex w-full h-[40px] items-center">
              {/* ADD OR REMOVE ACTIVE CLASS ON CLICK */}
              <Link
                className={
                  splitLocation[1] === "profile"
                    ? "flex items-center h-full w-full pl-[9px] rounded-l-[5px] bg-[#00000080]"
                    : "flex items-center h-full w-full pl-[9px] rounded-l-[5px]"
                }
                to="/profile"
              >
                {/* ICON */}
                <span className="sidebar-link-icon text-2xl">
                  <img
                    src={profile_icon}
                    width="24px"
                    height="24px"
                    alt="icon"
                  />  
                </span>

                {/* TEXT */}
                <span className="sidebar-link-text text-[15px] leading-[18px] text-white">
                  Profile
                </span>
              </Link>
            </li>

            {/* GAME LINK */}
            <li className="flex w-full h-[40px] items-center">
            <Link
                className={
                  splitLocation[1] === "game"
                    ? "flex items-center h-full w-full pl-[9px] rounded-l-[5px] bg-[#00000080]"
                    : "flex items-center h-full w-full pl-[9px] rounded-l-[5px]"
                }
                to="/gamesettings"
              >
                {/* ICON */}
                <span className="sidebar-link-icon text-2xl">
                  <img src={game_icon} width="24px" height="24px" alt="icon" />
                </span>

                {/* TEXT */}
                <span className="sidebar-link-text text-[15px] leading-[18px] text-white">
                  Game
                </span>
              </Link>
            </li>

            {/* LEADERBOARD LINK */}
            <li className="flex w-full h-[40px] items-center">
              {/* ADD OR REMOVE ACTIVE CLASS ON CLICK */}
              <Link
                className={
                  splitLocation[1] === "leaderboard"
                    ? "flex items-center h-full w-full pl-[9px] rounded-l-[5px] bg-[#00000080]"
                    : "flex items-center h-full w-full pl-[9px] rounded-l-[5px]"
                }
                to="/leaderboard"
              >
                {/* ICON */}
                <span className="sidebar-link-icon text-2xl">
                  <img
                    src={leaderboard_icon}
                    width="24px"
                    height="24px"
                    alt="icon"
                  />
                </span>

                {/* TEXT */}
                <span className="sidebar-link-text text-[15px] leading-[18px] text-white">
                  Leaderboard
                </span>
              </Link>
            </li>

            {/* LIVE LINK */}
            <li className="flex w-full h-[40px] items-center">
            <Link
                className={
                  splitLocation[1] === "live"
                    ? "flex items-center h-full w-full pl-[9px] rounded-l-[5px] bg-[#00000080]"
                    : "flex items-center h-full w-full pl-[9px] rounded-l-[5px]"
                }
                to="/live"
              >
                {/* ICON */}
                <span className="sidebar-link-icon text-2xl">
                  <img src={live_icon} width="24px" height="24px" alt="icon" />
                </span>

                {/* TEXT */}
                <span className="sidebar-link-text text-[15px] leading-[18px] text-white">
                  Live
                </span>
              </Link>
            </li>

            {/* SETTINGS LINK */}
            <li className="flex w-full h-[40px] items-center">
              {/* ADD OR REMOVE ACTIVE CLASS ON CLICK */}
              <Link
                className={
                  splitLocation[1] === "settings"
                    ? "flex items-center h-full w-full pl-[9px] rounded-l-[5px] bg-[#00000080]"
                    : "flex items-center h-full w-full pl-[9px] rounded-l-[5px]"
                }
                to="/settings"
              >
                {/* ICON */}
                <span className="sidebar-link-icon text-2xl">
                  <img
                    src={settings_icon}
                    width="24px"
                    height="24px"
                    alt="icon"
                  />
                </span>

                {/* TEXT */}
                <span className="sidebar-link-text text-[15px] leading-[18px] text-white">
                  Settings
                </span>
              </Link>
            </li>
          </ul>

          {/* PROFILE SECTION */}
          <div className="mt-auto">
            <div
              className="flex h-[70px] items-center justify-between  bg-[#ffffff0d]"
              style={{
                boxShadow: "inset 0px 1px 0px rgba(255, 255, 255, 0.06)",
              }}
            >
              <div
                className="w-[76px] h-full flex items-center justify-center bg-[#ffffff0d]"
                style={{
                  boxShadow: "inset 0px 1px 0px rgba(255, 255, 255, 0.06)",
                }}
              >
                {/* USER IMAGE */}
                <div className="relative">
                  <img
                    className="rounded-full object-cover"
                    src={data.avatar}
                    width="40px"
                    height="40px"
                    alt="user-img"
                  />
                  {/* ONLINE TAG */}
                  {/* use class "red" instead of "green" to change it to offline */}
                  {/* i want to change the tag to green when offline and red when online*/}
                  
                  <span className="online-tag green"></span>
                </div>
              </div>

              <div className="sidebar-user-profile flex items-center">
                {/* USER DETAILS */}
                <div className="pr-[18px]">
                  <h4 className="text-white text-[14px] leading-[20px] font-medium opacity-90">
                    {data.username}
                  </h4>
                  <p className="text-white text-[12px] leading-[18px] opacity-30">
                    zsidki
                  </p>
                </div>
                {/* EXIT ICON */}
                <button onClick={handlelogout}><img
                  className="pr-2 cursor-pointer"
                  src={exit_icon}
                  alt="exit-icon"
                /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;








