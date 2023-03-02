import React from "react";
import { Link } from "react-router-dom";
import {gameHistory} from "./MatchHistory";
// type MatchProps= {
//   opid: string;
//   winnerscore: number;
//   loserscore: number;
//   time : string;
//   avatar: string;
// }
function  MatchhistoryItem({game}:{game:gameHistory}) {
  
  return (
    <>
      <tr>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              <img
                className="rounded-full"
                src={game.avatar}
                width="40"
                height="40"
                alt={game.opid}></img>
            </div>
            <div className="font-medium text-gray-800">
              <Link to={`/user/${game.opid}`}>{game.opid}</Link>
            </div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left"> {` ${game.winnerscore} - ${game.loserscore}`}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">{game.time}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-lg text-center">ARAM</div>
        </td>
      </tr>
    </>
  );
}

export default MatchhistoryItem;
