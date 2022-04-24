import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import Modal from "react-modal";

const Contact = () => {
  const [type, setType] = useState("Email");
  const [contactInfo, setContactInfo] = useState("");

  const [modalOpen, setOpenModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const options = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (options.current && !options.current.contains(e.target)) {
        setShowOptions(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      boxShadow: "2px 2px 10px #939598",
      overflow: "visible",
    },
  };

  const types = [
    {
      name: "Email",
      create: createEmail,
    },
    {
      name: "Address",
      create: createAddress,
    },
    {
      name: "GitHub",
      create: createGitHub,
    },
    {
      name: "Phone Number",
      create: createNumber,
    },
    {
      name: "LinkedIn",
      create: createLinkedIn,
    },
    {
      name: "Website",
      create: createWebsite,
    },
  ];

  function createEmail() {}

  function createAddress() {}

  function createGitHub() {}

  function createNumber() {}

  function createLinkedIn() {}

  function createWebsite() {}

  function handleAddContact() {
      
  }
  return (
    <div className="contact">
      <p onClick={() => setOpenModal(true)}>Add</p>

      <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>CONTACT INFO</h1>
          <div className="contact-input">
            <input
              value={contactInfo}
              placeholder={`Your ${type} here`}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>

          <div
            className="contact-type"
            ref={options}
            onClick={() => setShowOptions(true)}
          >
            <p>{type ? type : "Type"}</p>
            <AiOutlineDown />

            <div className={`contact-options ${showOptions && "contact-open"}`}>
              {types.map((t, index) => {
                return (
                  <div
                    key={index}
                    className={`contact-optionitems ${
                      type === t.name && "contact-active"
                    }`}
                    onClick={() => setType(t.name)}
                  >
                    {t.name}
                  </div>
                );
              })}
            </div>
          </div>

          <button className="contact-add">Add</button>

          <div className="close-modal" onClick={() => setOpenModal(false)}>
            <AiOutlineClose />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
