import React from "react";
import user_img from "../images/user_img_extraLarge.png";
import edit_name_icon from "../images/edit_profile_name_icon.svg";
import edit_photo_icon from "../images/edit_profile_photo_icon.svg";
import tow_fa_icon from "../images/tow_fa_icon.svg";
import change_wallpaper_icon from "../images/change_wallpaper_icon.svg";
import { useContext, useEffect, useState } from "react";
import Updateusername from "../components/settings/updateusername";
import axios from "axios";
import UploadButton from "../components/settings/Uploadimage";
import Switch from '@mui/material/Switch';
function Settings() {
  const [data, setData] = useState([]);
  const [is2FA, setIs2FA] = useState([]);
  useEffect(() => {
    
    axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
      withCredentials: true,
    }).then((res) => {
      setData(res.data);
      setIs2FA(res.data.userconfig.is2FA)
      console.log(res.data);
    }).catch((err) => {
      console.table(err);
      
    })
  },[]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (is2FA) {
    axios
    .get(`${process.env.REACT_APP_API_URL}/users/user/enable2FA`, {
    withCredentials: true,
    })
    .then((res) => {
    setIs2FA(res.data.is2FA);
    })
    .catch((err) => {
    console.table(err);
    });
    } else {
    axios
    .get(`${process.env.REACT_APP_API_URL}/users/user/disable2FA`, {
    withCredentials: true,
    })
    .then((res) => {
    setIs2FA(res.data.is2FA);
    })
    .catch((err) => {
    console.table(err);
    });
    }
    };
  return (
    <>
    
      <div className="settings h-full shadow-[0_4px_4x_rgba(0,0,0,0.25)] rounded-[20px]">
      
        <div className="py-[26px] px-[22px]">
          {/* PROFILE SETTINGS TITLE */}
          <h2 className="text-white text-[20px] leading-[30px] font-semibold mb-11">
            Profile Settings
          </h2>
          
          {/* PROFILE IMAGE WITH NAME */}
          <div className=" max-w-[460px] flex items-center pb-[34px] mb-12 border-b border-[rgba(0,0,0,0.25)]">
            <div className="rounded-full drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
              {/* USER IMAGE */}
              <img
                className="w-[100px] h-[100px] rounded-full"
                src={data.avatar}
                alt="user-profile"
              />
            </div>

            {/* USER NAME */}
            <h3 className="ml-[34px] text-white text-[25px] leading-[38px] font-semibold">
            {data.username}
            </h3>
            
          </div>


          {/* EDIT BUTTONS */}
          <div className="flex flex-col space-y-[34px] pl-[36px]">
            
            {/* BUTTON EDIT PROFILE NAME */}
            <button className="flex items-center">
              <img src={edit_name_icon} alt="edit_name_icon" />
              <span className="ml-9 text-white text-[20px] leading-[30px]">
                Edit Profile Name
              </span>
              
            </button>
            <Updateusername />
            {/* BUTTON EDIT PROFILE PHOTO */}
            <div className="flex items-center" >
             <img src={edit_photo_icon} alt="edit_photo_icon" />
              <span className="ml-9 text-white text-[20px] leading-[30px]">
                Edit Profile Photo
              </span>
              <UploadButton/>
            </div>

            {/* BUTTON ENABLE 2FA */}
            <div className="flex items-center" >
             <img src={tow_fa_icon} alt="tow_fa_icon" />
              <span className="ml-9 text-white text-[20px] leading-[30px]">
                Enable 2FA 
              </span>
              <Switch
                  checked={is2FA}
                  onChange={e => setIs2FA(e.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
