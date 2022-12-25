import React from "react";
import back_arrow from "../../images/back_arrow.svg";
import { TableData } from "./TableData";
import TableItem from "./TableItem";

function TableLeaderboard() {
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
            {TableData.map((loopData) => (
              <TableItem key={loopData.id} data={loopData} />
            ))}
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
