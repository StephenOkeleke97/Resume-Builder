import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscColorMode } from "react-icons/vsc";
import uuid from "react-uuid";
import TileItem from "./TileItem";
import Title from "./Title";
import Modal from "react-modal";
import ReactDragListView from "react-drag-listview/lib/index.js";

const Tiles = ({ remove, obj, onChange }) => {
  const colorIconColor = "dodgerblue";
  const defaultItem = {
    id: "",
    value: "",
  };
  const [tileItem, setTileItem] = useState(defaultItem);
  const input = useRef(null);
  const [modalOpen, setOpenModal] = useState(false);

  const [myObj, setMyObj] = useState(obj);

  const onDragEnd = (fromIndex, toIndex) => {
    const newObj = { ...myObj };
    const item = newObj.tiles.splice(fromIndex, 1)[0];
    newObj.tiles.splice(toIndex, 0, item);
    setMyObj(newObj);
  };

  const dragProps = {
    onDragEnd,
    nodeSelector: ".tile-item",
    handleSelector: ".tile-item",
  };

  useEffect(() => {
    onChange(myObj);
  }, [myObj]);

  useEffect(() => {
    function handleEnterKey(e) {
      if (e.code === "Enter" && document.activeElement === input.current) {
        handleAddItem();
      }
    }
    document.addEventListener("keypress", handleEnterKey);

    return () => {
      document.removeEventListener("keypress", handleEnterKey);
    };
  }, [tileItem]);

  function handleAddItem() {
    if (!tileItem.value.trim()) return alert("Please add valid item");
    const newObj = { ...myObj };
    newObj.tiles.push({
      value: tileItem.value,
      id: uuid(),
    });
    setMyObj(newObj);
    setTileItem(defaultItem);
  }

  function removeItem(id) {
    const newObj = { ...myObj };
    console.log(id);
    console.log(newObj);
    const filteredItems = newObj.tiles.filter((item) => item.id !== id);
    newObj["tiles"] = filteredItems;
    setMyObj(newObj);
  }

  function changeTitle(title) {
    const newObj = { ...myObj };
    newObj["title"] = title;
    setMyObj(newObj);
  }

  function closeModal() {
    setOpenModal(false);
    setTileItem(defaultItem);
  }

  function editTile(item) {
    setTileItem(item);
    setOpenModal(true);
  }

  function handleEditTile() {
    let updatedTiles = [...myObj.tiles];
    const index = updatedTiles.findIndex((item) => item.id === tileItem.id);
    updatedTiles[index] = tileItem;
    setMyObj((prevData) => ({
      ...prevData,
      tiles: updatedTiles,
    }));

    closeModal();
  }

  const modalStyles = {
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

  return (
    <div className="tiles-container">
      <Title title={myObj.title} onChange={changeTitle} id={myObj.id} />

      <div className="tile-content">
        <ReactDragListView {...dragProps}>
          <div className="tile-item-container">
            {myObj.tiles.map((item) => {
              return (
                <TileItem
                  key={item.id}
                  item={item}
                  remove={removeItem}
                  backgroundColor={myObj.color}
                  edit={editTile}
                />
              );
            })}
          </div>
        </ReactDragListView>
        <div className="tile-input no-print">
          <input
            type={"text"}
            value={tileItem.value}
            onChange={(e) => {
              setTileItem((prevData) => ({
                ...prevData,
                value: e.target.value,
              }));
            }}
            ref={input}
          />
          <button className="clickable" onClick={handleAddItem}>
            Add
          </button>

          <div className="no-print align">
            <label htmlFor={myObj.toString() + "1"}>
              <VscColorMode color={colorIconColor} />
            </label>
            <input
              type={"color"}
              id={myObj.toString() + "1"}
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
        </div>
      </div>

      <Modal isOpen={modalOpen} style={modalStyles} ariaHideApp={false}>
        <div className="contact-modal">
          <h1>Edit Tile</h1>
          <div className="contact-input">
            <input
              value={tileItem.value}
              placeholder={`Your Tile Here`}
              onChange={(e) => {
                setTileItem((prevData) => ({
                  ...prevData,
                  value: e.target.value,
                }));
              }}
            />
          </div>
          <button
            className="contact-add-button clickable"
            onClick={handleEditTile}
          >
            Edit
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

export default Tiles;
