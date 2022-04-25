import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";

const LinkedContactItem = ({ icon, info, id, remove }) => {
  return (
    <div className="contact-item">
      {icon}
      <p>{info}</p>
      <a href={info} target="_blank">
        <BiLinkExternal color="dodgerblue" />
      </a>
      <div className="remove-contactinfo clickable" onClick={() => remove(id)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default LinkedContactItem;
