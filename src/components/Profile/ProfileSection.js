import React from "react";
import profile_cover_img from "../../images/profile_cover_img.png";
import avatar_img from "../../images/avatar_img.png";

function ProfileSection() {
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
              Win Count:<span className="ml-3">23</span>
            </h3>
          </div>
          <div className="flex-1 text-center -mt-24 pb-3.5">
            <div className="flex flex-col items-center justify-center">
              <div className="w-36 h-36 rounded-full p-1 profile_avatar_bg mb-1">
                {/* AVATAR IMAGE */}
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={avatar_img}
                  alt="avatar"
                />
              </div>
              {/* USER DETAILS */}
              <h4 className="text-[20px] leading-[30px] font-medium mb-px">
                Zaak Sidki
              </h4>
              <span className="text-[14px] leading-[21px] opacity-50 font-light">
                @zsidki
              </span>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-[22px] leading-[26px] font-bold">
              {/* LOSS COUNT */}
              Loss Count:<span className="ml-3">15</span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSection;
