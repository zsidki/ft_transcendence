import React , { useContext, useEffect, useState }from "react";
import back_arrow from "../../images/back_arrow.svg";

import TableItem from "./TableItem";
import axios from "axios";
import {fetchAccountService} from "../../utils/fetchAccountService";
import {account} from "../../interfaces/account.interface";
import {useAccounts} from "../hooks/useAccount";
function TableLeaderboard() {
  const {leaderBoard, getLeaderBoard, isLoading} = useAccounts();
  const [noMoreData, setNoMoreData] = useState<boolean>(false);

  useEffect(() => {
      if (isLoading || noMoreData || leaderBoard?.length > 0)
        return;
      //console.log("getLeaderBoard");
      getLeaderBoard()
          .then((res) => {
        setNoMoreData(true);
      }).catch((err) => {
            console.log(err);
      });
  },[leaderBoard, isLoading, noMoreData]);
  return(
    <>
      <div className="px-16 py-8">
        <table className="leaderboard_table">
          <thead>
            {/* TABLE HEADINGS */}
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Won</th>
              <th>Lost</th>
              <th>Matches</th>
              <th>DM</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* TABLE LIST */}
            {leaderBoard?.map((loopData:any, index: number) => {
              if(index < 20)
              return (<TableItem key={index} data={{rank : index + 1,name : loopData.username,
                win: loopData.gameswon, lose: loopData.gameslost,avatar : loopData.avatar, Userid: loopData.Userid}} />)
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableLeaderboard;
