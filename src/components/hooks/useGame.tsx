import {gameContext, gameContextInitState} from "../../context/game.context.init";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {GameState} from "../../Game/utils/models";
import socketIOClient, {Socket} from "socket.io-client";
import {useAccounts} from "./useAccount";
import {useNavigate} from "react-router-dom";
import {userStatus} from "../../interfaces/account.interface";
import {useSnackbar} from "notistack";

const GameProvider = ({ children } : {children : any}) => {

    const [socket, setSocket] = useState<Socket | undefined>(undefined);
    const [gameState, setGameState] = useState<GameState | undefined>(gameContextInitState.gameState);
    const [liveGames, setLiveGames] = useState(gameContextInitState.liveGames);
    const [isInGame, setIsInGame] = useState(false);
    const [isMePlayer, setIsMePlayer] = useState(true);
    const [currentGameId, setCurrentGameId] = useState<string | undefined>(undefined);
    const {getBulkAccountsByUserId, accounts, updateMyStatus} = useAccounts();
    const navigate = useNavigate();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [inviteFromUser, setInviteFromUser] = useState({
        id: undefined as string | undefined,
        p1: undefined as string | undefined,
        p2: undefined as string | undefined,
        mode: undefined as string | undefined,
    });
    const [pendingInvitation, setPendingInvitation] = useState<any>(
        undefined
    );
    const { me , isAuthenticated}  = useAccounts();


    const addLiveGame = useCallback((data: any[]) => {

        const live = data.map((game) => {
            return {
                id: game.id,
                p1: game.p1,
                p2: game.p2,
                score1: game.score2,
                score2: game.score2,
                round1: game.round1,
                round2: game.round2,
                player1Info: undefined,
                player2Info: undefined,
                mode: game.mode,
            };
        });
        // console.log('live Games' ,live);
        const accountsNeeded = live.map((game) => {
            return [game.p1, game.p2];
        }).reduce((acc, val) => acc.concat(val), [])
            .filter((id) => accounts.find((acc) => acc.Userid === id) === undefined);

        if (accountsNeeded.length > 0) {
            getBulkAccountsByUserId(accountsNeeded).then((accounts) => {

            });
        }
       setLiveGames( [...live.map((game) => {
            return {
                ...game,
                player1Info: accounts.find((account) => account.Userid === game.p1),
                player2Info: accounts.find((account) => account.Userid === game.p2),
            };
        })]);
        // setLiveGames(live);


    },[ accounts, getBulkAccountsByUserId]);
    useEffect(() => {
        if (isInGame)
            updateMyStatus(userStatus.INGAME);
        else
            updateMyStatus(userStatus.ONLINE);
    },[isInGame]);
    useEffect(() => {
        if (isAuthenticated && !socket) {
            const s = socketIOClient(`${process.env.REACT_APP_GAME_WS_URL}`, {
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
            console.log("game socket closed");
            if (socket) {
                socket.disconnect();
                setSocket(undefined);
            }
        }
    }, [socket, isAuthenticated, me]);


    const   inviteToGame =  useCallback( (userId: string, mode: string) => {
            if (pendingInvitation || !socket)
                return;

        socket.emit("invite", {userId: userId, mode: mode});
        setPendingInvitation({
            id: '',
            accept: false,
            gameId: '',
        });

    },[socket, pendingInvitation]) // inviteToGame

    const   joinPool =  useCallback((mode: string) => {
        console.log("join pool", mode);
        if (!socket)
            return;
        socket.emit("player-joined", {input : mode});
    },[socket])  // joinPool

    const   acceptGameInvite =  useCallback( (gameId: string) => {
        if (!socket || !inviteFromUser || !inviteFromUser.id)
            return;
        setInviteFromUser({
            id: undefined,
            p1: undefined,
            mode: undefined,
            p2: undefined
        })
        socket.emit("invite-feedback", {
            id: inviteFromUser.id,
            accept: true,
        });
    },[socket, inviteFromUser])  // acceptGameInvite

    const   declineGameInvite =  useCallback((gameId: string) => {
        if (!socket || !inviteFromUser || !inviteFromUser.id)
            return;
        socket.emit("invite-feedback", {
            id: inviteFromUser.id,
            accept: false,
        });
    },[socket, inviteFromUser])  // declineGameInvite


    const   leaveGame =  useCallback( (gameId: string) => {
        setIsMePlayer(false);
    },[])  // leaveGame




      const  startGame =  useCallback( (gameId: string) => {
          // if (gameId != currentGameId)
          //     return;

            if (!socket)
                return;
          setIsMePlayer(true);
          setIsInGame(true);
            socket.emit("start", {gameId: currentGameId});

      },[socket,currentGameId]);
 const inviteToast = useCallback((data: any) => {
   return (snackbarId: any) => (
         <div className="flex flex-row gap-2 px-3">
             <button className="px-4 flex-col py-1 rounded-full bg-green-500" onClick={() =>
             {
                 console.log("accept " ,inviteFromUser?.id );
                 acceptGameInvite(inviteFromUser?.id || '');
                 closeSnackbar(snackbarId)
             }}>
                 join
             </button>
             <button  className="px-4 py-1 flex-col rounded-full bg-red-500" onClick={() => {
                 console.log("decline   " , inviteFromUser?.id );
                 declineGameInvite(inviteFromUser?.id || '');
                 closeSnackbar(snackbarId)
             }}>
                 decline
             </button>
         </div>
     );
 },[inviteFromUser]);

    useEffect(() => {
        if (inviteFromUser &&inviteFromUser.id) {
            enqueueSnackbar("you have an invitation from " + inviteFromUser.id, {
                persist: false,
                preventDuplicate: true,
                // transitionDuration: {
                //     enter: 1000,
                //     exit: 1000,
                // },
                onExit: () => {
                  console.log("on close" );
                    declineGameInvite(inviteFromUser?.id || '');
                },
                variant: "info",
                action: inviteToast(inviteFromUser),
            });
        }
    },[inviteFromUser]);
    // @TODO add to send keyPress events
    const   sendKeyPress =  useCallback( (key: string) => {

        if (!socket)
            return;

        socket.emit(`player-input`, {
            input : key,
            userId: me?.Userid,
        });
    },[socket, me, currentGameId]); // sendKeyPress


    const clear = useCallback(() => {
        setGameState(undefined);
        setIsMePlayer(false);
        setIsInGame(false);
        setCurrentGameId(undefined);
        setPendingInvitation(undefined);
        setInviteFromUser( {id: undefined ,
            p1: undefined ,
            p2: undefined ,
            mode: undefined}
        );
    },[]   );

    const   cancelGame =  useCallback( (gameId: string) => {
        setIsMePlayer(false);
        clear();
        socket?.emit("cancel-game", {gameId});
    },[clear]) // cancelGame

    useEffect(() => {
        if (!socket || !currentGameId)
            return;
        socket.on('game-state-' + currentGameId,
            (data: any) => {
            // console.log("game state", data);
            setGameState(data);
        });
        return () => {
            console.log("cancel");
            socket.off('game-state-' + currentGameId);
        }
    },[socket, currentGameId]);

    useEffect(() => {
            if (!pendingInvitation)
                return;

            if (pendingInvitation.accept && pendingInvitation.gameId && pendingInvitation.players
                && pendingInvitation.players.includes(me?.Userid )) {
                clear();
                setCurrentGameId(pendingInvitation.gameId);
                setIsMePlayer(true);
                setIsInGame(true);
                navigate("/game");
            }
            else
                setPendingInvitation(undefined);

    },[pendingInvitation, me]);

    useEffect(() => {
                if (!socket)
                    return;
                socket.emit('live-games', {});
                socket.on("live-games", (data: any) => {
                    addLiveGame(data);
                });
    },[socket]);

    useEffect(() => {
        if (!socket)
            return;
        socket.on('invite-' +me?.Userid, (data: any) => {
            setInviteFromUser({
                id: data.id,
                p1: data.p1,
                p2: data.p2,
                mode: data.mode,
            });
        });

        socket.on("invite-feedback", (feedBack:any) => {
            console.log(feedBack);
            setPendingInvitation({
                players: feedBack.players,
                id: feedBack.id,
                accept: feedBack.accept,
                gameId: feedBack.gameId,
            });


        });
        console.log("invite feedback  ", `game-queue-${me?.Userid}`);
        socket.on(`game-queue-${me?.Userid}`, (data: any) => {
            if (data.id) {
                console.log("game queue", data);
                setCurrentGameId(data.id);
            }
        });
    },[socket]);
    const spectateGameId = useCallback((gameId: string) => {
        if (!socket)
            return;
            setIsMePlayer(false);
            setIsInGame(false);
            setCurrentGameId(gameId);
            socket.emit("hard-send", {gameId: gameId});
            navigate("/game");
    },[socket, currentGameId]);
    return (
        <gameContext.Provider
            value={
            {
                gameState,
                liveGames,
                inviteToGame,
                acceptGameInvite,
                declineGameInvite,
                cancelGame,
                leaveGame,
                startGame,
                sendKeyPress,
                joinPool,
                isInGame,
                isMePlayer,
                currentGameId,
                spectateGameId: spectateGameId,
                inviteFromUser,
                pendingInvitation,
                clear
            }
            }>
            {children}
        </gameContext.Provider>
    );
}

const useGame = () => {
    return useContext(gameContext);
}

export {GameProvider, useGame};