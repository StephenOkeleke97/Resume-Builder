import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const ContactItem = ({ icon, info, id, remove }) => {
  return (
    <div className="contact-item">
      {icon}
      <p>{info}</p>
      <div
        className="remove-contactinfo clickable no-print"
        onClick={() => remove(id)}
      >
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default ContactItem;
