import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import DetailedItem from "./DetailedItem";
import Title from "./Title";

const Detailed = ({ id, remove }) => {
    const [titleColor, setTitleColor] = useState("#6D6E71");
  return (
    <div className="detailed-container">
      <Title id={id} onChange={setTitleColor}/>

      <DetailedItem id={id} titleColor={titleColor}/>

      <div className="remove no-print" onClick={() => remove(id)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Detailed;
