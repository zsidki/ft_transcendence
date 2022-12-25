import React from "react";
import cover_game from "../../images/cover_game.png";
import play_now_button from "../../images/play_now_button.svg";

function CoverGame() {
  return (
    <>
      <div className="relative h-[244px] rounded-3xl shadow-[0_4px_4x_rgba(0,0,0,0.46)]">
        {/* COVER IMAGE */}
        <img
          className="rounded-3xl w-full h-full object-cover"
          src={cover_game}
          alt="cover-game"
        />

        {/* PLAY NOW BUTTON */}
        <img
          className="absolute bottom-[-9%] left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          src={play_now_button}
          alt="play-now-button"
        />
      </div>
    </>
  );
}

export default CoverGame;
