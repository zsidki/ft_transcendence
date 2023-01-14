import React from "react";
import play_video_icon from '../../images/play_video_icon.svg';

function LiveNow() {
  return (
    <>
      <div className="live_now rounded-3xl flex-1 px-6 pt-6 pb-[26px]">
        {/* LIVE NOW TITLE */}
        <h3 className="uppercase text-white text-[18px] leading-[22px] font-semibold">
          Live now
        </h3>

        <div className="flex flex-row flex-wrap gap-y-3 justify-between mt-5">
          {/* LIVE NOW BOX */}
          <div className="relative w-[95px] h-[90px] rounded-[20px] bg-[#E5E5E5]">
            {/* <img alt="video-img"/> */}
            <img
              className="absolute bottom-[12%] right-[11%]"
              src={play_video_icon}
              alt="play-video-icon"
            />
          </div>

          {/* LIVE NOW BOX */}
          <div className="relative w-[95px] h-[90px] rounded-[20px] bg-[#E5E5E5]">
            {/* <img alt="video-img"/> */}
            <img
              className="absolute bottom-[12%] right-[11%]"
              src={play_video_icon}
              alt="play-video-icon"
            />
          </div>

          {/* LIVE NOW BOX */}
          <div className="relative w-[95px] h-[90px] rounded-[20px] bg-[#E5E5E5]">
            {/* <img alt="video-img"/> */}
            <img
              className="absolute bottom-[12%] right-[11%]"
              src={play_video_icon}
              alt="play-video-icon"
            />
          </div>

          {/* LIVE NOW BOX */}
          <div className="relative w-[95px] h-[90px] rounded-[20px] bg-[#E5E5E5]">
            {/* <img alt="video-img"/> */}
            <img
              className="absolute bottom-[12%] right-[11%]"
              src={play_video_icon}
              alt="play-video-icon"
            />
          </div>

          {/* LIVE NOW BOX */}
          <div className="relative w-[95px] h-[90px] rounded-[20px] bg-[#E5E5E5]">
            {/* <img alt="video-img"/> */}
            <img
              className="absolute bottom-[12%] right-[11%]"
              src={play_video_icon}
              alt="play-video-icon"
            />
          </div>

          {/* LIVE NOW BOX */}
          <div className="relative w-[95px] h-[90px] rounded-[20px] bg-[#E5E5E5]">
            {/* <img alt="video-img"/> */}
            <img
              className="absolute bottom-[12%] right-[11%]"
              src={play_video_icon}
              alt="play-video-icon"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default LiveNow;
