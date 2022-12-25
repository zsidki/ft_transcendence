import React from "react";
import TableLeaderboard from "../components/Leaderboard/TableLeaderboard";
import TopUserDetailsLeaderboard from "../components/Leaderboard/TopUserDetailsLeaderboard";

function Leaderboard() {
  return (
    <>
      <div className="leaderboard rounded-[20px]">
      <TopUserDetailsLeaderboard />
      <TableLeaderboard/>
      </div>
    </>
  );
}

export default Leaderboard;
