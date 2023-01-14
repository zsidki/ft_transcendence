import React from "react";
import friend_image from "../../images/user_img2.png";
import { Link } from "react-router-dom";
function TableItem(props) {
  // INTEGRATE DATA
  const {nameleft,  nameright, soccerright, soccerleft ,imageleft, imageright, modegame} = props.data;


  return (
    <>
      <tr >
        {/* RANK */}
        <td className="flex items-center">
              {/* NAME User Left */}
              <span className="flex items-center h-full gap-14"><Link to={`/user/${nameleft}`}>{nameleft}</Link></span>1
          {/* IMAGE */}
          <div className="flex-1">
            <img
              className="w-12 h-12 rounded-full m-auto"
              src={avatar}
              alt="user-img"
            />
            {/* NAME User Left */}
            <span className="flex items-center h-full gap-14"><Link to={`/user/${nameleft}`}>{nameleft}</Link></span>
            {/* Sccer left*/}
            <td>{soccerleft}</td>
            <td className="text-4xl italic">vs</td>
            <img
              className="w-12 h-12 rounded-full m-auto"
              src={friend_image}
              alt="user-img"
            />
          </div>
        </td>

        {/* Doccer right */}
        <td className="text-3xl">{soccerright}</td>
        {/* ModeGame */}
        <td className="text-3xl">{modegame}</td>
      </tr>
    </>
  );
}

export default TableItem;