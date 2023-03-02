import React, {useEffect} from "react";
import TableLeaderboard from "../components/Leaderboard/TableLeaderboard";
import TopUserDetailsLeaderboard from "../components/Leaderboard/TopUserDetailsLeaderboard";
import logo from "../images/logo.svg";
import logo_text from "../images/logo_text.svg";
import {useAccounts} from "../components/hooks/useAccount";
const loginbutton = require("../images/Loginbutton.png") as string;

function Loginpage(){
    const { isAuthenticated, me } = useAccounts();
    const handleClick = () => {
      (window as Window).location = `${process.env.REACT_APP_ACCOUNT_API_URL}auth/42login`;
      };
    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = "/";
        }

    },[isAuthenticated]);

    return (<>
      <div className="sidebar-header flex items-center justify-center h-[70px]">
          <img className="" src={logo} alt="logo" />
          <img className="" src={logo_text} alt="logo-text" />
        </div>
        <div className="login-container flex justify-center items-center">
          <button className=" btn-outline-dark login-button rounded-3xl " style={{
            background: `url(${loginbutton})`,
            width: '328px',
              
            height: '50px',
      }}
                  onClick={handleClick}>
            </button>
        </div>
        </>);
}


export default Loginpage;
