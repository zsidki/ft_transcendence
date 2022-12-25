import React from "react";

function TableItem(props) {
  // INTEGRATE DATA
  const { id, rank, image, name, win, lose, matches } = props.data;
  return (
    <>
      <tr key={id}>
        {/* RANK */}
        <td>{rank}</td>
        <td className="flex items-center">
          {/* IMAGE */}
          <div className="flex-1">
            <img
              className="w-12 h-12 rounded-full m-auto"
              src={image}
              alt="user-img"
            />
          </div>
          {/* NAME */}
          <span className="flex-1">{name}</span>
        </td>

        {/* WIN */}
        <td>{win}</td>
        {/* LOSE */}
        <td>{lose}</td>
        {/* MATCHES */}
        <td>{matches}</td>
      </tr>
    </>
  );
}

export default TableItem;
