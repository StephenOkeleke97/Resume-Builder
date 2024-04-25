import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { LuGrip } from "react-icons/lu";

const ContactItem = ({ icon, remove, obj, edit }) => {
  return (
    <div className="contact-item draggable-container">
      <div className="no-print draggable">
        <LuGrip color="#808285"/>
      </div>
      {icon}
      <p>{obj.value}</p>
      {obj.link && (
        <a href={obj.link} target="_blank" rel="noreferrer">
          <BiLinkExternal color="dodgerblue" />
        </a>
      )}
      <div className="remove-contactinfo no-print">
        <div
          className="remove-contactinfo-item clickable"
          onClick={() => edit(obj)}
        >
          <MdOutlineEdit />
        </div>
        <div
          className="remove-contactinfo-item clickable"
          onClick={() => remove(obj)}
        >
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
