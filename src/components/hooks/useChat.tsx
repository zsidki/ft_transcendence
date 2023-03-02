import {useCallback, useContext, useEffect, useState} from "react";
import {chatContext, chatContextInitialState} from "../../context/chat.context.init";
import socketIOClient, { Socket} from "socket.io-client";
import {Bans, Room, roomType} from "../../chat/interfaces/Room";
import {useAccounts} from "./useAccount";
import {IoMessage} from "../../chat/interfaces/Mssg";
import {fetchAccountService, fetchChatService} from "../../utils/fetchAccountService";
import {account, mapAccount} from "../../interfaces/account.interface";
enum memberRole{
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    BANNED = "BANNED",
    KICKED = "KICKED",
    MUTED = "MUTED",
}

const ChatContextProvider = ({children} :any) => {
    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const [currentRoomId, setCurrentRoomId] = useState<string | undefined>(undefined);
    const [roomsToJoin, setRoomsToJoin] = useState<Room[]>([]);
    const [currentRooms, setCurrentRooms] = useState<Room[]>(chatContextInitialState.currentRooms);
    const [initAccountsInRooms, setInitAccountsInRooms] = useState(true);
    const [roomsMap, setRoomsMap] = useState<Map<string, Room>>(chatContextInitialState.roomsMap);
    const [currentRoom, setCurrentRoom] = useState<Room | undefined>(chatContextInitialState.currentRoom);
    const [noMoreRooms, setNoMoreRooms] = useState<boolean>(false);
    const [error , setError] = useState(false);
    const [ongoingOperation, setOngoingOperation] = useState(false);
    const [ongoingMessageOperation, setOngoingMessageOperation] = useState(false);
    const {isAuthenticated, me, isLoading, accounts, getBulkAccountsByUserId}  = useAccounts();
    const [noMoreRoomsToJoin, setNoMoreRoomsToJoin] = useState(false);
    const [init, setInit] = useState(true);

    // @Todo add usersInfo here
    const mapBans = useCallback((bans: any) => {
        if (!bans)
            return [];
        return bans.map((ban: any) => {
            return {
                id: ban.id,
                endof: Date.parse(ban.endof),
                isMute: ban.isMute,
                UserId: ban.UserId,
                RoomId: ban.RoomId,
            }
        })
    },[]);

    const injectAccounts = useCallback((rooms: Room[]) => {

        const missingAccounts = rooms.map((r) => r.Members)
            .filter((m) => m &&m.length > 0)
            .reduce((m, val) => {
                if (val)
                return m?.concat(val);
                return m;
            },[])?.filter((id: string) => !accounts.find((acc) => acc.Userid === id));



        if (missingAccounts && missingAccounts.length > 0) {

            getBulkAccountsByUserId(missingAccounts)
                .catch((err) => {
                    console.log(err);
                });
        }
        return [...rooms.map((room) => {
            room.membersInfo = accounts.filter((account) => room.Members?.includes(account.Userid));

            if (me && me.Userid && room.Admins?.includes(me?.Userid)) {
                room.isMeAdmin = true;
            }
            // @Todo add user Roles here
            room.membersInfo = room.membersInfo.map((account) => {
                account.isRoomAdmin = room.Admins?.includes(account.Userid);
                account.isRoomOwner = room.Owner === account.Userid;
                const banned = room.banned?.find((ban: Bans) => ban.UserId === account.Userid);
                if (banned) {
                    account.isBanned = !banned.isMute;
                    account.isMuted = true;
                } else {
                    account.isBanned = false;
                    account.isMuted = false;
                }
                if (account.Userid === me?.Userid)
                    room.isMuted = account.isMuted;
                return account;
            });
            if (room.status === roomType.DM)
            {
                const otherAccount = room.membersInfo?.find((account) =>
                    account.Userid !== me?.Userid);
             ///   console.log("otherAccount", otherAccount);
                if (otherAccount) {
                    room.name = otherAccount.username;
                    room.avatar = otherAccount.avatar;
                }
            }
            return room;
        })];


    },[accounts, me, getBulkAccountsByUserId]);

    const mapMessage = useCallback((message: any) => {
        // console.log('mapMessage', message);
        return {
            id: message.id,
            senderId: message.senderId,
            senderInfo:message.senderInfo?  mapAccount(JSON.parse(message.senderInfo)): undefined,
            roomId: message.RoomId,
            time: message.time,
            text: message.text,
        };
    },[]);
    const mapRoom = useCallback((room: any) => {
        let r =  {
            id: room.id,
            name: room.name,
            Members: room.Members,
            status: room.status,
            type: room.status,
            Owner: room.Owner,
            noMoreMessages: false as boolean,
            init: true,
            avatar:undefined,
            isMeAdmin:false,
            Admins: room.Admins,
            messages:[] as IoMessage[],
            banned: mapBans(room.Banned),
            lastMessage: room.LastMessage,
            lastMessageTime: room.LastMessagetime,
            unread: false,
            unreadCount: 0,
            membersInfo: [],
        };
        const roomId = room.id;
        if (!room.messages)
            r.messages = [];
        if (roomsMap.has(roomId)) {
            const oldRoom = roomsMap.get(roomId);
            if (oldRoom && oldRoom.messages) {
                r.messages = oldRoom?.messages || [];
            }
            r.noMoreMessages = oldRoom?.noMoreMessages === undefined ? false : oldRoom.noMoreMessages;
        }
        if (r.messages.length > 0)
            r.init = false;
        return r;
    },[roomsMap, accounts]);

    useEffect(() => {
            if (me && isAuthenticated)
                if (roomsMap.size ==0)
                    setInit(false);
    },[isAuthenticated, isLoading]);

    const appendRoomToBeJoined = useCallback((rooms: any[]) => {
        if (rooms && rooms.length > 0) {
            rooms = rooms.map((room) => mapRoom(room));
            setRoomsToJoin((prevRooms) => {
                prevRooms = prevRooms.filter((r) =>
                    rooms.find((room) => room.id === r.id) === undefined);
                return [...prevRooms, ...rooms].filter((r) => r.status !== roomType.DELETED && !r.Members?.includes(me?.Userid));
            });
        }
    },[roomsToJoin]);

    useEffect(() => {
        if (roomsMap.size > 0)
        {
            setRoomsMap((prevRooms) => {
                // @ts-ignore
                let rooms = [...prevRooms.values()];
                 rooms = rooms.filter((room) => {
                         if (room.type === roomType.DM)
                         {
                             const otherUserId = room.Members?.find((id : string) => id !== me?.Userid);
                             if (otherUserId && me?.blocker.find((acc) => acc.Userid === otherUserId)) {
                                if (currentRoomId == room.id)
                                    setCurrentRoomId(undefined);
                                 return false;
                             }
                         }
                         return true;
                     }).map((room) => {
                         const blockedUesrsInRoom = room.Members?.filter((id : string) => me?.blocker.find((acc) => acc.Userid === id));
                         if (blockedUesrsInRoom && blockedUesrsInRoom.length > 0)
                         {
                                room.Members = room.Members?.filter((id : string) => !blockedUesrsInRoom.includes(id));
                                room.membersInfo = room.membersInfo?.filter((acc: account) => !blockedUesrsInRoom.includes(acc.Userid));
                         }
                         return room;
                     });
                return new Map(rooms.map((room) => [room.id, room]));
            });
        }
    },[me, currentRoomId]);

    const appendRoom = useCallback((data: any[], myId: string) => {

        if (data && data.length > 0) {
       
            data = data.map((room) => mapRoom(room));
          ///  console.log("appendRoo m before", data);
            
            /// console.log("userID, ", me)
            const roomsToDelete = data.filter((room) => room.Members?.includes(myId) === false);
             // @ts-ignore
            data = data.filter((r: Room) => r.Members?.includes(myId));
            if (roomsToDelete.length > 0) {
                setCurrentRooms((prevRooms) => {
                    return prevRooms.filter((room) => roomsToDelete.find((r) => r.id === room.id) === undefined
                        ||room.status === roomType.DELETED);
                });
                roomsToDelete.map((room) => {
                    if (roomsMap.has(room.id)) {
                        roomsMap.delete(room.id);
                    }
                    if (room.id == currentRoomId) {
                        setCurrentRoomId(undefined);
                    }
                });
            }

           let prevRooms = currentRooms?.filter((r ) =>
               data.find((room) => room.id == r.id)
                == undefined);

          prevRooms = [...prevRooms, ...data];
          prevRooms = prevRooms.filter((r) => {
              const ban = r.banned?.find((b) => b.id == myId)
                if (!ban)
                    return true;
                if (ban.isMute)
                {
                    r.isMuted = true;
                    return true;
                }
                return false;
          });

          // @TODO set ownership flags inside  members
            if (currentRoomId === data[0].id)
                setCurrentRoom(data[0]);
            setRoomsToJoin((prevRooms) => {
                prevRooms = prevRooms.filter((r) =>
                data.find((room) => room.id === r.id) === undefined);
                return [...prevRooms];
            });
            setRoomsMap((prev) => {
                prevRooms.map((room) => {
                    if (room && room.id)
                        prev.set(room.id, room);
                });
                return new Map(prev);
            });

        }
    },[ isAuthenticated, currentRoomId, mapRoom ]);

 const addSingleMessageToRoom = useCallback((room: Room| undefined , message: IoMessage) =>{
        if (room && room.id && message && message.id) {
                if (!room.messages)
                    room.messages = [message];
                else {
                    room.messages = room.messages.filter((m) => m.id != message.id);
                    room.messages.push(message);
                }
                if (room.unreadCount && room.id !== currentRoomId) {
                    room.unreadCount++;
                    room.unread = true;
                } else if (room.id !== currentRoomId) {
                    room.unreadCount = 1;
                    room.unread = true;
                }
                room.init = false;
                room.messages = room.messages.sort(
                    (a, b) =>
                        // @ts-ignore
                        Date.parse(b.time) - Date.parse(a.time));
                return room;
        }
        return undefined;
    },[currentRoomId])

    const addMessagesToRoom = useCallback((data: any[]) => {
        //console.log(data);
        if (data && data.length > 0) {
            //console.log(data);
            const room = data.map((msg) => {
                const message = mapMessage(msg);
                const roomId = message.roomId;
                return addSingleMessageToRoom(roomsMap.get(roomId), message);

            }).reduce((r, val) => val, undefined);

          ///  console.log('room = ' ,room)

            // console.log(room.messages);
            if (room && room.id) {
                if (room.messages && room.messages.length > 0) {
                    room.lastMessage = room.messages[0].text;
                    room.lastMessageTime = room.messages[0].time;
                }
                setRoomsMap((prev) => {
                    // @ts-ignore
                    prev.set(room.id, room);
                    return new Map(prev);
                });
            }
        }
    },[roomsMap,addSingleMessageToRoom]);

    useEffect(() => {
        if (isAuthenticated && !socket) {
            const s = socketIOClient(`${process.env.REACT_APP_CHAT_WS_URL}`, {
                transports: ["websocket"],
                auth:{
                    token: 'Bearer ' +  sessionStorage.getItem("token"),
                },
                extraHeaders: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                },
                withCredentials: true,

            }).on("connect", () => {
                setSocket(s);
            });
        }

        return () => {
            console.log("socket closed");
            if (socket) {
                socket.disconnect();
                setSocket(undefined);
            }
        }
    }, [socket, isAuthenticated, me]);



   const updateRoom = useCallback(( room: Room, type:roomType, pass: string) => {
        if (ongoingOperation)
            return;
        setOngoingOperation(true);
            setError(false);
        if (room && room.id) {
            fetchChatService('room/'+room.id, 'POST', true , {
                type: type,
                password: pass,
            }).then((data) => {
                if (data && data.id) {
                    setRoomsMap((prev) => {
                        prev.set(data.id, data);
                        return new Map(prev);
                    });
                }
                setError(false);
                setOngoingOperation(false);
            }).catch((err) => {
                setOngoingOperation(false);
                setError(true);
                });
        }
    },[]);
      const updateMemberRole = useCallback((roomId: string,
                                            userId: string,
                                            role: memberRole,
                                            password = undefined as unknown as string) => {
          if (ongoingOperation) return ;
          setOngoingOperation(true);
          setError(false);
          fetchChatService(`member-role/${roomId}?userId=${userId}&role=${role}`,
              "POST",
              true,
              {
                    password: password,
              })
              .then((res) => {
                  setOngoingOperation(false);
                  setError(false);
              }).catch((err) => {
                setOngoingOperation(false);
              setError(true);
          });
      },[ongoingOperation]);

      const getRoomById = useCallback( (roomId: string, isDM =0) => {
          if (ongoingOperation) return ;
          setOngoingOperation(true);
          setError(false);
          fetchChatService(`room/${roomId}?isDM=${isDM}`)
              .then((res) => {
                  appendRoom([res], me?.Userid || '');
                  setCurrentRoomId(res.id);
                  setOngoingOperation(false);
                  setError(false);
              }).catch((err) => {
              setOngoingOperation(false);
              setError(true);
          });
      },[appendRoom, ongoingOperation, me]);

    const getRooms = useCallback (async (take:number , skip: number) => {
        if (ongoingOperation) return ;
        setOngoingOperation(true);
        //console.log("getRooms");
       await fetchChatService(`rooms?total=${take}&skip=${skip}`)
            .then((res) => {
                //console.log('ne room ' , res);
                if (res && res.length > 0) {
                    appendRoom(res,me?.Userid || '');
                }
                else
                    setNoMoreRooms(true);
                setOngoingOperation(false);
                setError(false);
            }).catch((err) => {
               // console.log(err);
            setOngoingOperation(false);
            setError(true);
        });
    },[me]);

      const getMessagesByRoomId = useCallback( (roomId: string,force =false, take:number , skip: number) => {
            if (ongoingMessageOperation) return;
            setOngoingMessageOperation(true);
          fetchChatService(`messages/${roomId}?total=${take}&skip=${skip}`)
              .then((res) => {
               ///   console.log('ne message ' , res);
                  if (res && res.length > 0) {
                   ///  console.log("messages", res);
                      addMessagesToRoom(res)
                  }
                  else
                  {
                        const room = roomsMap.get(roomId);
                        if (room) {
                            room.noMoreMessages = true;
                            setRoomsMap((prev) => {
                                prev.set(roomId, room);
                                return new Map(prev);
                            });
                        }
                  }
                  setOngoingMessageOperation(false);
                  setError(false);
              }).catch((err) => {
              setOngoingMessageOperation(false);
              setError(true);
          });
      },[ongoingMessageOperation]);

      const joinRoom= useCallback( (roomId: string, password : string) => {
           updateMemberRole(roomId, me?.Userid || '', memberRole.MEMBER, password);
      },[updateMemberRole, me]);
      const leaveRoom= useCallback((roomId: string) => {
          updateMemberRole(roomId, me?.Userid || '', memberRole.KICKED);
      },[updateMemberRole, me]);
      const banUser= useCallback( (roomId: string, userId: string) => {
          updateMemberRole(roomId, userId , memberRole.BANNED);
      },[updateMemberRole]);
      const kickUser= useCallback((roomId: string, userId: string) => {
          updateMemberRole(roomId, userId , memberRole.KICKED);
      },[updateMemberRole]);
        const muteUser= useCallback((roomId: string, userId: string) => {
            updateMemberRole(roomId, userId , memberRole.MUTED);
        },[updateMemberRole]);

    const makeAdmin= useCallback((roomId: string, userId: string) => {
        updateMemberRole(roomId, userId , memberRole.ADMIN);
    },[updateMemberRole]);
 const moreRoomsToJoin = useCallback( async () => {
     if (noMoreRoomsToJoin) return;
     return new Promise((resolve, reject) => {
         fetchChatService('rooms-to-join?total=10&skip=' + roomsToJoin.length)
                .then((res) => {

                    if (res && res.length > 0) {
                            appendRoomToBeJoined(res);
                    
                    }else
                        setNoMoreRoomsToJoin(true);
                })
             .catch(
                    (err) => {
                        reject(err);
                    }
             )
     });
 },[roomsToJoin]);

    const createRoom= useCallback( (room: Room) => {
        if (ongoingOperation) return ;
        setOngoingOperation(true);
        setError(false);
        fetchChatService(`room`,
            "POST",
            true,
            room)
            .then((res) => {
                appendRoom([res],me?.Userid || '');
             //   console.log("room created", res);
                setOngoingOperation(false);
                setError(false);
            }).catch((err) => {
            setOngoingOperation(false);
            setError(true);
        });
    },[ongoingOperation,appendRoom, me]);
    const sendMessage= useCallback( (message: IoMessage) => {
        if (!socket) return ;
        socket.emit("message", message);
    },[socket]);

    useEffect(() => {
        if (isAuthenticated && me && (roomsMap.size === 0 || !init)) {
            console.log("init");
            getRooms(10, 0).then(()=>{
                setInit(true);
            });
            moreRoomsToJoin().catch((err) => {
                console.log(err);
            });
        }
    },[init, isAuthenticated, me, getRooms, roomsMap]);
    const moreRooms = useCallback(() => {
        getRooms(10, roomsMap.size)
            .then(() => {

        });


    },[getRooms, roomsMap]);
    const moreMessagesByRoomId = useCallback((roomId: string) => {
        if (roomsMap.has(roomId)) {
            const room = roomsMap.get(roomId);
            if (room && !room.noMoreMessages ) {
                getMessagesByRoomId(roomId, false,10, room.messages?.length || 0);
            }
        }
    },[getMessagesByRoomId, roomsMap]);


    useEffect(() => {

        // @ts-ignore
        setCurrentRooms(injectAccounts([...roomsMap.values()])
            .map((room) => {
                if (!room.noMoreMessages && room.init && room.id)
                     getMessagesByRoomId(room.id, false,10, 0);
                // else if (room.messages && room.messages.length > 0) {
                //     room.messages =  room.messages.filter((message) => {
                //         return !me?.blocked.find((a) => a.Userid === message.senderId);
                //
                //     });
                // }
                return room;
            }).sort((a, b) =>{
                if (a.lastMessageTime && b.lastMessageTime)
                    return Date.parse(b.lastMessageTime) -  Date.parse(a.lastMessageTime);
                return 0;
            }));

    },[roomsMap]);

    useEffect(() => {
        //console.log("current room", currentRoomId);
        if (!socket ) return ;
        if (!currentRoomId) {
            setCurrentRoom(undefined);
            return;
        }
        // @ts-ignore
      if (roomsMap.has(currentRoomId)) {
            const room = roomsMap.get(currentRoomId);
            if (room) {
                room.unread = false;
                room.unreadCount = 0;
            }
          setCurrentRoom(room);
      }else {
          getRoomById(currentRoomId, 0);
      }
    },[socket, currentRoomId, roomsMap, getRoomById, accounts, me]);

    useEffect(() => {
        if(!socket) return ;

        socket.on('rooms', (r) => appendRoomToBeJoined([r]));
        socket.on('room-update',(r) => {
            appendRoom([r], me?.Userid || '')
        });

        return () => {
            socket.off('room-update');
            socket.off('rooms');
        }
    },[socket,appendRoom,appendRoomToBeJoined, me]);

    useEffect(() => {
        if(!socket) return ;
       //console.log("route ", me?.Userid);
        socket.on(`message-${me?.Userid}`,(m : any) => {
           // console.log("message received", m);
            addMessagesToRoom([m]); } );
        return () => {
            socket.off(`message-${me?.Userid}`);
        }
    },[socket, me, addMessagesToRoom]);

    return <chatContext.Provider
        value={{
            roomsToJoin: roomsToJoin,
            currentRooms: currentRooms,
            roomsMap: roomsMap,
            currentRoom: currentRoom,
            error: error,
            updateRoom: updateRoom,
            setCurrentRoomId: setCurrentRoomId,
            isLoading: ongoingOperation,
            moreRooms: moreRooms,
            noMoreRoomsToJoin: noMoreRoomsToJoin,
            moreRoomsToJoin: moreRoomsToJoin,
            getRoomById: getRoomById,
            noMoreRooms: noMoreRooms,
            muteUser: muteUser,
            moreMessagesByRoomId: moreMessagesByRoomId,
            joinRoom: joinRoom,
            leaveRoom: leaveRoom,
            makeAdmin: makeAdmin,
            banUser: banUser,
            kickUser: kickUser,
            createRoom: createRoom,
            sendMessage: sendMessage,


        }}>
        {children}
    </chatContext.Provider>
}

const useChat  = () => {
    return useContext(chatContext);
}


export { useChat , ChatContextProvider};