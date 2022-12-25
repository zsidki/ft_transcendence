import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Leaderboard from "./pages/Leaderboard";
import Platform from "./pages/Platform";
import { Route, Routes } from "react-router-dom";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  // OPEN SIDE BAR ON HOVER
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="App">
      <div className="flex">

        {/* SIDEBAR */}
        <Sidebar isHovering={isHovering} setIsHovering={setIsHovering} />

        <div
          className={
            isHovering ? "flex w-5/6 transition" : "flex w-full transition"
          }
        >
          <div className="main-content px-[30px] py-[34px] w-4/5">

            {/* ROUTES */}
            <Routes>
              <Route path="/" element={<Platform />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/settings" element={<Settings/>} />
              <Route path="/profile" element={<Profile/>} />
            </Routes>
          </div>

          {/* CHAT BOX */}
          <div className="chat-box w-1/5 ">Chat box</div>
        </div>
      </div>
    </div>
  );
}

export default App;
