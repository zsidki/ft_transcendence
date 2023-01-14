import React, { useState } from "react";
import { useContext, useEffect } from "react";
import "./App.css";
import Home from './homePage/First_page';
import Sidebar from "./components/Sidebar";
import Leaderboard from "./pages/Leaderboard";
import Platform from "./pages/Platform";
import Live from "./pages/Live";
import { Route, Routes, useSearchParams } from "react-router-dom";

import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
// import axios from "axios";
import Loginpage from "./pages/Login";
import Game, { GameOptions } from "./Game/index";
import UserSocketContext from "./context/userSocket";
import Notify from "./components/Notify";
import {me} from "./interfaces/me.interface";
import socketIOClient from "socket.io-client";
import Chat from "./chat/Chat";
import {useAccounts} from "./components/hooks/useAccount";

type getme = {
  me : me
}
// const checkAuth = async (token :string ) => {
//   try {
//     if (!token)
//       return false;
//     const response = await axios.get<getme>(`${process.env.REACT_APP_API_URL}/users/me`, {
//       withCredentials: true,
//       headers:{
//         'authorization': 'Bearer ' + token,
//       }
//     });
//     if (response.status != 200)
//       return false;
//     return true;
//   } catch (error) {
//     if (axios.isAxiosError(error)){
//     if (error) {
//       return false;
//     }
//   }
//     throw error;
//   }
// };
// const chat = socketIOClient(`${process.env.REACT_APP_API_URL}/chat`, {
//   transports: ["websocket"],
//   withCredentials: true,
// });
function App({}) {
  // OPEN SIDE BAR ON HOVER
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const {isAuthenticated, authenticate , isLoading} = useAccounts();
  useEffect(() => {
    if (isAuthenticated) {
        // window.location.href = "/";
        console.log("isAuthenticated",isAuthenticated);

    }
    else if (searchParams.get('accessToken'))
    {
        const token = searchParams.get('accessToken')
        console.log("token",token);
            if (token && token.length > 0)
            {
                localStorage.setItem("token", token);
                authenticate();
            }
    }

  }, [searchParams, isAuthenticated]);


  
    

  // if (isLoading)
  //   return <div>Loading...</div>
  return (
    <div className="App">
      {/* RENDER SIDEBAR AND MAIN CONTENT ONLY FOR AUTHENTICATED USERS */}
      {/* {isAuthenticated  ? ( */}
        <div className="flex ">
          {/* SIDEBAR */}
          <Notify/>

          <div className={
              isHovering ? "flex w-full transition" : "flex w-full transition"
            }>
           <div className="flex flex-row h-full w-full justify-between ">
            <Sidebar isHovering={isHovering} setIsHovering={setIsHovering} />
              <div className="main-content ">
                {/* ROUTES */}
                
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Platform />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/user/*" element={<Profile />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/gamesettings" element={<GameOptions />}/>
                  <Route path="/live" element={<Live />} />
                </Routes>
              </div>
            <div className="flex flex-col h-full">
              <Chat  />
              </div>
            </div>
            {/* CHAT BOX */}
            
          </div>
        </div>
      {/* ): <Loginpage />*/}
    </div>
  );
}

export default App;
