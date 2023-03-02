import React, {useCallback} from "react";
import edit_name_icon from "../images/edit_profile_name_icon.svg";
import edit_photo_icon from "../images/edit_profile_photo_icon.svg";
import tow_fa_icon from "../images/tow_fa_icon.svg";
import change_wallpaper_icon from "../images/change_wallpaper_icon.svg";
import { useContext, useEffect, useState } from "react";
import Updateusername from "../components/settings/updateusername";
import axios from "axios";
import UploadButton from "../components/settings/Uploadimage";
import Switch from '@mui/material/Switch';
import TopButton from '../chat/TopButton'
import {fetchAccountService} from "../utils/fetchAccountService";
import {useAccounts} from "../components/hooks/useAccount";
import {useNavigate} from "react-router-dom";

const user_img = require( "../images/user_img_extraLarge.png") as string;
const Vector = require( "../img/Vector.svg").default as string;


function useComponentVisible(setIs2FA : Function) {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleClickOutside = (event:any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIs2FA(false)
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

function Settings() {
  const [data, setData] = useState<any>([]);
  const [is2FA, setIs2FA] = useState<boolean>(false);
  const [active, setActive] = useState(false);
  const { ref } = useComponentVisible(setIs2FA);
  const {me} = useAccounts();
    const navigate = useNavigate();
  const handleSubmit =  useCallback( (f2:boolean) => {


    if (f2) {
      fetchAccountService('users/2FA/enable')
            .then((res) => {
                setIs2FA(res.is2FA);
                setActive(true);
              console.log(res.is2FA);
              if (res.is2FA) {
                    navigate('/2fa/?email=' + me?.email);
                }
         })
     .catch((err) => {
        //console.table(err);
        });
    } else {
        fetchAccountService(`users/2FA/disable`,)
            .then((res) => {
                setIs2FA(res.is2FA);
                setActive(false);
            })
            .catch((err) => {
                //console.table(err);
            });
    }
    },[is2FA, me]);

    // const FA2 = <div className="user_h" >
    //             <div className="user_p" ref={ref}>
    //               <div className="fa2_root" >
    //                 <ul style={{padding: '0px', width: "auto"}}>2FA</ul>
    //                   <div className="QR_code"></div>
    //                  <div className="user_input" >
    //                   <input type="password" className="fa2_input" onChange={() => {}} />
    //                   <TopButton src={Vector} size={{height:"32px"}} onClick={()=>{
    //
    //                     setActive(false)
    //                   }}  s_padding={{padding: '4px 16px'}} />
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
                // <div className="user_p"><ul>name :</ul>
                //     <input type="text" className="mssginput" id="1" name="input" placeholder="Say something"  ></input>
                //     <TopButton onClick={(y:any)=>{}} />
                //   </div>
  return (
    <>
      <div className="settings h-full shadow-[0_4px_4x_rgba(0,0,0,0.25)] min-w-[820px] max-w-[950px] rounded-[20px]">
      {/*{active && is2FA && FA2}*/}
      
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
                src={me?.avatar}
                alt="user-profile"
              />
            </div>

            {/* USER NAME */}
            <h3 className="ml-[34px] text-white text-[25px] leading-[38px] font-semibold">
            {me?.username}
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
                  onChange={(e:any) => {
                      handleSubmit(!is2FA);
                  }}
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
