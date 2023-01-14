import { FunctionComponent } from "react";

type Props = {
    setState : (state : string) => void;
}

const Waiting: FunctionComponent<Props> = ({
    setState
}) => {
    return (
        <div>
            <p>waiting for opponent...</p>
        <button
            onClick={()=> setState("canceled")}
            >Cancel</button>
        </div>
    );
};

export default Waiting;