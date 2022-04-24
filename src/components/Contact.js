import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineDown } from "react-icons/ai";
import Modal from "react-modal";
import ContactItem from "./contactwidgets/ContactItem";
import { MdEmail } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import LinkedContactItem from "./contactwidgets/LinkedContactItem";
import { VscColorMode } from "react-icons/vsc";

const Contact = () => {
  const defaultType = "Email";
  const [type, setType] = useState(defaultType);
  const [contactInfo, setContactInfo] = useState("");

  const [modalOpen, setOpenModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const options = useRef(null);

  const [contactList, setContactList] = useState([]);

  const iconSize = 20;
  const [iconColor, setIconColor] = useState("#000");

  const iconStyle = {
    color: iconColor,
  };

  const icons = useRef([]);

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

  function createEmail() {
    const icon = (
      <div style={iconStyle} ref={(icon) => icons.current.push(icon)}>
        <MdEmail size={iconSize} />
      </div>
    );
    setContactList([
      ...contactList,
      <ContactItem icon={icon} info={contactInfo} />,
    ]);
  }

  function createAddress() {}

  function createGitHub() {
    const icon = (
      <div style={iconStyle} ref={(icon) => icons.current.push(icon)}>
        <AiFillGithub size={iconSize} />
      </div>
    );
    setContactList([
      ...contactList,
      <LinkedContactItem icon={icon} info={contactInfo} />,
    ]);
  }

  function createNumber() {}

  function createLinkedIn() {}

  function createWebsite() {}

  function handleAddContact() {
    if (!contactInfo) {
      return alert("Contact information required");
    }

    const contact = types.filter((t) => t.name === type);
    contact[0].create();

    closeModal();
  }

  function closeModal() {
    setType(defaultType);
    setContactInfo("");
    setOpenModal(false);
  }
  return (
    <div className="contact">
      <div className="contact-container">
        {contactList.map((contact, index) => {
          return (
            <div className="contact-item-container" key={index}>
              {contact}
            </div>
          );
        })}
      </div>

      <div className="contact-tools no-print">
        <p className="contact-add" onClick={() => setOpenModal(true)}>
          Add
        </p>

        <label htmlFor="iconcolor" className="clickable">
          <VscColorMode />
        </label>
        <input
          type={"color"}
          id="iconcolor"
          value={iconColor}
          onChange={(e) => {
            icons.current.forEach((icon) => {
              icon.style.color = e.target.value;
            });
            setIconColor(e.target.value);
          }}
          className="color-input"
        />
      </div>

      <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>CONTACT INFO OR LINK</h1>
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

          <button
            className="contact-add-button clickable"
            onClick={handleAddContact}
          >
            Add
          </button>

          <div className="close-modal" onClick={closeModal}>
            <AiOutlineClose />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contact;
