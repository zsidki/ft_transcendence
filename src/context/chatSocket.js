import { createContext } from "react";
import socketIOClient from "socket.io-client";

const socket  = socketIOClient(`${process.env.REACT_APP_ACCOUNT_WS_URL}chat`, {
  transports: ["websocket"],
  extraHeaders: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

const chatSocketContext = createContext(socket);

export default chatSocketContext;

