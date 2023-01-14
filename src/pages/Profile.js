import axios from "axios";
import React, { useEffect } from "react";
import Achievements from "../components/Profile/Achievements";
import Friends from "../components/Profile/Friends";
import MatchHistory from "../components/Profile/MatchHistory";
import ProfileSection from "../components/Profile/ProfileSection";

function Profile() {
  const path = window.location.pathname.split("/").at(-1);
  return (
    <>
      <div className="space-y-3.5">
        <ProfileSection />
        <Achievements />
        {/* A JSX comment <div class="flex space-x-4 ...">*/}
        {path === "profile" ?
        <Friends /> : null
        }
        <MatchHistory />
        
      </div>
    </>
  );
}

export default Profile;
