import React from "react";
type Props = {
  data: {
    id: number,
    name: string,
    points: string,
  }
}
function PlayerItem(props : Props) {

  return (
    <>
      <div className="flex flex-col items-center" key={props.data.id}>
        {/* PLAYER IMAGE */}
        <div className="w-[95px] h-[90px] rounded-[20px] bg-[#D6D6D6] mb-1.5">
          {/* <img className="rounded-[20px]" alt="user-img"/> */}
        </div>

        {/* PLAYER NAME */}
        <h6 className="text-white text-[14px] leading-[22px] font-semibold mb-0.5">
          {props.data.name}
        </h6>

        {/* PLAYER POINTS */}
        <span className="text-[#BDBDBE] text-[13px] leading-[16px]">
          <span>{props.data.points}</span> points
        </span>
      </div>
    </>
  );
}

export default PlayerItem;
