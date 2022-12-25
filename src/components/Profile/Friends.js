import React from "react";
import FriendItem from "./FriendItem";
import { FriendsData } from "./FriendsData";

function Friends() {
  return (
    <>
      <div className="bg-[#2c2f489c] rounded-[10px] p-5 pb-8">
        {/* FRIENDS TITLE */}
        <h3 className="text-[25px] leading-[29px] font-bold">Friends</h3>

        <div className="mt-5 px-3 flex items-center justify-between flex-wrap gap-x-12 gap-y-6">
          {/* FRIENDS LIST */}
          {FriendsData.map((loopData) => (
              <FriendItem key={loopData.id} data={loopData} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Friends;
