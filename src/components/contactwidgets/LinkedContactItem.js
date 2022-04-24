import React from "react";
import { BiLinkExternal } from "react-icons/bi";

const LinkedContactItem = ({ icon, info }) => {
  return (
    <div className="contact-item">
      {icon}
      <p>{info}</p>
      <a href={info} target="_blank">
        <BiLinkExternal color="dodgerblue"/>
      </a>
    </div>
  );
};

export default LinkedContactItem;
