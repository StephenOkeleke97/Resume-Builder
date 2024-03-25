import React, { useEffect, useState } from "react";
import Title from "./Title";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal/lib/components/Modal";
import { LuGrip } from "react-icons/lu";
import ReactDragListView from "react-drag-listview/lib/index.js";
import { MdOutlineEdit } from "react-icons/md";
import uuid from "react-uuid";

const DetailedItem = ({ id, remove, obj, onChange }) => {
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

  const detailSubTitleStyle = {
    fontWeight: "500",
    fontSize: "17px",
  };

  const detailTimeRangeStyle = {
    fontWeight: "400",
    fontSize: "13px",
    fontStyle: "italic",
  };

  const [modalOpen, setOpenModal] = useState(false);
  const defaultItem = {
    id: "",
    value: "",
  };
  const [detailItem, setDetailItem] = useState(defaultItem);
  const [isEditMode, setIsEditMode] = useState(false);

  const [myObj, setMyObj] = useState(obj);

  useEffect(() => {
    onChange(myObj);
  }, [myObj]);

  const onDragEnd = (fromIndex, toIndex) => {
    const newObj = { ...myObj };
    const item = newObj.detailItems.splice(fromIndex, 1)[0];
    newObj.detailItems.splice(toIndex, 0, item);
    setMyObj(newObj);
  };

  const dragProps = {
    onDragEnd,
    nodeSelector: ".detail-list-item",
    handleSelector: ".detail-list-item",
  };

  function addItem() {
    if (!detailItem.value.trim()) {
      return alert("Item cannot be blank");
    }

    const newObj = { ...myObj };
    newObj.detailItems.push({
      id: uuid(),
      value: detailItem.value,
    });
    setMyObj(newObj);

    closeModal();
  }

  function removeItem(id) {
    const newObj = { ...myObj };
    newObj.detailItems = newObj.detailItems.filter((item) => item.id !== id);
    setMyObj(newObj);
  }

  function editItem(item) {
    setDetailItem(item);
    setIsEditMode(true);
    setOpenModal(true);
  }

  function handleEditItem() {
    if (!detailItem.value.trim()) {
      return alert("Item cannot be blank");
    }

    let updatedItems = [...myObj.detailItems];
    const index = updatedItems.findIndex((item) => item.id === detailItem.id);
    updatedItems[index] = detailItem;
    setMyObj((prevData) => ({
      ...prevData,
      detailItems: updatedItems,
    }));

    closeModal();
  }

  function closeModal() {
    setOpenModal(false);
    setDetailItem(defaultItem);
    setIsEditMode(false);
  }

  function changeTitle(title) {
    const newObj = { ...myObj };
    newObj["title"] = title;
    setMyObj(newObj);
  }

  function changeSubtitle(subtitle) {
    const newObj = { ...myObj };
    newObj["subtitle"] = subtitle;
    setMyObj(newObj);
  }

  function changeTimeRange(timeRange) {
    const newObj = { ...myObj };
    newObj["timeRange"] = timeRange;
    setMyObj(newObj);
  }

  function changeLocation(location) {
    const newObj = { ...myObj };
    newObj["location"] = location;
    setMyObj(newObj);
  }

  return (
    <div className="detailed-item-container">
      <div className="no-print detail-drag">
        <LuGrip color="#808285" />
      </div>
      <div className="detailed-item-title">
        <Title
          id={myObj.id + "detailtitle"}
          title={myObj.title}
          onChange={changeTitle}
        />
      </div>
      <div className="detailed-item-subtitle">
        <Title
          id={myObj + "detailsubtitle"}
          style={detailSubTitleStyle}
          title={myObj.subtitle}
          onChange={changeSubtitle}
        />
      </div>

      <div className="detailed-item-timerange">
        <Title
          id={myObj + "detailtime"}
          style={detailTimeRangeStyle}
          title={myObj.timeRange}
          onChange={changeTimeRange}
        />

        <Title
          id={myObj + "detaillocation"}
          style={detailTimeRangeStyle}
          title={myObj.location}
          onChange={changeLocation}
        />
      </div>

      <div className="detail-list">
        <ul>
          <ReactDragListView {...dragProps}>
            {myObj.detailItems.map((item) => {
              return (
                <div key={item.id} className="detail-list-item">
                  <li>{item.value}</li>
                  <div className="detail-buttons-container">
                    <div
                      className="edit-detailitem clickable no-print"
                      onClick={() => editItem(item)}
                    >
                      <MdOutlineEdit />
                    </div>
                    <div
                      className="remove-detailitem clickable no-print"
                      onClick={() => removeItem(item.id)}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                </div>
              );
            })}
          </ReactDragListView>
        </ul>
      </div>

      <div className="contact-tools no-print">
        <p className="contact-add" onClick={() => setOpenModal(true)}>
          +
        </p>
      </div>

      <Modal isOpen={modalOpen} style={customStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>DETAIL ITEM</h1>
          <div className="contact-input">
            <input
              value={detailItem.value}
              placeholder={`${isEditMode ? "Edit" : "Add"} item`}
              onChange={(e) => {
                setDetailItem((prevData) => ({
                  ...prevData,
                  value: e.target.value,
                }));
              }}
            />
          </div>

          <button
            className="contact-add-button clickable"
            onClick={isEditMode ? handleEditItem : addItem}
          >
            {isEditMode ? "Edit" : "Add"}
          </button>

          <div className="close-modal" onClick={closeModal}>
            <AiOutlineClose />
          </div>
        </div>
      </Modal>

      <div
        className="remove-detail no-print clickable"
        onClick={() => remove(myObj.id)}
      >
        <p>Remove</p>
      </div>
    </div>
  );
};

export default DetailedItem;
