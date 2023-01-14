import { type } from "os";
import React from "react";
import { Link } from "react-router-dom";

type FriendItemProps = {
  userId: string;
  email: string;
  username: string;
  avatar: string;
}
function FriendItem(props : FriendItemProps) {
  // INTEGRATE DATA
  
  return (
    <>
      {/* FRIEND ITEM */}
      <div className="test">
      <div className="flex items-center" key={props.userId}>
        {/* FRIEND IMAGE */}
        <img
          className="w-16 h-16 rounded-full"
          src={props.avatar}
          alt="friend_img"
        />
        {/* FRIEND NAME */}
        
        <h5 className="ml-7 text-[24px] leading-[35px]"><Link to={`/user/${props.username}`}>{props.username}</Link></h5>
      </div>
      </div>
    </>
  );
}

export default FriendItem;
