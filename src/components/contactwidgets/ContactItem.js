import React from "react";

const ContactItem = ({ icon, info }) => {
  return (
    <div className="contact-item">
      {icon}
      <p>{info}</p>
    </div>
  );
};

export default ContactItem;
