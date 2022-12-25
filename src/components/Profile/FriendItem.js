import React from "react";

function FriendItem(props) {
  // INTEGRATE DATA
  const { id, image, name } = props.data;
  return (
    <>
      {/* FRIEND ITEM */}
      <div className="flex items-center" key={id}>
        {/* FRIEND IMAGE */}
        <img
          className="w-12 h-12 rounded-full"
          src={image}
          alt="friend_img"
        />
        {/* FRIEND NAME */}
        <h5 className="ml-7 text-[24px] leading-[35px]">{name}</h5>
      </div>
    </>
  );
}

export default FriendItem;
