import React from "react";
import PlayerItem from "./PlayerItem";
import { TopPlayersData } from "./TopPlayersData";

function TopPlayers() : JSX.Element {
  return (
    <>
      <div className="top-players rounded-3xl">
        <div className="shadow rounded-3xl px-[34px] pt-3.5 pb-6">
          {/* TOP PLAYERS TITLE */}
          <h3 className="uppercase text-white text-[18px] leading-[22px] font-semibold">
            Top Players
          </h3>

          <div className="player-boxes flex space-x-[25px] mt-2.5">

            {/* TOP PLAYER LIST */}
            {TopPlayersData.map((loopData) => (
              <PlayerItem key={loopData.id} data={loopData} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopPlayers;
