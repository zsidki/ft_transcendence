import React , { useContext, useEffect, useState }from "react";
import avatar_img from "../../images/avatar_img.png";
import friend_image from "../../images/user_img2.png"
import axios from "axios";
import "../../index.css"
import { TableData } from "./TableData";
// import TableItem from "./TableItem";
import { Link } from "react-router-dom";

function LiveMatches() {
  const [data, setData] = useState([]);
  useEffect(() => {
    
    axios.get('http://localhost:5000/games/live', {
      withCredentials: true,
    }).then((res) => {
      setData(res.data);
     
      console.log(res.data);
    }).catch((err) => {
      console.table(err);
      
    })
  },[]);
  return (
    <>
    <div className="settings h-full shadow-[0_4px_4x_rgba(0,0,0,0.25)] rounded-[20px]">
      <div className="px-16 py-8">
        {/* <div>
            {/* <div className="flex justify-between border-b-2 border-white  px-20 text-3xl py-4 items-center">
                <h2>Live Matches</h2>
                <h2>Game modes</h2>
            </div> */}
        <table className="leaderboard_table">
          <thead>
            {/* TABLE HEADINGS */}
            <tr>
              <th>Live Matches</th>
              <th>Game modes</th>
            </tr>
          </thead>
          <tbody>
            {/* TABLE LIST
            {data.map((loopData, index) => {
              
              if(index < 8 )
              return (<TableItem key={index} data={{Matches : index + 1,nameleft : loopData.nameleft, imageleft : loopData.imageleft, sccorlose: loopData.gameswon, lose: loopData.gameslost,avatar : loopData.avatar}} />)

            
            })} */}
          </tbody>
        </table>

            <div className="mt-10">

                {/* Component */}
                <div className="flex mt-2 items-center my-2 h-20 justify-between px-10">

                    <div className="h-full flex gap-24 text-2xl items-center">

                        <div className="flex items-center h-full gap-14">
                            <div className="text-2xl font-bold">
                                User1
                            </div>
                            <div className="h-full flex items-center">
                                <img
                                    className="w-20 h-20 rounded-full m-auto" 
                                    src={avatar_img}
                                    alt="user-img"
                                />
                            </div>
                            <div className="text-3xl">9</div>
                        </div>

                        <div className="text-4xl italic">vs</div>

                        <div className="flex items-center h-full gap-10">
                            <div className="text-3xl">9</div>

                            <div className="flex items-center">
                                <img 
                                    className="w-20 h-20 rounded-full m-auto" 
                                    src={friend_image}
                                    alt="user-img"
                                />
                            </div>
    
                            <div className="text-2xl font-bold ">
                                User2
                            </div>
                        </div>
                    </div>

                    <div className="flex text-2xl gap-4 items-center">
                           <div className="text-3xl px-10">8</div>
                        <button className="bg-blue-400 text-white border-b-2 px-4 py-2 rounded-md">Watch</button>
                    </div>

                </div>
                {/* Component */}



            </div>
        </div>
      </div>
    {/* </div> */}

    </>
  );
}

export default LiveMatches;
