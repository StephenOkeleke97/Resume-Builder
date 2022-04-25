import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { VscColorMode } from "react-icons/vsc";
import uuid from "react-uuid";
import TileItem from "./TileItem";

const Tiles = ({ id, remove }) => {
  const colorIconColor = "dodgerblue";
  const [title, setTitle] = useState("TITLE");
  const [titleColor, setTitleColor] = useState("#6D6E71");
  const [backgroundColor, setBackgroundColor] = useState("#6D6E71");
  const [tileItems, setTileItems] = useState([]);
  const [tileItem, setTileItem] = useState("");
  const input = useRef(null);

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

  const titleStyle = {
    color: titleColor,
    fontSize: "20px",
    fontWeight: "600",
    width: title.length + 1 + "ch",
  };

  function handleAddItem() {
    if (!tileItem.trim()) return alert("Please add valid item");
    const temp = [...tileItems];
    temp.push({
      name: tileItem,
      id: uuid(),
    });
    setTileItems(temp);

    setTileItem("");
  }

  function removeItem(id) {
    const temp = tileItems.filter((item) => item.id !== id);
    setTileItems(temp);
  }

  return (
    <div className="tiles-container">
      <div className="header-editable">
        <input
          type={"text"}
          value={title}
          style={titleStyle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <div className="no-print">
          <label htmlFor={id.toString()}>
            <VscColorMode color={colorIconColor} />
          </label>
          <input
            type={"color"}
            id={id.toString()}
            value={titleColor}
            onChange={(e) => {
              setTitleColor(e.target.value);
            }}
            className="color-input"
          />
        </div>
      </div>

      <div className="tile-content">
        <div className="tile-item-container">
          {tileItems.map((item) => {
            return (
              <TileItem
                key={item.id}
                item={item.name}
                id={item.id}
                remove={removeItem}
                backgroundColor={backgroundColor}
              />
            );
          })}
        </div>
        <div className="tile-input no-print">
          <input
            type={"text"}
            value={tileItem}
            onChange={(e) => {
              setTileItem(e.target.value);
            }}
            ref={input}
          />
          <button className="clickable" onClick={handleAddItem}>
            Add
          </button>

          <div className="no-print align">
            <label htmlFor={id.toString() + "1"}>
              <VscColorMode color={colorIconColor} />
            </label>
            <input
              type={"color"}
              id={id.toString() + "1"}
              value={backgroundColor}
              onChange={(e) => {
                setBackgroundColor(e.target.value);
              }}
              className="color-input"
            />
          </div>
        </div>
      </div>

      <div className="remove no-print" onClick={() => remove(id)}>
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default Tiles;
