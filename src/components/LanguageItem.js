import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const LanguageItem = ({ language, id, remove, backgroundColor }) => {
  if (isNaN(language.percentage)) throw new Error("Invalid Percentage");

  function hexToRgbA(hex) {
    let color;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      color = hex.substring(1).split("");
      if (color.length == 3) {
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

  const bg = hexToRgbA(backgroundColor);
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
    backgroundColor: backgroundColor,
    height: blockHeight * (language.percentage / 100) + "px",
  };

  return (
    <div className="language-item">
      <div style={blockStyle} className="box">
        <div style={innerBlockStyle} />

        <div
          className="remove-language no-print clickable"
          onClick={() => remove(id)}
        >
          <AiOutlineClose />
        </div>
      </div>
      <p>{language.language}</p>
    </div>
  );
};

export default LanguageItem;
