import {GameState} from "../Game/utils/models";
import {createContext} from "react";
import {account} from "../interfaces/account.interface";

export interface liveGames {
    p1: string;
    player1Info: account| undefined;

    p2: string;
    player2Info: account | undefined;
    score1: number;
    score2: number;
    round1: number;
    round2: number;
    mode: string;
    id: string;
}

const gameContextInitState={
    gameState: undefined as GameState | undefined, // gameState
    liveGames: [] as liveGames[], // liveGames
    isInGame: false, // isInGame
    isMePlayer: false, // isMePlayer
    currentGameId: undefined as string | undefined,
    inviteFromUser:{} as  any,
    pendingInvitation : {} as any,// currentGameId
    spectateGameId: (gameId : string) => {

    },
    // gameHistory: [] as any[], // gameHistory
    inviteToGame: (userId: string, mode:string) => {}, // inviteToGame
    joinPool: (mode: string) => {}, // joinPool
    acceptGameInvite: (gameId: string) => {}, // acceptGameInvite
    declineGameInvite: (gameId: string) => {}, // declineGameInvite
    cancelGame: (gameId: string) => {}, // cancelGame
    leaveGame: (gameId: string) => {}, // leaveGame
    startGame: (gameId: string) => {},
    sendKeyPress: (key: string) => {},// startGame
    clear: () => {} // clear
};

const gameContext = createContext(gameContextInitState);


export {gameContext, gameContextInitState}
