import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineDown,
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";
import Modal from "react-modal";
import ContactItem from "./contactwidgets/ContactItem";
import { MdEmail } from "react-icons/md";
import { VscColorMode } from "react-icons/vsc";
import { ImLocation } from "react-icons/im";
import { MdSmartphone } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import uuid from "react-uuid";
import ReactDragListView from "react-drag-listview/lib/index.js";

const Contact = ({ remove, obj, onChange }) => {
  const colorIconColor = "dodgerblue";
  const defaultItem = {
    type: "Email",
    value: "",
    link: "",
    id: "",
  };

  const [modalOpen, setOpenModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const options = useRef(null);

  const [myObj, setMyObj] = useState(obj);
  const [isEditMode, setIsEditMode] = useState(false);
  const [contactItem, setContactItem] = useState(defaultItem);

  const onDragEnd = (fromIndex, toIndex) => {
    const newObj = { ...myObj };
    const item = newObj.contacts.splice(fromIndex, 1)[0];
    newObj.contacts.splice(toIndex, 0, item);
    setMyObj(newObj);
  };

  const dragProps = {
    onDragEnd,
    nodeSelector: ".contact-item-container",
    handleSelector: ".draggable",
  };

  const iconSize = 20;

  const iconStyle = {
    color: myObj.color,
  };

  const icons = useRef([]);

  useEffect(() => {
    onChange(myObj);
  }, [myObj]);

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
    },
    {
      name: "Address",
    },
    {
      name: "GitHub",
    },
    {
      name: "Phone Number",
    },
    {
      name: "LinkedIn",
    },
    {
      name: "Website",
    },
  ];

  const typesMap = {
    Email: {
      icon: () => {
        return (
          <div style={iconStyle}>
            <MdEmail size={iconSize} />
          </div>
        );
      },
    },
    "Phone Number": {
      icon: () => {
        return (
          <div style={iconStyle}>
            <MdSmartphone size={iconSize} />
          </div>
        );
      },
    },
    Address: {
      icon: () => {
        return (
          <div style={iconStyle}>
            <ImLocation size={iconSize} />
          </div>
        );
      },
    },
    LinkedIn: {
      icon: () => {
        return (
          <div style={iconStyle}>
            <AiFillLinkedin size={iconSize} />
          </div>
        );
      },
    },
    GitHub: {
      icon: () => {
        return (
          <div style={iconStyle}>
            <AiFillGithub size={iconSize} />
          </div>
        );
      },
    },
    Website: {
      icon: () => {
        return (
          <div style={iconStyle}>
            <CgWebsite size={iconSize} />
          </div>
        );
      },
    },
  };

  function getContactItem(obj) {
    if (typesMap[obj.type]) {
      return (
        <ContactItem
          icon={typesMap[obj.type].icon()}
          remove={handleRemoveContact}
          obj={obj}
          edit={editContact}
        />
      );
    }
  }

  function handleAddContact() {
    if (!contactItem.value) {
      return alert("Contact information required");
    }

    setMyObj((prevData) => ({
      ...prevData,
      contacts: [
        ...prevData.contacts,
        {
          type: contactItem.type,
          value: contactItem.value,
          link: contactItem.link.trim(),
          id: uuid(),
        },
      ],
    }));

    closeModal();
  }

  function handleRemoveContact(obj) {
    let updatedContacts = [...myObj.contacts];
    updatedContacts = updatedContacts.filter(
      (contact) => contact.id !== obj.id
    );

    setMyObj((prevData) => ({
      ...prevData,
      contacts: updatedContacts,
    }));
  }

  function editContact(obj) {
    setContactItem(obj);
    setIsEditMode(true);
    setOpenModal(true);
  }

  function handleEditContact() {
    let updatedContacts = [...myObj.contacts];
    const index = updatedContacts.findIndex(
      (item) => item.id === contactItem.id
    );
    updatedContacts[index] = contactItem;
    setMyObj((prevData) => ({
      ...prevData,
      contacts: updatedContacts,
    }));

    closeModal();
  }

  function closeModal() {
    setContactItem(defaultItem);
    setIsEditMode(false);
    setOpenModal(false);
  }

  return (
    <div className="contact">
      <ReactDragListView {...dragProps}>
        <div className="contact-container">
          {myObj.contacts.map((contact) => {
            return (
              <div className="contact-item-container" key={contact.id}>
                {getContactItem(contact)}
              </div>
            );
          })}
        </div>
      </ReactDragListView>

      <div className="contact-tools no-print">
        <p className="contact-add" onClick={() => setOpenModal(true)}>
          Add
        </p>

        <label htmlFor={"iconcolor" + myObj.id} className="clickable">
          <VscColorMode color={colorIconColor}/>
        </label>
        <input
          type={"color"}
          id={"iconcolor" + myObj.id}
          value={myObj.color}
          onChange={(e) => {
            setMyObj((prevData) => ({
              ...prevData,
              color: e.target.value,
            }));
          }}
          className="color-input"
        />
      </div>

      <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>CONTACT INFO OR LINK</h1>
          <div className="contact-input">
            <input
              value={contactItem.value}
              placeholder={`Your ${contactItem.type} Here`}
              onChange={(e) => {
                setContactItem((prevData) => ({
                  ...prevData,
                  value: e.target.value,
                }));
              }}
            />
          </div>
          <div className="contact-input">
            <input
              value={contactItem.link}
              placeholder={`Your Link Here`}
              onChange={(e) => {
                setContactItem((prevData) => ({
                  ...prevData,
                  link: e.target.value,
                }));
              }}
            />
          </div>

          <div className="contact-type-container">
            <div
              className="contact-type"
              ref={options}
              onClick={() => setShowOptions(true)}
            >
              <p>{contactItem.type ? contactItem.type : "Type"}</p>
              <AiOutlineDown />
            </div>

            <div className={`contact-options ${showOptions && "contact-open"}`}>
              {types.map((t, index) => {
                return (
                  <div
                    key={index}
                    className={`contact-optionitems ${
                      contactItem.type === t.name && "contact-active"
                    }`}
                    onClick={() => {
                      setContactItem((prevData) => ({
                        ...prevData,
                        type: t.name,
                      }));
                      setShowOptions(false);
                    }}
                  >
                    {t.name}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="contact-add-button clickable"
            onClick={isEditMode ? handleEditContact : handleAddContact}
          >
            {isEditMode ? "Edit" : "Add"}
          </button>

          <div className="close-modal" onClick={closeModal}>
            <AiOutlineClose />
          </div>
        </div>
      </Modal>

      <div className="remove no-print" onClick={() => remove(myObj.id)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Contact;
