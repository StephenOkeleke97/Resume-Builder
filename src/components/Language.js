import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal/lib/components/Modal";
import uuid from "react-uuid";
import LanguageItem from "./LanguageItem";
import Title from "./Title";

const Language = ({ id, remove }) => {
  const [titleColor, setTitleColor] = useState("#6D6E71");
  const [languages, setLanguages] = useState([]);
  const [modalOpen, setOpenModal] = useState(false);
  const [language, setLanguage] = useState("");
  const [percentage, setPercentage] = useState("");

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

  function closeModal() {
    setLanguage("");
    setPercentage("");
    setOpenModal(false);
  }

  function addLanguage() {
    if (!language.trim() || !percentage.trim()) {
      return alert("Invalid Inputs");
    }

    const temp = [...languages];
    temp.push({
      language: language,
      percentage: percentage,
      id: uuid(),
    });
    setLanguages(temp);

    closeModal();
  }

  function removeLanguage(id) {
    const temp = languages.filter((language) => language.id !== id);
    setLanguages(temp);
  }

  return (
    <div className="language-container">
      <Title id={id} onChange={setTitleColor} />

      <div className="language-item-container">
        {languages.map((language) => {
          return (
            <LanguageItem
              key={language.id}
              id={language.id}
              language={language}
              remove={removeLanguage}
              backgroundColor={titleColor}
            />
          );
        })}
      </div>

      <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>LANGUAGE</h1>
          <div className="contact-input">
            <input
              value={language}
              placeholder="Add Language"
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          <div className="contact-input">
            <input
              value={percentage}
              placeholder="Percentage of Fluency"
              onChange={(e) => setPercentage(e.target.value)}
              type="number"
            />
          </div>

          <button
            className="contact-add-button clickable"
            onClick={addLanguage}
          >
            Add
          </button>

          <div className="close-modal" onClick={closeModal}>
            <AiOutlineClose />
          </div>
        </div>
      </Modal>

      <div
        className="contact-tools no-print"
        onClick={() => setOpenModal(true)}
      >
        <p className="contact-add">Add Language</p>
      </div>

      <div className="remove no-print" onClick={() => remove(id)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Language;
