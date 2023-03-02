import React from "react";

function HowToPlay() {
  return (
    <>
      <div className="how_to_play flex-1 rounded-3xl p-6">
        {/* HOW TO PLAY TITLE */}
        <h3 className="uppercase text-white text-[18px] leading-[22px] font-semibold">
          How to play
        </h3>

        {/* DESCRIPTION */}
        <p className="uppercase text-white text-[12px] leading-[22px] font-medium mt-4">
          A small ball moves across the screen, bouncing off the top and bottom
          ledges, and the two players each control a pad, sliding it vertically
          between the ends of the screen using the controls. If the ball hits
          the pad, it bounces back to the other player. If it misses the pad,
          the other player scores a point. The ball bounces in different ways
          depending on how it hits the pad.
        </p>
      </div>
    </>
  );
}

export default HowToPlay;
