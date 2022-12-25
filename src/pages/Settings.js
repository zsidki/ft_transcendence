import React from "react";
import user_img from "../images/user_img_extraLarge.png";
import edit_name_icon from "../images/edit_profile_name_icon.svg";
import edit_photo_icon from "../images/edit_profile_photo_icon.svg";
import change_wallpaper_icon from "../images/change_wallpaper_icon.svg";

function Settings() {
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
                src={user_img}
                alt="user-profile"
              />
            </div>

            {/* USER NAME */}
            <h3 className="ml-[34px] text-white text-[25px] leading-[38px] font-semibold">
              Zakariya Sidki
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

            {/* BUTTON EDIT PROFILE PHOTO */}
            <button className="flex items-center">
              <img src={edit_photo_icon} alt="edit_photo_icon" />
              <span className="ml-9 text-white text-[20px] leading-[30px]">
                Edit Profile Photo
              </span>
            </button>

            {/* BUTTON EDIT PROFILE NAME */}
            <button className="flex items-center">
              <img src={change_wallpaper_icon} alt="change_wallpaper_icon" />
              <span className="ml-9 text-white text-[20px] leading-[30px]">
                Change Wallpaper
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
