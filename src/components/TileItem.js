import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const TileItem = ({ item, id, remove, backgroundColor }) => {
  const style = {
    backgroundColor: backgroundColor,
  };
  return (
    <div className="tile-item" style={style}>
      <p>{item}</p>
      <AiOutlineClose
        className="clickable no-print"
        onClick={() => remove(id)}
      />
    </div>
  );
};

export default TileItem;
