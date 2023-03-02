import * as React from "react";
import {useEffect, useState} from "react";

import "../../index.css"

import  TopButton from "../../chat/TopButton"
import { Link } from "react-router-dom";
import {useGame} from "../hooks/useGame";
const avatar_img = require('../../images/avatar_img.png') as string;
const friend_image = require('../../images/user_img2.png') as string;
const play = require('../../img/play.svg').default as string;

const Match = (props: any) =>{
    const {spectateGameId ,clear} = useGame();
    const {game} = props;
    useEffect(()=>{
        clear();
    },[]);

  return(
    <>
    <div className="flex items-center h-[100px] justify-center w-full gap-14">

        <div className="flex items-center h-full gap-14">
            <div className="h-full flex items-center">
                <img
                    className="w-[50px] h-[50px]  max-w-none rounded-full" 
                    src={game.player1Info?.avatar || avatar_img}
                    alt="user-img"
                />
            </div>
            <div className="text-12 font-bold">
                {game.player1Info?.username || 'random love i shit'}
            </div>
            <div className="text-12">{game.score1}</div>
        </div>

        <div className="text-20 italic">vs</div>

        <div className="flex items-center h-full gap-10">
            <div className="text-12">{game.score2}</div>

            <div className="text-12 font-bold ">
                {game.player2Info?.username || 'random love i shit'}
            </div>

            <div className="flex items-center">
                <img 
                    className="w-[50px] h-[50px] max-w-none rounded-full" 
                    src={game.player2Info?.avatar || avatar_img}
                    alt="user-img"
                />
            </div>
        </div>

    <div className="flex text-15 gap-4 items-center">
    <TopButton src={play} s_padding={{padding: '8px 18px'}} onClick={()=>{
        spectateGameId(game.id)
    }}/>
  
          
    </div>
    </div>
    </>
  )
}


function LiveMatches() {
  const {liveGames} = useGame();
    if (!liveGames ||(liveGames && liveGames.length  === 0))
        return (<div className="flex justify-center items-center h-full w-full text-2xl">No live games</div>);

    return (
    <>
    <div className="settings h-full shadow-[0_4px_4x_rgba(0,0,0,0.25)] rounded-[20px]">
      <div className="px-16 py-8">
        <table className="leaderboard_table">
          <thead>
            <tr>
              <th>Live Matches</th>
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
          {liveGames.map((game: any) => (
            <div className="mt-10">
                <Match game={game} />
            </div>
))}
        </div>
      </div>

    </>
  );
}

export default LiveMatches;
