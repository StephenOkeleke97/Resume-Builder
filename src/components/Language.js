import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal/lib/components/Modal";
import uuid from "react-uuid";
import LanguageItem from "./LanguageItem";
import Title from "./Title";
import ReactDragListView from "react-drag-listview/lib/index.js";
import { VscColorMode } from "react-icons/vsc";

const Language = ({ remove, onChange, obj }) => {
  const colorIconColor = "dodgerblue";
  const [modalOpen, setOpenModal] = useState(false);

  const defaultItem = {
    value: "",
    id: "",
    percentage: "",
  };
  const [detailItem, setDetailItem] = useState(defaultItem);

  const [myObj, setMyObj] = useState(obj);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    onChange(myObj);
  }, [myObj]);

  const onDragEnd = (fromIndex, toIndex) => {
    const newObj = { ...myObj };
    const item = newObj.bars.splice(fromIndex, 1)[0];
    newObj.bars.splice(toIndex, 0, item);
    setMyObj(newObj);
  };

  const dragProps = {
    onDragEnd,
    nodeSelector: ".language-item",
    handleSelector: ".language-item",
  };

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

  function editItem(item) {
    setDetailItem(item);
    setIsEditMode(true);
    setOpenModal(true);
  }

  function handleEditItem() {
    if (!detailItem.value.trim() || !detailItem.percentage.trim()) {
      return alert("Invalid Inputs");
    }

    if (isNaN(detailItem.percentage)) {
      return alert("Percentage must be a number");
    }

    const newObj = { ...myObj };
    const index = newObj.bars.findIndex((item) => item.id === detailItem.id);
    newObj.bars[index] = detailItem;
    setMyObj(newObj);

    closeModal();
  }

  function closeModal() {
    setOpenModal(false);
    setDetailItem(defaultItem);
    setIsEditMode(false);
  }

  function addLanguage() {
    if (!detailItem.value.trim() || !detailItem.percentage.trim()) {
      return alert("Invalid Inputs");
    }

    if (isNaN(detailItem.percentage)) {
      return alert("Percentage must be a number");
    }

    const newObj = { ...myObj };
    newObj.bars.push({
      id: uuid(),
      value: detailItem.value,
      percentage: detailItem.percentage,
    });
    setMyObj(newObj);

    closeModal();
  }

  function removeLanguage(id) {
    const newObj = { ...myObj };
    newObj.bars = newObj.bars.filter((item) => item.id !== id);
    setMyObj(newObj);
  }

  function changeTitle(title) {
    const newObj = { ...myObj };
    newObj["title"] = title;
    setMyObj(newObj);
  }

  return (
    <div className="language-container">
      <Title title={myObj.title} onChange={changeTitle} id={myObj.id} />

      <ReactDragListView {...dragProps}>
        <div className="language-item-container">
          {myObj.bars.map((bar) => {
            return (
              <LanguageItem
                key={bar.id}
                obj={bar}
                remove={removeLanguage}
                edit={editItem}
                color={myObj.color}
              />
            );
          })}
        </div>
      </ReactDragListView>

      <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>ITEM</h1>
          <div className="contact-input">
            <input
              value={detailItem.value}
              placeholder={`${isEditMode ? "Edit" : "Add"} Item`}
              onChange={(e) => {
                setDetailItem((prevData) => ({
                  ...prevData,
                  value: e.target.value,
                }));
              }}
            />
          </div>

          <div className="contact-input">
            <input
              value={detailItem.percentage}
              placeholder="Percentage"
              onChange={(e) => {
                setDetailItem((prevData) => ({
                  ...prevData,
                  percentage: e.target.value,
                }));
              }}
              type="number"
            />
          </div>

          <button
            className="contact-add-button clickable"
            onClick={isEditMode ? handleEditItem : addLanguage}
          >
            {`${isEditMode ? "Edit" : "Add"} Item`}
          </button>

          <div className="close-modal" onClick={closeModal}>
            <AiOutlineClose />
          </div>
        </div>
      </Modal>

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

      <div className="remove no-print" onClick={() => remove(myObj.id)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Language;
