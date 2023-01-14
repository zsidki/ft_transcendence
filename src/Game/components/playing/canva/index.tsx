// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { FunctionComponent, useContext, useEffect, useState } from "react";
import { GameState } from "../../../utils/models";
import p5Types from "p5"
import Sketch from "react-p5";


type Props = {
    socket : any;
    gameState: any;
    width: any;
    height: any;
};

const Canva: FunctionComponent<Props> = (props) => {
  //const  socket = useContext(GameSocketContext);
  const [P5, setP5] = useState<p5Types | null>(null);
  const getGameState = (): GameState => props.gameState.current;
  
  let newPropsWidth = props.width > 1000 ? 1000 : props.width;
  let aspectRatio: number = getGameState().aspectRatio;

  let absoluteWidth: number = getGameState().width;

  let relativeWidth: number = newPropsWidth;

  let absoluteHeight: number = absoluteWidth / aspectRatio;
  let relativeHeight: number = relativeWidth / aspectRatio; 

  let scalingRatio: number = relativeWidth / absoluteWidth;
    
  // SETUP
  let canvas: p5Types.Renderer;
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    console.log("room = " + getGameState().players[0]);
    
    setP5(p5);
    // const bg1 = loadImage('img_link1');
    // const bg2 = loadImage('img_link2');
    // const bg3 = loadImage('img_link3');
    // const bg4 = loadImage('img_link4');
    // if(relativeWidth<getGameStateData().width)
    canvas = p5
      .createCanvas(newPropsWidth, relativeHeight)
      .parent(canvasParentRef);
  };

  const onResize = (p5: p5Types) => {
    absoluteWidth = getGameState().width;
    relativeWidth = newPropsWidth;
    absoluteHeight = absoluteWidth / aspectRatio;
    relativeHeight = relativeWidth / aspectRatio;
    scalingRatio = relativeWidth / absoluteWidth;
    if (p5) p5.resizeCanvas(newPropsWidth, relativeHeight);
  };

    const drawBall = (p5 : p5Types) => {
        p5.circle(
            getGameState().ballX * scalingRatio,
            getGameState().ballY * scalingRatio,
            getGameState().ballRadius * scalingRatio);
    }

    const drawPaddleOne = (p5: p5Types) => {
        p5.rect(
            getGameState().paddleOneX * scalingRatio,
            getGameState().paddleOneY * scalingRatio,
            getGameState().paddleWidth * scalingRatio,
            getGameState().paddleHeight * scalingRatio);
    }

    const drawPaddleTwo = (p5: p5Types) => {
        p5.rect(
            getGameState().paddleTwoX * scalingRatio,
            getGameState().paddleTwoY * scalingRatio,
            getGameState().paddleWidth * scalingRatio,
            getGameState().paddleHeight * scalingRatio);
    }

    const initCanva = (p5: p5Types) => {
        p5.clear(255,255,255,255);
        // if(getGameState().mod === "1")
        // {
        //   p5.background(bg1);
        // }
        // if (getGameState().mod === "2")
        // {
        //   p5.background(bg2);
        // }
        // if (getGameState().mod === "3")
        // {
        //   p5.background(bg3);
        // }
        // if (getGameState().mod === "4")
        // {
        //   p5.background(bg4);
        // }
        p5.background('#33FFE9');
        //p5.frameRate(60);
    }

    const handlePlayerOneInput = (p5: p5Types) => {



      if(p5.keyIsDown(13) && props.socket.current?.id !== getGameState().lastscored)
      {;
        props.socket.current?.emit("playerInput", {input: "SPACE"});
      }
      if(p5.keyIsDown(68))
      {
        props.socket.current?.emit("playerInput", { input: "RIGHT" });
      }

      if(p5.keyIsDown(65) && (getGameState().mod === "1" || getGameState().mod === "2" ))
      {
        props.socket.current?.emit("playerInput", { input: "LEFT" });
      }

      if(p5.keyIsDown(87) && (getGameState().mod === "1" || getGameState().mod === "2" ))
      {
        props.socket.current?.emit("playerInput", { input: "UP" });
      }

      if(p5.keyIsDown(83))
      {
        props.socket.current?.emit("playerInput", { input: "DOWN" });
      }
    }

    const handlePlayerTwoInput = (p5: p5Types) => {
        if(p5.keyIsDown(13) &&  props.socket.current?.id !== getGameState().lastscored)
        {
          props.socket.current?.emit("playerInput", {input: "SPACE"});
        }

        if(p5.keyIsDown(68) && (getGameState().mod === "1" || getGameState().mod === "2" ))
        {
          props.socket.current?.emit("playerInput", { input: "RIGHT" });
        }
  
        if(p5.keyIsDown(65) && (getGameState().mod === "1" || getGameState().mod === "2" ))
        {
          props.socket.current?.emit("playerInput", { input: "LEFT" });
        }  

        if(p5.keyIsDown(87))
        {
          props.socket.current?.emit("playerInput", { input: "UP" });
        }
        if(p5.keyIsDown(83))
        {
          props.socket.current?.emit("playerInput", { input: "DOWN" });
        }
    }

    const drawClickToStartText = (p5: p5Types) => {
      if (getGameState().state === "endRound" || getGameState().state === "scored" || getGameState().state === "init") {
        console.log(getGameState().state);
        p5.fill(0);
        p5.textSize(((relativeWidth / 3 * 5) / 50 ));
        p5.textAlign(p5.CENTER);
        const scores = getGameState().scores;
        const scoresSum = scores[0] + scores[1];
        if(getGameState().players.indexOf(props.socket.current?.id) == -1)
        {
          p5.text("Waiting for players to start the game",
            (newPropsWidth) / 2,
            relativeHeight / 2.5
          );
        }
        else
        {
          p5.text(
            props.socket.current?.id === getGameState().lastscored
              ? "Waiting for oponent to start the game"
              : "Click enter to start the game ",
            (newPropsWidth) / 2,
            relativeHeight / 2.5
          );
        }
        if(getGameState().mod === "2" || getGameState().mod === "4")
        {
          p5.fill(0);
          p5.textSize((relativeHeight * 20) / 600);
          p5.textAlign(p5.CENTER);
          p5.text(
            "rounds  won ",
            (relativeWidth / 2),
            (relativeHeight / 16) * 14
          );
          p5.text(
            getGameState().roundsWin[0],
            (relativeWidth / 40) * 19,
            (relativeHeight / 40) * 38
          );

          p5.text(
            getGameState().roundsWin[1],
            (relativeWidth / 40) * 21,
            (relativeHeight / 40) * 38
          );
          p5.text(
            "rounds for winning the game: " + getGameState().rounds,
            (relativeWidth / 2),
            relativeHeight / 17
          );

          p5.text(
            "score for winning the round: " + getGameState().maxScore,
            (relativeWidth / 2),
            (relativeHeight / 4) * 3
          );
        }
        else
        {
          p5.textSize((relativeHeight * 20) / 600);
          p5.text(
            "score for winning the game: " + getGameState().maxScore,
            (relativeWidth / 2),
            (relativeHeight / 4) * 3
          );
        }
      }
    };

    const drawScore = (p5: p5Types) => {
      p5.fill(0);
      p5.textSize((relativeHeight * 20) / 400);
      p5.textAlign(p5.CENTER);
      p5.text(
        getGameState().scores[0],
        (relativeWidth / 16) * 7,
        relativeHeight / 4
      );
      p5.text(
        getGameState().scores[1],
        (relativeWidth / 16) * 9,
        relativeHeight / 4
      );

      // p5.fill(0);
      // p5.textSize((relativeHeight * 20) / 600);
      // p5.textAlign(p5.CENTER);
      // p5.text(
      //   "rounds won ",
      //   (relativeWidth / 2),
      //   (relativeHeight / 16) * 14
      // );
      // p5.text(
      //   getGameState().scores[0],
      //   (relativeWidth / 16) * 16,
      //   relativeHeight / 6
      // );

      // p5.text(
      //   getGameState().scores[1],
      //   (relativeWidth / 16) * 19,
      //   relativeHeight / 6
      // );
      // p5.text(
      //   "total rounds : " + getGameState().rounds,
      //   (relativeWidth / 2),
      //   relativeHeight / 17
      // );

    };
  
    const drawDisconnectOrFinalOutcome = (p5: p5Types): boolean => {

      let winner = getGameState().players.indexOf(getGameState().winner) + 1;
      const loser = winner === 1 ? 2 : 1;

      if (getGameState().state === "endGame" )
      {
        if(getGameState().players.indexOf(props.socket.current?.id) == -1)
        {
          p5.fill(0);
    
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
          p5.fill(0);
    
          p5.textAlign(p5.CENTER);
        
          p5.textSize((relativeHeight * 7) / 100);
          p5.text(getGameState().winner == props.socket.current?.id ?
              "Won"
              : "Lost",
            relativeWidth / 2,
            relativeHeight / 2
          );
        }
        return true;
      }
      else if (getGameState().state === "disconnect")
      {
        
        if(getGameState().players.indexOf(props.socket.current?.id) == -1)
        {
          p5.fill(0);
    
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
          p5.fill(0);
    
          p5.textAlign(p5.CENTER);
        
          p5.textSize((relativeHeight * 7) / 100);
          p5.text(
            "Opponenent disconnected, You win",
            relativeWidth / 2,
            relativeHeight / 2
          );
        }
        return true;
      } 
      return false;
    }

    useEffect(() => {
      return () => {
        if (canvas !== undefined) canvas.remove();
      };
    }, []);

    const draw = (p5: p5Types) => {

        // let isSpect = false;
  
        // if(getGameState().spectators.indexOf(socket.current?.id) > -1)
        //   isSpect = true;
        initCanva(p5);

        if(drawDisconnectOrFinalOutcome(p5)) return;

        drawClickToStartText(p5);
  
        drawScore(p5);

        drawBall(p5);

        drawPaddleOne(p5);

        drawPaddleTwo(p5);

        //handle input
          if (getGameState().players.indexOf(props.socket.current?.id) === 0)
          handlePlayerOneInput(p5);
          if (getGameState().players.indexOf(props.socket.current?.id) === 1)
          handlePlayerTwoInput(p5);
    }
    return (
        <div>//
        <p>SKETCH IS UNDER</p>
        <Sketch setup={setup} draw={draw} windowResized={onResize}/>
        </div>
    )
}

export default Canva;