import React from "react";
import CoverGame from "../components/Platform/CoverGame";
import HowToPlay from "../components/Platform/HowToPlay";
import LiveNow from "../components/Platform/LiveNow";
import TopPlayers from "../components/Platform/TopPlayers";
import boy_img from "../images/boy.png";

function Platform() {
  return (
    <>
      <div className="space-y-8">
        <CoverGame />
        <TopPlayers />

        <div className="flex w-full space-x-11">
          <div className="w-[90px] relative flex items-center justify-center">
            {/* BOY IMAGE */}
            <img
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[3.6]"
              src={boy_img}
              alt="boy-img"
            />
          </div>

          <LiveNow />

          <HowToPlay />
        </div>
      </div>
    </>
  );
}

export default Platform;
