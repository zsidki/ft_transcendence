import React , { useContext, useEffect, useState }from "react";
import back_arrow from "../../images/back_arrow.svg";

import TableItem from "./TableItem";
import axios from "axios";
import {fetchAccountService} from "../../utils/fetchAccountService";
function TableLeaderboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
      fetchAccountService("games/leaderboard", "GET", null, null)
          .then((res) => {
            setData(res);
          }).catch((err) => {
            console.log(err);
          });
    // axios.get(`${process.env.REACT_APP_API_URL}/games/leaderboard`, {
    //   withCredentials: true,
    // }).then((res) => {
    //   setData(res.data);
    //
    //   console.log(res.data);
    // }).catch((err) => {
    //   console.table(err);
    //
    // })
  },[]);
  return (
    <>
      <div className="px-16 py-8">
        <table className="leaderboard_table">
          <thead>
            {/* TABLE HEADINGS */}
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Win</th>
              <th>Lose</th>
              <th>Matches</th>
            </tr>
          </thead>
          <tbody>
            {/* TABLE LIST */}
            {data?.map((loopData, index) => {
              
              if(index < 20)
              return (<TableItem key={index} data={{rank : index + 1,name : loopData.username,
                win: loopData.gameswon, lose: loopData.gameslost,avatar : loopData.avatar}} />)

            
            })}
          </tbody>
        </table>

        <div className="px-12 pt-7">
          {/* BACK BUTTON */}
          <button className="flex items-center text-[20px] leading-[28px]">
            <img className="mr-5" src={back_arrow} alt="back-arrow" />
            <span>back</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default TableLeaderboard;
