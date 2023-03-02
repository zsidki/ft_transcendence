import React, { useState, useRef } from "react";
import { useEffect } from "react";
import "./App.css";
import Home from './homePage/First_page';
import Sidebar from "./components/Sidebar";
import Leaderboard from "./pages/Leaderboard";
import Platform from "./pages/Platform";
import Live from "./pages/Live";
import {Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import {useChat} from "./components/hooks/useChat";

import Settings from "./pages/Settings";
import {FA2VEnable, FA2} from "./pages/FA2";
import Profile from "./pages/Profile";
import Loginpage from "./pages/Login";
import Game, { GameOptions } from "./Game/index";

import Chat from "./chat/Chat";
import {useAccounts} from "./components/hooks/useAccount";
import TopButton from "./chat/TopButton"



import { useSnackbar } from 'notistack'



//@ts-ignore

const Vector = require('./img/Vector_inver.svg').default as string;


function App({}) {
  // OPEN SIDE BAR ON HOVER
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const {isAuthenticated, authenticate , isLoading} = useAccounts();
  const [ischvisib, setischvisib] = useState<boolean>(true);
  const {currentRooms } = useChat();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const navigate = useNavigate();

  useEffect(() => {
      if (searchParams.get('accessToken'))
        {
        const token = searchParams.get('accessToken')

            if (token && token.length > 0)
            {
                sessionStorage.setItem('token', token);
                const isFirstTime = searchParams.get('first')
                console.log(isFirstTime)
                if (isFirstTime)
                    authenticate(true);
                else
                 authenticate(false);


            }
    }
  }, [searchParams, isAuthenticated]);


  
    







  return (
    <div className="App">
      {/* RENDER SIDEBAR AND MAIN CONTENT ONLY FOR AUTHENTICATED USERS */}
      {isAuthenticated  ? (
        <div className="flex ">
          {/* SIDEBAR */}

          <div className={
              isHovering ? "flex w-full transition" : "flex w-full transition"
            }>
            <div className="flex flex-row h-full w-full justify-between ">
              <Sidebar isHovering={isHovering} setIsHovering={setIsHovering} />
              <div className="flex justify-center " >
                <div className="main-content">
                  {/* ROUTES */}
                  <Routes>
                    <Route path="*" element={<Platform />} />
                    <Route path="/Home" element={<Platform />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/user/*" element={<Profile />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/gamesettings" element={<GameOptions />}/>
                    <Route path="/live" element={<Live />} />
                      <Route path="/2fa" element={<FA2VEnable />} />
                  </Routes>
                </div>
              </div>
              {ischvisib ?<Chat setischvisib={setischvisib} /> : 
              <div className="flex flex-row justify-end h-full min-w-[50px] "> 
                {  currentRooms.reduce((r= 0, v)=>
                    {
                      if (v.unread)
                        return r +  (v.unreadCount? v.unreadCount : 1 );
                        return r;
                    }, 0) !== 0  && 
                    <div className="badge" >
                      <div className="badge_color" > 
                        <ul>
                          {currentRooms.reduce((r, v)=>{
                            if (v.unread)
                              return r +  (v.unreadCount? v.unreadCount : 1 );
                              return r;
                          }, 0)}
                        </ul>
                        </div>
                    </div>}
                <TopButton onClick={()=> setischvisib(true)} src={Vector}  /> 
                
                 </div>
              }
            </div>
            {/* CHAT BOX */}
            
          </div>
        </div>
      ): 
      <>
      <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/" element={<Home />} /> 
          <Route path="/2fa" element={<FA2 />} />  
        </Routes>
      
      </>
      } 
    </div>
  );
}

export default App;
