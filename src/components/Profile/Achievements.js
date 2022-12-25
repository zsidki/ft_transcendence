import React from "react";
import achievements_img from "../../images/achievements_img.svg";

function Achievements() {
  return (
    <>
      <div className="bg-[#2c2f489c] rounded-[10px] py-5 px-6">
        {/* ACHIEVEMENTS LIST */}
        <div className="flex justify-between space-x-10">
          {/* IMAGE */}
          <div>
            <img src={achievements_img} alt="achievement_img" />
          </div>

          {/* IMAGE */}
          <div>
            <img src={achievements_img} alt="achievement_img" />
          </div>

          {/* IMAGE */}
          <div>
            <img src={achievements_img} alt="achievement_img" />
          </div>

          {/* IMAGE */}
          <div>
            <img src={achievements_img} alt="achievement_img" />
          </div>

          {/* IMAGE */}
          <div>
            <img src={achievements_img} alt="achievement_img" />
          </div>

          {/* IMAGE */}
          <div>
            <img src={achievements_img} alt="achievement_img" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Achievements;
