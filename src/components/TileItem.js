import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

const TileItem = ({ item, remove, backgroundColor, edit }) => {
  const style = {
    backgroundColor: backgroundColor,
  };
  return (
    <div className="tile-item" style={style}>
      <p>{item.value}</p>
      <MdOutlineEdit
        className="clickable edit no-print"
        onClick={() => edit(item)}
      />
      <AiOutlineClose
        className="clickable no-print"
        onClick={() => remove(item.id)}
      />
    </div>
  );
};

export default TileItem;
