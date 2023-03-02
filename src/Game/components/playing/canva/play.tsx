import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import Canva from "./index";

const Play: FunctionComponent<any> = () => {


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



    return (
        <div
            ref = {ref}
        >
            <Canva

                width={sectionWidth}
                height = {sectionHeight}
            />
        </div>
    )
}

export default Play;