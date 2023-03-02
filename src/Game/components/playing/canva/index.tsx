// @ts-nocheck

import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { gameState } from "../../../utils/models";
import p5Types from "p5"
import Sketch from "react-p5";
import { stat } from "fs";
import { Socket } from "socket.io-client";
import {useGame} from "../../../../components/hooks/useGame";
import {useAccounts} from "../../../../components/hooks/useAccount";
import "../../../../index.css";
const start = require('../../../../images/start.png') as string;
const mode1 = require('../../../../images/bg1.jpeg') as string;
const mode2 = require('../../../../images/bg2.jpeg') as string;
const mode3 = require('../../../../images/bg3.jpeg') as string;
const mode4 = require('../../../../images/bg4.jpeg') as string;
const mode5 = require('../../../../images/bg5.jpeg') as string;
const mode6 = require('../../../../images/bg6.jpeg') as string;
const allerSibrahim = require('../../../../audio/aller_sibrahim_otherPlayerScored.mp3') as string;
const atackLe = require('../../../../audio/atack_le.mp3') as string;
const azouz = require('../../../../audio/azouuz.mp3') as string;
const hayHay = require('../../../../audio/hay_hayy.mp3') as string;
const inalTa = require('../../../../audio/in3al_ta.mp3') as string;
const omg = require('../../../../audio/omg.mp3') as string;
const waChoufChwiya = require('../../../../audio/wa_chouf_chwia.mp3') as string;
const waTbarkLah = require('../../../../audio/watbarklaah.mp3') as string;
const veet_hit = require('../../../../audio/veet_hit.mp3') as string;

type Props = {
    width: any;
    height: any;
};

const modes=[
  {
    mode: "1",
    backgroundImage: mode1,
    paddleColor:"#2C74B3",
    ballColor:"#F5EA5A",
    textColor:"#000000",
  },
  {
    mode: "2",
    backgroundImage: mode2,
    paddleColor:"#A0C3D2",
    ballColor:"#EAC7C7",
    textColor:"#000000"
  },
  {
    mode: "3",
    backgroundImage: mode3,
    paddleColor:"#A3BB98",
    ballColor:"#F0ECCF",
    textColor:"#000000"
  },
  {
    mode: "4",
    backgroundImage: mode4,
    paddleColor:"#2C74B3",
    ballColor:"#F5EA5A",
    textColor:"#000000"
  },
  {
    mode: "5",
    backgroundImage: mode5,
    paddleColor:"#A0C3D2",
    ballColor:"#EAC7C7",
    textColor:"#000000"
  },
  {
    mode: "6",
    backgroundImage:mode6,
    paddleColor:"#A3BB98",
    ballColor:"#F0ECCF",
    textColor:"#000000"
  }
]
// let bg: any;

