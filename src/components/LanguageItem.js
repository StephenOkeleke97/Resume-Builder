import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";

const LanguageItem = ({ remove, edit, obj, color }) => {
  function hexToRgbA(hex) {
    let color;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      color = hex.substring(1).split("");
      if (color.length === 3) {
        color = [color[0], color[0], color[1], color[1], color[2], color[2]];
      }
      color = "0x" + color.join("");
      return (
        "rgba(" +
        [(color >> 16) & 255, (color >> 8) & 255, color & 255].join(",") +
        ",0.3)"
      );
    }
    throw new Error("Bad Hex");
  }

  const bg = hexToRgbA(color);
  const blockHeight = 40;

  const blockStyle = {
    height: blockHeight + "px",
    width: blockHeight + "px",
    backgroundColor: bg,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  };

  const innerBlockStyle = {
    backgroundColor: color,
    height: blockHeight * (parseInt(obj.percentage) / 100) + "px",
  };

  return (
    <div className="language-item">
      <div style={blockStyle} className="box">
        <div style={innerBlockStyle} />
        <div
          className="remove-language edit-bar no-print clickable"
          onClick={() => edit(obj)}
        >
          <MdOutlineEdit />
        </div>

        <div
          className="remove-language no-print clickable"
          onClick={() => remove(obj.id)}
        >
          <AiOutlineClose />
        </div>
      </div>
      <p>{obj.value}</p>
    </div>
  );
};

export default LanguageItem;
