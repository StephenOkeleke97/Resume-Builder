import React, { useState } from "react";
import { VscColorMode } from "react-icons/vsc";

const Title = ({ id }) => {
  const colorIconColor = "dodgerblue";
  const [title, setTitle] = useState("TITLE");
  const [titleColor, setTitleColor] = useState("#6D6E71");

  const titleStyle = {
    color: titleColor,
    fontSize: "20px",
    fontWeight: "600",
    width: title.length + 1 + "ch",
  };

  return (
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
  );
};

export default Title;
