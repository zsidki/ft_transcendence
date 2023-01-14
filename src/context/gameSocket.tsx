import { createContext } from "react";
import socketIOClient from "socket.io-client";

// const initialState ={
//     socket,
//     playGame=>{},
//     exitGame()=>{}
// }

const gamesocket = socketIOClient("http://e2r10p3.1337.ma:6001", {
    transports: ["websocket"],  
    withCredentials: true,
    });
    
    const GameSocketContext = createContext(gamesocket);
    export default GameSocketContext;