import React from "react";
import user_img_large from '../../images/user_img_large.png'

function TopUserDetailsLeaderboard() {
  return (
    <>
      <div className="leaderboard shadow-[0_4px_4x_rgba(0,0,0,0.25)] scale-[1.003] relative z-10 rounded-[20px] py-16 px-[66px]">
        <div className="flex">
          {/* USER IMAGE */}
            <div>
                <img className="rounded-full w-20 h-20 object-cover" src={user_img_large} alt="user-img"/>
            </div>

            {/* USER DETAILS */}
            <div className="ml-10">
                <h2 className="mb-3.5 text-[30px] leading-[35px] text-white">Zakariya Sidki</h2>
                <h6 className="text-[20px] leading-[23px] text-white">#21</h6>
            </div>
        </div>
      </div>
    </>
  );
}

export default TopUserDetailsLeaderboard;
