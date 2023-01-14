import { createContext } from "react";
import socketIOClient from "socket.io-client";

const socket  = socketIOClient(`${process.env.REACT_APP_API_URL}/user`, {
  transports: ["websocket"],
  withCredentials: true,
});

const UserSocketContext = createContext(socket);

export default UserSocketContext;

