import React from "react";
import CoverGame from "../components/Platform/CoverGame";
import HowToPlay from "../components/Platform/HowToPlay";
import LiveNow from "../components/Platform/LiveNow";
import Rooms from "../components/Platform/Rooms";

const boy_img = require("../images/boy.png") as string;

function Platform() {
  
  return (
    <>
      <div className="flex flex-col space-x-0 gap-20 min-w-[820px] max-w-[950px] ">
        <CoverGame />

        <div className="flex w-full space-x-0 gap-5">
          <div className="w-[90px] relative flex items-center justify-center">
            {/* BOY IMAGE */}
            <img
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[3.6]"
              src={boy_img}
              alt="boy-img"
            />
          </div>

          {/* <LiveNow /> */}

          <HowToPlay />
        </div>
        <Rooms />
      </div>
    </>
  );
}

export default Platform;
