import { type } from "os";
import React from "react";
import { Link } from "react-router-dom";
import {account} from "../../interfaces/account.interface";

type FriendItemProps = {
  userId: string;
  email: string;
  username: string;
  avatar: string;
}
function FriendItem({friend}: {friend: account }) {
  // INTEGRATE DATA
  
  return (
    <>
      {/* FRIEND ITEM */}
      <div className="test">
      <div className="flex items-center" key={friend.Userid}>
        {/* FRIEND IMAGE */}
        <img
          className="w-16 h-16 rounded-full"
          src={friend.avatar}
          alt="friend_img"
        />
        {/* FRIEND NAME */}
        
        <h5 className="ml-7 text-[24px] leading-[35px]">
            <Link to={`/user?username=${friend.username}`}>{friend.username}</Link></h5>
      </div>
      </div>
    </>
  );
}

export default FriendItem;
