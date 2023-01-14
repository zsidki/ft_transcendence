import { FunctionComponent, useEffect, useRef, useState } from "react";
import Canva from "./canva";
import { GameState } from "../../utils/models";
type Props = {
    socket : any;
    gameState: any;
};

const Play: FunctionComponent<Props> = (props) => {

    const getGameState = (): GameState => props.gameState.current;
    const ref = useRef(null);
    const getWindowSize = () => {
        const {innerWidth, innerHeight} = window;
        return {innerWidth, innerHeight};
    }

    const [windowSize, setWindowSize] = useState(getWindowSize());

    const [sectionWidth, setSectionWidth] = useState(getWindowSize().innerWidth);
    const [sectionHeight, setSectionHeight] = useState(getWindowSize().innerHeight);

    useEffect(() => {
        // function handleWindowResize() {
        //     setWindowSize(getWindowSize());
        // }
        const setup = () => {
            if((ref.current as any).clientWidth > 1000)
            {
                setSectionWidth(1000);
            }
            else
            {
                setSectionWidth((ref.current as any).clientWidth);
            }
            // setSectionHeight(sectionWidth / getGameState().aspectRatio);
            setSectionHeight((ref.current as any).clientHeight);
            // sectionWidth / getGameState().aspectRatio;
        };
        setup();
        window.addEventListener('resize', setup);
    
        return () => {
            window.removeEventListener('resize', setup);
        };
        }, [((ref.current as any)?.clientWidth)]);

    
    // useEffect(() => {
    //     const setup = () => {
    //         setSectionWidth((ref.current as any).clientWidth);
    //         setSectionHeight((ref.current as any).clientHeight);
    //         console.log("width is " + sectionWidth);
    //         console.log("height is " + sectionHeight);
    //     };
    //     setup();
    // }, [(ref.current as any)?.clientWidth])

    return (
        <div 
            ref = {ref}
        >
                <Canva
                    gameState={props.gameState}
                    socket={props.socket}
                    width={sectionWidth}
                    height = {sectionHeight}
                />
       </div> 
    )
}

export default Play;