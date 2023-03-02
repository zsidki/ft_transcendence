import {useCallback, useContext, useEffect, useRef, useState} from "react";

import "../index.css"
import { useNavigate, useSearchParams } from "react-router-dom";

import {useGame} from "../components/hooks/useGame";
import Canva from "./components/playing/canva";
import {useAccounts} from "../components/hooks/useAccount";
import {account} from "../interfaces/account.interface";
import Play from "./components/playing/canva/play";

const mode1 = require('../images/mode_1.png') as string;
const mode2 = require('../images/mode_2.png') as string;
const mode3 = require('../images/mode_3.png') as string;
const mode4 = require('../images/mode_4.png') as string;
const mode5 = require('../images/mode_5.png') as string;
const mode6 = require('../images/mode_6.png') as string;
const youwin = require('../images/you_win.jpeg') as string;
const youlost = require('../images/you_lose.jpeg') as string;
const gameover = require('../img/gameOver.jpeg') as string;

const Game = () => {
    // const navigate = useNavigate();
    // const socket = useRef(null as null | Socket);
    // const [gameState, setGameState] = useState(null as null | GameState);
    // const [state, setState] = useState("waiting");
    // const [ingame, setGame] = useState(false);
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const {currentGameId, gameState, joinPool, isInGame, cancelGame, clear} = useGame();

    const [player1, setPlayer1] = useState<account | undefined>(undefined);
    const [player2, setPlayer2] = useState<account | undefined>(undefined);
    const {me, accounts,isAuthenticated, isLoading} = useAccounts();
    const navigate = useNavigate();


    useEffect(() => {
    if (gameState?.players && gameState.players.length === 2) {
        setPlayer1(accounts.find((acc) => acc.Userid === gameState.players[0]));
        setPlayer2(accounts.find((acc) => acc.Userid === gameState.players[1]));
    }
    },[gameState?.players]);

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            if (!currentGameId && !gameState && searchParams.get("mod")) {
                const mod = searchParams.get("mod");
                if (mod && mod.length > 0) {
                    console.log("join pool");
                    // clear();
                    // setTimeout(() => {
                    joinPool(mod);
                    setLoading(true);
                    // }, 1000);
                }
            } else if (!gameState && !currentGameId)
                navigate("/gamesettings");
        }

    },[gameState, currentGameId, isAuthenticated, isLoading]);



    if (gameState && (gameState.state === "waiting"))
        return (
            <Loading/>
        )





    if (gameState && ( gameState.state == "endGame" || gameState.state == "disconnect")) // youwinimg
    {

if (!gameState.players.includes(me?.Userid || ''))
            return (
                <div className="game">
                    {/* <h1>Game Over</h1> */}
                    <div className="settings h-full shadow-[0_4px_4x_rgba(0,0,0,0.25)] rounded-[20px]">
                        <div className="px-16 py-8">
                            <table className="leaderboard_table">
                                <thead>
                                <tr>
                                    <th>Game has ended</th>
                                </tr>
                                </thead>
                                <div className="justify-center items-center flex flex-col w-full">
                                    <img src={gameover} className= " ml-0 mr-0 mt-10 w-[600px] h-[400px] rounded-lg object-cover" />
                                    <button className="mt-10 bg-blue-500 w-[250px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                                        navigate("/live");
                                    }}>Back to lobby</button>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>

            );
            
        return (<div className="game">
            {/* <h1>Game Over</h1> */}
            <div className="settings h-full shadow-[0_4px_4x_rgba(0,0,0,0.25)] rounded-[20px]">
            <div className="px-16 py-8">
                <table className="leaderboard_table">
                <thead>
                    <tr>
                    <th>Game Over</th>
                    </tr>
                </thead>
                    {/* <h2>{true ? "You won!" : "You lost!"}</h2> */}
                    {
                        gameState.winner == me?.Userid?
                            <img src={youwin} className= " ml-0 mr-0 mt-10 w-[600px] h-[400px] rounded-lg object-cover" />
                            : <img src={youlost} className= " ml-0 mr-0 mt-10 w-[600px] h-[400px] rounded-lg object-cover" />
                    }
                    <div className="justify-center items-center flex flex-col w-full">
                    <div className= "ml-0 mr-0 mt-10 rounded-lg object-cover"></div>
                    <button className="mt-10 bg-blue-500 w-[250px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                        cancelGame(currentGameId ||'');
                        navigate("/gamesettings")
                    }}>Play Again</button>
                        <button className="mt-10 bg-blue-500 w-[250px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => {
                            cancelGame(currentGameId ||'');
                            navigate("/gamesettings")
                            navigate("/");
                        }}>back</button>
                    </div>
                    </table>
                </div>
            </div>
        </div>);
 
    }
   // if (gameState && (gameState.state === "start-requried" || gameState.state === "play"
   //     || gameState.state === "scored" || gameState.state === "endRound"))
    if (gameState)
        return (

            <>
              <div  style={{margin: 'auto'}} >

                  <div className="game">
                      <div className="settings mt-10 h-full shadow-[0_4px_4x_rgba(0,0,0,0.25)] rounded-[20px]">
                          <div className="px-16 py-8">
                              <table className="leaderboard_table">
                                  <thead>
                                  <tr>
                                      <th>score</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                  <tr>
                                      <div className="flex flex-row gap-5 w-full justify-around items-center text-white font-bold ">
                                          <div className="flex flex-col  justify-center mt-6 gap-4">
                                              <ul className="text-xl">{player1?.username}</ul>
                                              <div className="flex flex-row justify-center gap-5 "  >
                                                  <div className="flex-col flex items-center ">
                                                      <ul>points</ul>
                                                      <ul className="text-3xl">{gameState?.scores[0]}</ul>
                                                  </div>
                                                  <div className="flex-col flex items-center ">
                                                      <ul>roundsWin</ul>
                                                      <ul className="text-3xl">{gameState?.scores[1]}</ul>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="flex flex-row justify-center text-2xl">
                                              <ul>rounds:  {gameState?.roundsWin[0] + gameState?.roundsWin[1]}</ul>
                                          </div>
                                          <div className="flex flex-col  justify-center mt-6 gap-4">
                                              <ul className="text-xl">{player2?.username}</ul>
                                              <div className="flex flex-row justify-center gap-5 "  >
                                                  <div className="flex-col flex items-center ">
                                                      <ul>points</ul>
                                                      <ul className="text-3xl">{gameState?.scores[1]}</ul>
                                                  </div>
                                                  <div className="flex-col flex items-center ">
                                                      <ul>roundsWin</ul>
                                                      <ul className="text-3xl">{gameState?.roundsWin[1]}</ul>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
                  {/*<Play>*/}

                  {/*</Play>*/}
               <Canva
                           width={1000}
                           height = {800}
                       />

              </div>
             </>
        )

     return (
        <Loading/>
    )

    
};
export function GameOptions(props: {}) {
    const navigate = useNavigate();
    const [inviteTo, setInviteTo] = useState<string | null | undefined>(undefined);
    const [searchParams] = useSearchParams();
    const { inviteToGame ,gameState } = useGame();

    useEffect(() => {
        if (searchParams.get("invite")) {
            setInviteTo(searchParams.get("invite"));
        }
    },[]);

    const handleModeChange = useCallback((mode : string) => {
            if (inviteTo && inviteTo.length > 0 && mode && mode.length > 0) {
                    inviteToGame(inviteTo, mode);
            }else if (mode && mode.length > 0)
            {
                navigate("/game?mod=" + mode);
            }

    },[inviteTo, inviteToGame]);
    useEffect(() => {
        if (gameState)
            navigate("/game");
    },[gameState]);
    return (

        <div className="flex flex-wrap justify-center min-w-[500px] grid-row-3 items-center">
            {/* <table className="leaderboard_table text-8xl font-mono"> */}
            <table className="title_mode leaderboard_table text-5xl font-mono">
                <tr>
                    <th className="mb-20">Game Mode</th>
                </tr>
            </table>

            {/* <div className="m-5 "> */}
            <div className="md:w-[350px] overflow-hidden m-5 group game_mode p-4 relative text-center cursor-pointer fd-cl hover:bg-indigo-700 rounded-lg transition-colors duration-200 animate-shake"
                 onClick={()=>handleModeChange("1")}>
                <div className="absolute z-[999] opacity-0 group-hover:opacity-100 bg-opacity-80 h-full w-full inset-0 bg-black flex justify-center items-center">
                    <h2 className="text-sm">Use W to move up and s to move down, first player to score 2 points wins the game</h2>
                    {/*<h1>Use W to move up and s to move down, first player to score 2 points wins the game</h1>*/}
                </div>
                <div className="relative z-10">
                    <ul className="game_mode_text text-xl font-mono">Classic Rush</ul>
                    <img className="w-190 h-70" src={mode1}  />
                </div>
            </div>

            <div className="md:w-[350px] overflow-hidden m-5 group game_mode p-4 relative text-center cursor-pointer fd-cl hover:bg-indigo-700 rounded-lg transition-colors duration-200 animate-shake"
                 onClick={()=>handleModeChange("2")}>
                <div className="absolute z-[999] opacity-0 group-hover:opacity-100 bg-opacity-80 h-full w-full inset-0 bg-black flex justify-center items-center">
                    <h2 className="text-sm">Use WASD keys to move in all directions, first player to score 2 points wins the game</h2>
                </div>
                <div className="relative z-10">
                    <ul className="game_mode_text text-xl font-mono">Dimentional Rush</ul>
                    <img className="w-190 h-70" src={mode2}  />
                </div>
            </div>

            <div className="md:w-[350px] overflow-hidden m-5 group game_mode p-4 relative text-center cursor-pointer fd-cl hover:bg-indigo-700 rounded-lg transition-colors duration-200 animate-shake"
                 onClick={()=>handleModeChange("3")}>
                <div className="absolute z-[999] opacity-0 group-hover:opacity-100 bg-opacity-80 h-full w-full inset-0 bg-black flex justify-center items-center">
                    <h2 className="text-sm">Use WASD keys to move in all directions,first player to score 2 points win, but after every point scored the direction gets reversed, good luck beating it </h2>
                </div>
                <div className="relative z-10">
                    <ul className="game_mode_text text-xl font-mono">MAYHEM Rush</ul>
                    <img className="w-190 h-70" src={mode3}  />
                </div>
            </div>

            <div className="md:w-[350px] overflow-hidden m-5 group game_mode p-4 relative text-center cursor-pointer fd-cl hover:bg-indigo-700 rounded-lg transition-colors duration-200 animate-shake"
                 onClick={()=>handleModeChange("4")}>
                <div className="absolute z-[999] opacity-0 group-hover:opacity-100 bg-opacity-80 h-full w-full inset-0 bg-black flex justify-center items-center">
                    <h2 className="text-sm">Use W to move up and s to move down, first player to win 2 rounds wins the game</h2>
                </div>
                <div className="relative z-10">
                    <ul className="game_mode_text text-xl font-mono">Masakr bengerir </ul>
                    <img className="w-190 h-70" src={mode4}  />
                </div>
            </div>

            <div className="md:w-[350px] overflow-hidden m-5 group game_mode p-4 relative text-center cursor-pointer fd-cl hover:bg-indigo-700 rounded-lg transition-colors duration-200 animate-shake"
                 onClick={()=>handleModeChange("5")}>
                <div className="absolute z-[999] opacity-0 group-hover:opacity-100 bg-opacity-80 h-full w-full inset-0 bg-black flex justify-center items-center">
                    <h2 className="text-sm">Use WASD keys to move in all directions, first player to win 2 rounds wins the game</h2>
                </div>
                <div className="relative z-10">
                    <ul className="game_mode_text text-xl font-mono">Gubba nub nub doo rah kah.</ul>
                    <img className="w-190 h-70" src={mode5}  />
                </div>
            </div>



            <div className="md:w-[350px] overflow-hidden m-5 group game_mode p-4 relative text-center cursor-pointer fd-cl hover:bg-indigo-700 rounded-lg transition-colors duration-200 animate-shake"
                 onClick={()=>handleModeChange("6")}>
                <div className="absolute z-[999] opacity-0 group-hover:opacity-100 bg-opacity-80 h-full w-full inset-0 bg-black flex justify-center items-center">
                    <h2 className="text-sm">Use WASD keys to move in all directions, first player to win 2 rounds wins the game</h2>
                </div>
                <div className="relative z-10">
                    <ul className="game_mode_text text-xl font-mono">wubba lubba dub dub.</ul>
                    <img className="w-190 h-70" src={mode6}  />
                </div>
            </div>


            {/* </div> */}
        </div>
    )
}



const Loading: React.FC = () => {
 const {currentGameId , cancelGame} = useGame();
 const navigate = useNavigate();
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50  flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4  h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
            <p className="w-[350px] text-center text-white">Waiting for player, This may take a few seconds...</p>
            <button className="bg-red-500 text-white p-2 rounded-lg mt-4" onClick={() => {
                cancelGame(currentGameId ||'');
                navigate("/gamesettings")
            }}>Close</button>
        </div>
      )
}

export default Game;


function componentWillUnmount() {
    throw new Error("Function not implemented.");
}

