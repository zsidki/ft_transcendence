import { type } from "@testing-library/user-event/dist/type";

interface GameState {
    // Game variables
    width: number;
    height: number;
    aspectRatio: number;

    ballX: number;
    ballY: number;
    ballDirX: number;
    ballDirY: number;
    ballRadius: number;

    paddleOneX: number;
    paddleOneY: number;
  
    paddleTwoX: number;
    paddleTwoY: number;
  
    paddleWidth: number;
    paddleHeight: number;

    state: string; // "waiting" | "play" | "scored" | "endGame"
    players : Array<string>;
    spectators: Array<string>;

    scores: Array<number>;
    maxScore : number;
    rounds: number;
    roundsWin: Array<number>;
    winner : string;
    lastscored: string;

    mod: string;
}

export type {GameState};