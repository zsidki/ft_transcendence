import React from "react";
import achievements_img from "../../images/achievements_img.svg";
import do3f_gold from "../../images/do3f_gold.svg";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {fetchAccountService} from "../../utils/fetchAccountService";
//svg error

function Achievements() {
  const [data, setData] = useState<any>(undefined);
  const path = window.location.pathname.split("/").at(-1);
  const location = useLocation();

  
  useEffect(() => {
    const endPoint = path === 'profile' ? "users/achievements" : `users/achievements/${path}`;
    
    //@ts-ignore
      fetchAccountService('${endPoint}', {
      withCredentials: true }).then((res) => {
      setData(res?.achivements);
      
      
    }).catch((err) => {
      //console.table(err);
    })
  
  },[location]);
  return (
    <>
      <div className="bg-[#2c2f489c] rounded-[10px] py-5 px-6">
        {/* ACHIEVEMENTS LIST */}
        <div className="flex justify-between space-x-10">
          {`achievements ${(data ? data.length : 0)}`}
          {/* IMAGE */}
            
          {
          data && data.map((ach: any, index : number) => {
            return (
              <div>
            <img key={index} src={`${process.env.REACT_APP_API_URL}/achievemnts/${ach.name}.svg`} alt="achievement_img" />
              {ach.desc}
              </div>
            )
          })
        }
          <img src="do3f_gold" />
          {/* IMAGE */}
 
        </div>
      </div>
    </>
  );
}

export default Achievements;
