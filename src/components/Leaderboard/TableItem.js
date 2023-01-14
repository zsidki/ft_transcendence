import React from "react";
import friend_image from "../../images/user_img2.png";
import { Link } from "react-router-dom";
function TableItem(props) {
  // INTEGRATE DATA
  const {rank,  name, win, lose,avatar} = props.data;


  return (
    <>
      <tr >
        {/* RANK */}
        <td>{rank}</td>
        <td className="flex items-center">
          {/* IMAGE */}
          <div className="flex-1">
            <img
              className="w-12 h-12 rounded-full m-auto"
              src={avatar}
              alt="user-img"
            />
          </div>
          {/* NAME */}
          <span className="flex-1"><Link to={`/user/${name}`}>{name}</Link></span>
        </td>

        {/* WIN */}
        <td>{win}</td>
        {/* LOSE */}
        <td>{lose}</td>
        {/* MATCHES */}
        <td>{win + lose}</td>
      </tr>
    </>
  );
}

export default TableItem;