const Canva: FunctionComponent<Props> = (props) => {

  const [p5, setP5] = useState<p5Types | null>(null);
  const {gameState, sendKeyPress, startGame, currentGameId} = useGame();
  const {me  } = useAccounts();
  const [newPropsWidth, setNewPropsWidth] = useState(props.width);
  const [aspectRatio, setAspectRatio] = useState(gameState?.aspectRatio);
  const [absoluteWidth, setAbsoluteWidth] = useState(gameState?.width);
  const [relativeWidth, setRelativeWidth] = useState(newPropsWidth);

  const [relativeHeight, setRelativeHeight] = useState(relativeWidth / (aspectRatio || 1));
  const [scalingRatio, setScalingRatio] = useState(relativeWidth / (absoluteWidth || 1));
  const [ballX, setBallX] = useState(gameState?.ballX);
  const [ballY, setBallY] = useState(gameState?.ballY);
  const [paddleOneX, setPaddleOneX] = useState(gameState?.paddleOneX);
  const [paddleOneY, setPaddleOneY] = useState(gameState?.paddleOneY);
  const [paddleTwoX, setPaddleTwoX] = useState(gameState?.paddleTwoX);
  const [paddleTwoY, setPaddleTwoY] = useState(gameState?.paddleTwoY);
  const [lastscored, setLastScored] = useState(gameState?.lastscored);
  const [winner, setWinner] = useState(gameState?.winner);

  const [rounds, setRounds] = useState(gameState?.rounds);
  const [maxScore, setMaxScore] = useState(gameState?.maxScore);
  const [roundsWin, setRoundsWin] = useState(gameState?.roundsWin);
  const [scores, setScores] = useState(gameState?.scores || [0, 0]);
  const [mod, setMod] = useState<string>(gameState?.mod || '');
  const [settings, setSettings]=useState<any | undefined>();
  const [state, setState] = useState(gameState?.state);
  const [canvas , setCanvas] = useState< p5Types.Renderer>();
  const [keyPressed, setKeypressed] = useState(false);
  const canvasParentRef = useRef<Element | undefined>(undefined);
  const [play, setPlay] = useState(false);

  const [isPlayerOne, setIsPlayerOne] = useState(false);
  const [isSpect, setIsSpect] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [dir, setDir] = useState<number>(gameState?.ballDirX|| 0);
  const [ready, setReady] = useState([0, 0]);
  // const [bg, setBg] = useState<p5Types.Image | undefined>();
  const [bg, setBg] = useState<any>("#A0C3D2");
  const [goals, setGoals] = useState([{
    score: scores[0],
    lastScore: 0
  },{
    score: scores[1],
    lastScore: 0
  }
  
]);

  const [direction, setDirection] = useState({
    direction: dir,
    lastDirection: 0
  });

  const [saveState, setSaveState] = useState({
    saveState : state,
    lastSaveState : ""
  });



  useEffect(() => {
    // @ts-ignore
    setSaveState((prev) => {
        return {
          saveState : state,
          lastSaveState : prev.saveState
        };
    })
  },[state]);

  // useEffect(() => {
  //   if (p5 && settings)
  //     setBg(p5?.loadImage(settings.backgroundImage));
  // },[settings, p5]);
  useEffect(() => {
    setDirection((prev) => {
      return {
        direction : dir,
          lastDirection : prev.direction
        };
    })
  },[dir]);

  useEffect(() => {
    setGoals((prev) => {
      prev[0].lastScore = prev[0].score;
        prev[0].score = scores[0];
        prev[1].lastScore = prev[1].score;
        prev[1].score = scores[1];
        return [...prev];
    })
  },[scores]);

  useEffect(() => {
    if(direction.direction !== direction.lastDirection && state !== "init" && state !== "endGame" && state !== "endRound"
        && state !== "scored")
    {
      // console.log("direction");
      //audioRef.current.play();
      p5?.background(bg);
      direction.lastDirection = direction.direction;
      let hit = new Audio(veet_hit);
      // if(direction.direction === -1)
      //   hit = new Audio("http://localhost:5000/bounce4.mp3");
      // else
      //   hit = new Audio("http://localhost:5000/bounce3.mp3");
      if(hit)
        hit.play();
    }
  }, [direction, state]);
  
  useEffect(() => {
    if(saveState.saveState !== saveState.lastSaveState && saveState.saveState === "endGame")
    {
      if(isWinner)
      {
        const audio = new Audio(hayHay);
        audio.play();
      }
      else
      {
        const audio = new Audio(allerSibrahim);
        audio.play();
      }
    }
  }, [saveState, isWinner]);
  



  useEffect(() => {
      if(me?.Userid === winner)
        setIsWinner(true);
      else
        setIsWinner(false);
      if (gameState?.players.indexOf(me?.Userid || '') === 0)
      {
        setIsPlayerOne(true);
        setIsSpect(false);
      }else if(gameState?.players.indexOf(me?.Userid || '') === 1){
        setIsPlayerOne(false);
        setIsSpect(false);
      }
      else
        setIsSpect(true);
  },[gameState, winner]);




  useEffect(() => {

    const index = isPlayerOne ? 0 :1;
    const otherIndex = index ? 0: 1;

    if(!isSpect)
    {
      if(goals[index].score > goals[index].lastScore && state !== "endGame")
      {
        const hit = new Audio(omg);
          hit.play();
        goals[index].lastScore = goals[index].score;
      }
      else if (goals[otherIndex].score > goals[otherIndex].lastScore && state !== "endGame")
      {
        const punch = new Audio(waChoufChwiya);
          punch.play();
        goals[otherIndex].lastScore = goals[otherIndex].score;
      }
    }
  }, [goals, isPlayerOne, state]);


  useEffect(() => {
  if(props.width > 1000)
    setNewPropsWidth(1000);
  else
    setNewPropsWidth(props.width);
  setAspectRatio(gameState?.aspectRatio);
  setAbsoluteWidth(gameState?.width);
  setRelativeWidth( newPropsWidth);
  setRelativeHeight(relativeWidth / aspectRatio);
  setScalingRatio(relativeWidth / absoluteWidth);
  
  setBallX(gameState?.ballX);
  setBallY(gameState?.ballY);
  setPaddleOneX(gameState?.paddleOneX);
  setPaddleOneY(gameState?.paddleOneY);
  setPaddleTwoX(gameState?.paddleTwoX);
  setPaddleTwoY(gameState?.paddleTwoY);
  setLastScored(gameState?.lastscored);
  setRounds(gameState?.rounds);
  setMaxScore(gameState?.maxScore);
  setRoundsWin(gameState?.roundsWin);
  setScores(gameState?.scores);
  setDir(gameState?.ballDirX);
  setMod(gameState?.mod);
  setState(gameState?.state);
  setWinner(gameState?.winner);
  setReady(gameState?.ready);
  },[direction, gameState, canvas, newPropsWidth, absoluteWidth, relativeWidth, scalingRatio, paddleOneX, paddleOneY, paddleTwoX, paddleTwoY, props.width, aspectRatio, rounds, state, maxScore, mod]);

  useEffect(()=>{
    if(!settings)
    setSettings((modes.filter(m => m.mode === mod))[0]);
},[settings, mod, gameState, p5]);

useEffect(()=> {
  if (p5 && canvasParentRef.current)
  {
    setCanvas(p5
      .createCanvas(newPropsWidth, relativeHeight)
      .parent(canvasParentRef.current));
  }
},[newPropsWidth, p5,bg, relativeHeight, settings]);

const setup = useCallback((p5: p5Types, canvRef: Element) => {
    canvasParentRef.current = canvRef;
    setP5(p5);
    p5.background(bg);
    //p5.background("#f3487f");

  },[gameState]);

const onResize = useCallback((p: p5Types) => {


  setAbsoluteWidth(gameState?.width);
  setRelativeWidth( newPropsWidth);
  setRelativeHeight(relativeWidth / aspectRatio);
  setScalingRatio(relativeWidth / absoluteWidth)
  p.resizeCanvas(newPropsWidth, relativeHeight);
  setP5(p);
},[p5, gameState, newPropsWidth, relativeWidth, aspectRatio, absoluteWidth, relativeHeight]);

const drawBall = useCallback(() => {
  if (!p5)
  return; 
  p5.fill(settings.ballColor)
    p5.circle(
        ballX * scalingRatio,
        ballY * scalingRatio,
        gameState?.ballRadius * scalingRatio);
}, [p5, settings, ballX, scalingRatio, ballY, gameState]);

  const drawPaddleOne = useCallback(() => {
    if (!p5)
      return;
      p5.fill(settings.paddleColor);
      p5.rect(
          paddleOneX * scalingRatio,
          paddleOneY * scalingRatio,
          gameState?.paddleWidth * scalingRatio,
          gameState?.paddleHeight * scalingRatio);
  }, [p5, settings, paddleOneX, scalingRatio, paddleOneY, gameState]);

  const drawPaddleTwo = useCallback(() => {
    if (!p5)
    return;
    p5.fill(settings.paddleColor);
      p5.rect(
          paddleTwoX * scalingRatio,
          paddleTwoY * scalingRatio,
          gameState?.paddleWidth * scalingRatio,
          gameState?.paddleHeight * scalingRatio);
  }, [p5, settings, paddleTwoX, scalingRatio, paddleTwoY, gameState]);

  const initCanva = useCallback(() => {
    if(p5)
    {
      p5.clear(255, 255, 255, 0);
      p5.background(bg);
    }
  },[p5, bg]);

  const handlePlayerOneInput = useCallback(() => {
    if (!p5)
      return;
    if(p5.keyIsDown(13))
    {
        sendKeyPress ("SPACE");
    }
    if(p5.keyIsDown(68) && mod !== "1")
    {
      sendKeyPress ( "RIGHT" );
    }
    if(p5.keyIsDown(65) && mod !== "1")
    {
       sendKeyPress ( "LEFT" );
    }
    if((p5.keyIsDown(87) && mod === "1" && state !== "init") || (p5.keyIsDown(87) && mod !== "1"))
    {
       sendKeyPress ("UP" );
    }
    if((p5.keyIsDown(83) && mod === "1" && state !== "init") || (p5.keyIsDown(83) && mod !== "1"))
    {
       sendKeyPress ( "DOWN" );
    }
  }, [p5, mod, state]);

  const handlePlayerTwoInput = useCallback(() => {
      
      if (!p5)
        return;
      if(p5.keyIsDown(13))
      {
         sendKeyPress ("SPACE");
      }

      if(p5.keyIsDown(68) && mod !== "1")
      {
         sendKeyPress ( "RIGHT" );
      }

      if(p5.keyIsDown(65) && mod !== "1")
      {
         sendKeyPress ( "LEFT" );
      }  

      if((p5.keyIsDown(87) && mod === "1" && state !== "init") || (p5.keyIsDown(87) && mod !== "1"))
      {
         sendKeyPress ( "UP" );
      }

      if((p5.keyIsDown(83) && mod === "1" && state !== "init") || (p5.keyIsDown(83) && mod !== "1"))
      {
         sendKeyPress (  "DOWN" );
      }
  }, [p5, mod, state]);

  const drawClickToStartText = useCallback(() => {
      if (!p5)
        return;
      if (state === "endRound" || state === "scored" || state === "init") {
        p5.fill(settings.textColor);
        p5.textSize(((relativeWidth / 3 * 5) / 50 ));
        p5.textAlign(p5.CENTER);
        if(state === "init")
        {
          if(isSpect)
          {
            p5.text("Waiting for players to start the game",
              (newPropsWidth) / 2,
              relativeHeight / 2.5
            );
          }
          else
          {
            if(isPlayerOne)
            {
              if(ready[0])
              {
                p5.text("Waiting for opponent to be ready",
                (newPropsWidth) / 2,
                relativeHeight / 2.5
              );
              }
              else
              {
                p5.text("press enter to be ready",
                (newPropsWidth) / 2,
                relativeHeight / 2.5
                );
              }
            }
            else
            {
              if(ready[1])
              {
                p5.text("Waiting for opponent to be ready",
                (newPropsWidth) / 2,
                relativeHeight / 2.5
              );
              }
              else
              {
                p5.text("press enter to be ready",
                (newPropsWidth) / 2,
                relativeHeight / 2.5
                );
              }
            }
          }
        }
        else
        {
            //const scores = gameState?.scores;
            const scoresSum = scores[0] + scores[1];
            if(isSpect)
            {
              p5.text("Waiting for players to start the game",
                (newPropsWidth) / 2,
                relativeHeight / 2.5
              );
            }
            else
            {
              p5.text(
                  me?.Userid  === lastscored
                  ? "Waiting for opponent to start the game"
                  : "Click enter to start the game ",
                (newPropsWidth) / 2,
                relativeHeight / 2.5
              );
            }
          }
          if(mod === "4" || mod === "5" || mod === "6")
          {
            p5.fill(settings.textColor);
            p5.textSize((relativeHeight * 20) / 600);
            p5.textAlign(p5.CENTER);
            p5.text(
              "rounds  won ",
              (relativeWidth / 2),
              (relativeHeight / 16) * 14
            );
            p5.text(
              roundsWin[0]|| 0,
              (relativeWidth / 40) * 19,
              (relativeHeight / 40) * 38
            );
  
            p5.text(
              roundsWin[1]|| 0,
              (relativeWidth / 40) * 21,
              (relativeHeight / 40) * 38
            );
            p5.text(
              "rounds for winning the game: " + rounds,
              (relativeWidth / 2),
              relativeHeight / 17
            );
  
            p5.text(
              "score for winning the round: " + maxScore,
              (relativeWidth / 2),
              (relativeHeight / 4) * 3
            );
          }
          else
          {
            p5.textSize((relativeHeight * 20) / 600);
            p5.text(
              "score for winning the game: " + maxScore,
              (relativeWidth / 2),
              (relativeHeight / 4) * 3
            );
          }
      }
  }, [p5, state, settings, relativeWidth, isSpect, newPropsWidth, relativeHeight, isPlayerOne, ready, scores, mod, lastscored, roundsWin, rounds, maxScore]);

  const drawScore = useCallback(() => {
    if (!p5)
      return;
    p5.fill(settings.textColor);
    p5.textSize((relativeHeight * 20) / 400);
    p5.textAlign(p5.CENTER);
    p5.text(
      gameState?.scores[0]|| '0',
      (relativeWidth / 16) * 7,
      relativeHeight / 4
    );
    p5.text(
      gameState?.scores[1] || '0',
      (relativeWidth / 16) * 9,
      relativeHeight / 4
    );
  }, [p5, settings, relativeHeight, gameState, relativeWidth]);


  const drawDisconnectOrFinalOutcome = useCallback((): boolean => {
    if (!p5)
      return false;
    // let winner = gameState?.players.indexOf(winner) + 1;
    const loser = winner === "1" ? 2 : 1;

    if (state === "endGame" )
    {
      if(gameState?.players.indexOf(me?.Userid || '') == -1)
      {
        p5.fill(settings.textColor);
  
        p5.textAlign(p5.CENTER);
      
        p5.textSize((relativeHeight * 7) / 100);
        p5.text(
          "player " + winner + " wins",
          relativeWidth / 2,
          relativeHeight / 2
        );
      }
      else
      {
        p5.fill(settings.textColor);
  
        p5.textAlign(p5.CENTER);
      
        p5.textSize((relativeHeight * 7) / 100);

        p5.text(winner === me?.Userid  ?
            "Won"
            : "Lost",
          relativeWidth / 2,
          relativeHeight / 2
        );
      }
      return true;
    }
    else if (state === "disconnect")
    {
      if(gameState?.players.indexOf(me?.Userid || '') === -1)
      {
        p5.fill(settings.textColor);
  
        p5.textAlign(p5.CENTER);
      
        p5.textSize((relativeHeight * 7) / 100);
        p5.text(
          "player " + loser +  " disconnected , player " + winner + " wins",
          relativeWidth / 2,
          relativeHeight / 2
        );
      }
      else
      {
        p5.fill(settings.textColor);
  
        p5.textAlign(p5.CENTER);
      
        p5.textSize((relativeHeight * 7) / 100);
        p5.text(
          "Opponent disconnected, You win",
          relativeWidth / 2,
          relativeHeight / 2
        );
      }
      return true;
    } 
    return false;
  }, [settings, p5, gameState, winner, state, relativeHeight, relativeWidth]);

  useEffect(() => {
    return () => {
      if (canvas !== undefined) canvas.remove();
    };
  }, [canvas]);

  useEffect(()=>{
    if (!p5)
      return;
      p5.clear(255, 255, 255, 0);
       p5.background(bg);
      // p5.background("#000000");
      // p5.background(bg);
      // console.log("bg in main draw useEffect is ", bg);

      initCanva();
      
      if(drawDisconnectOrFinalOutcome()) return;
      
      drawClickToStartText();
      
      // drawScore();
      
      drawBall();
      
      drawPaddleOne();
      
      drawPaddleTwo();

      //handle input
      if (isPlayerOne)
      handlePlayerOneInput();
      if (!isPlayerOne && !isSpect)
      handlePlayerTwoInput();
  },[bg, keyPressed, drawBall, drawClickToStartText, drawDisconnectOrFinalOutcome, drawPaddleOne,
    drawPaddleTwo, drawScore, gameState, handlePlayerOneInput, handlePlayerTwoInput, me, initCanva, p5]);

  const draw = useCallback((p: p5Types) => {
      //console.log("bg is ", bg);

      // initCanva();

      setKeypressed(false);
      if(p.keyIsDown(13) || p.keyIsDown(68) || p.keyIsDown(65) || p.keyIsDown(87) || p.keyIsDown(83))
      {
        setKeypressed(true);
      }
     setP5(p);
  },[p5]);
  const preload = useCallback((p: p5Types) => {
      setBg(p.loadImage(settings.backgroundImage))
      // setP5(p);
  },[settings]);

  // useEffect(() => {
  //   // initCanva()
  //   drawClickToStartText();
  //   drawScore();
  //   drawBall();
  //   drawPaddleOne();
  //   drawPaddleTwo();
  // },[p5])

  if (!settings)
    return (<></>);
  // console.log(gameState);

  if (gameState && gameState?.state === 'start-requried')
  return (
        <div className="game">
         <div className="game__header justify-center items-center flex flex-col w-full">
           <img className= "mt-10 w-[600px] h-[400px] rounded-lg object-cover" src={start} alt="start game" />
           <button className="mt-10 bg-blue-500 w-[250px] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={(e) => {
               e.preventDefault();
               // console.log(currentGameId, " start game button clicked")
               startGame(currentGameId || '');
           }
           }>Start Game</button>
         </div>
        </div>
  )
  return (
    <div className="settings h-full w-full mt-20 shadow-[0_4px_4x_rgba(0,0,0,0.25)] rounded-[20px]">
          <p>SKETCH IS UNDER</p>
        <Sketch preload={preload} setup={setup} draw={draw} windowResized={onResize} />
      </div>
  )
}

export default Canva;