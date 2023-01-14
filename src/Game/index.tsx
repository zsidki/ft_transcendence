import { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Waiting from "./components/waiting";
import { GameState } from "./utils/models";
import Play from "./components/playing";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Card, unstable_createMuiStrictModeTheme } from "@mui/material";
import Select from '@mui/material/Select';
import UserSocketContext from "../context/userSocket";

const Game = () => {
    const navigate = useNavigate();
    const socket = useRef(null as null | Socket);
    const gameState = useRef(null as null | GameState);
    const [state, setState] = useState("waiting");
    const [ingame, setGame] = useState(false);
    const [searchParams] = useSearchParams();
    const [error, setError] = useState({ is: false, message: "" } as { is: boolean, message: string });
    const [notpicked, setNotPicked] = useState(false);
    const spect = searchParams.get("spect");
    const mod = searchParams.get("mod");
    const duel = searchParams.get("duel");
    const [mode, setMode] = useState("1");
    const [backdrop, setBackdrop] = useState(false);
    const userSocket = useContext(UserSocketContext);
    
    //const socket = useContext(GameSocketContext);
    // const spect = "1";
   
    
    // const mod = "1";
    // useEffect(()=>{

    //     if(ingame === true)
    //     {   
    //         console.log("ingame", ingame)
    //         // userSocket?.emit("Ingame");
    //     }
    // }, [ingame]);
    const location = useLocation();


    useEffect(()=> {
        socket.current = io("http://sharks.obens.so:6001",{
            transports: ['websocket'],
            withCredentials: true,
            extraHeaders: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).on("connect", () => {
        
            if (duel) {
            
                socket.current?.emit("test", {
                    input: "1"
                });
                socket.current?.emit("joinduel", duel, (data: any) => {
            
                });
            
            
            }
            else if (spect) {
                socket.current?.emit("test", {
                    input: "2"
                });
                //socket.emit("spectJoined", {gameId : spect});
                socket.current?.emit("spectJoined", { input: spect }, (data: any) => {
                    if (data.error) {
                        setError({ is: true, message: data.error });
                    }
                });
            
            }
            else if (mod) {
                console.log("emmited");
                socket.current?.emit("test", {
                    input: "3"
                });
                
                console.log("player " + socket.current?.id + " trying to play");
                socket.current?.emit("playerJoined", { input: mod }, (data: any) => {
            
                    setGame(true);
                    setState("play");
                    console.log("holaa")
                    if (data.error) {
                       
                        setError({ is: true, message: data.error });
                    }
                    else {
            
            
                        setState("play");
                    }
                })
            }
            else {
                alert("aaa")
            
                socket.current?.emit("test", {
                    input: "4"
                });
                setNotPicked(true);
                setBackdrop(true);
            }
            socket.current?.on("gameState", (data: GameState) => {
                
                if (state == "waiting") {
                    setState("play");
            
                }
                gameState.current = data;
            });
        return () => {
            console.log("disconnected");
            socket.current?.emit("disconnect");
            socket.current?.removeAllListeners();
            socket.current?.close();
            
        }
    });
}, []);


   let page;


       if(state === "play")
       {
           page = <div>
               <p>GAME IS UNDER</p>
                   <Play
                   socket = {socket} 
                   gameState = {gameState}
                   />
           </div> 
       }
       else
       {
           page = <>WaitinG</>
       }
       if(error.is)
       {
           page = <div>
               <p>error {error.message}</p>
           </div>
       }
       if(notpicked)
       {

           return <GameOptions/>
       }


       return <>{page}</>
       
    
};



export function GameOptions(props: {}) {
    const [mode, setMode] = useState("1");
    const navigate = useNavigate();

    return (
        <div>

            <p>
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                    <Card sx={{ minWidth: 275, minHeight: 300 }}>
                        <Stack direction="column">
                            select a mode
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mode}
                                label="Age"
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                            <Button onClick={(e) => {
                                //setBackdrop(false); 
                                // navigate(-1)
                            }} size="small">CANCEL</Button>
                            <Button size="small" onClick={(e) => {
                                //  handlegame()
                                navigate("/game?mod=" + mode);

                            }} >submit</Button>
                        </Stack>
                    </Card>

                </Backdrop>
            </p>
        </div>
    )
}


export default Game;


function componentWillUnmount() {
    throw new Error("Function not implemented.");
}

