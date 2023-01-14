import React, { useContext, useEffect, useState }from "react";
import user_img_large from '../../images/user_img_large.png'
//using a image
import axios from "axios";
import {fetchAccountService} from "../../utils/fetchAccountService";
function TopUserDetailsLeaderboard() {
  const [data, setData] = useState(undefined);
  useEffect(() => {
      if (!data)
    fetchAccountService('games/getmyleader')
        .then((res) => {
      setData(res);
    }).catch((err) => {
      console.table(err);
      
    })
  },[data]);
  return (
    <>
      <div className="leaderboard shadow-[0_4px_4x_rgba(0,0,0,0.25)] scale-[1.003] relative z-10 rounded-[20px] py-16 px-[66px]">
        <div className="flex">
          {/* USER IMAGE */}
            <div>
                <img className="rounded-full w-20 h-20 object-cover" src={data?.avatar} alt="user-img"/>
            </div>

            {/* USER DETAILS */}
            <div className="ml-10">
                <h2 className="mb-3.5 text-[30px] leading-[35px] text-white">{data?.username}</h2>
                <h6 className="text-[20px] leading-[23px] text-white">#{data?.rank}</h6>
            </div>
        </div>
      </div>
    </>
  );
}

export default TopUserDetailsLeaderboard;
