import {createContext} from "react";
import {Room,roomType} from "../chat/interfaces/Room";
import {IoMessage} from "../chat/interfaces/Mssg";



const  chatContextInitialState = {
    currentRooms: [] as Room[],
    roomsToJoin: [] as Room[],
    roomsMap: new Map<string, Room>(),
    currentRoom: undefined as Room | undefined,
    isLoading: false,
    error: false,
    setCurrentRoomId: (roomId: string | undefined) => {},
    // getRooms: (take:number , skip: number) => {},
    moreRooms: () => {

    },
    noMoreRooms: false,
    noMoreRoomsToJoin: false,
    moreRoomsToJoin: () => {

    },
    getRoomById: (roomId: string, isDm = 0) => {},
    moreMessagesByRoomId: (roomId: string) => {},
    sendMessage: (message: IoMessage) => {},
    createRoom: (room: Room) => {},
    updateRoom: (room: Room, type: roomType, pass: string) => {},
    joinRoom: (roomId: string, password : string) => {},
    makeAdmin: (roomId: string, userId: string) => {},
    leaveRoom: (roomId: string) => {},
    muteUser: (roomId: string, userId: string) => {},
    banUser: (roomId: string, userId: string) => {},
    kickUser: (roomId: string, userId: string) => {},
}

const chatContext = createContext(chatContextInitialState);

export {chatContext, chatContextInitialState}