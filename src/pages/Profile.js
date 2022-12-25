import React from "react";
import Achievements from "../components/Profile/Achievements";
import Friends from "../components/Profile/Friends";
import ProfileSection from "../components/Profile/ProfileSection";

function Profile() {
  return (
    <>
      <div className="space-y-3.5">
        <ProfileSection />
        <Achievements />
        <Friends />
      </div>
    </>
  );
}

export default Profile;
